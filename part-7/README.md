# 📊 Part 7 – Visual Calculations, DAX UDFs & Model Best Practices | The Modern Way to Calculate

Part 7 continues the **Power BI CoffeeShop** series by leveling up *how* we calculate things. Parts 1–6 built a working, secured, AI-connected dashboard — but every KPI we ever needed (Profit, Price, MoM Growth…) became a permanent measure baked into the semantic model, and some of that DAX was copy-pasted rather than reused. That was the only option in 2023–2024. It no longer is.

This part rebuilds a few of our **Part 2** measures using **Visual Calculations** (GA May 2026) — DAX written directly on a visual instead of the model — refactors a duplicated Part 2 pattern into a **DAX User-Defined Function** (GA June 2026), and then audits the whole CoffeeShop model with the tools that catch the mistakes earlier parts never checked for: the **Best Practice Analyzer** and the native **Optimize ribbon / Performance Analyzer**.

---

## 🆕 Why Now — What Changed Since Part 6

Part 6 (published against the November 2025 release) covered connecting AI agents to the semantic model via the Power BI Modeling MCP server. Since then:

* **November 2025** — "Copilot Everywhere": Report Copilot got a major upgrade in both Power BI Desktop and the Service, and the Power BI MCP Server for VS Code added AI-assisted TMDL editing (auto-documentation, translations, refactoring measures into calculation groups).
* **May 2026** — **Visual Calculations** and **Custom Totals** both reached **General Availability** for table and matrix visuals. You can now write running totals, moving averages, and period-over-period comparisons directly on a visual — no model measure required.
* **June 2026** — **DAX User-Defined Functions (UDFs)** reached **General Availability** (requires model compatibility level 1702+). You can now write a reusable DAX function once and call it from any measure, instead of copy-pasting the same `CALCULATE(...)` pattern.

Part 7 is built around those two GAs, because they directly replace patterns we taught as "the way to do it" back in Part 2.

**Why these two topics specifically:** a keyword and outlier search (via VidIQ) confirmed Visual Calculations already has a proven audience — a real breakout video exists on the exact topic, at decent search volume. DAX UDFs scored an even *better* keyword opportunity (lower competition on "power bi udf" / "dax udf" once you use the terms people actually search) but had zero breakout videos yet — an early-mover topic, not a proven one. Rather than bet the whole episode on the unproven one, Part 7 leads with the validated topic and adds the UDF refactor as a second, lower-risk-but-still-fresh section.

---

## 🎯 What You'll Learn in Part 7

* What a **Visual Calculation** is and how it differs from a model/report measure
* How to rebuild **MoM Growth**, a **running total of Revenue**, and a **moving average of Cups Sold** as visual calculations instead of DAX measures
* How to use **Custom Totals** to show an average or a custom aggregation in a matrix total row, without a workaround measure
* How to refactor Part 2's duplicated `CurrentMonth`/`PrevMonth` DAX into a single reusable **DAX User-Defined Function (UDF)**
* How to decide — **best practice** — when something belongs in the semantic model vs. on the visual vs. inside a UDF
* How to run the **Best Practice Analyzer (BPA)** against the CoffeeShop model to catch issues Parts 1–6 never checked for (e.g. the bi-directional relationship from Part 3's RLS bridge table, implicit measures, unused columns)
* How to use the built-in **Optimize ribbon** and **Performance Analyzer** to see which visuals are actually slow, before you optimize the wrong thing

---

## 🧩 The Gap This Part Fills

| Part | What it taught | What it didn't check |
| --- | --- | --- |
| 2 | DAX measures for Profit, Price, MoM Growth | Whether each measure *should* live in the model at all, and whether the logic inside them was ever meant to be copy-pasted (`CurrentMonth`/`PrevMonth`) |
| 3 | RLS via a bridge table with bi-directional filtering | Whether that bi-directional relationship is safe/performant everywhere else |
| 4 | Field Parameters for flexible visuals | Model impact of the extra parameter tables |
| 5 | Layout, themes, UX polish | Whether the report is actually *fast* |
| 6 | Connecting an AI agent to inspect/edit the model | A structured way to *validate* the model against known rules |

Part 7 is the "close the loop" episode: rebuild smarter, then verify.

---

## 🛠️ Step-by-Step

### 1. 🧮 Visual Calculation #1 — MoM Growth, the new way

In Part 2 we wrote:

```DAX
MoM Growth % Var =
VAR CurrentMonth = CALCULATE(SUM(Sheet1[Revenue]), DATESINPERIOD(Dates[Date], MAX(Dates[Date]), -1, MONTH))
VAR PrevMonth = CALCULATE(SUM(Sheet1[Revenue]), DATEADD(Dates[Date], -1, MONTH))
RETURN DIVIDE(CurrentMonth - PrevMonth, PrevMonth, 0)
```

That's a permanent model measure. Open `Cafe-part 7.pbip` in Power BI Desktop and go to the **"Part 7 - Visual Calculations Lab"** page — it already has a Matrix built with `Dates[YearMonth]` on rows and `Total Revenue`, `Profit`, and `Total Cups Sold` in values, plus on-canvas instructions. You can get the same MoM comparison as a **visual calculation**, scoped to just that visual:

1. Right-click the `Total Revenue` field on the matrix → **New calculation**.
2. Enter:

```DAX
MoM Growth (visual) = DIVIDE([Total Revenue] - PREVIOUS([Total Revenue]), PREVIOUS([Total Revenue]))
```

`PREVIOUS()` walks the axis already on the visual — no `CALCULATE`, no `DATEADD`, no relationship to a Dates table required for this to work.

### 2. 🏃 Visual Calculation #2 — Running Total of Revenue

On the same Matrix:

```DAX
Running Revenue = RUNNINGSUM([Total Revenue], HIGHESTPARENT)
```

Use the **Axis** parameter (`ROWS` / `COLUMNS`) if your matrix has both months across rows and stores across columns and you only want the total running down one direction.

### 3. 📈 Visual Calculation #3 — 3-Month Moving Average of Cups Sold

```DAX
Cups Sold MA3 = MOVINGAVERAGE([Total Cups Sold], 3)
```

### 4. Σ Custom Totals — Fix the "Price" Total Row

`Price = SUM(Revenue) / SUM(Cups Sold)` from Part 2 already avoids the classic "average of averages" bug. Now show it correctly in a matrix total row without a second hidden measure: right-click the total row → **Custom Total** → choose the aggregation the total should actually use (e.g. Average instead of Sum) per column.

### 5. 🧩 DAX UDF — Stop Copy-Pasting Measures

Part 2's `CurrentMonth` and `PrevMonth` measures are two near-identical blocks of DAX:

```DAX
CurrentMonth = CALCULATE(SUM(Sheet1[Revenue]), DATESINPERIOD(Dates[Date], MAX(Dates[Date]), -1, MONTH))
PrevMonth = CALCULATE(SUM(Sheet1[Revenue]), DATEADD(Dates[Date], -1, MONTH))
```

Look closely and they're not even consistent: `CurrentMonth` uses a trailing `DATESINPERIOD` window, `PrevMonth` uses a calendar-month `DATEADD` shift. That inconsistency survived five parts because nothing forced anyone to name and compare the two patterns side by side. A DAX UDF does, because you have to standardize on one signature:

1. In Power BI Desktop, open **Model view** → right-click the model canvas → **New function** (or use DAX Query View's Script TMDL pane).
2. Define one reusable function instead of two near-duplicate measures:

```DAX
function MonthRevenue = (monthsAgo: expr INT64) =>
    CALCULATE(
        SUM(Sheet1[Revenue]),
        DATEADD(Dates[Date], -monthsAgo, MONTH)
    )
```

3. Rewrite the old measures to call it:

```DAX
CurrentMonth = MonthRevenue(0)
PrevMonth = MonthRevenue(1)
'MoM Growth % Var' = DIVIDE(MonthRevenue(0) - MonthRevenue(1), MonthRevenue(1), 0)
```

Now there's one definition of "revenue N months back" instead of two drifting copies, and it's documented with a `///` comment so IntelliSense shows the signature to anyone calling it later. This requires bumping the model's compatibility level to **1702+** — Desktop will prompt you. Note this is authored live in Desktop's Model view or DAX Query View, the same way visual calculations are — it's not something hand-written into the TMDL project files, so it isn't pre-built into this repo's `Cafe-part 7.SemanticModel` yet.

### 6. ✅ Decide: Model Measure, Visual Calculation, or UDF?

| Use a **model measure** when… | Use a **visual calculation** when… | Use a **DAX UDF** when… |
| --- | --- | --- |
| The logic is reused across many visuals/pages | It's specific to one table or matrix | The *same calculation pattern* is duplicated across two or more measures |
| Row-Level Security or Field Parameters depend on it | It's a running total, rank, or period-over-period math scoped to what's already on the visual | You want one documented, testable definition instead of copy-pasted DAX |
| Other people/reports need to consume it via the semantic model | You want to avoid growing the model with one-off measures | The parameterized logic (e.g. "N months back") is reused with different inputs |
| It needs to work outside table/matrix visuals | It's exploratory — you're prototyping before deciding it's worth promoting to a measure | You're on compatibility level 1702+ and want IntelliSense-documented, reusable logic |

### 7. 🔍 Audit the Model — Best Practice Analyzer

Visual calculations clean up *new* work. Best Practice Analyzer (BPA) checks what we already built. The Part 7 model (`Cafe-part 7.SemanticModel`, copied and updated from Part 6) already has a few obvious fixes applied so you can show the before/after live in the video:

- **Hid technical columns that were never dragged into a visual**: `Sheet1[Cost]` (fully covered by the `Profit` measure), `Stores[StoreID]` (surrogate key), and `Managers_WithStore[UserEmail]` (PII, only needed inside the RLS rule — the RLS role still works fine on a hidden column).
- **Organized measures into display folders** — `KPIs` for the reusable business measures, `Time Intelligence (legacy - see Part 7 Visual Calculations Lab)` for the Part 2 measures this episode is replacing, and `Debug` for exploratory ones (`Revenue1`, `Revenue of Downtown`) — purely cosmetic, doesn't change any visual binding.

To find what's still outstanding:

1. Install [Tabular Editor](https://tabulareditor.com/) (free, Tabular Editor 2 or 3) and open `part-7/Cafe-part 7.SemanticModel`, or point it at the running Power BI Desktop session.
2. Run **Best Practice Analyzer** with the standard [Microsoft/Tabular Editor rule set](https://github.com/microsoft/Analysis-Services/tree/master/BestPracticeRules).
3. Review flags relevant to this project, for example:
   - Bi-directional relationship on `Managers_WithStore` ↔ `Stores` from Part 3 — confirm it's intentional (RLS) and not silently affecting other visuals.
   - Any implicit measures (aggregating a raw column straight from a visual instead of a named measure) — `Sheet1[Revenue]` and `Sheet1[Cups_Sold]` are still visible because two Part 6 dashboard visuals bind to them directly; decide whether to repoint those visuals to the `Total Revenue` / `Total Cups Sold` measures and hide the columns too.
   - Unused columns or measures that never made it into a visual or a relationship.
4. Fix or document each finding.

### 8. ⚡ Find What's Actually Slow — Optimize Ribbon

Before touching DAX for performance reasons, measure first:

1. **Optimize** ribbon → **Performance analyzer** → **Start recording**.
2. Refresh visuals and interact with slicers/Field Parameters from Part 4.
3. Read the DAX query / visual display duration per visual — fix the slowest one first.
4. Use **Pause visuals** while you're actively designing so every layout tweak doesn't re-run every query.

### 9. 🤖 Bonus — Ask Copilot for a First Draft

In Power BI Desktop, open **Copilot** and ask something like:

```text
Write a visual calculation that shows the percentage of total Revenue
each Product Category contributes, for the matrix on this page.
```

Review and adjust the generated DAX — Copilot drafts it, you still validate it, same principle as the read-only-first workflow from Part 6.

---

## 🧠 Key Concepts

| Concept | Description |
| --- | --- |
| **Visual Calculation** | DAX written directly on a visual, evaluated against what's already on that visual's axes |
| **PREVIOUS() / RUNNINGSUM() / MOVINGAVERAGE()** | Visual-calculation functions for period comparisons, running totals, and rolling averages |
| **Custom Total** | A per-column aggregation override for a table/matrix total row, set without DAX |
| **DAX User-Defined Function (UDF)** | A reusable DAX function, callable from any measure, defined once in the model (compatibility level 1702+) instead of copy-pasted |
| **Best Practice Analyzer (BPA)** | A rule engine (via Tabular Editor) that scans a semantic model for known modeling and performance anti-patterns |
| **Optimize ribbon** | Native Power BI Desktop ribbon for pausing visual refresh and launching Performance Analyzer |

---

## 💡 Best Practice Checklist

- [ ] Reusable, cross-report logic → model measure. One-off, visual-scoped math → visual calculation. Duplicated calculation *patterns* → DAX UDF.
- [ ] Before adding a second near-identical measure, ask whether it should be a parameterized UDF instead.
- [ ] Every bi-directional relationship has a documented reason (ours: RLS bridge table from Part 3).
- [ ] Run BPA after any significant modeling change, not just once.
- [ ] Profile with Performance Analyzer before optimizing — don't guess which visual is slow.
- [ ] Treat Copilot/AI output as a draft, not a final answer — review before publishing.

---

## 📂 Files

* `Cafe-part 7.pbip` — Power BI Project pointer file, open this in Power BI Desktop
* `Cafe-part 7.SemanticModel/` — TMDL semantic model (copied from Part 6, plus the display-folder and hidden-column cleanup described above)
* `Cafe-part 7.Report/` — PBIR report, including the new **"Part 7 - Visual Calculations Lab"** page with a ready-built Matrix and on-canvas instructions
* `CoffeeShop_Sales_v3.xlsx`, `RLS_Tables.xlsx` — datasets (same as Part 6)
* `README.md` — this guide
* `assets/` — thumbnail and images for Part 7

On first open, Power BI Desktop will likely ask you to repoint the Excel data sources (**Transform data → Data source settings**) to wherever `CoffeeShop_Sales_v3.xlsx` and `RLS_Tables.xlsx` live on your machine — same as every other part in this repo, since the M queries store an absolute file path.

## 📌 Status

✅ PBIP scaffold, data model cleanup, and the Visual Calculations Lab page are in the repo.
🚧 Still to do: record the video, add the visual calculations and the DAX UDF live in Desktop (see Steps 1–3 and 5 above — both are authored interactively and aren't hand-written into the project files), bump the model to compatibility level 1702+ for the UDF, and export a `.pbix` alongside it.

## 🚀 Next Steps

Ideas being considered for **Part 8**: Direct Lake / Fabric Lakehouse connectivity, and native Fabric Git integration to replace the manual GitHub PR workflow from Part 6.

---

## 🎓 Resources

* [Power BI November 2025 Feature Summary](https://powerbi.microsoft.com/en-us/blog/power-bi-november-2025-feature-summary/)
* [Visual calculations overview – Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview)
* [Deep dive into visual calculations (GA) – Fabric Community blog](https://community.fabric.microsoft.com/t5/Power-BI-Updates-Blog/Deep-dive-into-visual-calculations-Adding-calculations-directly/ba-p/5255359)
* [Use DAX user-defined functions – Microsoft Learn](https://learn.microsoft.com/en-us/dax/best-practices/dax-user-defined-functions)
* [Using DAX user-defined functions in Power BI – Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-user-defined-functions-overview)
* [DAX User-Defined Functions (Generally Available) – Fabric Community blog](https://community.fabric.microsoft.com/t5/Power-BI-Updates-Blog/DAX-User-Defined-Functions-Generally-Available/ba-p/5185738)
* [Optimize ribbon in Power BI Desktop – Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-optimize-ribbon)
* [Best Practice Analyzer (BPA) rules for semantic models – Tabular Editor](https://tabulareditor.com/blog/best-practice-analyzer-bpa-rules-for-semantic-models)
* [Microsoft/Analysis-Services BestPracticeRules (GitHub)](https://github.com/microsoft/Analysis-Services/tree/master/BestPracticeRules)

## 📞 Support

For questions or issues, refer to the main [README.md](../README.md) or check the video comments for additional clarifications.
