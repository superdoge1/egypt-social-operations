# Task 2 Stage A report — Egypt curriculum manifest

## Status

Stage A is complete on `feat/egypt-learning-site`. It establishes the exact 11-lesson Egypt/SUGO manifest, quiz coverage, sprint-day metadata, source metadata contracts, and artifact visibility. Lesson prose, daily sprint tables, review-gate copy, roadmap, projects, and source-register pages remain intentionally deferred to Stage B/C.

## RED evidence

Before replacing the scaffold, the new curriculum coverage test was run against the copied Vibe lessons:

```text
npm test -- src/lib/curriculum.test.ts

FAIL  src/lib/curriculum.test.ts (4 tests | 4 failed)
- expected new lesson filenames, received 01-ai-mindset.mdx through 11-agent-capstone.mdx
- expected 30 sprint days, received 0
- expected the evidence curriculum contract, received copied Vibe prose
- expected the 11 new quiz keys, received the old Vibe quiz keys
```

The failure was intentional and attributable to missing curriculum content, not a test-loading or syntax error.

## GREEN evidence

After the manifest, quiz map, and validator changes:

```text
npm test -- src/lib/curriculum.test.ts src/lib/content-graph.test.ts

Test Files  4 passed (4)
Tests       19 passed (19)
```

```text
npm run check

Result (25 files):
- 0 errors
- 0 warnings
- 0 hints
```

`git diff --check` also completed without whitespace errors.

## Files changed

- Replaced the 11 copied files in `src/content/lessons/` with the exact IDs, orders, phases, prerequisites, `[days]` ranges, dated source metadata, artifact titles, descriptions, and visibility values from the Stage A manifest.
- Replaced `src/data/quizzes.ts` with one concise operational quiz for each required lesson ID. Options are unique, every answer belongs to its option set, and there are no orphan or missing quizzes.
- Added `days` to `src/content.config.ts` with a 1–30 bounded two-to-three-day contract.
- Added `validateDayCoverage` to `src/lib/content-graph.ts` and unit coverage for duplicate, missing, undeclared, out-of-range, and complete sprint plans.
- Added `src/lib/curriculum.test.ts` to assert the exact file/ID/phase/order/day/prerequisite/artifact manifest, 30-day coverage, Vibe-string removal, and quiz/graph validator acceptance.
- Extended `src/lib/content-graph.test.ts` with day-coverage cases.
- No page, layout, component, or visual CSS files were modified in Stage A.

## Source policy review

All lesson source links point to the public starting points named by the authoritative content context: MICO WORLD, SUGO public store/terms/privacy/guidelines, DataReportal Digital 2026 Egypt, AUC and WANLP language research, the Egypt Presidency holiday calendar, CBE, Google/Apple platform policy, PDPC, and SCMR. Every source has an ISO `verifiedAt`, a permitted jurisdiction, a stability label, and an explicit internal-validation flag. No `.firecrawl/` cache file was added or changed, and no private link, account detail, internal metric, payout ratio, moderation performance, or numerical target was introduced.

## Self-review and handoff concerns

- The exact 11-to-11 prerequisite chain is represented and validator-checked.
- Days 1–30 are represented exactly once in frontmatter; review-gate prose and the daily sprint tables are pending Stage B/C.
- Stage A bodies intentionally contain only `课程正文将在 Stage B/C 完成`; they are not a substitute for the required substantive lessons.
- Roadmap, projects/evidence, and resources/source-register copy are still scaffold content and are pending the next stage.
- The existing homepage still calls the graph and quiz validators with its pre-day manifest projection; Stage B/C should wire the day validator and render the richer lesson metadata/artifact UI.

## Commit

Code commit SHA: pending until the Stage A commit is created.
