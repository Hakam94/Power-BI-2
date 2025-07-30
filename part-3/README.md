### 📄 Final `part-3/README.md`

````markdown
# 📊 Part 3 – Dynamic Greeting + Last Refresh Time in Power BI

In this part, we enhance the dashboard user experience by adding a **personalized greeting message** that includes the **last time the report was refreshed**.

You’ll learn how to:
- Create a Power Query table to capture the refresh time
- Build a DAX measure that shows a dynamic greeting message with that time

---

## 🔁 Step 1 – Create Refresh Time Table (M Language)

1. Go to **Home → Transform Data → Power Query Editor**  
2. In Power Query, click **Home → New Source → Blank Query**  
3. With the new Blank Query selected, go to **Home → Advanced Editor**  
4. Paste the following M code into the Advanced Editor:

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
```

📌 Rename the query to: `Fact_RefreshTime`  
📌 This query will refresh every time the dataset is refreshed

---

## ✅ Option 1 – DAX-Only (Recommended)

After the M query is loaded, create this DAX measure:

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
    FORMAT(MAX(Fact_RefreshTime[LastRefreshedLocal]), "HH:mm:ss")
RETURN
    "Good " & _TimeOfDay & "! Here's the report I refreshed at " & _RefreshTime & "."
```

✅ Place this measure inside a **Card visual** to show the dynamic greeting.

---

## 🟡 Option 2 – M Query with Wrapper DAX

If you prefer to generate the greeting **directly in Power Query**, use this M code in the Advanced Editor of a Blank Query:

```m
let
    Now = DateTime.LocalNow(),
    CurrentHour = Time.Hour(DateTime.Time(Now)),
    TimeOfDay =
        if CurrentHour < 12 then "morning"
        else if CurrentHour < 18 then "afternoon"
        else "evening",
    FormattedTime = Time.ToText(DateTime.Time(Now), "HH:mm:ss"),
    Greeting = "Good " & TimeOfDay & "! Here's the report I refreshed at " & FormattedTime & ".",
    Output = #table(
        {"GreetingMessage"},
        {{Greeting}}
    )
in
    Output
```

📌 Rename this query to **Greeting**  

Then create a simple DAX measure to show it in a visual:

```dax
GreetingMessage = FIRSTNONBLANK(Greeting[GreetingMessage], "")
```

---

## 🧠 Summary

| Step    | Description                                                         | Required?     |
| ------- | ------------------------------------------------------------------- | ------------- |
| Step 1  | Create a table in Power Query with refresh datetime                 | ✅ Yes         |
| Step 2A | Build greeting logic in DAX using `MAX(...)`                        | ✅ Recommended |
| Step 2B | Optional: Build greeting directly in M, wrap with `FIRSTNONBLANK()` | Optional      |

---

## ✅ Output Example

| GreetingMessage                                            |
| ---------------------------------------------------------- |
| Good afternoon! Here's the report I refreshed at 15:08:42. |

---
````
