"""Align ALIGN_SCRIPT.txt words to Whisper word timestamps.

Usage (from reels/reel_<topic>/):
    python ../../tools/align.py [whisper=whisper.json] [script=ALIGN_SCRIPT.txt]

Writes cue_words.json: [{i, line, w, s, e, score}] - one entry per script word,
timed from the matched Whisper word (Whisper is the timing authority).
Unmatched script words get interpolated times and score 0.
Writes qc/timing_qc.md listing weak matches to check by ear.
"""
import json
import re
import sys
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

wpath = sys.argv[1] if len(sys.argv) > 1 else "whisper.json"
spath = sys.argv[2] if len(sys.argv) > 2 else "ALIGN_SCRIPT.txt"

ACRONYMS = {  # spaced pronunciation in ALIGN_SCRIPT -> single token
    "जी एस टी": "जीएसटी", "ओ सी": "ओसी", "ई एम आय": "ईएमआय", "एस आर एस": "एसआरएस",
    "पी एम सी": "पीएमसी", "एफ एस आय": "एफएसआय", "टी डी आर": "टीडीआर",
}
LATIN = {  # Whisper Latin output -> Devanagari for matching only
    "GST": "जीएसटी", "EMI": "ईएमआय", "OC": "ओसी", "OCS": "ओसी", "SRS": "एसआरएस",
    "READY": "रेडी", "FLAT": "फ्लॅट", "PMC": "पीएमसी", "FSI": "एफएसआय", "TDR": "टीडीआर",
}
NUM = {"1": "एक", "2": "दोन", "3": "तीन", "4": "चार", "5": "पाच", "10": "दहा", "14": "चौदा", "15": "पंधरा",
       "50": "पन्नास", "51": "एक्कावन्न", "70": "सत्तर"}


def skeleton(w):
    """Consonant skeleton: drop vowel signs, nukta, halant, anusvara, punctuation."""
    w = LATIN.get(w.upper().strip(".,?!"), w)
    w = NUM.get(w.strip(".,?!"), w)
    out = []
    for ch in unicodedata.normalize("NFC", w):
        cat = unicodedata.category(ch)
        if cat.startswith("M") or not ch.isalnum():
            continue
        out.append(ch)
    return "".join(out)


# script tokens
script = []
for li, line in enumerate(Path(spath).read_text(encoding="utf-8").splitlines()):
    line = re.sub(r"\[[^\]]*\]", " ", line)
    for k, v in ACRONYMS.items():
        line = line.replace(k, v)
    for tok in line.split():
        if tok.strip("-.,?!"):
            script.append({"line": li, "w": tok.strip(".,?!")})

wd = json.loads(Path(wpath).read_text(encoding="utf-8"))
heard = [w for s in wd["segments"] for w in s["words"] if skeleton(w["w"])]

A = [skeleton(t["w"]) for t in script]
B = [skeleton(w["w"]) for w in heard]
n, m = len(A), len(B)
GAP = -0.45


def sim(a, b):
    if not a or not b:
        return -1.0
    return SequenceMatcher(None, a, b).ratio() * 2 - 1


# Needleman-Wunsch
S = [[0.0] * (m + 1) for _ in range(n + 1)]
P = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    S[i][0], P[i][0] = i * GAP, 1
for j in range(1, m + 1):
    S[0][j], P[0][j] = j * GAP, 2
for i in range(1, n + 1):
    for j in range(1, m + 1):
        d = S[i - 1][j - 1] + sim(A[i - 1], B[j - 1])
        u = S[i - 1][j] + GAP
        l = S[i][j - 1] + GAP
        S[i][j], P[i][j] = max((d, 0), (u, 1), (l, 2))

match = [None] * n
i, j = n, m
while i > 0 or j > 0:
    p = P[i][j]
    if i > 0 and j > 0 and p == 0:
        match[i - 1] = j - 1
        i, j = i - 1, j - 1
    elif i > 0 and (j == 0 or p == 1):
        i -= 1
    else:
        j -= 1

cues = []
for k, t in enumerate(script):
    j = match[k]
    if j is not None:
        h = heard[j]
        score = round((sim(A[k], B[j]) + 1) / 2, 2)
        cues.append({"i": k, "line": t["line"], "w": t["w"], "heard": h["w"], "s": h["s"], "e": h["e"], "score": score})
    else:
        cues.append({"i": k, "line": t["line"], "w": t["w"], "heard": None, "s": None, "e": None, "score": 0})

# interpolate unmatched
for k, c in enumerate(cues):
    if c["s"] is None:
        prev = next((cues[x]["e"] for x in range(k - 1, -1, -1) if cues[x]["e"] is not None), 0.0)
        nxt = next((cues[x]["s"] for x in range(k + 1, len(cues)) if cues[x]["s"] is not None), prev)
        c["s"], c["e"] = prev, nxt

Path("cue_words.json").write_text(json.dumps(cues, ensure_ascii=False, indent=1), encoding="utf-8")

weak = [c for c in cues if c["score"] < 0.5]
Path("qc").mkdir(exist_ok=True)
lines = ["# TIMING QC", "", f"Script words: {n} | Whisper words: {m} | weak matches (<0.5): {len(weak)}", "",
         "| # | Script | Heard | Start | Score |", "|---|---|---|---|---|"]
lines += [f"| {c['i']} | {c['w']} | {c['heard']} | {c['s']:.2f} | {c['score']} |" for c in weak]
Path("qc/timing_qc.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"{n} script words, {m} heard, {len(weak)} weak -> cue_words.json, qc/timing_qc.md")
for c in weak:
    print(f"  #{c['i']} {c['w']} <- {c['heard']} @{c['s']:.2f} ({c['score']})")
