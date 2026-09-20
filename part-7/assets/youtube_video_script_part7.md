# 🎬 YouTube Script — Part 7
**Channel**: `@HakamDataStudio`
**Video Length**: ~15 Minutes
**Series**: Coffee Shop Sales Analytics (Part 7)
**Core Narrative**: The Model-Bloat Problem Hook → Visual Calculations Masterclass → DAX UDF Refactor → Model Audit (Best Practice Analyzer + Performance Analyzer)

---

## ⏱️ Video Chapters & Timestamp Overview
- **00:00 - 00:30**: 💥 Problem Hook (Every KPI Becomes a Permanent Measure)
- **00:30 - 02:00**: 🆕 What's New Since Part 6 (Visual Calculations & DAX UDFs, GA 2026)
- **02:00 - 05:00**: 🧮 Step 1: Visual Calculations Masterclass (MoM Growth, Running Total, Moving Average, Custom Totals)
- **05:00 - 08:00**: 🧩 Step 2: The DAX UDF Refactor (Fixing a Bug Hiding in Part 2)
- **08:00 - 09:30**: ✅ Step 3: The Decision Framework — Measure vs. Visual Calc vs. UDF
- **09:30 - 12:00**: 🔍 Step 4: Auditing the Model with the Best Practice Analyzer
- **12:00 - 13:30**: ⚡ Step 5: Performance Analyzer & the Optimize Ribbon
- **13:30 - 14:15**: 🤖 Bonus: Copilot Drafts a Visual Calculation
- **14:15 - 15:00**: 🚀 Outro & Free Downloads

---

## 🎬 Full Script

### 💥 00:00 - 00:30 | Problem Hook
> **[VISUAL ON SCREEN]**: Screen recording scrolling through the Part 2 `Sheet1.tmdl` measure list — dozens of measures stacked up. Then a cut to a single clean matrix visual with a small calculator icon.
>
> **HAKAM (SPEAKER)**:
> *"Every time we needed a new KPI in this series, we did the same thing — open Modeling, click New Measure, write some DAX, and add one more entry to a list that never stops growing. Back in Part 2 we even wrote two almost-identical measures for 'this month' and 'last month' — and I never told you they don't actually calculate the same way.
>
> Welcome back to **Part 7** of the Coffee Shop Sales Dashboard series! Today we fix that — with two features that shipped for Power BI in 2026, and a model audit that catches what the last six parts never checked. Let's get into it."*

---

### 🆕 00:30 - 02:00 | What's New Since Part 6
> **[VISUAL ON SCREEN]**: Timeline graphic — Nov 2025 → May 2026 → June 2026 — with feature names appearing.
>
> **HAKAM (SPEAKER)**:
> *"Quick catch-up. Part 6 was built around the November 2025 release, where we connected AI agents to our semantic model with the Power BI Modeling MCP server.
>
> Since then, two big things happened. In **May 2026**, **Visual Calculations** and **Custom Totals** went fully **General Availability** — you can now write DAX directly on a visual, scoped to exactly what's already on that chart, no model measure required.
>
> Then in **June 2026**, **DAX User-Defined Functions** also reached **General Availability** — reusable DAX functions you write once and call from anywhere, instead of copy-pasting the same logic into measure after measure.
>
> Two different problems, two different fixes. Let's build both, live, on our CoffeeShop model."*

---

### 🧮 02:00 - 05:00 | Step 1: Visual Calculations Masterclass
> **[VISUAL ON SCREEN]**: Power BI Desktop open on `Cafe-part 7.pbip`, "Part 7 - Visual Calculations Lab" page. Matrix visual with `Dates[YearMonth]` on rows, `Total Revenue`, `Profit`, `Total Cups Sold` in values.
>
> **HAKAM (SPEAKER)**:
> *"Here's our Part 2 MoM Growth measure:*
> ```DAX
> MoM Growth % Var =
> VAR CurrentMonth = CALCULATE(SUM(Sheet1[Revenue]), DATESINPERIOD(Dates[Date], MAX(Dates[Date]), -1, MONTH))
> VAR PrevMonth = CALCULATE(SUM(Sheet1[Revenue]), DATEADD(Dates[Date], -1, MONTH))
> RETURN DIVIDE(CurrentMonth - PrevMonth, PrevMonth, 0)
> ```
> *That's a permanent, always-on part of the model. Watch this instead — right-click `Total Revenue` on the matrix, New calculation:*
> ```DAX
> MoM Growth (visual) = DIVIDE([Total Revenue] - PREVIOUS([Total Revenue]), PREVIOUS([Total Revenue]))
> ```
> *One line. `PREVIOUS()` just walks the axis that's already on the visual — no CALCULATE, no DATEADD, no relationship required.
>
> Let's keep going. A running total of revenue:*
> ```DAX
> Running Revenue = RUNNINGSUM([Total Revenue], HIGHESTPARENT)
> ```
> *And a 3-month moving average of cups sold:*
> ```DAX
> Cups Sold MA3 = MOVINGAVERAGE([Total Cups Sold], 3)
> ```
> *Three calculations, zero new model measures. And for the total row — right-click it, **Custom Total**, and tell Power BI our `Price` measure's total should average, not sum. No second hidden measure needed either."*

---

### 🧩 05:00 - 08:00 | Step 2: The DAX UDF Refactor
> **[VISUAL ON SCREEN]**: Split screen — `CurrentMonth` and `PrevMonth` measure DAX side by side, highlighted differences circled in red (`DATESINPERIOD` vs `DATEADD`).
>
> **HAKAM (SPEAKER)**:
> *"Now here's the thing I never pointed out back in Part 2. Look closely at these two measures:*
> ```DAX
> CurrentMonth = CALCULATE(SUM(Sheet1[Revenue]), DATESINPERIOD(Dates[Date], MAX(Dates[Date]), -1, MONTH))
> PrevMonth = CALCULATE(SUM(Sheet1[Revenue]), DATEADD(Dates[Date], -1, MONTH))
> ```
> *`CurrentMonth` uses a trailing window — `DATESINPERIOD`. `PrevMonth` uses a calendar-month shift — `DATEADD`. They look like a matching pair. They are not. And that inconsistency sat in our model for five parts because nothing forced us to compare them side by side.
>
> A DAX UDF forces that comparison, because you have to standardize on ONE definition. In Model view, New Function:*
> ```DAX
> function MonthRevenue = (monthsAgo: expr INT64) =>
>     CALCULATE(
>         SUM(Sheet1[Revenue]),
>         DATEADD(Dates[Date], -monthsAgo, MONTH)
>     )
> ```
> *That needs compatibility level 1702 or higher — Desktop will prompt you to upgrade. Now our measures just call it:*
> ```DAX
> CurrentMonth = MonthRevenue(0)
> PrevMonth = MonthRevenue(1)
> 'MoM Growth % Var' = DIVIDE(MonthRevenue(0) - MonthRevenue(1), MonthRevenue(1), 0)
> ```
> *One definition of 'revenue N months back.' Documented with a triple-slash comment so anyone calling it sees the signature in IntelliSense. Bug found, bug fixed, and we'll never copy-paste that pattern again."*

---

### ✅ 08:00 - 09:30 | Step 3: The Decision Framework
> **[VISUAL ON SCREEN]**: Three-column comparison table animating in — Model Measure / Visual Calculation / DAX UDF.
>
> **HAKAM (SPEAKER)**:
> *"So which one do you actually use? Simple rule: if the logic is reused across visuals, or RLS and Field Parameters depend on it — model measure. If it's scoped to what's already on one visual — running totals, rankings, period-over-period — visual calculation. And if you catch yourself about to copy-paste a measure with one number changed — that's your DAX UDF moment."*

---

### 🔍 09:30 - 12:00 | Step 4: Auditing the Model — Best Practice Analyzer
> **[VISUAL ON SCREEN]**: Tabular Editor open, Best Practice Analyzer panel scanning the CoffeeShop model, flags appearing in a list.
>
> **HAKAM (SPEAKER)**:
> *"New calculations are great, but what about everything we already built? I ran the free Best Practice Analyzer inside Tabular Editor against our model and fixed what it found before we even started recording:*
> - *Hid `Sheet1[Cost]`, `Stores[StoreID]`, and `Managers_WithStore[UserEmail]` — a surrogate key, a PII column only needed inside our Part 3 RLS rule, and a column already fully covered by the `Profit` measure.
> - *Organized every measure into display folders — KPIs, legacy time intelligence, and debug — so the Fields pane doesn't look like a junk drawer.
>
> What's still open: that bi-directional relationship from Part 3's RLS bridge table — confirmed intentional, but now it's documented instead of silently sitting there. And two visuals on our MCP dashboard still bind directly to raw `Revenue` and `Cups_Sold` columns instead of the named measures — that's on the list for Part 8."*

---

### ⚡ 12:00 - 13:30 | Step 5: Performance Analyzer & Optimize Ribbon
> **[VISUAL ON SCREEN]**: Power BI Desktop, Optimize ribbon, Performance Analyzer panel recording, per-visual duration bars appearing.
>
> **HAKAM (SPEAKER)**:
> *"Last check — is any of this actually slow? Optimize ribbon, Performance Analyzer, Start Recording. Interact with the Field Parameter slicers from Part 4, refresh the visuals, and read the numbers instead of guessing. And while you're mid-redesign, hit Pause Visuals so you're not re-running every query on every layout tweak."*

---

### 🤖 13:30 - 14:15 | Bonus: Copilot Drafts a Visual Calculation
> **[VISUAL ON SCREEN]**: Copilot pane open in Power BI Desktop, typing a natural-language prompt, DAX appearing.
>
> **HAKAM (SPEAKER)**:
> *"One more thing. Open Copilot and ask: 'Write a visual calculation that shows the percentage of total Revenue each Product Category contributes.' It'll draft the DAX — but same rule as Part 6, you read it and validate it before it ships. Copilot writes the first draft. You're still the reviewer."*

---

### 🚀 14:15 - 15:00 | Outro & Free Downloads
> **[VISUAL ON SCREEN]**: Hakam on camera, final matrix with all three visual calculations visible, GitHub link on screen.
>
> **HAKAM (SPEAKER)**:
> *"And that's Part 7 — the modern way to calculate in Power BI, plus a model audit that caught a bug hiding in our own series since Part 2. The full PBIP project, the UDF code, and this script are all linked below on GitHub.
>
> Hit **Like**, **Subscribe** to `@HakamDataStudio`, and tell me in the comments — should Part 8 go into Fabric Git integration, or Direct Lake? Thanks for watching, and I'll see you in the next video!"*
