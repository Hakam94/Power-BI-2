---
name: hakam-power-bi-tracker
description: Checks for a new Microsoft Power BI monthly Feature Summary / "What's New" release, and if one has appeared since the last check, drafts a new entry in hakam-web's weeklyUpdates.js content system and notifies Hakam. Use when asked to "check for Power BI updates," "track the monthly Power BI release," or when this skill's own scheduled Routine fires. Also load this before writing ANY Power BI update/news content for the channel, to follow the established sourcing and schema rules.
---

# Hakam Power BI Update Tracker

## Why this exists

@HakamDataStudio's whole premise is "1% BI & AI Engineer" — staying ahead of
how the BI/data analyst role changes as Power BI ships new tooling. That only
works if the channel's content is actually current. This skill is the
mechanism: it watches for Microsoft's monthly Power BI release, and turns a
genuinely new one into a draft article using the site's existing content
system (`hakam-web/src/data/weeklyUpdates.js`) — never publishes on its own,
always drafts for Hakam's review.

## Release cadence — there is NO fixed calendar day

Verified directly against Microsoft's own posts, not assumed: the monthly
Power BI Feature Summary does **not** land on a fixed weekday or fixed date.
Evidence: the June 2026 summary published June 9 (a Tuesday); the August 2026
summary published around August 20 (a Thursday). Different week, different
weekday. Do not hardcode a publish day into the schedule — this skill (and
the Routine that fires it) works by **polling periodically**, not by
assuming a date.

## Where to check (in order)

1. **Web search first** (`WebSearch` tool) — direct `WebFetch` to
   `learn.microsoft.com`, `powerbi.microsoft.com`, and
   `community.fabric.microsoft.com` has been blocked by this environment's
   egress proxy in the past. `WebSearch` reliably surfaces current content
   from these domains even when direct fetch doesn't work — use it as the
   primary method, and only try `WebFetch` on a result URL as a bonus if it
   happens to work.
2. Search queries that work well:
   - `Power BI <Month> <Year> Feature Summary`
   - `site:community.fabric.microsoft.com Power BI Updates Blog <Month> <Year>`
3. The canonical index is
   `https://learn.microsoft.com/en-us/power-bi/fundamentals/whats-new` — the
   monthly posts themselves live on the Microsoft Fabric Community blog
   (`community.fabric.microsoft.com/blog/fbc_pbiupdatesblog/...`) and are
   mirrored to `powerbi.microsoft.com/en-us/blog/...`.

## Detecting whether something is actually NEW

Read `last-checked.json` in this skill's own folder first. It records the
title, date, and URL of the last monthly Feature Summary this skill already
turned into a draft (or confirmed as "nothing to do"). Compare the current
month's article against it:

- Different title/URL for the current or a later month than what's recorded
  → it's new, proceed to drafting.
- Same article, or no new monthly post has appeared yet for the current
  month → do nothing. Don't re-draft the same release, and don't draft a
  placeholder for a month that hasn't published yet.

After finishing a run (whether or not something new was found), update
`last-checked.json`: bump `last_checked_at` always, and update
`last_known_article` only when a new one was actually found and processed.

## Drafting the entry — follow the existing schema exactly

Open `hakam-web/src/data/weeklyUpdates.js` and read its header comment and
at least one existing entry before writing anything — the schema, tone, and
editorial workflow are already established there; don't invent a new format.

Non-negotiable rules, learned the hard way on this channel's other content:

- **`status: 'draft'`, always.** Never set `status: 'published'` or fill in
  a real `date` yourself — that's Hakam's call after he reviews it. Leave
  `date: ''` on a draft.
- **Every claim needs a real source.** No invented dollar figures, no
  invented percentages, no invented release dates. If you're not sure
  exactly when something shipped, say what you verified and don't guess
  the rest. Populate `references` with the actual URLs you checked.
- **`trendNote` is explicitly editorial**, not a scraped statistic — keep it
  labeled as Hakam's own read on what he's noticing, matching the existing
  entries' framing ("Editorial note, not a scraped statistic: ...").
- **`whyItMatters` should connect to this channel's actual angle**: AI
  coding agents (Antigravity/Claude Code/Codex) + Power BI Projects (PBIP)
  + MCP + DAX, not a generic "this is exciting" line.
- If the release is a multi-topic roundup rather than a single Power BI
  item, use the `toolSections` array format (see the
  `weekly-roundup-2026-08-18` entry) instead of the flat single-tool format.
- Give it a clear `slug` (kebab-case, descriptive, no date needed if the
  title is specific enough) and appropriate `tags`.

## After drafting

1. Add the new object to the `weeklyUpdates` array in
   `hakam-web/src/data/weeklyUpdates.js` (append before the closing `];`).
2. Run `node --check hakam-web/src/data/weeklyUpdates.js` to confirm no
   syntax errors before committing.
3. Update `last-checked.json` in this skill's folder.
4. Commit both files together with a clear message, push to the current
   branch (or open a PR if that's this session's normal workflow).
5. Tell Hakam directly (chat message, or push notification if this run was
   triggered by the scheduled Routine): what shipped, in 2-3 sentences, and
   that a draft is ready for review — draft article pages render at
   `/weekly/<slug>` with a visible "Draft — Pending Review" banner even
   before publishing, so he can just open the link.

## If nothing new was found

Say so briefly (or, if this is a scheduled/background run with nothing to
report, do nothing loudly — no need to notify Hakam every single check just
to say "still nothing"). Update `last_checked_at` in the state file either
way so there's a record this check actually ran.
