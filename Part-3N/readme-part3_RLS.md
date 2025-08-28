# 📊 Power BI Row-Level Security (RLS) – Part 3 of Coffee Shop Series

This project is Part 3 of the **Hakam Data Studio Power BI Series**.
In this episode, we implement **Dynamic Row-Level Security (RLS)** in Power BI so each store manager can only view **their store’s data**, while the general manager can view **all stores**—without creating multiple reports.

---

## 🎯 Objective

* Implement **Dynamic RLS** using `USERPRINCIPALNAME()`
* Show how to avoid **many-to-many relationships** by using a **bridge table**
* Configure **relationships** with correct filter direction
* Test RLS in both **Power BI Desktop** and **Power BI Service**
* Personalize the dashboard with a **Welcome message** based on the logged-in user

---

## 🗂️ Data Model

We work with **3 tables**:

1. **Fact\_Sales** → CoffeeShop\_Sales\_v3.xlsx
2. **Dim\_Store** → Store metadata (Store ID, Store Name)
3. **User\_Access** → UserEmail ↔ Store mapping (bridge table)

### Relationships

* `Dim_Store[Store] (1)` → `Fact_Sales[Store] (*)` (Single direction)
* `User_Access[Store] (*)` → `Dim_Store[Store] (1)` (Single, with **Apply security filter in both directions = ON**)

---

## ⚡ Power Query (Prep)

In Power Query we:

* Promoted headers for **Dim\_Store** and **User\_Access**
* Ensured data types (text for emails, int for Store IDs)
* Closed & Applied

---

## 🧮 DAX Code

### 🔐 RLS Role Filter (on `User_Access`)

```DAX
LOWER(TRIM(User_Access[UserEmail])) 
    = LOWER(TRIM(USERPRINCIPALNAME()))
```

---

### 🧑 Debug / Helper Measures

**1. WhoAmI**

```DAX
WhoAmI = USERPRINCIPALNAME()
```

**2. VisibleStores**

```DAX
VisibleStores =
CONCATENATEX(
    VALUES(Dim_Store[Store]),
    Dim_Store[Store],
    ", "
)
```

**3. Personalized Welcome**

```DAX
WelcomeMessage =
"Welcome " & 
SELECTEDVALUE(User_Access[Name], USERPRINCIPALNAME()) & " 👋"
```

---

### 📝 Extra (Optional Polish)

**Friendly Hello**

```DAX
HelloDear =
"Hello dear " & USERPRINCIPALNAME() & " 😊"
```

**Last Refresh**

```DAX
LastRefresh (UTC) =
FORMAT(MAX(RefreshInfo[RefreshedAtUTC]), "yyyy-MM-dd HH:mm:ss") & " UTC"
```

---

## 🖥️ Testing

1. **In Desktop:**

   * Modeling → Manage Roles → Add role `RLS_UserStore` with the DAX rule above.
   * View as → Select “Other user” → enter test email (`sofia@…`) → check if only Store 2 appears.

2. **In Service:**

   * Publish the report.
   * Workspace → Semantic Models → Security → assign users to `RLS_UserStore`.
   * Use “Test as” to confirm each user sees only their store.

---

## 📹 Video Reference

👉 Full video walkthrough: **[YouTube Part 3: Power BI Row-Level Security (RLS) Tutorial](https://youtu.be/YOUR-LINK-HERE)**

---

## 📂 Files

* `CoffeeShop_Sales_v3.xlsx` → Fact table
* `RLS_Tables.xlsx` → Contains `Dim_Store` + `User_Access`
* `Cafe-part3.pbix` → Power BI file with RLS implemented

---

💡 **Next Step (Part 4):** Dashboard Design & UX improvements with conditional formatting, sparklines, and field parameters.


