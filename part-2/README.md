# 📊 Part 2 – Build Power BI Project | Coffee Shop Sales Dashboard Part 2

In this part of the Coffee Shop Sales Dashboard series, we focus on **Data Modeling** and **DAX (Data Analysis Expressions)** to create powerful calculated measures that drive business insights.

---

## 🎯 What You'll Learn in Part 2

In Part 2, you'll:
* **Understand Power BI Data Models** and how to structure your data efficiently
* **Create DAX Measures** — calculated fields that perform complex business logic
* **Build KPIs** — Key Performance Indicators for revenue, profit, and growth tracking
* **Calculate Month-over-Month Growth** to analyze trends over time
* **Enhance dashboard interactivity** using advanced slicers and filters
* **Improve data modeling** by creating relationships and optimizing performance

---

## 🔗 Video Reference

📺 [Build Power BI Project | Coffee Shop Sales Dashboard Part 2 - تحليل الإيرادات والنمو الشهري](https://www.youtube.com/watch?v=mXn-_VGXMsI&lc=UgzMbLIZ8vkHV9dvCq94AaABAg)

---

## 📊 DAX Formulas Explanation

### 1. 🧮 **Profit**

**Formula:**

```DAX
Profit = SUM(Sheet1[Revenue]) - SUM(Sheet1[Cost])
```

* 🇸🇦 **بالعربي**:
  تحسب الربح عن طريق طرح إجمالي التكاليف من إجمالي الإيرادات.

* 🇬🇧 **In English**:
  Calculates total profit by subtracting total cost from total revenue.

---

### 2. 💰 **Price**

**Formula:**

```DAX
Price = SUM(Sheet1[Revenue]) / SUM(Sheet1[Cups_Sold])
```

* 🇸🇦 **بالعربي**:
  تحسب متوسط سعر الكوب الواحد بقسمة إجمالي الإيرادات على عدد الأكواب المباعة.

* 🇬🇧 **In English**:
  Calculates the average price per cup by dividing total revenue by total cups sold.

---

### 3. 📈 **Contribution margin %**

**Formula:**

```DAX
Contribution margin % = ([Profit] / SUM(Sheet1[Revenue])) * 100
```

* 🇸🇦 **بالعربي**:
  تحسب نسبة هامش المساهمة، وهو الربح كنسبة مئوية من الإيرادات.

* 🇬🇧 **In English**:
  Calculates the contribution margin percentage — profit as a percentage of revenue.

---

### 4. 📆 **CurrentMonth**

**Formula:**

```DAX
CurrentMonth = CALCULATE(
    SUM(Sheet1[Revenue]),
    DATESINPERIOD(Dates[Date], MAX(Dates[Date]), -1, MONTH)
)
```

* 🇸🇦 **بالعربي**:
  تحسب الإيرادات خلال آخر شهر (بالاعتماد على آخر تاريخ موجود في الجدول).

* 🇬🇧 **In English**:
  Calculates the revenue for the latest month based on the latest date in the Dates table.

---

### 5. 📆 **PrevMonth**

**Formula:**

```DAX
PrevMonth = CALCULATE(
    SUM(Sheet1[Revenue]),
    DATEADD(Dates[Date], -1, MONTH)
)
```

* 🇸🇦 **بالعربي**:
  تحسب الإيرادات للشهر السابق مباشرة باستخدام إزاحة تاريخية شهر واحد للخلف.

* 🇬🇧 **In English**:
  Calculates the revenue for the previous month using a 1-month date offset.

---

### 6. 🔄 **MoM Growth % 1**

**Formula:**

```DAX
MoM Growth % 1 = DIVIDE([CurrentMonth] - [PrevMonth], [PrevMonth], 0)
```

* 🇸🇦 **بالعربي**:
  تحسب نسبة النمو الشهري من خلال الفرق بين إيرادات الشهر الحالي والشهر السابق، مقسومًا على الشهر السابق.

* 🇬🇧 **In English**:
  Calculates Month-over-Month growth as the difference between current and previous month revenue divided by the previous month.

---

### 7. 📊 **MoM Growth % Var** (باستخدام متغيرات)

**Formula:**

```DAX
MoM Growth % Var = 
VAR CurrentMonth =
    CALCULATE(
        SUM(Sheet1[Revenue]),
        DATESINPERIOD(Dates[Date], MAX(Dates[Date]), -1, MONTH)
    )
VAR PrevMonth =
    CALCULATE(
        SUM(Sheet1[Revenue]),
        DATEADD(Dates[Date], -1, MONTH)
    )
RETURN
    DIVIDE(CurrentMonth - PrevMonth, PrevMonth, 0)
```

* 🇸🇦 **بالعربي**:
  نسخة محسنة من النمو الشهري باستخدام متغيرات لتحسين وضوح المعادلة وأدائها، خصوصًا في الجداول المعقدة.

* 🇬🇧 **In English**:
  An optimized version of Month-over-Month growth using variables for better performance and readability in complex models.

---

## 🛠️ Step-by-Step Implementation

### 1. 📐 Set Up Your Data Model
* Import the cleaned data from Part 1
* Create relationships between tables (if you have multiple tables)
* Set up a **Dates table** for time intelligence (if not already present)
* Ensure all columns have appropriate **data types** (numbers, text, dates, etc.)

### 2. 🧮 Create Basic Measures (Profit, Revenue, Cost)
* Go to **Modeling** tab → **New Measure**
* Create measures for total revenue, total cost, and profit
* Use these base measures as building blocks for more complex calculations

### 3. 📊 Build Advanced DAX Measures (see formulas above)
* Create KPI measures like Profit Margin and Contribution Margin
* Build time-based calculations (Current Month, Previous Month)
* Calculate Month-over-Month Growth percentage

### 4. 🎛️ Add Visuals & Slicers
* Create **Matrix** or **Table** visuals to display measures by Store, Product, or Date
* Add **Slicers** for Date ranges, Store selection, and Product categories
* Verify that all visuals respond correctly to slicer changes

### 5. ✅ Test & Validate
* Cross-check measure calculations manually
* Verify growth percentages and profit margins are correct
* Test edge cases (division by zero, null values, etc.)

---

## 📂 Files Included

* `Café-part 2.pbix` — Power BI Project File (With DAX measures and KPIs)
* `CoffeeShop_Sales_v2.xlsx` — Coffee Shop Sales dataset (Updated)

---

## 🧠 Key Concepts

| Concept | Description |
|---------|-------------|
| **DAX (Data Analysis Expressions)** | A formula language used in Power BI to create custom calculations |
| **Measure** | A calculated field that aggregates data (e.g., SUM, AVERAGE) |
| **KPI** | Key Performance Indicator — a metric that tracks business performance |
| **CALCULATE()** | A DAX function that evaluates an expression in a modified filter context |
| **DATEADD()** | Shifts dates by a specified interval (days, months, years) |
| **DIVIDE()** | Safe division function that handles division by zero |
| **VAR** | Variable used to store intermediate calculations for better performance |

---

## 💡 Best Practices for DAX

* **Use DIVIDE() instead of `/`** — Handles division by zero gracefully
* **Use Variables (VAR)** — Improves performance and readability for complex formulas
* **Name measures clearly** — Use descriptive names like `Total Revenue` instead of `M1`
* **Test edge cases** — Verify formulas work correctly with null/zero values
* **Use CALCULATE() for context modification** — Filter data based on specific conditions

---

## 🚀 Next Steps

Once you complete Part 2, move to **Part 3** to learn about:
* Creating **dynamic greetings** based on time of day
* Implementing **Row-Level Security (RLS)** for data access control
* Adding **refresh timestamps** to your dashboard

---

## 📞 Support

For questions or issues, refer to the main [README.md](../README.md) or check the video comments for additional clarifications.
