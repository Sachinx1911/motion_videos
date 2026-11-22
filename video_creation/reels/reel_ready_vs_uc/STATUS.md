# STATUS - reel_ready_vs_uc

Current state: DELIVERED (FINAL QC PASS)
Script version: v1 APPROVED (versions/script_v1_APPROVED.md) - facts locked
ALIGN_SCRIPT: done (no emotion tags)
Storyboard: v1 APPROVED (versions/storyboard_v1_APPROVED.md)
Images: FINAL = v2 set 4/4 PASS (see qc/image_qc.md "FINAL IMAGE SET")
Voice: vo.mp3 95.26 s (trimmed from versions/vo_original.mp3 100.68 s), ElevenLabs "Bunty"

## Log
- 2026-10-07: IDEA - topic received
- 2026-10-07: RESEARCH - done, see research.md
- 2026-10-07: SCRIPT_DRAFT v1 → SCRIPT_REVIEW
- 2026-10-07: GST primary source verified (Notification 03/2019-CT(Rate), gstcouncil.gov.in) → RESEARCH_VERIFIED
- 2026-10-07: SCRIPT_APPROVED v1 by user

- 2026-10-07: VOICE_RECEIVED → VOICE_VERIFIED → TIMING_VERIFIED (whisper.json, cue_words.json, qc/timing_qc.md)

## Next
- Logo received: brands/srs_dwell/logo_embossed_ivory.jpg (end card on ivory)
- Pending from user: permission to download Poppins (Google Fonts); OK on Scene 17 ivory end card
- Next stage: BUILDING (engine + render tools + scenes) - needs "video kar"
- Engine/tools: ffmpeg + Python 3.12 venv + faster-whisper installed; tools: common, transcribe, trim, align. Render engine pending

- 2026-10-07: BUILDING → PREVIEW_QC (1 fix: RERA scene text/ring overlap) → AUDIO_MIX (-15.3 LUFS, -1.2 dBTP) → FINAL_RENDER (4 parallel parts, 2-pass) → FINAL_QC PASS → DELIVERED
- Final: out/SRS_Dwell_Ready_vs_Under_Construction.mp4
