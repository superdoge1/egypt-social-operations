# Egypt Social Operations Fieldbook — Design Specification

## Purpose

Build an unofficial, public, account-free learning site for a newly appointed overseas operations manager who must understand the global social-entertainment category and take over SUGO customer operations in Egypt. The course starts on the learner's first workday, takes 30 daily one-hour sprints, and ends with an evidence-backed Day 31–90 operating plan.

The site teaches with public evidence and empty templates. Internal metrics, interview transcripts, account identities, commercial terms, moderation cases, and unpublished strategy never enter the repository, browser notes, examples, or external web tools.

## Curriculum

The curriculum contains exactly 11 sequential lessons and 30 daily sprints:

1. Days 1–2 — global social-entertainment category and MICO WORLD portfolio.
2. Days 3–5 — SUGO product journey and user/host/room/guild/agent ecosystem.
3. Days 6–8 — activation, relationship retention, room liquidity, monetization, and metric definitions.
4. Days 9–11 — Egypt digital market, city/gender/channel segmentation, and competitor hypotheses.
5. Days 12–14 — Egyptian Arabic, MSA, English, Arabizi, RTL, cultural calendar, and localization QA.
6. Days 15–17 — acquisition, first-room experience, meaningful interaction, retention, and reactivation.
7. Days 18–20 — host/room/guild supply recruitment, scheduling, quality, and cold start.
8. Days 21–22 — payer segmentation, virtual gifts, payments, refunds, chargebacks, and collusion signals.
9. Days 23–25 — child safety, harassment, scams, exploitation, privacy, moderation, appeals, incidents, and Egypt regulatory review.
10. Days 26–27 — RACI, weekly business reviews, metric contracts, dashboard briefs, and practical SQL literacy.
11. Days 28–30 — operating baseline, three priorities, guardrails, dependencies, and Day 31–90 plan.

Review gates occur on Days 8, 17, 27, and 30. Every lesson contributes a named artifact to one accumulating evidence pack. Every conclusion is labeled as public-source verified, internal-data verified, interview-cross-checked, or operating hypothesis.

## Learning experience

- Pages: home, roadmap, evidence projects, source register, lesson detail, and directed 404.
- Lessons: context, mental model, dated evidence, explicit caveats, SUGO/Egypt application, daily sprint table, interview or analysis task, artifact template, quiz, local note, completion toggle, and previous/next navigation.
- Daily cadence: 10 minutes concept, 15 minutes primary-source reading, 25 minutes field/data/interview action, 10 minutes quiz and evidence update. Interview days use 45 minutes interview and 15 minutes synthesis.
- Interview target: eight, minimum six, spanning product/data, Egypt operations, support or moderation, supply-side participants, and end users. Missing access remains an explicit evidence gap.
- The quiz is formative only. Answers are client-visible and never represent certification or regulatory approval.
- Browser progress is local-only and uses `egyptSocialOperationsProgress.v1`. The UI warns that notes must not contain company secrets, credentials, personal data, or identifiable cases.

## Content contracts

`LessonFrontmatter` keeps the existing identity, ordering, prerequisite, duration, outcome, and source concepts. Each source additionally carries:

- `verifiedAt`: ISO `YYYY-MM-DD` date.
- `jurisdiction`: `global`, `egypt`, `platform`, or `company-public`.
- `stability`: `stable`, `review-quarterly`, or `review-before-use`.
- `requiresInternalValidation`: boolean.

Each lesson also declares one or more artifacts with `title`, `description`, and `visibility`: `public-template`, `internal`, or `restricted`. Public pages describe the template and visibility but never render private content or a private link.

The build rejects duplicate IDs/orders, non-contiguous order, missing/later prerequisites, cycles, a lesson count other than 11, missing/orphan quizzes, duplicate quiz option values, empty answers, and answers outside the option set.

`ProgressState` remains version 1 and preserves completion, quiz score, notes, and timestamp. Missing, malformed, unknown-version, blocked-storage, and deleted-lesson data recover safely. Blocked persistent storage degrades to page-lifetime volatile state and displays the limitation.

## Source policy

Use original summaries and deep links, never large copied passages. The starting register includes MICO WORLD, SUGO store listing, Terms, Privacy Policy, Platform Guidelines, DataReportal Egypt 2026, Egypt PDPC, SCMR, the Presidency holiday calendar, and relevant Apple/Google platform policies.

All store metrics, rankings, payments, holidays, rates, and regulation are dated and marked for review before operational use. Legal, tax, privacy, employment, and regulatory material is educational, not professional advice. Conflicting public company/entity/store claims are diligence questions, not facts to normalize.

## Acceptance

- Static Astro + MDX, strict TypeScript, npm lockfile, Node 24 CI, Vitest, and Playwright.
- GitHub Pages base is `/egypt-social-operations/`; every internal URL uses the base-path helper.
- Desktop and mobile support 375, 768, 1024, and 1440 px with no page-level horizontal scrolling.
- All interactive targets are at least 44 px, keyboard focus is visible, body copy is at least 16 px/1.5 line height, normal text reaches 4.5:1 contrast, and reduced motion is honored.
- Tests prove course graph and quiz coverage, progress recovery and reset, home-to-lesson flow, notes/quiz/completion persistence, final project reachability, source metadata rendering, responsive navigation, 404 behavior, and no browser resource errors.
- `npm run verify` passes and the production build emits exactly 16 pages.

## Capstone

The final plan contains three priorities, owners, KPI definitions, baseline or baseline-request logic, target-setting method, experiment sequence, dependencies, budget assumptions, safety guardrails, stop conditions, and review cadence. It must not invent numerical targets when internal data is unavailable.

## Implementation status (updated 2026-09-15)

This specification remains the product and content contract. The repository now includes the documented public/unofficial positioning, static Astro metadata compatible with the configured site and base path, local-only progress disclosure, and a pinned Node 24 Pages workflow. These are implementation facts, not a deployment claim: publication is intentionally unverified in this workspace, and mutable source, market, payment, holiday, and regulatory facts still require human review before operational use.
