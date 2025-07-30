# 📊 Part 3 – Dynamic Greeting + Last Refresh Time in Power BI

In this part, we add a **personalized greeting message** with the **last refresh time**.

---

## 🔁 Step 1 – Create Refresh Time Table in Power Query

Go to:

**Home → Transform Data → Power Query Editor → Home → New Source → Blank Query → Advanced Editor**

Then paste this M code:

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

📌 Rename this query to: **Greeting**

---

## ✅ Step 2 – Wrap with DAX (if needed)

```dax
GreetingMessage = FIRSTNONBLANK(Greeting[GreetingMessage], "")
```

Add this to a **Card visual** to show your greeting.

---

## ✅ Alternative: Track Refresh Time (with UTC)

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

📌 Rename this query to: **Fact_RefreshTime**

Then use this DAX:

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
    FORMAT(MAX(Fact_RefreshTime[LastRefreshedLocal]), "yyyy-MM-dd HH:mm:ss")
RETURN
    "Good " & _TimeOfDay & "! Here's the report I refreshed at " & _RefreshTime & "."
```

---

## 🧠 Output Example

| GreetingMessage                                             |
| ----------------------------------------------------------- |
| Good morning! Here's the report I refreshed at 2025-07-30 08:45:12. |
