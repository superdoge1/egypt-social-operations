# Egypt Social Operations Fieldbook — Implementation Plan

**Spec:** `docs/superpowers/specs/2026-09-14-egypt-social-operations-fieldbook-design.md`

## Global constraints

- Public, unofficial, static Astro site; no accounts, server, analytics, third-party fonts/images, or runtime dependencies.
- Never place internal company information, personal data, identifiable cases, credentials, or private links in code, fixtures, notes, screenshots, or Firecrawl.
- Exactly 11 lessons, 30 daily sprints, four review gates, base `/egypt-social-operations/`, and storage key `egyptSocialOperationsProgress.v1`.
- Every mutable or regulated fact is dated and marked for human/internal review. Do not invent SUGO metrics, economics, host payouts, agency terms, policy mechanics, or numerical targets.
- New behavior follows red-green-refactor. Each implementation task is committed and reviewed before the next task.

## Task 1: Foundation and validation contracts

Adapt the reused Astro scaffold to the new package, base path, storage key, site identity, source/artifact schema, stricter 11-lesson graph validation, and whole-curriculum quiz validation. Write and run failing unit tests before changing production validators. Preserve safe progress parsing and local-storage degradation. Remove all Vibe-specific content only when replacement contracts compile. Commit the task.

## Task 2: Eleven lessons and evidence system

Author the 11 original Chinese/English lessons from the specification with 30 explicit daily sprints, Egyptian Arabic/Arabizi vocabulary where relevant, four evidence labels, artifacts and visibility, quizzes, source dates, jurisdiction, stability, and internal-validation flags. Rewrite roadmap, project/evidence, and source-register content. Ensure claims are supported by the cached public-source research and clearly separate fact, inference, and internal unknown. Add curriculum/quiz coverage tests first and make them pass. Commit the task.

## Task 3: Fieldbook visual system and interaction polish

Replace the Agent console identity with a distinctive Egypt operations fieldbook interface. Implement an accessible responsive home, navigation, progress ledger, lesson cards, source/evidence badges, lesson inspector, and 404. Use only system fonts and CSS/SVG assets. Add failing Playwright design/behavior contracts first, then implement. Verify 375/768/1024/1440 layouts, keyboard focus, 44 px targets, 16 px body copy, 4.5:1 contrast, reduced motion, no horizontal overflow, and no CSS/JS failures. Commit the task.

## Task 4: Documentation and deployment readiness

Rewrite README, favicon, metadata, and public disclaimers; retain MIT licensing with the new project name. Update pinned GitHub Pages workflow for Node 24 and the new repository path. Remove copied Vibe docs/strings and exclude caches, build output, reports, screenshots, and environment files. Commit the task.

## Task 5: Full verification and release review

Run `npm run verify`, confirm 0 Astro diagnostics, all Vitest and both Playwright projects pass, and exactly 16 pages build. Perform screenshot review of home, first lesson, roadmap, and 404 at 375, 768, and 1440 px; fix only evidenced issues with regression tests. Audit public/private boundaries, external links, browser console/resource responses, git status, and copied-brand strings. Request a whole-branch code/content review and resolve all Critical/Important findings. Commit verified fixes if needed.

## Implementation status (updated 2026-09-15)

This document remains the historical implementation plan. Tasks 1–3 are represented by the current branch, and Task 4 adds the README, static metadata/disclaimer, original SVG favicon, MIT notice, Pages workflow, and repository hygiene rules. The workflow is release-ready but no GitHub Pages deployment has been run or claimed here. Task 5 remains the final branch-level verification and review checkpoint; its status must be evidenced by fresh command output rather than inferred from this note.
