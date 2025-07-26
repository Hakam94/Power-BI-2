## 🔗 رابط الفيديو المرتبط:

📺 [تحليل الإيرادات والنمو الشهري في Power BI](https://www.youtube.com/watch?v=mXn-_VGXMsI&lc=UgzMbLIZ8vkHV9dvCq94AaABAg)

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
