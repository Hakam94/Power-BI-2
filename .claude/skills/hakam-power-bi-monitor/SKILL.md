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

## What to look for each month

Most months are dominated by minor reporting/formatting GA items (chart padding, slicer colors, map layers). Those are real but rarely worth a full writeup on their own. Prioritize, in order:

1. **DAX/modeling changes** — new functions, UDF capabilities, calculated column/table behavior, Direct Lake modeling changes. Highest signal for "how should I write this differently now."
2. **Direct Lake capability changes** — Direct Lake is where Power BI's architecture is actively evolving; a capability that used to require Import mode becoming Direct-Lake-native is always worth covering.
3. **Copilot / AI features** — track them, but don't overstate GA vs. preview.
4. **Field parameters, RLS, report-authoring features that change a common pattern** — anything that replaces a multi-step workaround with one feature.
5. **Everything else** (formatting, visuals, connectors) — mention briefly in "what changed," skip the full before/after treatment unless something is genuinely novel.

## How to write the article

Follow the schema already established in `hakam-web/src/data/weeklyUpdates.js` (flat single-tool format, matching the `dax-user-defined-functions` and `power-bi-august-2026-monthly-update` entries):

- `slug`: `power-bi-<month>-<year>-monthly-update`
- `status`: always start as `'draft'` — this project never auto-publishes, see the editorial workflow comment at the top of weeklyUpdates.js
- `date`: the day this article is being written (same day the update was found, not the update's own publish date, unless they're the same day)
- `whatChanged`: lead with the DAX/modeling/Direct Lake item if there is one; list formatting/reporting items briefly after
- `codeBefore`/`codeAfter`: only include if there's a genuine rewrite to show — don't force one onto a formatting-only release
- `whyItMatters`: must answer "impact on analyst work" specifically — not just what the feature does, but what an analyst stops having to do, or starts being able to do, because of it
- `trendNote`: use for the monthly-cadence context note (see the August 2026 entry for the pattern), or for genuine editorial job-market observations — never fabricated statistics
- `references`: every source must be an official vendor page (community.fabric.microsoft.com, learn.microsoft.com, powerbi.microsoft.com) — secondary blogs can inform research but shouldn't be the citations

## Operationalizing this monthly

This skill is paired with a recurring Routine ("Power BI monthly update watch") that fires daily during the 15th–25th of each month, checks whether that month's Feature Summary has been published, and drafts the article same-day if so. See the Routine's own instructions (`trig_...`, named "Power BI monthly update watch") for the exact automated procedure — this file is the reference the Routine (and any manual research) should follow for sourcing discipline and article structure.

## Never do this

- Never invent a release date, feature name, or GA/preview status you haven't confirmed against an official source.
- Never publish (flip `status` to `'published'`) without Hakam's explicit approval — same rule as every other article on this site.
- Never let "the monthly cadence" become an excuse to file thin, formatting-only writeups just to hit a schedule — skip a month's dedicated Power BI article entirely if nothing analyst-relevant shipped, and say so if asked.
