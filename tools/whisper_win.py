# Windows transcription: vo_t.wav -> cue_words.json (+ transcript.txt) with faster-whisper large-v3-turbo, Marathi, word timestamps.
# Usage (inside the reel folder): python ../tools/whisper_win.py [vo_t.wav]
import sys, json, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from faster_whisper import WhisperModel
src = sys.argv[1] if len(sys.argv) > 1 else 'vo_t.wav'
model = WhisperModel('large-v3-turbo', device='cpu', compute_type='int8')
# decode with ffmpeg (PyAV version mismatch breaks faster-whisper's own decoder on this machine)
import subprocess, numpy as np
audio = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',src,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout, np.float32)
segs, info = model.transcribe(audio, language='mr', word_timestamps=True, beam_size=5, vad_filter=False,
                              condition_on_previous_text=False)
words = []; lines = []
for s in segs:
    lines.append(f'[{s.start:6.2f}-{s.end:6.2f}] {s.text.strip()}')
    for w in (s.words or []):
        words.append({'w': w.word.strip(), 's': round(w.start, 2), 'e': round(w.end, 2)})
json.dump(words, open('cue_words.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
open('transcript.txt', 'w', encoding='utf-8').write('\n'.join(lines))
print('\n'.join(lines)); print(len(words), 'words ->', 'cue_words.json')
