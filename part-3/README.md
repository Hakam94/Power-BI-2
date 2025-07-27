### 📄 `part-3/README.md`

````markdown
# 📊 Part 3 – Dynamic Greeting + Refresh Timestamp in Power BI

In this step, we focus on enhancing the user experience with a **personalized greeting message** and **automatic refresh time tracking**, using both **DAX** and **M (Power Query)**.

---

## ✅ Objective

- Show a custom greeting (Good morning / afternoon / evening)
- Display the exact time the report was last refreshed
- Optionally build the entire logic using **only M code** (no DAX)

---

## 🧠 DAX Approach

### 1. Create a Refresh Table in Power Query

Go to Power Query Editor and create a **new blank query**. Rename it to: `Fact_RefreshTime`

Paste the following:

```m
let
    LastRefreshedLocal = DateTime.LocalNow(),
    LastRefreshedUTC = DateTimeZone.RemoveZone(DateTimeZone.UtcNow()),
    RefreshTable = #table(
        {"LastRefreshedLocal", "LastRefreshedUTC"},
        {{LastRefreshedLocal, LastRefreshedUTC}}
    ),
    ChangedType = Table.TransformColumnTypes(RefreshTable, {
        {"LastRefreshedLocal", type datetime}, 
        {"LastRefreshedUTC", type datetime}
    })
in
    ChangedType
````

### 2. DAX Measure: `Last Data Refresh Time`

```dax
Last Data Refresh Time = MAX(Fact_RefreshTime[LastRefreshedLocal])
```

### 3. DAX Measure: `GreetingMessage`

```dax
GreetingMessage =
VAR _CurrentHour = HOUR(NOW())
VAR _TimeOfDay =
    SWITCH(
        TRUE(),
        _CurrentHour >= 0 && _CurrentHour < 12, "morning",
        _CurrentHour >= 12 && _CurrentHour < 18, "afternoon",
        "evening"
    )
VAR _RefreshTime =
    FORMAT([Last Data Refresh Time], "HH:mm:ss")
RETURN
    "Good " & _TimeOfDay & "! Here's the report I refreshed at " & _RefreshTime & "."
```

---

## 🎁 BONUS – Build Everything in M (No DAX Needed)

If you want a **pure M solution** (no measures), here's the complete code:

```m
let
    // Step 1: Get the current local datetime
    Now = DateTime.LocalNow(),

    // Step 2: Extract hour using proper M syntax
    CurrentHour = Time.Hour(DateTime.Time(Now)),

    // Step 3: Determine time of day
    TimeOfDay =
        if CurrentHour < 12 then "morning"
        else if CurrentHour < 18 then "afternoon"
        else "evening",

    // Step 4: Format refresh time as HH:mm:ss
    FormattedTime = Time.ToText(DateTime.Time(Now), "HH:mm:ss"),

    // Step 5: Build greeting message
    Greeting = "Good " & TimeOfDay & "! Here's the report I refreshed at " & FormattedTime & ".",

    // Step 6: Return as single-row table
    Output = #table(
        {"GreetingMessage"},
        {{Greeting}}
    )
in
    Output
```

📌 **To use this:**

* Create a blank query
* Paste the code above
* Rename it to `Greeting`
* Add a Card visual in Power BI: select `Greeting[GreetingMessage]`

---

## ✅ Result Example:

| GreetingMessage                                          |
| -------------------------------------------------------- |
| Good morning! Here's the report I refreshed at 08:44:13. |

---



