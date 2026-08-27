# 📝 YouTube SEO Title + Description — Part 6

**Published Title**: Testing ALL AI Agents in Power BI: Claude Code vs Antigravity vs Codex vs Copilot (MCP Setup)
**Channel**: @HakamDataStudio
**Video**: https://youtu.be/traamnTfixY (1:04:47)

Rebuilt from the **actual full transcript** of the published video (pulled directly from
YouTube's transcript panel, 446 segments, 0:00–1:04:47). This supersedes the earlier
drafts in this file, which were based on the pre-production script — the final edit is a
much longer, rawer, comparison-style video, not the ~15-minute polished tutorial the
script implied.

---

## What the video actually is

A live, largely unscripted test of 4 AI coding agents (Claude Code, Antigravity, OpenAI
Codex, VS Code Copilot) connected to a real Power BI semantic model via Microsoft's
Power BI Modeling MCP server. Highlights from the real transcript:
- Manual MCP server config walkthrough (editing the client config JSON directly)
- Applying a saved Hakam Data Studio brand "skill" to re-theme the report live
- A live, unscripted attempt to get an agent to build a SAP ACDOCA-style Universal
  Journal table (GL accounts, cost centers, EBITDA/EBIT/OPEX measures)
- Real bugs: MCP disconnects, a grand-total filter-context bug in a month-over-month
  growth measure that only worked at branch level, not at the total level
- A mid-video pivot to Codex, which diagnoses and fixes the filter bug live
- Closing comparison + a direct ask to viewers: which agent do you think is strongest?

---

## Best Description (copy-ready)

```
I connected four different AI coding agents — Claude Code, Antigravity, OpenAI Codex, and VS Code Copilot — directly to a real, live Power BI semantic model using Microsoft's official Power BI Modeling MCP server, and tested which one actually holds up when things go wrong.

This isn't a polished demo. You'll watch the real manual MCP server setup (including the config file edits nobody shows you), a live and unscripted attempt to get an AI agent to build a SAP ACDOCA-style financial table with GL accounts and EBITDA/EBIT measures from scratch, and the actual bugs that came up — a broken grand-total filter context, MCP disconnects, and a mid-video switch to Codex to actually fix it.

▶ Watch: https://youtu.be/traamnTfixY

⏱ Chapters:
00:00 - Hook: Can AI Build Your Power BI Dashboard Alone?
00:30 - Welcome Back: What Changed Since Part 5
02:06 - Meet the Contenders: Claude Code vs Antigravity vs Codex vs Copilot
04:03 - Downloading & Setting Up Claude Code and Antigravity
08:35 - PBIX vs PBIP: Why AI Needs the Project File Format
10:43 - Applying the Hakam Data Studio Brand Theme Live with AI
13:12 - What Is Power BI MCP? Manual Server Config Walkthrough
20:06 - Verifying the Live MCP Connection to Power BI Desktop
22:42 - LIVE & UNSCRIPTED: Asking AI to Build a SAP ACDOCA-Style Table
34:26 - Reviewing the AI-Generated Financial Model & DAX Measures
43:53 - Live Debugging: Month-over-Month Growth with Red/Green Indicators
45:29 - Switching Tools: Bringing In Codex to Test the Same Problem
48:45 - Chasing the Grand-Total Filter Bug, Branch by Branch
59:24 - Codex Finds the Real Root Cause and Fixes It Live
1:03:23 - Final Verdict: Which AI Agent Is Actually Best for Power BI?

✅ Power BI Modeling MCP Server — Microsoft's official server, tested live with Claude Code, Antigravity, and Codex
✅ Full manual setup shown — including the config file path most tutorials skip
✅ Live, unscripted build — a SAP ACDOCA-style Universal Journal table (GL accounts, cost centers, EBITDA, EBIT, OPEX) built from scratch on camera
✅ Real bugs, real fixes — a grand-total filter context bug tracked down and solved live, not edited out
✅ Head-to-head comparison — cost, connection reliability, and how well each agent understood the existing semantic model
✅ Brand theming via AI — applying a saved design-system "skill" to restyle the whole report automatically
✅ Git-based workflow — every model change is a reviewable text diff, not a binary .pbix blob

📂 Free Project Files (Dataset, ACDOCA Table, TMDL Measures, Theme JSON, PBIP Report):
https://github.com/Hakam94/Power-BI-2/tree/main/part-6

📌 Power BI Modeling MCP Server (official Microsoft repo):
https://github.com/microsoft/powerbi-modeling-mcp

Which AI agent do you think is strongest for Power BI right now? Drop a comment and let me know — and if this helped, hit Like and Subscribe to @HakamDataStudio for more real, unscripted BI + AI workflows.

🔗 More from Hakam Data Studio:
YouTube: https://www.youtube.com/@HakamDataStudio
GitHub: https://github.com/Hakam94
LinkedIn: https://www.linkedin.com/in/hakam-abushanab-a99523b6
Instagram: https://www.instagram.com/hakam_data_studio

#PowerBI #AI #MCP #ClaudeCode #Antigravity #Codex #Copilot #SAP #ACDOCA #DAX #ModelContextProtocol #PowerBIDesktop #DataAnalyst #BusinessIntelligence #TMDL
```

---

## Best Timestamps (chapters)

| Time | Chapter |
|---|---|
| 00:00 | Hook: Can AI Build Your Power BI Dashboard Alone? |
| 00:30 | Welcome Back: What Changed Since Part 5 |
| 02:06 | Meet the Contenders: Claude Code vs Antigravity vs Codex vs Copilot |
| 04:03 | Downloading & Setting Up Claude Code and Antigravity |
| 08:35 | PBIX vs PBIP: Why AI Needs the Project File Format |
| 10:43 | Applying the Hakam Data Studio Brand Theme Live with AI |
| 13:12 | What Is Power BI MCP? Manual Server Config Walkthrough |
| 20:06 | Verifying the Live MCP Connection to Power BI Desktop |
| 22:42 | LIVE & UNSCRIPTED: Asking AI to Build a SAP ACDOCA-Style Table |
| 34:26 | Reviewing the AI-Generated Financial Model & DAX Measures |
| 43:53 | Live Debugging: Month-over-Month Growth with Red/Green Indicators |
| 45:29 | Switching Tools: Bringing In Codex to Test the Same Problem |
| 48:45 | Chasing the Grand-Total Filter Bug, Branch by Branch |
| 59:24 | Codex Finds the Real Root Cause and Fixes It Live |
| 1:03:23 | Final Verdict: Which AI Agent Is Actually Best for Power BI? |

All ascending from 0:00, spaced well over YouTube's 10-second minimum, so they'll register as auto-chapters when pasted into the description.

---

## SEO Notes

- **Title is already published and strong** — "Testing ALL AI Agents in Power BI: X vs Y vs Z vs W (MCP Setup)" is a comparison-format title, which reliably outperforms single-tool tutorial titles for CTR, and it accurately reflects the content (unlike the earlier "SAP ACDOCA P&L" single-topic titles drafted from the script). No change recommended.
- **Description now matches what's actually said** — previous drafts oversold a polished SAP financial dashboard; the real video is an honest, bug-and-all comparison, so the copy leans into that authenticity ("real bugs, real fixes") rather than claiming a finished deliverable.
- **Chapters** are placed at genuine topic-shift points in the transcript, not evenly-spaced guesses — e.g. 45:29 marks the actual tool switch to Codex, and 59:24 is where Codex diagnoses the root cause on camera.
- Hashtags updated to lead with `#PowerBI #AI #MCP` plus each tool name (`#ClaudeCode #Antigravity #Codex #Copilot`) since the video's real differentiator is the head-to-head comparison, not the ACDOCA table alone.
