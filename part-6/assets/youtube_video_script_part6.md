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
> *"Before we touch any code, two quick clarifications—these are the two things people get stuck on most, so let's settle them up front instead of leaving you confused later.
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
> Quick dates so you know where this stands: Microsoft put Power BI Projects into public preview back in June 2023, and as of right now, General Availability is targeted for later this year. So everything we're doing today is still technically preview functionality—stable enough to build on, but worth knowing it's not fully finalized yet.
>
> Traditionally, Power BI uses `.pbix` files. But `.pbix` files are binary blobs—if an AI touches them directly, they can easily get corrupted.
>
> With `.pbip`, Power BI breaks your project down into two pieces: a `.SemanticModel` folder full of TMDL files—Tabular Model Definition Language—for your tables, columns, and DAX measures, and a `.Report` folder for the visuals and layout.
>
> Here's a detail worth clearing up, because it trips people up when they go looking: inside that Report folder, there's actually just ONE file that ends in `.pbir`—it's called `definition.pbir`, and it's a small pointer file that basically says 'the real content of this report lives in the definition folder right next to me.' Everything inside that definition folder—every page, every single visual—is stored as a plain `.json` file, not a `.pbir` file. So if you go looking for '.pbir files' plural and only find one, that's not a bug, that's exactly how it's supposed to look—just look for `.json` files for the actual pages and visuals.
>
> Because all of this is plain text, AI agents can read your schema, write DAX, and construct report pages without breaking anything—and we can track every change in Git, which we'll use in a minute.
>
> One important limitation before we move on, so you're not confused later: if Power BI Desktop already has your `.pbip` open while an AI agent edits these files, Desktop will NOT automatically refresh to show the change—this is a known limitation as of this recording. You have to close the project in Power BI Desktop and reopen the `.pbip` file to see what changed. No live preview yet, unfortunately. Keep that in mind every time we make a change today.
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
> **Step 1: open Antigravity and point it at your project folder.** Quick note on that folder first: this whole project is actually shared on GitHub, and what's sitting on my computer is a local clone—basically just a copy of it, downloaded onto my machine. For everything we do today, you don't need to think about GitHub at all—just treat it as a normal folder on your computer. For us that's the Power-BI-2 folder.
>
> Launch Antigravity IDE. Click File, then Open Folder, and select that folder. Once it loads, you have two options to reach a command line: click Terminal in the top menu, then New Terminal—or just press Ctrl plus backtick, and a terminal panel opens at the bottom, already sitting inside that exact project folder. Or, if Antigravity already opened its agent chat panel on the right side, you can skip the terminal entirely and just type these same instructions straight into that chat—Antigravity can run terminal commands for you when you ask it to. I'll use the terminal directly so it's easy to follow on screen.
>
> **Step 2: check Node.js, right in that same terminal.** Type `node -v` and hit Enter. If you see something like `v20` or higher, you're good, move on. If it says 'command not found,' or the version's below 20, pause here: go to nodejs.org, download the LTS installer, run it with the default options, then fully close Antigravity and reopen it before continuing—the terminal won't see a fresh Node install until you restart the app.
>
> **Step 3: in that same terminal, write the following command:**
> 💬 `npx -y @microsoft/powerbi-modeling-mcp@latest --start --readonly`
>
> That `--readonly` flag matters—we start every session in read-only mode, so the AI can inspect the model but can't accidentally change anything yet. You can leave this terminal running in the background—it's now waiting for a client like Antigravity to connect to it.
>
> **Step 4, in Antigravity IDE specifically**: go to Settings, click the Customizations tab, and click 'Open MCP Config'—that opens `mcp_config.json` directly, which will likely be empty or near-empty right now. Here's exactly what you're pasting in, and what it means, since I don't want to just say 'paste this' without explaining it: you're adding one entry, named `powerbi-modeling`, that tells Antigravity 'when you need this server, run this exact command'—and that command is the same `npx` command from Step 3, readonly flag included. So you're not typing the command again by hand; you're just telling Antigravity to run it automatically whenever it needs to. You can see the full JSON on screen right now—pause the video here if you want to copy it exactly.
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
> Save the file, restart Antigravity, then open the '...' dropdown at the top of the agent panel, click 'Manage MCP Servers,' and confirm `powerbi-modeling` is listed there, with a green dot or 'Connected' next to it. If it's not showing, double-check your JSON syntax and restart again.
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
> **Step 6**: Point the agent at that folder with a simple, safe prompt:
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
> Take a look at how fast the agent updates our `Sheet1.tmdl` file—and remember what we covered earlier: if you want to see these new measures show up inside Power BI Desktop itself, you'll need to close and reopen the `.pbip` file first, since it won't refresh on its own.
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
> First, let's define the term on the CFO page, since not everyone watching will know it off the top of their head. **EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization.** It's a way of looking at how profitable the core business is, before you factor in financing costs, tax structure, or how fast equipment is depreciating.
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
> Remember Action 3 from the CFO page—Downtown has the highest operational cost of any store? Here's what we DON'T know yet: does Downtown's revenue actually make up for that, or is it quietly our worst-performing store once costs are factored in properly? Let's find out live, and build a per-store EBITDA Margin comparison to answer it for real."*
>
> **[LIVE — DO NOT PRE-RECORD OR SCRIPT THE OUTPUT]**
> Prompt to type on camera:
> 💬 *'In Sheet1.tmdl, add an EBITDA Margin % measure (EBITDA divided by Total Revenue, formatted as a percentage). Then add a bar chart to Page 3 showing EBITDA Margin % by Store, sorted highest to lowest. Tell me which store has the lowest EBITDA Margin and whether Downtown is it. Save in UTF-8 without BOM.'*
>
> **[DIRECTOR'S NOTE — read this, don't cut it from the final edit]**:
> Whatever the agent actually produces, react to it honestly on camera. If it nails it first try, say so. If the DAX needs a follow-up correction, or the chart lands in the wrong spot, show that too and fix it live—that's more useful to viewers than a fake perfect take, and it's the whole reason this segment exists. Don't reshoot this part to make it look smoother than it was. Whatever store actually comes out lowest, react to that specific real result—don't paraphrase it away.
>
> **SPEAKER (after the live result — replace the bracket below with what actually happened before you publish)**:
> *"So there's our real answer: [state the actual store and EBITDA Margin % the agent found on camera] — and that's not something I knew before we hit record. That's the real difference between watching a finished dashboard and watching the actual workflow—warts and all. That's what you're signing up for when you connect an agent to your own reports."*

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
