# 📊 Part 4 – Field Parameters in Power BI | The Smart Dashboard Technique

In this part of the Coffee Shop Sales Dashboard series, we implement the **Smart Dashboard Technique** using **Field Parameters** in Power BI. 

---

## 🔗 Video Reference

📺 [Field Parameters in Power BI Part 4 | The Smart Dashboard Technique](https://youtu.be/81GNe3HosF4)

---

## 🎯 What are Field Parameters?

Field Parameters allow users to dynamically change the measures or dimensions being analyzed in a visual using a slicer. This provides a highly flexible user interface and prevents dashboard clutter by eliminating the need to create multiple separate visuals.

* 🇸🇦 **بالعربي**:
  تتيح **Field Parameters** للمستخدمين تغيير المقاييس (Measures) أو الأبعاد (Dimensions) التي يتم تحليلها في الرسم البياني بشكل ديناميكي باستخدام عامل تصفية (Slicer). يمنح هذا واجهة مستخدم مرنة للغاية ويمنع تكدس لوحة البيانات (Clutter) دون الحاجة لإنشاء رسوم بيانية متعددة.

---

## 🛠️ Step-by-Step Implementation

### 1. ⚙️ Create a Field Parameter
Go to **Modeling** tab → **New Parameter** → **Fields**.

* **For Dimensions (الأبعاد)**: Add fields like `Store Name`, `Product Category`, and `Product Type`.
* **For Measures (المقاييس)**: Add measures like `Revenue`, `Profit`, and `Cups Sold`.

### 2. 🎛️ Configure the Slicer
Once created, Power BI generates a table and automatically creates a slicer on your report page. Users can use this slicer to switch what they want to see.

### 3. 📊 Connect to Visuals
Drag the newly created Field Parameter field to the **X-axis** (for dynamic dimensions) or **Y-axis** (for dynamic measures) of your charts.

---

## 📂 Files Included

*(Note: Files will be updated soon. Please request the `.pbix` and `.xlsx` files if needed)*

* `CoffeeShop_Sales_v4.xlsx` (Dataset)
* `Café-part 4_smart_dashboard.pbix` (Power BI Project File)
