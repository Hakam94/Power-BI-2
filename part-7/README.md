# 📊 Part 7 – Visual Calculations & Model Best Practices | The Modern Way to Calculate

Part 7 continues the **Power BI CoffeeShop** series by leveling up *how* we calculate things. Parts 1–6 built a working, secured, AI-connected dashboard — but every KPI we ever needed (Profit, Price, MoM Growth…) became a permanent measure baked into the semantic model. That was the only option in 2023–2024. It no longer is.

This part rebuilds a few of our **Part 2** measures using **Visual Calculations** (GA May 2026) — DAX written directly on a visual instead of the model — and then audits the whole CoffeeShop model with the tools that catch the mistakes earlier parts never checked for: the **Best Practice Analyzer** and the native **Optimize ribbon / Performance Analyzer**.

---

## 🆕 Why Now — What Changed Since Part 6

Part 6 (published against the November 2025 release) covered connecting AI agents to the semantic model via the Power BI Modeling MCP server. Since then:

* **November 2025** — "Copilot Everywhere": Report Copilot got a major upgrade in both Power BI Desktop and the Service, and the Power BI MCP Server for VS Code added AI-assisted TMDL editing (auto-documentation, translations, refactoring measures into calculation groups).
* **May 2026** — **Visual Calculations** and **Custom Totals** both reached **General Availability** for table and matrix visuals. You can now write running totals, moving averages, and period-over-period comparisons directly on a visual — no model measure required.

Part 7 is built around that May 2026 GA, because it directly replaces a pattern we taught as "the way to do it" back in Part 2.

---

## 🎯 What You'll Learn in Part 7

* What a **Visual Calculation** is and how it differs from a model/report measure
* How to rebuild **MoM Growth**, a **running total of Revenue**, and a **moving average of Cups Sold** as visual calculations instead of DAX measures
* How to use **Custom Totals** to show an average or a custom aggregation in a matrix total row, without a workaround measure
* How to decide — **best practice** — when something belongs in the semantic model vs. on the visual
* How to run the **Best Practice Analyzer (BPA)** against the CoffeeShop model to catch issues Parts 1–6 never checked for (e.g. the bi-directional relationship from Part 3's RLS bridge table, implicit measures, unused columns)
* How to use the built-in **Optimize ribbon** and **Performance Analyzer** to see which visuals are actually slow, before you optimize the wrong thing

---

## 🧩 The Gap This Part Fills

| Part | What it taught | What it didn't check |
| --- | --- | --- |
| 2 | DAX measures for Profit, Price, MoM Growth | Whether each measure *should* live in the model at all |
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

That's a permanent model measure. On a **Matrix** with `Revenue` by month, you can now get the same comparison as a **visual calculation**, scoped to just that visual:

1. Build a Matrix with `Month` on rows and the `Revenue` measure in values.
2. Right-click the `Revenue` field on the visual → **New calculation**.
3. Enter:

```DAX
MoM Growth (visual) = DIVIDE([Revenue] - PREVIOUS([Revenue]), PREVIOUS([Revenue]))
```

`PREVIOUS()` walks the axis already on the visual — no `CALCULATE`, no `DATEADD`, no relationship to a Dates table required for this to work.

### 2. 🏃 Visual Calculation #2 — Running Total of Revenue

On the same Matrix:

```DAX
Running Revenue = RUNNINGSUM([Revenue], HIGHESTPARENT)
```

Use the **Axis** parameter (`ROWS` / `COLUMNS`) if your matrix has both months across rows and stores across columns and you only want the total running down one direction.

### 3. 📈 Visual Calculation #3 — 3-Month Moving Average of Cups Sold

```DAX
Cups Sold MA3 = MOVINGAVERAGE([Cups Sold], 3)
```

### 4. Σ Custom Totals — Fix the "Price" Total Row

`Price = SUM(Revenue) / SUM(Cups Sold)` from Part 2 already avoids the classic "average of averages" bug. Now show it correctly in a matrix total row without a second hidden measure: right-click the total row → **Custom Total** → choose the aggregation the total should actually use (e.g. Average instead of Sum) per column.

### 5. ✅ Decide: Visual Calculation or Model Measure?

| Use a **model measure** when… | Use a **visual calculation** when… |
| --- | --- |
| The logic is reused across many visuals/pages | It's specific to one table or matrix |
| Row-Level Security or Field Parameters depend on it | It's a running total, rank, or period-over-period math scoped to what's already on the visual |
| Other people/reports need to consume it via the semantic model | You want to avoid growing the model with one-off measures |
| It needs to work outside table/matrix visuals | It's exploratory — you're prototyping before deciding it's worth promoting to a measure |

### 6. 🔍 Audit the Model — Best Practice Analyzer

Visual calculations clean up *new* work. Best Practice Analyzer (BPA) checks what we already built:

1. Install [Tabular Editor](https://tabulareditor.com/) (free, Tabular Editor 2 or 3) and open the Part 6 PBIP semantic model (`part-6/Cafe-part 6.SemanticModel`), or point it at the running Power BI Desktop session.
2. Run **Best Practice Analyzer** with the standard [Microsoft/Tabular Editor rule set](https://github.com/microsoft/Analysis-Services/tree/master/BestPracticeRules).
3. Review flags relevant to this project, for example:
   - Bi-directional relationship on `User_Access` ↔ `Dim_Store` from Part 3 — confirm it's intentional (RLS) and not silently affecting other visuals.
   - Any implicit measures (aggregating a raw column straight from a visual instead of a named measure).
   - Unused columns imported in Parts 1–2 that never made it into a measure or a relationship.
4. Fix or document each finding.

### 7. ⚡ Find What's Actually Slow — Optimize Ribbon

Before touching DAX for performance reasons, measure first:

1. **Optimize** ribbon → **Performance analyzer** → **Start recording**.
2. Refresh visuals and interact with slicers/Field Parameters from Part 4.
3. Read the DAX query / visual display duration per visual — fix the slowest one first.
4. Use **Pause visuals** while you're actively designing so every layout tweak doesn't re-run every query.

### 8. 🤖 Bonus — Ask Copilot for a First Draft

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
| **Best Practice Analyzer (BPA)** | A rule engine (via Tabular Editor) that scans a semantic model for known modeling and performance anti-patterns |
| **Optimize ribbon** | Native Power BI Desktop ribbon for pausing visual refresh and launching Performance Analyzer |

---

## 💡 Best Practice Checklist

- [ ] Reusable, cross-report logic → model measure. One-off, visual-scoped math → visual calculation.
- [ ] Every bi-directional relationship has a documented reason (ours: RLS bridge table from Part 3).
- [ ] Run BPA after any significant modeling change, not just once.
- [ ] Profile with Performance Analyzer before optimizing — don't guess which visual is slow.
- [ ] Treat Copilot/AI output as a draft, not a final answer — review before publishing.

---

## 📂 Files

* `README.md` — this guide (planning reference for the Part 7 video)
* `assets/` — thumbnail and images for Part 7

The updated `.pbix`/PBIP files with the visual calculations above will be added here alongside the recorded video.

## 📌 Status

🚧 Guide drafted — video recording and dataset/report files pending.

## 🚀 Next Steps

Ideas being considered for **Part 8**: Direct Lake / Fabric Lakehouse connectivity, and native Fabric Git integration to replace the manual GitHub PR workflow from Part 6.

---

## 🎓 Resources

* [Power BI November 2025 Feature Summary](https://powerbi.microsoft.com/en-us/blog/power-bi-november-2025-feature-summary/)
* [Visual calculations overview – Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview)
* [Deep dive into visual calculations (GA) – Fabric Community blog](https://community.fabric.microsoft.com/t5/Power-BI-Updates-Blog/Deep-dive-into-visual-calculations-Adding-calculations-directly/ba-p/5255359)
* [Optimize ribbon in Power BI Desktop – Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-optimize-ribbon)
* [Best Practice Analyzer (BPA) rules for semantic models – Tabular Editor](https://tabulareditor.com/blog/best-practice-analyzer-bpa-rules-for-semantic-models)
* [Microsoft/Analysis-Services BestPracticeRules (GitHub)](https://github.com/microsoft/Analysis-Services/tree/master/BestPracticeRules)

## 📞 Support

For questions or issues, refer to the main [README.md](../README.md) or check the video comments for additional clarifications.
