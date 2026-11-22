# IMAGE QC - 2026-10-07

| Upload | Identified as | Saved as | Size | Ratio | Result |
|---|---|---|---|---|---|
| 1.webp | IMG3 Ready interior | raw/img3_interior.webp | 941x1672 | 9:16 | PASS |
| 2.webp | IMG2 Ready tower | raw/img2_ready_tower.webp | 941x1672 | 9:16 | PASS |
| 3.webp | IMG1 UC tower | raw/img1_uc_tower.webp | 941x1672 | 9:16 | PASS |
| 4.webp | IMG4 Keys | raw/img4_keys.webp | 1024x1536 | 2:3 | PASS |

Checks (all 4): subject correct, composition centered, golden-hour light consistent across IMG1/IMG2, no text, no logo, no watermark (all 4 corners inspected - qc/corners.jpg), no anatomy issues (workers tiny and distant), no duplicates.

## Notes
- IMG1: 15 floors (prompt said 14) - not important. Crane ties to building look plausible. Rebar on top + bare slabs + brick infill + plastered base = clearly "under construction". Blue/grey barricade OK.
- IMG2: about 18 floors, different facade from IMG1 - fine, script says "2 flat", not the same building.
- IMG3: entrance door frame on left edge (natural "walking in" view), picture frames are blank, lower third clean floor for labels.
- IMG4: pure white background, blank leather tag, faint shadow. Silver ring is close to white - check edges carefully at cut-out stage.
- Resolution: 941 px wide → needs 1.15x upscale for 1080 width (about 1.25x with push-in). Slight softness possible; acceptable. Higher-resolution originals preferred if available.

Mapping: as per image_prompts.md table.

# IMAGE QC v2 - 2026-10-07

| Upload | Identified as | Saved as | Size | Ratio | Result |
|---|---|---|---|---|---|
| 6.webp | IMG2 v2 Ready tower | raw/img2_ready_tower_v2.webp | 941x1672 | 9:16 | PASS |

- Slim tower centered (about x 250-690 = 47% width), straight-on front view, verticals straight.
- Building top at 15.7% height - top rail space OK. Road at bottom ~10%.
- Golden hour from left, symmetric gate + landscaping. Gate side plates blank - no readable text. No watermark (4 corners checked, qc/img2v2_check.jpg).
- Better than v1 for split screen: full building fits a 540 px half.
- Still 941 px wide (pasted into chat, not original file).
- Next: IMG1 v2 must be made as an edit of THIS image in the same chat.

| Upload | Identified as | Saved as | Size | Ratio | Result |
|---|---|---|---|---|---|
| 7.webp | IMG4 v2 Keys | raw/img4_keys_v2.webp | 1024x1536 | 2:3 | PASS |
| 8.webp | IMG3 v2 Interior | raw/img3_interior_v2.webp | 941x1672 | 9:16 | PASS |
| 9.webp | IMG1 v2 UC tower | raw/img1_uc_tower_v2.webp | 941x1672 | 9:16 | PASS |

- IMG1 v2: same camera, sky, road and light as IMG2 v2. Rebar, bare slabs, brick infill, netting, crane, barricade - clearly under construction. About 1-2 floors taller than IMG2 v2 and a bit wider (fills the 540 px half edge to edge). Crane mast falls outside the split half - only jib visible in Scene 01-02; full crane visible in full-frame scenes 05 / 09. Acceptable. Split preview: qc/split_preview.jpg.
- IMG3 v2: straight-on view, balcony door centered, no door frame at edge, blank leaf artworks, bottom ~30% clean floor. Better than v1.
- IMG4 v2: gunmetal ring, pure white background, no shadow - clean for cut-out. Tag blank.
- No text / logo / watermark in any corner (qc/corners_v2.jpg).

## FINAL IMAGE SET (used in build)
- IMG1 = raw/img1_uc_tower_v2.webp
- IMG2 = raw/img2_ready_tower_v2.webp
- IMG3 = raw/img3_interior_v2.webp
- IMG4 = raw/img4_keys_v2.webp
- v1 files kept in raw/ (not used)
