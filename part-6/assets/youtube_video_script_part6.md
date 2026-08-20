# 🎬 Alex The Analyst Style YouTube Script — Part 6
**Channel**: `@HakamDataStudio`
**Video Length**: ~16-18 Minutes
**Series**: Coffee Shop Sales Analytics (Part 6)
**Style**: Alex The Analyst (Practical, Friendly, Relatable, Step-by-Step Data Analyst Voice)

> **Note on timestamps below**: these are estimates based on script length at a normal speaking pace, not measured from a real recording. Re-time the chapter markers against your actual voiceover once it's recorded — don't publish these as final.

---

## ⏱️ Video Chapters & Timestamp Overview (estimates)
- **00:00 - 00:20**: 🚀 Hook (short, no "welcome")
- **00:20 - 00:25**: 🎬 Logo Intro (visual only, no voiceover)
- **00:25 - 03:00**: ⚡ Why Antigravity AI for This Tutorial? (elaborated: shared MCP server, CLI vs IDE, why IDE for this tutorial)
- **03:00 - 05:00**: 📌 Step 1: PBIP & TMDL Files — Why Text-Based Power BI Matters
- **05:00 - 10:00**: ⚙️ Step 2: Connecting the Official Power BI Modeling MCP Server (terminal explained, npx explained, verified per tool: Antigravity IDE / Claude Code / Codex, local folder vs GitHub)
- **10:00 - 12:30**: 🧮 Step 3: Writing DAX Measures & TMDL Files with AI Prompts
- **12:30 - 14:00**: 📊 Step 4a: What We Already Built — CFO Action Plans & What EBITDA Means Here
- **14:00 - 16:30**: 🔴 Step 4b: LIVE & UNSCRIPTED — Building Something New On Camera
- **16:30 - 17:30**: 🎨 Step 5: Matching Channel Colors & Testing Live in Power BI Desktop
- **17:30 - 18:15**: 🚀 Step 6: Wrap Up, Free Code Downloads & Outro

---

## 🎬 Full Video Script (Alex The Analyst Style)

### 🚀 00:00 - 00:20 | Hook (short, punchy, no "welcome")
> **[VISUAL ON SCREEN]**: Fast cut of an AI prompt in an IDE generating a full Power BI dashboard live. Hakam direct-to-camera, high energy.
>
> **HAKAM (SPEAKER)**:
> *"What if an AI agent could write your DAX, build your executive dashboard, and explain every number on it—without you touching a single button in Power BI Desktop? Today, I'm connecting a free AI coding agent straight to a real Power BI model. Let's go."*

---

### 🎬 00:20 - 00:25 | Logo Intro
> **[VISUAL ON SCREEN — NO VOICEOVER]**: 5-second animated Hakam Data Studio logo sting, brand colors (Cyber Slate background, Neon Lime accent).

---

### ⚡ 00:25 - 03:00 | Why Antigravity AI for This Tutorial?
> **[VISUAL ON SCREEN]**: Diagram — Claude Code, OpenAI Codex, and Antigravity AI as three boxes, each with an arrow into the same "Power BI Modeling MCP Server" box. Then a second diagram: "Antigravity" splitting into "Antigravity CLI" (terminal icon) and "Antigravity IDE" (editor window icon), both pointing to one shared "Antigravity Agent" box.
>
> **SPEAKER**:
> *"Before we touch any code, two quick clarifications—because I got these wrong last time and I'd rather slow down here than confuse you later.
>
> First: Claude Code, OpenAI Codex, and Antigravity AI can all connect to the exact same official Microsoft MCP server we're using today. This isn't about one being smarter than the others. I'm using Antigravity for this tutorial because it's free to run with no token metering, so if you're following along step-by-step, you won't hit a paywall halfway through. If you already pay for Claude Code or Codex, everything here works the same way—I'll show you that exact connection command for each one in a minute.
>
> Second: if you went looking for 'Antigravity' inside your normal VS Code and couldn't find it, that's not a mistake on your end. Antigravity isn't a VS Code extension you install into an existing editor—it's a separate standalone application, built as its own fork of VS Code's codebase, similar to how tools like Cursor work. That's also why, when you install it, you're sometimes prompted to grab the IDE as a separate download: Google actually ships Antigravity as a few different surfaces—an Antigravity CLI, which is a fast, terminal-only agent for people who live in the command line, and the Antigravity IDE, which is the full visual editor where you can see the agent's code changes and accept or reject them line by line. They both run the same underlying agent and share the same settings—it's purely a workflow choice.
>
> For this tutorial specifically, I'm using the IDE, not the CLI, because you need to actually see the TMDL file changing on screen to follow along—that's much harder to show clearly in a plain terminal window."*

---

### 📌 03:00 - 05:00 | Step 1: PBIP & TMDL Files — Why Text-Based Power BI Matters
> **[VISUAL ON SCREEN]**: Side-by-side comparison of `.pbix` (binary blob icon) vs `.pbip` folder structure with `.pbir` and `.tmdl` files.
>
> **SPEAKER**:
> *"Now let's talk about how Power BI Developer Mode—`.pbip`—works, because this matters for everything we do next.
>
> Traditionally, Power BI uses `.pbix` files. But `.pbix` files are binary blobs—if an AI touches them directly, they can easily get corrupted.
>
> With `.pbip`, Power BI breaks your project down into clean, human-readable text files:
> - **PBIR Files (`.pbir`)**: layout and visuals in JSON.
> - **TMDL Files (`.tmdl`)**: Tabular Model Definition Language—tables, columns, and DAX measures.
>
> Because these are plain text files, AI agents can read your schema, write DAX, and construct report pages without breaking anything—and we can track every change in Git, which we'll use in a minute.
>
> One more thing before we move on: everything in this tutorial works two ways. You can start completely from scratch—an empty `.pbip` folder, and have the AI scaffold your tables, measures, and pages from zero. Or, like most of you watching, you can point this at a Power BI report you already built months ago and use it to extend or fix that existing model instead. Same MCP connection, same workflow, either direction. We're doing the second one today, since we already have a report to build on."*

---

### ⚙️ 05:00 - 10:00 | Step 2: Connecting the Official Power BI Modeling MCP Server
> **[VISUAL ON SCREEN]**: Antigravity IDE's built-in terminal panel opening, the npx command running, then Settings → Customizations → "Open MCP Config" being clicked, then a File Explorer window showing the local cloned repo with the `.SemanticModel/definition` path highlighted.
>
> **SPEAKER**:
> *"This is the section people ask me about the most, so let's go slower and be precise.
>
> **What's a terminal?** It's just a text window where you type commands instead of clicking buttons. You don't need a special one—Antigravity IDE has one built in, VS Code has one built in, and Windows PowerShell works too. I'll use Antigravity's built-in terminal since that's the tool we're setting up.
>
> **What's `npx`?** It's a small command that ships automatically with Node.js. When you type `npx` followed by a package name, it downloads that package temporarily and runs it—you're not permanently installing anything on your machine. So this next command isn't installing software, it's just asking npx to fetch Microsoft's official MCP server and start it, for this session only.
>
> **Step 1**: Make sure Node.js 20 or later is installed. Then open a terminal in your project folder and run:
> 💬 `npx -y @microsoft/powerbi-modeling-mcp@latest --start --readonly`
>
> That `--readonly` flag matters—we start every session in read-only mode, so the AI can inspect the model but can't accidentally change anything yet.
>
> **Step 2, in Antigravity IDE specifically**: go to Settings, click the Customizations tab, and click 'Open MCP Config'—that opens `mcp_config.json` directly. Paste in this:
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
> Save the file, restart Antigravity, then open the '...' dropdown at the top of the agent panel, click 'Manage MCP Servers,' and confirm `powerbi-modeling` is listed there. If it's not showing, double-check your JSON syntax and restart again.
>
> **If you're in Claude Code instead**, the equivalent is one line in its own terminal:
> 💬 `claude mcp add powerbi-modeling -- npx -y @microsoft/powerbi-modeling-mcp@latest --start --readonly`
> Then verify it with:
> 💬 `claude mcp list`
> —or type `/mcp` inside a Claude Code session to see connected servers and their status.
>
> **If you're in Codex**, it's almost identical:
> 💬 `codex mcp add powerbi-modeling -- npx -y @microsoft/powerbi-modeling-mcp@latest --start --readonly`
> Then verify with:
> 💬 `codex mcp list`
> Restart the client after adding the server, in all three cases.
>
> **Now, the question I get the most: does this connect to GitHub, or to a local folder?** It connects to your **local folder**—specifically the `.SemanticModel/definition` folder inside your local clone of the repo. GitHub isn't something the MCP server talks to directly. GitHub is the layer we put on top of that same local folder using normal Git: you create a branch, let the agent propose a change, you review the diff, and only then commit and open a pull request. Local folder for the live connection, GitHub for version control and review.
>
> **Step 3**: Point the agent at that folder with a simple, safe prompt:
> 💬 *'Open this Power BI semantic model in read-only mode: C:/path/to/Cafe-part 6.SemanticModel/definition. List tables, relationships, and measures. Do not make changes.'*
>
> Only once you've reviewed what it found do you drop `--readonly` for the specific change you're approving."*

---

### 🧮 10:00 - 12:30 | Step 3: Writing DAX Measures & TMDL Files with AI Prompts
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
> Pro tip for data analysts: Always specify **UTF-8 without BOM** in your prompts—Power BI Desktop and Fabric will throw parse errors on TMDL files saved with a BOM prefix, so this one small instruction saves you a confusing failure later."*

---

### 📊 12:30 - 14:00 | Step 4a: What We Already Built — CFO Action Plans & What EBITDA Actually Means Here
> **[VISUAL ON SCREEN]**: Displaying Page 2 (`cfo_executive_insights`) KPI cards and Page 3 (`executive_mcp_dashboard`) 6-chart grid layout. Cut to `Sheet1.tmdl` scrolled to the `EBITDA` measure.
>
> **SPEAKER**:
> *"Quick honesty check before I show you this page: everything you're about to see, I built ahead of time with the same AI workflow we just walked through—I'm not going to make you sit through fifteen minutes of me typing prompts and waiting for pages to render. This is the result.
>
> First, let's define the term on the CFO page, because I skipped this last time and got called out for it—fair. **EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization.** It's a way of looking at how profitable the core business is, before you factor in financing costs, tax structure, or how fast equipment is depreciating.
>
> Our coffee shop dataset doesn't have interest, tax, or depreciation columns—it's just revenue and cost per sale. So for this specific model, EBITDA and operating Profit are the same number, and I want that to be transparent instead of hand-wavy. Here's the actual measure I added to `Sheet1.tmdl`:
> ```dax
> measure EBITDA = [Profit]
>   formatString: $#,##0.00
> ```
> That's it—no hidden math, no invented multiplier.
>
> Here's what's actually on the CFO page, reading straight off the cards:
> - **Action 1 — Scale High-Margin Espresso Sales**: Espresso holds the highest profit margin in the portfolio at 66.67%, followed by Cold Brew at 62.50%. Expanding that sales mix at Corporate Park and University will maximize net EBITDA—which, as we just showed, is our Profit measure.
> - **Action 2 — Premium Price Tiering**: Premium items average $5.70 in revenue per unit. Repricing Standard-tier items up by 5% yields an estimated $4.2K net monthly gain.
> - **Action 3 — RLS Store Cost Control**: The Store Managers row-level-security tables show Downtown has the highest operational cost, which is why we're proposing store-level monthly cost caps there specifically.
>
> Every number you just heard is either a live DAX measure or literally typed on the card you're looking at—nothing here is a made-up placeholder."*

---

### 🔴 14:00 - 16:30 | Step 4b: LIVE & UNSCRIPTED — Building Something New On Camera
> **[VISUAL ON SCREEN]**: Full, real, unedited screen recording — no cuts. Hakam's face cam stays on throughout, reacting genuinely to whatever the agent produces.
>
> **SPEAKER (framing, before going live)**:
> *"Everything so far was pre-built, and I told you that upfront. But I don't want this video to feel like a slideshow of finished screenshots, so here's something I have genuinely NOT built yet, and we're going to do it together, live, right now.
>
> Right now, our model has an EBITDA measure, but nothing breaking it down by store, and no EBITDA Margin percentage. Let's ask the agent to add both, live."*
>
> **[LIVE — DO NOT PRE-RECORD OR SCRIPT THE OUTPUT]**
> Prompt to type on camera:
> 💬 *'In Sheet1.tmdl, add an EBITDA Margin % measure (EBITDA divided by Total Revenue, formatted as a percentage). Then add a bar chart to Page 3 showing EBITDA by Store. Save in UTF-8 without BOM.'*
>
> **[DIRECTOR'S NOTE — read this, don't cut it from the final edit]**:
> Whatever the agent actually produces, react to it honestly on camera. If it nails it first try, say so. If the DAX needs a follow-up correction, or the chart lands in the wrong spot, show that too and fix it live—that's more useful to viewers than a fake perfect take, and it's the whole reason this segment exists. Don't reshoot this part to make it look smoother than it was.
>
> **SPEAKER (after the live result, whatever it turned out to be)**:
> *"And that's the real difference between watching a finished dashboard and watching the actual workflow—warts and all. That's what you're signing up for when you connect an agent to your own reports."*

---

### 🎨 16:30 - 17:30 | Step 5: Matching Channel Colors & Live Testing in Power BI Desktop
> **[VISUAL ON SCREEN]**: Double-clicking `Cafe-part 6.pbip`, showing Power BI Desktop opening smoothly with all 3 pages rendered in Cyber Slate and Neon Lime.
>
> **SPEAKER**:
> *"Now let's test our work live in Power BI Desktop!
>
> To make the report look clean and professional, we used our actual channel theme file, `Elektra873060879558101.json`: background Cyber Slate (`#0D2229`), primary accent Neon Lime (`#39FF14`), and secondary accent Electric Cyan (`#00D2FF`)—the exact three colors registered in that file, nothing approximated.
>
> When we double-click **`Cafe-part 6.pbip`**, Power BI Desktop opens up with Page 1, Page 2 CFO Action Plan, and Page 3 Executive Dashboard all fully rendered, perfectly formatted, and ready to present!"*

---

### 🚀 17:30 - 18:15 | Step 6: Wrap Up, Free Code Downloads & Outro
> **[VISUAL ON SCREEN]**: Hakam back on camera, full screen showing final 3-page dashboard project.
>
> **SPEAKER**:
> *"And that is how you connect an AI coding agent to a real Power BI semantic model—locally, safely, in read-only mode by default—whether you're building from scratch or, like we just did live, extending a report you already have. You saw the finished result, and you saw the actual unscripted process behind it.
>
> All the source files—dataset, TMDL measures, theme JSON, prompt templates—are completely free and linked in the description below.
>
> If you found this helpful, hit **Like**, **Subscribe** to `@HakamDataStudio`, and comment what topic you want next.
>
> Thank you so much for watching, and I'll see you in the next video!"*
