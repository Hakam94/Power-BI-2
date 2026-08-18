# 🎬 Alex The Analyst Style YouTube Script — Part 6
**Channel**: `@HakamDataStudio`  
**Video Length**: ~15 Minutes  
**Series**: Coffee Shop Sales Analytics (Part 6)  
**Style**: Alex The Analyst (Practical, Friendly, Relatable, Step-by-Step Data Analyst Voice)  

---

## ⏱️ Video Chapters & Timestamp Overview
- **00:00 - 00:35**: 📊 Welcome & Real-World Analyst Problem (Manual Power BI & Paid AI Tools)
- **00:35 - 02:00**: ⚡ Why Antigravity AI? (Free Analyst Workflow vs. Paywalled Tools)
- **02:00 - 04:00**: 📌 Step 1: PBIP & TMDL Files — Why Text-Based Power BI Matters
- **04:00 - 07:15**: ⚙️ Step 2: Step-by-Step Setup — Connecting Power BI MCP to Antigravity
- **07:15 - 10:30**: 🧮 Step 3: Writing DAX Measures & TMDL Files with AI Prompts
- **10:30 - 13:15**: 📊 Step 4: Building Executive Dashboards & CFO Action Plans
- **13:15 - 14:15**: 🎨 Step 5: Matching Channel Colors & Testing Live in Power BI Desktop
- **14:15 - 15:00**: 🚀 Step 6: Wrap Up, Free Code Downloads & Outro

---

## 🎬 Full Video Script (Alex The Analyst Style)

### 🚀 00:00 - 00:45 | 1% BI & AI Engineer Hook (Immediate High-Impact Opening — No "Welcome")
> **[VISUAL ON SCREEN]**: High-voltage opening. No slow intro. Fast-paced visual cut of an AI prompt in VS Code generating a complete 3-page Power BI dashboard programmatically. Hakam looking directly into the camera with high energy and sharp confidence.
>
> **HAKAM (SPEAKER)**:  
> *"What if you could build a complete, production-ready Power BI report—with formatted DAX measures, CFO financial models, and multi-page executive dashboards—without touching a single visual button in Power BI Desktop?  
> 
> Most data analysts are trapped in legacy workflows—wasting hours on manual drag-and-drop formatting, debugging DAX formulas, and praying their `.pbix` file doesn't corrupt. But modern 1% BI engineers build differently.  
> 
> In this video, we are connecting **Google's free Antigravity AI** directly to your Power BI semantic model using **Microsoft's Model Context Protocol**. You'll see step-by-step how to generate clean TMDL measures, build executive action plans that recover +12.4% EBITDA, and automate your entire analytics pipeline—completely free!  
> 
> All template files, TMDL prompts, and dataset code are linked in the description below so you can follow along.  
> 
> If you're ready to elevate your BI engineering skills to the 1% level, hit **Like**, **Subscribe** to `@HakamDataStudio`, and let’s jump straight into the code!"*

---

### ⚡ 00:35 - 02:00 | Why Antigravity AI? (Comparing AI Tools for Analysts)
> **[VISUAL ON SCREEN]**: Clean graphic breaking down Claude Code vs OpenAI Codex vs Antigravity AI.
>
> **SPEAKER**:  
> *"Now, before we jump into the setup, why are we using **Antigravity AI** for our analytics work instead of tools like Claude Code or OpenAI Codex?  
> 
> Well, as analysts, we want tools that are fast, accessible, and practical:  
> 
> 1. **Claude Code**: Requires immediate paid API credits or monthly subscriptions just to try basic coding tasks on your computer.  
> 2. **OpenAI Codex / ChatGPT**: Has strict rate limits, token caps, and file upload restrictions.  
> 3. **Antigravity AI (by Google DeepMind)**: Gives you a completely free, full-featured AI coding environment with terminal access and native MCP support—meaning you can test and build real data projects without spending a dime.  
> 
> It's easily one of the best free tools available for data analysts right now."*

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
> Because these are text files, AI models like Antigravity can read your schema, write DAX formulas, and construct report pages without breaking anything!"*

---

### ⚙️ 04:00 - 07:15 | Step 2: Step-by-Step Setup — Connecting Power BI MCP in Antigravity
> **[VISUAL ON SCREEN]**: Screen recording walking through VS Code setup -> downloading executable -> pasting prompt -> checking `mcp_config.json`.
>
> **SPEAKER**:  
> *"Alright, let's walk through the 4 simple steps to connect Power BI MCP to Antigravity AI:  
> 
> **Step 1**: Open your workspace in VS Code or Antigravity IDE.  
> **Step 2**: Download the Power BI MCP executable (`powerbi-modeling-mcp.exe`) and place it in your project directory.  
> **Step 3**: Open Antigravity AI and give it this simple prompt:  
> 💬 *'Please configure my Power BI MCP modeling server using the executable at C:/path/to/powerbi-modeling-mcp.exe for workspace ./part-6.'*  
> 
> Antigravity will automatically create your `mcp_config.json` file:
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
> **Step 4**: Double-check your file path to make sure it points to your local folder, and you're good to go!"*

---

### 🧮 07:15 - 10:30 | Step 3: Writing DAX Measures & TMDL Files with AI Prompts
> **[VISUAL ON SCREEN]**: Typing prompt into chat window, watching `Sheet1.tmdl` populate with DAX code live.
>
> **SPEAKER**:  
> *"Now for the fun part—let's ask the AI to write our DAX measures for us!  
> 
> Here is the exact prompt we use:  
> 💬 *'In Sheet1.tmdl, create DAX measures for Total Revenue, Total Profit, and Profit Margin % formatted as 0.00%. Save all files strictly in UTF-8 without BOM.'*  
> 
> Take a look at how fast Antigravity updates our `Sheet1.tmdl` file:
```dax
measure 'Total Revenue' = SUM(Sheet1[Revenue1])
  formatString: \$#,0.00

measure 'Profit' = SUM(Sheet1[Profit1])
  formatString: \$#,0.00

measure 'Profit Margin %' = DIVIDE([Profit], [Total Revenue], 0)
  formatString: 0.00%
```
> Pro tip for data analysts: Always specify **UTF-8 without BOM** in your prompts so Power BI reads the generated text files smoothly without encoding errors."*

---

### 📊 10:30 - 13:15 | Step 4: Building Executive Dashboards & CFO Action Plans
> **[VISUAL ON SCREEN]**: Displaying Page 2 (`cfo_executive_insights`) KPI cards and Page 3 (`executive_mcp_dashboard`) 6-chart grid layout.
>
> **SPEAKER**:  
> *"Next, as analysts, we don't just build charts—we present actionable business insights to leadership. So let's prompt the AI to generate our report pages:  
> 
> 💬 *'Build Page 2 CFO Executive Action Plan featuring cards with data evidence showing Espresso at 66.67% profit margin and +12.4% EBITDA growth. Then build Page 3 Executive MCP Dashboard with a 6-KPI header and a 6-chart grid layout.'*  
> 
> Look at the business breakdown generated on Page 2:  
> - **EBITDA**: In our April 2026 dataset, baseline EBITDA was **$140,906.40**.  
> - **Margin Insights**: Latte sits at **46.67%** margin, while Espresso is at **66.67%**.  
> - **CFO Recommendation**: Upselling 25% of Latte sales to Espresso & Cold Brew at Corporate Park and University locations saves **+$17,472.39 in operating costs**, boosting overall monthly EBITDA to **$158.4K**—an exact growth of **+12.4%**!  
> 
> This is exactly the kind of evidence-backed story executives want to see in a report."*

---

### 🎨 13:15 - 14:15 | Step 5: Matching Channel Colors & Live Testing in Power BI Desktop
> **[VISUAL ON SCREEN]**: Double-clicking `Cafe-part 6.pbip`, showing Power BI Desktop opening smoothly with all 3 pages rendered in Dark Emerald Green and Cyber Cyan.
>
> **SPEAKER**:  
> *"Now let's test our work live in Power BI Desktop!  
> 
> To make the report look clean and professional, we sampled our channel branding colors—Dark Emerald Green (`#051915`), Neon Lime (`#39FF14`), and Cyber Cyan (`#00E5FF`)—and registered them in our Power BI theme JSON file (`Elektra873060879558101.json`).  
> 
> When we double-click **`Cafe-part 6.pbip`**, Power BI Desktop opens up with Page 1, Page 2 CFO Action Plan, and Page 3 Executive Dashboard all fully rendered, perfectly formatted, and ready to present!"*

---

### 🚀 14:15 - 15:00 | Step 6: Wrap Up, Free Code Downloads & Outro
> **[VISUAL ON SCREEN]**: Alex/Hakam back on camera with full screen showing final 3-page dashboard project.
>
> **SPEAKER**:  
> *"And that is how you use Antigravity AI and Power BI MCP to automate DAX creation and executive dashboard generation!  
> 
> If you want to practice with this project, all the source files—including the dataset, TMDL measures, theme JSON, and prompt templates—are completely free and linked in the description below.  
> 
> If you found this video helpful, please hit that **Like** button, **Subscribe** to `@HakamDataStudio` for more data analyst tutorials, and leave a comment letting me know what topic you want to see next.  
> 
> Thank you so much for watching, and I'll see you in the next video!"*
