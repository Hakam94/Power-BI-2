# 🎬 Masterclass Prompting & Setup YouTube Script — Part 6
**Channel**: `@HakamDataStudio`  
**Video Length**: ~15 Minutes  
**Series**: Coffee Shop Sales Analytics (Part 6)  
**Core Focus**: Efficient AI Prompting, Power BI MCP Configuration, & Live Testing Walkthrough  

---

## ⏱️ Video Chapters & Timestamp Overview
- **00:00 - 00:25**: 💥 20-Second High-Impact Problem Hook
- **00:25 - 01:45**: 📌 Welcome Back & What Makes Part 6 Different
- **01:45 - 03:50**: ⚡ Step 1: PBIR & TMDL Developer Mode Architecture
- **03:50 - 07:00**: ⚙️ Step 2: Masterclass Prompting — Configuring Power BI MCP in Antigravity
- **07:00 - 10:15**: 🧮 Step 3: Prompting DAX Modeling & TMDL Measures
- **10:15 - 13:00**: 📊 Step 4: Generating the CFO Action Plan & Executive MCP Dashboard
- **13:00 - 14:15**: 🎨 Step 5: The Screenshot Theme Trick & Testing the Report Live
- **14:15 - 15:00**: 🚀 Step 6: Outro, Free Asset Downloads & Community Q&A

---

## 🎬 Full Masterclass 15-Minute Video Script

### 💥 00:00 - 00:25 | 20-Second High-Impact Problem Hook
> **[VISUAL ON SCREEN]**: Rapid visual cuts. Hakam standing in his beige suit pointing to a glowing laptop running Power BI, showing a manual drag-and-drop workflow dissolving into a live AI prompt automatically generating a 3-page executive dashboard.
>
> **HAKAM (SPEAKER)**:  
> *"Are you still wasting 3 to 4 hours clicking around in Power BI Desktop, manually dragging visual containers, and writing DAX measures line by line? Stop doing that right now!  
> 
> What if you could write a single prompt to an AI coding agent, and let it configure your Power BI data model, build 3-page executive dashboards, and calculate CFO profit margins in seconds?  
> 
> Welcome back to **Part 6** of our Coffee Shop Analytics series. Today, I'm showing you the exact masterclass prompting guide to connect **Power BI MCP to Antigravity AI** and test it live. Let’s jump straight in!"*

---

### 📌 00:25 - 01:45 | Welcome Back & What Makes Part 6 Different
> **[VISUAL ON SCREEN]**: B-roll recap of Parts 1–5 showing dataset matrices and KPI cards.
>
> **HAKAM (SPEAKER)**:  
> *"Welcome back to `@HakamDataStudio`! In Parts 1 through 5, we built standard DAX measures and matrix tables manually.  
> 
> But today in Part 6, we are unlocking full AI automation. We will look at how to structure your prompts so Antigravity AI configures the **Model Context Protocol (MCP)**, edits your Power BI project files (`.pbip`), and builds complete multi-page reports automatically."*

---

### ⚡ 01:45 - 03:50 | Step 1: PBIR & TMDL Developer Mode Architecture
> **[VISUAL ON SCREEN]**: Showing file explorer `.pbip` vs `.pbix`.
>
> **HAKAM (SPEAKER)**:  
> *"Before we write our prompt, let's understand the architecture. Power BI Project format (`.pbip`) breaks your report into two key components:  
> 1. **PBIR Files (`.pbir`)**: Clean JSON definitions for visual pages and containers.  
> 2. **TMDL Files (`.tmdl`)**: Tabular Model Definition Language for tables and DAX measures.  
> 
> Because these are text files, Antigravity AI can read the schema, write DAX, and construct visual containers programmatically!"*

---

### ⚙️ 03:50 - 07:00 | Step 2: Masterclass Prompting — Configuring Power BI MCP in Antigravity
> **[VISUAL ON SCREEN]**: Hakam opening VS Code / Antigravity IDE, typing the Masterclass Prompt into the AI prompt box, and inspecting the generated `mcp_config.json`.
>
> **HAKAM (SPEAKER)**:  
> *"Now, here is the core of today's video: **How to write the most efficient prompt to connect Power BI MCP to Antigravity AI**.  
> 
> Instead of manually editing JSON config files, here is the exact prompt you give Antigravity AI:
> 
> 💬 **MASTERCLASS PROMPT**:
> > *'Please configure my Power BI MCP modeling server using the executable at C:/path/to/powerbi-modeling-mcp.exe for workspace ./part-6. Verify connection and inspect table schema.'*
> 
> When you give this prompt, Antigravity automatically creates and formats your `mcp_config.json`:
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
> **Pro-Tip**: Make sure the executable command path points to where `powerbi-modeling-mcp.exe` is saved on your computer!"*

---

### 🧮 07:00 - 10:15 | Step 3: Prompting DAX Modeling & TMDL Measures
> **[VISUAL ON SCREEN]**: Typing the DAX generation prompt into Antigravity AI, showing `Sheet1.tmdl` being updated live.
>
> **HAKAM (SPEAKER)**:  
> *"Now, let's prompt the AI to write our core DAX measures. Here is how you prompt Antigravity for DAX:
> 
> 💬 **DAX GENERATION PROMPT**:
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
> Notice how the prompt explicitly specifies **UTF-8 without BOM** formatting so your files load smoothly without any encoding errors!"*

---

### 📊 10:15 - 13:00 | Step 4: Generating the CFO Action Plan & Executive MCP Dashboard
> **[VISUAL ON SCREEN]**: Antigravity creating Page 2 (`cfo_executive_insights`) and Page 3 (`executive_mcp_dashboard`).
>
> **HAKAM (SPEAKER)**:  
> *"Next, let's prompt the AI to generate our report pages:
> 
> 💬 **DASHBOARD GENERATION PROMPT**:
> > *'Build Page 2 CFO Executive Action Plan featuring cards with data evidence showing Espresso at 66.67% profit margin and +12.4% EBITDA growth. Then build Page 3 Executive MCP Dashboard with a 6-KPI header and a 6-chart grid layout.'*
> 
> Let's look at the data evidence on Page 2:  
> - **EBITDA** is Earnings Before Interest, Taxes, Depreciation, and Amortization (Total Revenue minus Operating Costs).  
> - In our **April 2026 data**, total baseline EBITDA was **$140,906.40**.  
> - Comparing **Latte (46.67% margin)** vs **Espresso (66.67% margin)**, upselling 25% of Latte sales to Espresso & Cold Brew at `Corporate Park` & `University` stores saves **+$17,472.39 in costs**, elevating monthly EBITDA to **$158.4K** — an exact verified growth of **+12.4%**!"*

---

### 🎨 13:00 - 14:15 | Step 5: The Screenshot Theme Trick & Testing the Report Live
> **[VISUAL ON SCREEN]**: Opening `Cafe-part 6.pbip` in Power BI Desktop to test all 3 pages live.
>
> **HAKAM (SPEAKER)**:  
> *"Now for the final step: **Testing the report live in Power BI Desktop**!  
> 
> To match our channel theme, we took a screenshot of our `@HakamDataStudio` YouTube thumbnail, extracted Dark Emerald Green (`#051915`), Neon Lime (`#39FF14`), and Cyber Cyan (`#00E5FF`), and registered them in our theme JSON (`Elektra873060879558101.json`).  
> 
> Now let's double-click **`Cafe-part 6.pbip`**. Look at that — Page 1, Page 2 CFO Action Plan, and Page 3 Executive Dashboard all open cleanly, perfectly styled, with zero errors!"*

---

### 🚀 14:15 - 15:00 | Step 6: Outro, Free Asset Downloads & Community Q&A
> **[VISUAL ON SCREEN]**: Hakam on camera showing the final 3-page dashboard, with links to GitHub and asset packages.
>
> **HAKAM (SPEAKER)**:  
> *"And that is how you prompt Antigravity AI to configure Power BI MCP, write DAX measures, and build executive dashboards automatically!  
> 
> All source files — including the `.pbip` project, masterclass prompts, theme JSON, and assets folder — are linked in the description below.  
> 
> Hit **Like**, **Subscribe** to `@HakamDataStudio`, and drop a comment below letting me know what feature you want to see in Part 7. Thanks for watching, and I'll see you in the next video!"*
