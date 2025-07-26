# Power-BI-2


## 📅 شرح كود جدول التواريخ في Power BI

### 🇸🇦 بالعربي:

الكود التالي يُستخدم لإنشاء جدول تواريخ مخصص في Power BI، مع إضافة أعمدة مفيدة لتحليل البيانات الزمنية:

```DAX
Dates = 
ADDCOLUMNS(
    CALENDARAUTO(),
    "Year",YEAR([Date]),
    "MonthNum",MONTH([Date]),
    "MonthName",FORMAT([Date],"MMMM"),
    "YearMonth",FORMAT([Date],"YYYY-MM")
)
