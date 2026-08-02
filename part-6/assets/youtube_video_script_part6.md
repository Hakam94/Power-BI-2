# 🎬 High-Retention Problem-Hook YouTube Script — Part 6
**Channel**: `@HakamDataStudio`  
**Video Length**: ~15 Minutes  
**Series**: Coffee Shop Sales Analytics (Part 6)  
**Hook Strategy**: Aggressive Pain-Point Attack -> Mind-Blowing Solution -> Open Loop Curiosity Gap  

---

## ⏱️ Video Chapters & Narrative Arc
- **00:00 - 00:25**: 💥 AGGRESSIVE PAIN-POINT HOOK (Stop Wasting Hours in Power BI!)
- **00:25 - 01:45**: 📌 Welcome Back & What Makes Part 6 Different
- **01:45 - 03:50**: ⚡ Step 1: PBIR & TMDL — Opening the Hood of Power BI
- **03:50 - 06:30**: ⚙️ Step 2: 4-Step Guide — Connecting Power BI MCP to Antigravity AI
- **06:30 - 09:30**: 💥 Step 3: THE DISASTER! (Frown Errors & The Radioactive Green Page)
- **09:30 - 12:45**: 📊 Step 4: The Breakthrough — CFO Action Plan & Real EBITDA Math
- **12:45 - 14:15**: 🎨 Step 5: The Thumbnail Screenshot Theme Trick
- **14:15 - 15:00**: 🚀 Step 6: Final Victory, Outro & Free Asset Downloads

---

## 🎬 Full Storytelling 15-Minute Video Script

### 💥 00:00 - 00:25 | Aggressive Pain-Point Hook (High Retention)
> **[VISUAL ON SCREEN]**: Rapid high-contrast visual cuts. Hakam standing in his beige suit pointing to a glowing laptop running Power BI, showing a tedious manual drag-and-drop workflow dissolving into a live AI prompt automatically generating a pristine 3-page executive dashboard.
>
> **HAKAM (SPEAKER)**:  
> *"Are you still wasting 3 to 4 hours clicking around in Power BI Desktop, manually dragging visual containers, and writing DAX measures line by line — only for a single misclick to break your entire `.pbix` report? Stop doing that right now!  
> 
> What if you could connect an AI coding agent directly to your Power BI data model, and let it build 3-page executive dashboards, calculate CFO profit margins, and auto-fix schema errors in under 30 seconds?  
> 
> Welcome back to **Part 6** of our Coffee Shop Analytics series. Today, I'm showing you the exact step-by-step setup to connect **Power BI MCP to Antigravity AI**. But watch carefully — because one wrong encoding setting will throw a fatal crash error that destroys your entire report layout! Let’s jump straight in!"*

---

### 📌 00:25 - 01:45 | Welcome Back & The Big Promise of Part 6
> **[VISUAL ON SCREEN]**: B-roll recap of Parts 1–5 showing dataset matrices and KPI cards.
>
> **HAKAM (SPEAKER)**:  
> *"Welcome back to `@HakamDataStudio`! In Parts 1 through 5, we built standard DAX measures and matrix tables manually.  
> 
> But today in Part 6, we are pushing the boundaries of AI Data Engineering. Instead of clicking around in Power BI Desktop for hours, we are letting **Antigravity AI write DAX, build page layouts, and configure themes directly in code**.  
> 
> But as you'll see in today's video, pair-programming with AI isn't always smooth sailing — and learning how to debug AI mistakes is what separates average developers from senior data engineers!"*

---

### ⚡ 01:45 - 03:50 | Step 1: PBIR & TMDL — Opening the Hood of Power BI
> **[VISUAL ON SCREEN]**: Showing file explorer `.pbip` vs `.pbix`.
>
> **HAKAM (SPEAKER)**:  
> *"Before we talk to the AI, let's look at why this works. Standard `.pbix` files are closed binary blobs. If an AI touches a `.pbix`, it breaks.  
> 
> But when you save your report as a **Power BI Project (`.pbip`)**, Power BI breaks your report into clean JSON files (`.pbir`) for visuals and TMDL files (`.tmdl`) for DAX measures. This gives AI full access to read and write your model files directly!"*

---

### ⚙️ 03:50 - 06:30 | Step 2: 4-Step Guide — Connecting Power BI MCP to Antigravity AI
> **[VISUAL ON SCREEN]**: Screen recording stepping through VS Code installation -> downloading `powerbi-modeling-mcp.exe` -> prompting Antigravity AI -> inspecting `mcp_config.json`.
>
> **HAKAM (SPEAKER)**:  
> *"Now, how do you actually connect Power BI MCP to Antigravity AI step-by-step? It’s surprisingly simple. Here are the 4 exact steps:  
> 
> **Step 1: Install VS Code or Antigravity IDE**. Make sure you have your code editor installed as your primary workspace.  
> 
> **Step 2: Download Power BI MCP (`powerbi-modeling-mcp.exe`)**. Download the MCP modeling executable and save it in a folder on your computer.  
> 
> **Step 3: Ask Antigravity AI to Auto-Configure**. Instead of manually writing complex JSON config files, simply tell Antigravity AI:  
> *'Please configure my Power BI MCP server using the executable at C:/path/to/powerbi-modeling-mcp.exe for workspace part-6.'*  
> 
> Antigravity will automatically generate and update your `mcp_config.json` and `.vscode/mcp.json` files!  
> 
> **Step 4: Verify Connection**. In my setup, the JSON looks like this:
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
> **Remember**: The executable path in `mcp_config.json` points to my local computer folder. In your case, make sure it points to wherever you downloaded `powerbi-modeling-mcp.exe` on your machine!"*

---

### 💥 06:30 - 09:30 | Step 3: THE DISASTER! (Frown Errors & The Radioactive Green Page)
> **[VISUAL ON SCREEN]**: Showing live footage of the Power BI Frown Error screen, followed by the neon green screen screenshot.
>
> **HAKAM (SPEAKER)**:  
> *"Now, let me share what ACTUALLY happened when we first ran this in our chat session!  
> 
> **Crash #1: The Frown Error**. We edited our TMDL measure files, opened Power BI Desktop, and BOOM! A giant crash screen popped up saying: *'Only UTF8 without BOM supported'*. Windows editors secretely inject a hidden Byte Order Mark (BOM). But here's the cool part: **when working with Antigravity AI, the AI automatically cleans up UTF-8 BOM bytes in the background**, so you never have to deal with file encoding crashes!  
> 
> **Crash #2: The Radioactive Green Disaster**. Then, we asked the AI to apply a custom background shape. We opened Power BI, and Page 1 was painted in **radioactive neon lime green**! The AI accidentally generated a full-screen shape overlay covering all our charts!  
> 
> So we told Antigravity: *'Hey, you applied the theme to Page 2, but Page 1 is radioactive green!'* The AI instantly diagnosed the issue, removed the rogue shape container, cleaned up the visual tree, and restored our clean Dark Emerald theme!"*

---

### 📊 09:30 - 12:45 | Step 4: The Breakthrough — CFO Action Plan & Real EBITDA Math
> **[VISUAL ON SCREEN]**: Navigating to Page 2 (CFO Action Plan) and Page 3 (Executive MCP Dashboard).
>
> **HAKAM (SPEAKER)**:  
> *"After fixing those hiccups, we achieved our biggest breakthrough!  
> 
> On Page 2, we built a dedicated **CFO Executive Action Plan**. When presenting to executives, you must speak EBITDA and back it up with product math.  
> 
> **What is EBITDA?** It stands for **Earnings Before Interest, Taxes, Depreciation, and Amortization** — which represents our core net operating profit (Total Revenue minus Product Operating Costs).  
> 
> Here is our exact **April 2026 Monthly Data** comparison:  
> - 🥛 **Latte (Lowest Margin)**: Revenue $48.8K | Cost $26.0K | **46.67% Margin**  
> - 🧊 **Cold Brew**: Revenue $44.6K | Cost $16.7K | **62.50% Margin**  
> - ☕ **Espresso (Highest Margin)**: Revenue $37.8K | Cost $12.6K | **66.67% Margin**  
> 
> In April 2026, our total baseline EBITDA was **$140,906.40** (56.34% base margin).  
> 
> **The Strategy**: By comparing our lowest-margin product (Latte @ 46.67%) to our highest-margin product (Espresso @ 66.67%), we recommended upselling 25% of Latte customers to Espresso & Cold Brew at `Corporate Park` & `University` stores. This saves **+$17,472.39 in product costs**, elevating our monthly EBITDA from **$140.9K (April Baseline)** to **$158.4K (April Optimized)** — an exact verified growth of **+12.4%**!"*

---

### 🎨 12:45 - 14:15 | Step 5: The Thumbnail Screenshot Theme Trick
> **[VISUAL ON SCREEN]**: Showing the Hakam Data Studio thumbnail screenshot alongside `Elektra873060879558101.json` theme file.
>
> **HAKAM (SPEAKER)**:  
> *"Now, here is a secret design trick we used during our session.  
> 
> You might wonder how I matched the Power BI report colors to my channel brand. **I took a screenshot of my `@HakamDataStudio` YouTube thumbnail**, extracted the exact Dark Emerald Green (`#051915`), Neon Lime (`#39FF14`), and Cyber Cyan (`#00E5FF`), and registered them directly into my theme JSON file (`Elektra873060879558101.json`)!  
> 
> You can do this exact same trick for your company branding or personal YouTube channel!"*

---

### 🚀 14:15 - 15:00 | Step 6: Final Victory, Outro & Free Asset Downloads
> **[VISUAL ON SCREEN]**: Hakam on camera showing the final 3-page dashboard, with links to GitHub and asset packages.
>
> **HAKAM (SPEAKER)**:  
> *"And that is how we transformed a series of crash errors and color bugs into a pristine 3-page Executive Power BI Report using Antigravity AI!  
> 
> All source files — including the `.pbip` project, theme JSON, DAX measures, and B-roll clips — are available in the link in the description.  
> 
> If you enjoyed this real, behind-the-scenes journey, hit **Like**, **Subscribe** to `@HakamDataStudio`, and drop a comment below. Thanks for watching, and I'll see you in Part 7!"*
