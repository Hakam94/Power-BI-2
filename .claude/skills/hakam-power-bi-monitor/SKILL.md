---
name: hakam-power-bi-monitor
description: Specialized tracking of Power BI's monthly feature releases for the Hakam Data Studio website — use when checking for or writing about a new Power BI monthly update, when asked "what changed in Power BI this month," or when maintaining the site's Power BI monitoring cadence. Also covers what "best practice" means for Power BI specifically (DAX, semantic modeling, Direct Lake, report design) so analysts don't fall behind and become legacy on outdated patterns.
---

# Hakam Power BI Monitor

Why this exists: Power BI changes fast enough, and DAX/modeling "best practice" shifts often enough, that an analyst who isn't actively tracking monthly releases quietly becomes legacy — writing DAX the old way, missing a feature that would have saved hours, or giving advice that stopped being true two releases ago. This skill is what keeps the Hakam Data Studio Weekly Best Practices feature (and Hakam's own Power BI advice) current specifically on Power BI, on the same day a release lands, not a week later.

## The release cadence

Power BI does not publish an officially documented fixed release day. Empirically, based on actual publish dates checked directly against the official Microsoft Fabric Community blog:

- March 2026 — published March 18
- May 2026 — published May 20
- August 2026 — published August 20

Pattern: **roughly the third week of the month, clustering around the 18th–20th.** Treat this as a checking window, not a guarantee — verify the actual date each month rather than assuming.

## Official sources — check these first, in this order

1. **Microsoft Fabric Community — Power BI Updates Blog** (primary, fastest): `https://community.fabric.microsoft.com/t5/Power-BI-Updates-Blog/` — search for `"Power BI <Month> <Year> Feature Summary"`. This is where the monthly Feature Summary actually gets published first.
2. **Power BI "What's New"** (Microsoft Learn, official): `https://learn.microsoft.com/en-us/power-bi/fundamentals/whats-new` — official landing page, sometimes lags the Community blog post by a day or more.
3. **Previous monthly updates archive** (Microsoft Learn, official): `https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-latest-update-archive` — for cross-checking historical release dates.

Never trust a secondary blog's claimed date without cross-checking against one of the three above — post IDs and "X ago" phrasing from search summaries are easy to misread across years (a mistake already made and caught once in this project — see weeklyUpdates.js's DAX UDF entry history).

## Read the WHOLE month before writing anything

This is the step that was skipped once and produced a thin article (August 2026, first draft) — caught and corrected, don't repeat it. Before writing a single word:

1. Read the full official Feature Summary, not just the first search-engine summary of it. Run multiple searches if needed — one general search rarely surfaces everything; search specifically for each area (DAX/modeling, developer tools/VS Code/PBIP, visuals, connectors, Copilot/AI, mobile, embedded) to see what that month actually shipped in each.
2. Enumerate every notable item before deciding what to cover — don't stop at the first interesting thing found. The August 2026 release had three separately-significant items (a VS Code/PBIP developer-experience change, a Direct Lake modeling change, and a long-requested matrix visual fix); a shallow pass only found one of them.
3. Check the Fabric/Power BI Ideas forum angle for visual/UX features — a feature with thousands of community votes behind it is worth saying so explicitly, it's part of the story, not a footnote.

## What to look for each month

Most months are dominated by minor reporting/formatting GA items (chart padding, slicer colors, map layers). Those are real but rarely worth a full writeup on their own. Prioritize, in order:

1. **DAX/modeling changes** — new functions, UDF capabilities, calculated column/table behavior, Direct Lake modeling changes. Highest signal for "how should I write this differently now."
2. **Direct Lake capability changes** — Direct Lake is where Power BI's architecture is actively evolving; a capability that used to require Import mode becoming Direct-Lake-native is always worth covering.
3. **Developer experience / tooling changes** — PBIP, TMDL, VS Code integration, source control workflow, anything that changes how analysts actually build and ship reports day to day, not just what the reports can show.
4. **Copilot / AI features** — track them, but don't overstate GA vs. preview.
5. **Long-requested visual/report-authoring fixes** — check whether it has real community demand behind it (Ideas forum votes); a heavily-requested fix finally shipping is a legitimate lead item, not filler.
6. **Field parameters, RLS, and other pattern-changing features** — anything that replaces a multi-step workaround with one feature.
7. **Everything else** (routine formatting, minor connector updates) — mention briefly in a section's `whatChanged` if relevant, skip a dedicated section for it.

If a month turns up two or three items from tiers 1–5, they each deserve their own full section — don't compress a three-story month into one lead item because that's what the first search happened to surface.

## How to write the article

Two schema shapes are available in `hakam-web/src/data/weeklyUpdates.js` — pick based on how much the month actually shipped:

- **One significant item this month** → flat single-tool format (`whatChanged`/`codeBefore`/`codeAfter`/`whyItMatters` directly on the entry). See `dax-user-defined-functions` for the pattern.
- **Multiple significant items this month** (the common case for a real month) → `toolSections[]`, one section per feature, each with its own `headline`, `whatChanged`, `codeBefore`/`codeAfter` (only if there's a genuine rewrite — don't force one onto a workflow or UX change), and `whyItMatters`. See `power-bi-august-2026-monthly-update` for the pattern — three sections (Developer Experience, Direct Lake, Data Visualization), each with real depth, none of them padding.

Regardless of shape:

- `slug`: `power-bi-<month>-<year>-monthly-update`
- `status`: always start as `'draft'` — this project never auto-publishes, see the editorial workflow comment at the top of weeklyUpdates.js
- `date`: the day this article is being written (same day the update was found, not the update's own publish date, unless they're the same day)
- `whyItMatters` (per section): must answer "impact on analyst work" specifically — not just what the feature does, but what an analyst stops having to do, or starts being able to do, because of it
- `finalThought`: **required** on every monthly Power BI article — a closing editorial synthesis paragraph, not a summary restatement. Say something with a point of view: how do this month's changes fit together, what's the actual signal versus noise, what should a reader do differently starting Monday. This is the piece that makes it read like an analyst's own take (SQLBI, HowToPowerBI) rather than a changelog rewrite — write it that way: precise, confident, no filler, and unmistakably Hakam Data Studio underneath (practical, career-and-skills focused, speaks to a working analyst, no academic throat-clearing).
- `references`: every source must be an official vendor page (community.fabric.microsoft.com, learn.microsoft.com, powerbi.microsoft.com) — secondary blogs can inform research but shouldn't be the citations
- Don't use `trendNote` for meta-commentary about this site's own publishing cadence (readers don't need to know how the sausage gets made) — reserve it for genuine editorial trend content the reader benefits from, same as any other weekly entry.

## Operationalizing this monthly

This skill is paired with a recurring Routine ("Power BI monthly update watch") that fires daily during the 15th–25th of each month, checks whether that month's Feature Summary has been published, and drafts the article same-day if so. See the Routine's own instructions (`trig_...`, named "Power BI monthly update watch") for the exact automated procedure — this file is the reference the Routine (and any manual research) should follow for sourcing discipline and article structure.

## Never do this

- Never invent a release date, feature name, or GA/preview status you haven't confirmed against an official source.
- Never publish (flip `status` to `'published'`) without Hakam's explicit approval — same rule as every other article on this site.
- Never let "the monthly cadence" become an excuse to file thin, formatting-only writeups just to hit a schedule — skip a month's dedicated Power BI article entirely if nothing analyst-relevant shipped, and say so if asked.
