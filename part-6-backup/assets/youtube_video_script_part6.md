# 🎬 High-Impact Problem Hook & Tool Comparison YouTube Script — Part 6
**Channel**: `@HakamDataStudio`  
**Video Length**: ~15 Minutes  
**Series**: Coffee Shop Sales Analytics (Part 6)  
**Core Narrative**: Aggressive Problem Hook -> Why Antigravity Beats Paywalled Tools -> Power BI MCP Masterclass  

---

## ⏱️ Video Chapters & Timestamp Overview
- **00:00 - 00:30**: 💥 AGGRESSIVE PROBLEM HOOK (The Real Power BI & AI Tool Pain Point)
- **00:30 - 02:00**: ⚡ Why Antigravity AI? (Free Testing vs. Claude Code & OpenAI Codex Paywalls)
- **02:00 - 04:00**: 📌 Step 1: PBIR & TMDL Developer Mode Architecture
- **04:00 - 07:15**: ⚙️ Step 2: 4-Step Setup Guide — Connecting Power BI MCP in Antigravity
- **07:15 - 10:30**: 🧮 Step 3: Masterclass Prompting — DAX Modeling & TMDL Measures
- **10:30 - 13:15**: 📊 Step 4: Generating the CFO Action Plan & Executive MCP Dashboard
- **13:15 - 14:15**: 🎨 Step 5: The Thumbnail Screenshot Theme Trick & Live Testing
- **14:15 - 15:00**: 🚀 Step 6: Final Victory, Outro & Free Code Downloads

---

## 🎬 Full Storytelling & Comparison 15-Minute Video Script

### 💥 00:00 - 00:30 | Aggressive Problem Hook (Real Developer Pain Point)
> **[VISUAL ON SCREEN]**: Rapid visual cuts. Hakam standing in his beige suit pointing to a glowing laptop running Power BI, showing a manual drag-and-drop workflow dissolving into a live AI prompt automatically generating a 3-page executive dashboard.
>
> **HAKAM (SPEAKER)**:  
> *"Are you tired of wasting hours clicking around in Power BI Desktop, manually formatting DAX measures, and praying your `.pbix` file doesn't corrupt? And when you try using AI coding assistants, you hit paywalls before you can even test your code!  
> 
> What if you could use a powerful, free agentic AI tool to connect directly to your Power BI data model, build multi-page executive dashboards, and calculate CFO profit margins in seconds?  
> 
> Welcome back to **Part 6** of our Coffee Shop Analytics series! Today, we are connecting **Power BI MCP to Antigravity AI**. Let’s jump straight in!"*

---

### ⚡ 00:30 - 02:00 | Why Antigravity AI? (Comparing Antigravity vs Claude Code & Codex)
> **[VISUAL ON SCREEN]**: On-screen comparison graphic showing Antigravity AI vs Claude Code vs OpenAI Codex.
>
> **HAKAM (SPEAKER)**:  
> *"Now, why are we using **Antigravity AI** instead of other AI coding tools? Let's talk about the real developer experience:  
> 
> 1. ❌ **Claude Code**: Requires immediate paid API credits or upfront subscriptions just to try basic code tasks on your machine.  
> 2. ❌ **OpenAI Codex / ChatGPT**: Extremely strict rate limits, token caps, and rigid file access.  
> 3. ✅ **Antigravity AI (by Google DeepMind)**: Gives you a powerful, free agentic AI workspace with full chat, live terminal execution, and native MCP support — allowing you to test, build, and debug complex data engineering projects for free without hitting paywalls!  
> 
> That’s why Antigravity is the ultimate playground for Power BI developers."*

---

### 📌 02:00 - 04:00 | Step 1: PBIR & TMDL Developer Mode Architecture
> **[VISUAL ON SCREEN]**: Showing file explorer `.pbip` vs `.pbix`.
>
> **HAKAM (SPEAKER)**:  
> *"Let's look at how Power BI Developer Mode (`.pbip`) works under the hood. Standard `.pbix` files are closed binary blobs. If an AI touches a `.pbix`, it corrupts.  
> 
> But with `.pbip`, Power BI splits your report into two clean text components:  
> 1. **PBIR Files (`.pbir`)**: JSON definitions for visual pages and containers.  
> 2. **TMDL Files (`.tmdl`)**: Tabular Model Definition Language for tables and DAX measures.  
> 
> This text-based structure allows Antigravity AI to read the model schema, write DAX, and generate page visuals programmatically!"*

---

### ⚙️ 04:00 - 07:15 | Step 2: 4-Step Setup Guide — Connecting Power BI MCP in Antigravity
> **[VISUAL ON SCREEN]**: Screen recording stepping through VS Code installation -> downloading `powerbi-modeling-mcp.exe` -> prompting Antigravity AI -> inspecting `mcp_config.json`.
>
> **HAKAM (SPEAKER)**:  
> *"Here is how you connect Power BI MCP to Antigravity AI in 4 simple steps:  
> 
> **Step 1: Open VS Code or Antigravity IDE**. Set up your code editor workspace.  
> **Step 2: Download Power BI MCP (`powerbi-modeling-mcp.exe`)**. Save the modeling executable in a folder on your machine.  
> **Step 3: Prompt Antigravity AI**. Simply ask:  
> 💬 *'Please configure my Power BI MCP modeling server using the executable at C:/path/to/powerbi-modeling-mcp.exe for workspace ./part-6.'*  
> 
> Antigravity automatically generates your `mcp_config.json`:
```json
{
  "mcpServers": {
    "powerbi-modeling": {
      "command": "C:/Users/.../powerbi-modeling-mcp.exe",
      "args": ["--workspace", "./part-6"]
    }
  }
}
```
> **Step 4: Verify Connection**. In my setup, the path points to my local folder. Make sure yours points to wherever you saved `powerbi-modeling-mcp.exe` on your machine!"*

---

### 🧮 07:15 - 10:30 | Step 3: Masterclass Prompting — DAX Modeling & TMDL Measures
> **[VISUAL ON SCREEN]**: Typing the DAX prompt into Antigravity AI, showing `Sheet1.tmdl` being updated live.
>
> **HAKAM (SPEAKER)**:  
> *"Now let's prompt the AI to write our DAX measures:  
> 
> 💬 **DAX PROMPT**:
> > *'In Sheet1.tmdl, create DAX measures for Total Revenue, Total Profit, and Profit Margin % formatted as 0.00%. Save all files strictly in UTF-8 without BOM.'*  
> 
> Watch how Antigravity updates `Sheet1.tmdl` instantly:
```dax
measure 'Total Revenue' = SUM(Sheet1[Revenue1])
  formatString: \$#,0.00

measure 'Profit' = SUM(Sheet1[Profit1])
  formatString: \$#,0.00

measure 'Profit Margin %' = DIVIDE([Profit], [Total Revenue], 0)
  formatString: 0.00%
```
> Notice how the prompt explicitly specifies **UTF-8 without BOM** formatting so your files load smoothly without any encoding crashes!"*

---

### 📊 10:30 - 13:15 | Step 4: Generating the CFO Action Plan & Executive MCP Dashboard
> **[VISUAL ON SCREEN]**: Antigravity creating Page 2 (`cfo_executive_insights`) and Page 3 (`executive_mcp_dashboard`).
>
> **HAKAM (SPEAKER)**:  
> *"Next, let's prompt the AI to generate our report pages:  
> 
> 💬 **DASHBOARD PROMPT**:
> > *'Build Page 2 CFO Executive Action Plan featuring cards with data evidence showing Espresso at 66.67% profit margin and +12.4% EBITDA growth. Then build Page 3 Executive MCP Dashboard with a 6-KPI header and a 6-chart grid layout.'*  
> 
> Let's look at the data evidence on Page 2:  
> - **EBITDA** is Earnings Before Interest, Taxes, Depreciation, and Amortization (Total Revenue minus Operating Costs).  
> - In our **April 2026 data**, total baseline EBITDA was **$140,906.40**.  
> - Comparing **Latte (46.67% margin)** vs **Espresso (66.67% margin)**, upselling 25% of Latte sales to Espresso & Cold Brew at `Corporate Park` & `University` stores saves **+$17,472.39 in costs**, elevating monthly EBITDA to **$158.4K** — an exact verified growth of **+12.4%**!"*

---

### 🎨 13:15 - 14:15 | Step 5: The Screenshot Theme Trick & Testing Live
> **[VISUAL ON SCREEN]**: Opening `Cafe-part 6.pbip` in Power BI Desktop to test all 3 pages live.
>
> **HAKAM (SPEAKER)**:  
> *"Now for the final step: **Testing the report live in Power BI Desktop**!  
> 
> To match our channel theme, we took a screenshot of our `@HakamDataStudio` YouTube thumbnail, extracted Dark Emerald Green (`#051915`), Neon Lime (`#39FF14`), and Cyber Cyan (`#00E5FF`), and registered them in our theme JSON (`Elektra873060879558101.json`).  
> 
> Now let's double-click **`Cafe-part 6.pbip`**. Look at that — Page 1, Page 2 CFO Action Plan, and Page 3 Executive Dashboard all open cleanly, perfectly styled, with zero errors!"*

---

### 🚀 14:15 - 15:00 | Step 6: Final Victory, Outro & Free Asset Downloads
> **[VISUAL ON SCREEN]**: Hakam on camera showing the final 3-page dashboard, with links to GitHub and asset packages.
>
> **HAKAM (SPEAKER)**:  
> *"And that is how you prompt Antigravity AI to configure Power BI MCP, write DAX measures, and build executive dashboards automatically!  
> 
> All source files — including the `.pbip` project, masterclass prompts, theme JSON, and assets folder — are linked in the description below.  
> 
> Hit **Like**, **Subscribe** to `@HakamDataStudio`, and drop a comment below letting me know what feature you want to see in Part 7. Thanks for watching, and I'll see you in the next video!"*
