# 🎬 Alex The Analyst Style YouTube Script — Part 6
**Channel**: `@HakamDataStudio`
**Video Length**: ~15 Minutes
**Series**: Coffee Shop Sales Analytics (Part 6)
**Style**: Alex The Analyst (Practical, Friendly, Relatable, Step-by-Step Data Analyst Voice)

---

## ⏱️ Video Chapters & Timestamp Overview
- **00:00 - 00:35**: 📊 Welcome & Real-World Analyst Problem (Manual Power BI & Paid AI Tools)
- **00:35 - 02:00**: ⚡ Why Antigravity AI for This Tutorial? (Free vs. Paid, Not "Better vs. Worse")
- **02:00 - 04:00**: 📌 Step 1: PBIP & TMDL Files — Why Text-Based Power BI Matters
- **04:00 - 08:00**: ⚙️ Step 2: Connecting the Official Power BI Modeling MCP Server (Local Folder + GitHub)
- **08:00 - 10:30**: 🧮 Step 3: Writing DAX Measures & TMDL Files with AI Prompts
- **10:30 - 13:15**: 📊 Step 4: Building Executive Dashboards, CFO Action Plans & What EBITDA Means Here
- **13:15 - 14:15**: 🎨 Step 5: Matching Channel Colors & Testing Live in Power BI Desktop
- **14:15 - 15:00**: 🚀 Step 6: Wrap Up, Free Code Downloads & Outro

---

## 🎬 Full Video Script (Alex The Analyst Style)

### 🚀 00:00 - 00:35 | 1% BI & AI Engineer Hook
> **[VISUAL ON SCREEN]**: High-voltage opening. No slow intro. Fast-paced visual cut of an AI prompt in VS Code generating a complete 3-page Power BI dashboard programmatically. Hakam looking directly into the camera with high energy and sharp confidence.
>
> **HAKAM (SPEAKER)**:
> *"What if you could build a complete, production-ready Power BI report—with formatted DAX measures, CFO financial models, and multi-page executive dashboards—without touching a single visual button in Power BI Desktop?
>
> Most data analysts are trapped in legacy workflows—wasting hours on manual drag-and-drop formatting, debugging DAX formulas, and praying their `.pbix` file doesn't corrupt. But modern 1% BI engineers build differently.
>
> In this video, we're connecting an AI coding agent directly to your Power BI semantic model using Microsoft's own **Power BI Modeling MCP server**. You'll see step-by-step how to generate clean TMDL measures, build a CFO action plan straight from the data, and understand exactly how every number on that dashboard is calculated—completely free to follow along.
>
> All template files, prompts, and dataset code are linked in the description below.
>
> If you're ready to elevate your BI engineering skills to the 1% level, hit **Like**, **Subscribe** to `@HakamDataStudio`, and let's jump straight into the code!"*

---

### ⚡ 00:35 - 02:00 | Why Antigravity AI for This Tutorial?
> **[VISUAL ON SCREEN]**: Clean graphic showing Claude Code, OpenAI Codex, and Antigravity AI as three equal boxes, each with an arrow pointing to the same "Power BI Modeling MCP Server" box — making clear it's one shared server, three different front doors.
>
> **SPEAKER**:
> *"Quick and honest note before we set up MCP: Claude Code, OpenAI Codex, and Antigravity AI can all connect to the exact same official Microsoft MCP server we're using today. This isn't about one tool being smarter than another—they're all capable here.
>
> The reason I'm using **Antigravity AI** for this specific tutorial comes down to two practical things:
>
> 1. **It's free to run with no token metering**, so if you're following along step-by-step, you won't hit a paywall halfway through.
> 2. **It ships with a local terminal and file system agent already built in**, so wiring an MCP server into its config is a two-minute edit—no extra installs.
>
> If you already pay for Claude Code or Codex and prefer them, everything in this tutorial works the same way there—just swap the connection step, which I'll show you in a second."*

---

### 📌 02:00 - 04:00 | Step 1: PBIP & TMDL Files — Why Text-Based Power BI Matters
> **[VISUAL ON SCREEN]**: Side-by-side comparison of `.pbix` (binary blob icon) vs `.pbip` folder structure with `.pbir` and `.tmdl` files.
>
> **SPEAKER**:
> *"Before we write any code, let's talk about how Power BI Developer Mode (`.pbip`) works, because this is huge for data team workflows.
>
> Traditionally, Power BI uses `.pbix` files. But `.pbix` files are binary blobs—if an AI touches them, they can easily get corrupted.
>
> With `.pbip`, Power BI breaks your project down into clean, human-readable text files:
> - **PBIR Files (`.pbir`)**: These store the layout and visuals for your report pages in JSON format.
> - **TMDL Files (`.tmdl`)**: That stands for Tabular Model Definition Language, and it stores your tables, columns, and DAX measures.
>
> Because these are text files, AI models can read your schema, write DAX formulas, and construct report pages without breaking anything—and just as importantly, we can track every change in Git."*

---

### ⚙️ 04:00 - 08:00 | Step 2: Connecting the Official Power BI Modeling MCP Server
> **[VISUAL ON SCREEN]**: Terminal window running the real `npx` command, then Antigravity's `mcp_config.json` being edited, then a File Explorer window showing the local cloned repo folder with the `.SemanticModel/definition` path highlighted.
>
> **SPEAKER**:
> *"Here's the part people ask me about the most, so let's be precise about it. We are NOT downloading some custom executable. We're using **Microsoft's own official Power BI Modeling MCP server**, and it runs with one command. You'll need Node.js 20 or later installed first.
>
> **Step 1**: Open a terminal in your project folder and run:
> 💬 `npx -y @microsoft/powerbi-modeling-mcp@latest --start --readonly`
>
> That `--readonly` flag matters—we start every session in read-only mode so the AI can inspect the model but can't accidentally change anything yet.
>
> **Step 2**: Open Antigravity's `mcp_config.json` and register the same server:
> ```json
> {
>   "mcpServers": {
>     "powerbi-modeling": {
>       "command": "npx",
>       "args": [
>         "-y",
>         "@microsoft/powerbi-modeling-mcp@latest",
>         "--start",
>         "--readonly"
>       ]
>     }
>   }
> }
> ```
> Restart Antigravity and confirm `powerbi-modeling` shows up in its MCP server list.
>
> **Step 3**: Now, the question I get a lot—does this connect to GitHub, or to a local folder? **It connects to your local folder.** Specifically, the `.SemanticModel/definition` folder inside your local clone of the repo. GitHub isn't something the MCP server talks to directly—GitHub is the layer we put ON TOP of that same local folder using normal Git: you create a branch, let the agent propose a change, you review the diff, and only then commit and open a pull request. Local folder for the live connection, GitHub for version control and review.
>
> **Step 4**: Point the agent at that folder with a simple, safe prompt:
> 💬 *'Open this Power BI semantic model in read-only mode: C:/path/to/Cafe-part 6.SemanticModel/definition. List tables, relationships, and measures. Do not make changes.'*
>
> Only once you've reviewed what it found do you drop `--readonly` for the specific change you're approving."*

---

### 🧮 08:00 - 10:30 | Step 3: Writing DAX Measures & TMDL Files with AI Prompts
> **[VISUAL ON SCREEN]**: Typing prompt into chat window, watching `Sheet1.tmdl` populate with DAX code live.
>
> **SPEAKER**:
> *"Now for the fun part—let's ask the AI to write our DAX measures for us!
>
> Here is the exact prompt we use:
> 💬 *'In Sheet1.tmdl, create DAX measures for Total Revenue, Total Profit, and Profit Margin % formatted as 0.00%. Save all files strictly in UTF-8 without BOM.'*
>
> Take a look at how fast the agent updates our `Sheet1.tmdl` file:
> ```dax
> measure 'Total Revenue' = SUM(Sheet1[Revenue])
>   formatString: $#,0.00
>
> measure Profit = SUM(Sheet1[Revenue]) - SUM(Sheet1[Cost])
>
> measure 'Profit Margin %' = DIVIDE([Profit], SUM(Sheet1[Revenue]), 0)
>   formatString: 0.00%
> ```
> Pro tip for data analysts: Always specify **UTF-8 without BOM** in your prompts so Power BI reads the generated text files smoothly without encoding errors."*

---

### 📊 10:30 - 13:15 | Step 4: Executive Dashboards, CFO Action Plans & What EBITDA Actually Means Here
> **[VISUAL ON SCREEN]**: Displaying Page 2 (`cfo_executive_insights`) KPI cards and Page 3 (`executive_mcp_dashboard`) 6-chart grid layout. Cut to `Sheet1.tmdl` scrolled to the new `EBITDA` measure.
>
> **SPEAKER**:
> *"Before I show you the CFO page, let's actually define the term on it, because I skipped this last time and got called out for it—fair. **EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization.** It's a way of looking at how profitable the core business is, before you factor in financing costs, tax structure, or how fast equipment is depreciating.
>
> Our coffee shop dataset doesn't have interest, tax, or depreciation columns—it's just revenue and cost per sale. So for this specific model, EBITDA and operating Profit are the same number, and I want that to be transparent instead of hand-wavy. Here's the actual measure I added to `Sheet1.tmdl`:
> ```dax
> measure EBITDA = [Profit]
>   formatString: $#,##0.00
> ```
> That's it—no hidden math, no invented multiplier. If your own dataset has interest or depreciation data, you'd subtract those out separately; ours doesn't, so EBITDA here simply IS Profit, computed live from Revenue minus Cost.
>
> Now let's prompt the AI to build our CFO action plan on top of that:
> 💬 *'Build Page 2 CFO Executive Action Plan featuring cards with data evidence on margin performance by drink type. Then build Page 3 Executive MCP Dashboard with a 6-KPI header and a 6-chart grid layout.'*
>
> Here's what's actually on the CFO page, reading straight off the cards:
> - **Action 1 — Scale High-Margin Espresso Sales**: Espresso holds the highest profit margin in the portfolio at 66.67%, followed by Cold Brew at 62.50%. Expanding that sales mix at Corporate Park and University will maximize net EBITDA—which, as we just showed, is our Profit measure.
> - **Action 2 — Premium Price Tiering**: Premium items average $5.70 in revenue per unit. Repricing Standard-tier items up by 5% yields an estimated $4.2K net monthly gain.
> - **Action 3 — RLS Store Cost Control**: The Store Managers row-level-security tables show Downtown has the highest operational cost, which is why we're proposing store-level monthly cost caps there specifically.
>
> Every number you just heard is either a live DAX measure or literally typed on the card you're looking at—nothing here is a made-up placeholder."*

---

### 🎨 13:15 - 14:15 | Step 5: Matching Channel Colors & Live Testing in Power BI Desktop
> **[VISUAL ON SCREEN]**: Double-clicking `Cafe-part 6.pbip`, showing Power BI Desktop opening smoothly with all 3 pages rendered in Cyber Slate and Neon Lime.
>
> **SPEAKER**:
> *"Now let's test our work live in Power BI Desktop!
>
> To make the report look clean and professional, we used our actual channel theme file, `Elektra873060879558101.json`: background Cyber Slate (`#0D2229`), primary accent Neon Lime (`#39FF14`), and secondary accent Electric Cyan (`#00D2FF`)—the exact three colors registered in that file, nothing approximated.
>
> When we double-click **`Cafe-part 6.pbip`**, Power BI Desktop opens up with Page 1, Page 2 CFO Action Plan, and Page 3 Executive Dashboard all fully rendered, perfectly formatted, and ready to present!"*

---

### 🚀 14:15 - 15:00 | Step 6: Wrap Up, Free Code Downloads & Outro
> **[VISUAL ON SCREEN]**: Alex/Hakam back on camera with full screen showing final 3-page dashboard project.
>
> **SPEAKER**:
> *"And that is how you connect an AI coding agent to a real Power BI semantic model—locally, safely, in read-only mode by default—and use it to write DAX, build a CFO action plan, and know exactly where every number on that dashboard came from.
>
> If you want to practice with this project, all the source files—including the dataset, TMDL measures, theme JSON, and prompt templates—are completely free and linked in the description below.
>
> If you found this video helpful, please hit that **Like** button, **Subscribe** to `@HakamDataStudio` for more data analyst tutorials, and leave a comment letting me know what topic you want to see next.
>
> Thank you so much for watching, and I'll see you in the next video!"*
