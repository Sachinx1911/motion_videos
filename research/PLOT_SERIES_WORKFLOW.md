# Series "Plot किती, Building कशी?" - workflow (draft 27 Oct 2026, waiting for user OK)

Idea (user): redevelopment has started everywhere; every society has a different plot area. Each episode shows, for one plot area from the comments, what can be built, how it looks, which amenities fit. Viewers comment their own plot -> next episode on their plot -> series keeps running.

## A. One-time setup (before episode 1)
| # | Step | Who | Output |
|---|---|---|---|
| A1 | Rules sheet: Navi Mumbai redevelopment rules (UDCPR 10.10.2 CIDCO buildings, Table 10-C FSI by road, incentive by LR/RC, CIDCO share 10-F, 6-G premium, cluster 14.8, open space, lift / fire / refuge-floor by height, parking) with clause numbers | me | research/redev_rules.md |
| A2 | Node rate table: ASR land rate + construction rate per node (for incentive) | me | research/nm_asr_rates.csv |
| A3 | Calculator: inputs area, road, node, flats, flat size, CIDCO+age -> FSI, built-up, floors, flats, new flat size, builder balance, CIDCO share, amenities band, fact-check table | me | tools/redev_calc.py |
| A4 | Video template: fixed scene order + engine helpers (plot boundary, road highlight, floor counter, card system, comment box), new look per episode via accent/angles | me | series_plot/template/ |
| A5 | Design library prompts per size band (G+4/G+7, stilt tower, podium+tower, cluster) + master-image + edit-chain method | me | series_plot/prompts.md |
| A6 | Comment sheet | me (user pastes comments) | series_plot/requests.csv |

## B. Every episode (loop)
| # | Step | Who | Gate |
|---|---|---|---|
| B1 | Paste new comments (screenshots or text) | user | - |
| B2 | Log in requests.csv, suggest next plot (most asked / new band / complete data) | me | USER PICKS |
| B3 | Run calculator -> numbers + fact-check table; unknown road -> Google Maps estimate, labelled | me | - |
| B4 | Script 75-95 s (script craft: 5 hooks, open loops, CTA, caption, fact table) | me | USER "ठीक" |
| B5 | Layout storyboard (no images) + shot list with camera moves + image / Veo prompts | me | USER OK |
| B6 | Images (master + edits) / Veo clips + voice | user | - |
| B7 | Storyboard with images | me | USER "बनव" |
| B8 | Render, QC, caption + pin comment (full 5-field format), push | me | - |
| B9 | Post; next episode answers a commenter ("एका follower ने विचारलं...") | user | - |

## Comment format
Voice asks 3: area (unit!) / road m / node. Pin comment asks 5: `1500 चौ.मी. / 15m / वाशी / 32 flats, 300 sq.ft / सिडको, 35 वर्षं`. No society name / phone in comments.

## Every episode must say
"हा अंदाज आहे; अंतिम आराखडा architect, PMC आणि मंजुरीवर ठरतो." No builder/architect promotion.
