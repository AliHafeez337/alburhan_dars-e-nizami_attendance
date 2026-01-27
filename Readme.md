# 📚 Student Attendance Tracking System

## 📋 Overview
A comprehensive Google Sheets-based attendance tracking system for managing student attendance across 7 groups with automated monthly sheet creation, Urdu language support, automatic cell coloring, and visual reporting dashboard.

---

## ✨ Key Features

### 1. **Template-Based Structure**
- Master TEMPLATE sheet with 7 pre-configured groups (Urdu names)
- Each group contains:
  - 2-row colored header (dark green background)
  - Dynamic student rows (add as many as needed)
  - **3 columns in template:**
    - Column A: Student Names
    - Column B: Contact Numbers
    - Column C: مربی (Supervisor/Teacher)

### 2. **Urdu Language Support**
- **Day Names in Urdu** (All 7 days):
  - اتوار (Sunday)
  - پیر (Monday)
  - منگل (Tuesday)  
  - بدھ (Wednesday)
  - جمعرات (Thursday)
  - جمعہ (Friday)
  - ہفتہ (Saturday)

- **Attendance Status in Urdu**:
  - حاضر (Present) - Auto-colors GREEN
  - غیر حاضر (Absent) - Auto-colors RED
  - چھٹی (Leave) - Auto-colors YELLOW
  - تعطیل (Holiday) - Auto-colors GRAY

### 3. **All Days of Month**
- Includes **ALL days** (1-31 depending on month)
- Shows **weekends** (Saturday & Sunday)
- Displays date format: "01 (پیر)" - Date with Urdu day name
- **Weekend highlighting:**
  - Fridays: Light green background
  - Saturday/Sunday: Light gray background

### 4. **Automatic Cell Coloring** 🎨
When you mark attendance, cells automatically change color:
- حاضر (Present) → 🟢 Light Green
- غیر حاضر (Absent) → 🔴 Light Red
- چھٹی (Leave) → 🟡 Light Yellow
- تعطیل (Holiday) → ⚫ Light Gray

### 5. **Automated Monthly Sheets**
- Automatic creation on the 1st of each month at 9:00 AM
- Manual creation option available anytime
- Sheet naming: "January 2026", "February 2026", etc.
- **Only copies Column A (student names)** from template
- Contact and مربی columns stay in template only
- Date columns start from Column B

### 6. **Reports Dashboard**
- **7 Multi-Bar Charts** (one per group):
  - Shows all 4 attendance types per month
  - Color-coded bars (Green, Red, Yellow, Gray)
  - All text in Urdu
- Group-wise attendance analysis
- Monthly comparison tables
- Summary statistics

### 7. **Smart Data Validation**
- **Strict dropdown menus** - only dropdown selection allowed
- Rejects manually typed invalid values
- Applied ONLY to student rows (not group headers)
- Auto-colors cells based on selection

### 8. **Performance Optimized**
- Processes only actual data rows (~90 rows)
- Creates monthly sheets in ~30-60 seconds
- Reports update quickly by reading actual attendance data

---

## 🗂️ Sheet Structure

### TEMPLATE Sheet Structure

```
┌───────────────────────────────────────────────────────────────┐
│ Row 1: [FROZEN] Student Names│Contact No│ مربی │Date Columns→ │
├───────────────────────────────────────────────────────────────┤
│ Rows 2-3: اولیٰ (2 rows, dark green across A-C)               │
├───────────────────────────────────────────────────────────────┤
│ Rows 4-13: Student 1 | 0300-xxx | Teacher1                    │
│           Student 2 | 0301-xxx | Teacher2                    │
│           ...                                                  │
├───────────────────────────────────────────────────────────────┤
│ Rows 14-15: ثانیہ (2 rows, dark green)                        │
├───────────────────────────────────────────────────────────────┤
│ Rows 16-25: Student 1 | 0302-xxx | Teacher3                   │
│            ...                                                 │
├───────────────────────────────────────────────────────────────┤
│ [... 5 more groups: ثالثہ, رابعہ, خامسہ, سادسه, سابعه]        │
└───────────────────────────────────────────────────────────────┘
```

### Monthly Sheet Structure (e.g., "January 2026")

```
┌───────────────────────────────────────────────────────────────┐
│ Row 1: [FROZEN] Student Names│01(اتوار)│02(پیر)│03(منگل)...   │
├───────────────────────────────────────────────────────────────┤
│ Rows 2-3: اولیٰ (2 rows, dark green across all columns)        │
├───────────────────────────────────────────────────────────────┤
│ Student 1 │ حاضر (GREEN) │ حاضر (GREEN) │ چھٹی (YELLOW) ...  │
│ Student 2 │ غیر حاضر (RED)│ حاضر (GREEN) │ حاضر (GREEN) ...   │
└───────────────────────────────────────────────────────────────┘
```

**Key Differences from Template:**
- ✅ Only Column A copied (student names)
- ✅ NO Contact or مربی columns
- ✅ Date columns start from Column B
- ✅ ALL days of month (including weekends)
- ✅ Cells auto-color based on attendance

### Column Layout

**TEMPLATE Sheet:**
- **Column A**: Student Names (FROZEN)
- **Column B**: Contact Numbers
- **Column C**: مربی (Supervisor)
- **Column D+**: Placeholder for dates

**MONTHLY Sheets:**
- **Column A**: Student Names (FROZEN)
- **Column B+**: Date columns (all days of month)

### Row Structure Per Group
1. **Rows 1-2**: Group header (2 rows, dark green #38761d, Column A merged vertically)
2. **Rows 3+**: Student data rows with attendance dropdowns

---

## 🚀 Installation & Setup Guide

### Step 1: Create Your Google Sheet
1. Open Google Sheets
2. Create a new blank spreadsheet
3. Name it (e.g., "Student Attendance 2026")

### Step 2: Add the Scripts
1. In your sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in `Code.gs`
3. Create 4 new script files by clicking the **+** button:
   - `Template.gs` - Template creation functions
   - `Monthly.gs` - Monthly automation functions  
   - `Reports.gs` - Reporting dashboard functions
   - `Menu.gs` - Menu setup and utilities

4. Copy and paste the corresponding code into each file
5. Click **Save** (💾 icon)

### Step 3: Initial Setup
1. **Close** the Apps Script editor
2. **Refresh** your Google Sheet (press F5)
3. You'll see a new menu: **"📊 Attendance System"**
4. Click: **📊 Attendance System** → **📝 Create Template**
5. Wait for confirmation: "Template created successfully!"
6. A new sheet tab **TEMPLATE** will appear

### Step 4: Row 1 and Column A Are Auto-Frozen ✅
The script automatically freezes:
- **Row 1** (header row stays visible when scrolling down)
- **Column A** (student names stay visible when scrolling right)

### Step 5: Customize Your Template
1. Click on the **TEMPLATE** sheet
2. You'll see the structure with 7 Urdu group names:
   - اولیٰ (Oula)
   - ثانیہ (Sania)
   - ثالثہ (Salisa)
   - رابعہ (Rabia)
   - خامسہ (Khamisa)
   - سادسه (Sadisa)
   - سابعه (Sabia)

### Add Your Student Names:

**For each group, replace the placeholder names:**

**Example - اولیٰ group (rows 4-13):**
```
Row 4: Ahmad Ali
Row 5: Fatima Hassan
Row 6: Usman Ahmed
Row 7: Ayesha Khan
... (add up to 10 or more students)
```

### Add Contact Numbers & مربی:

**In Columns B and C:**
```
Row 4: 0300-1234567 | Ustadh Mahmood
Row 5: 0321-7654321 | Ustadh Mahmood
Row 6: 0333-9876543 | Ustadha Aisha
...
```

### Adding More Students:

**If a group needs more than 10 students:**
1. Right-click on a row below the 10th student
2. Click "Insert 1 row below"
3. Add the student name, contact, and مربی
4. Repeat as needed

**Important:** Don't insert rows BETWEEN group headers and their students!

### Step 6: Setup Automation
1. Click **📊 Attendance System**
2. Click **⚙️ Setup Automation**
3. **IMPORTANT: Grant Permissions**
   - Google will ask for authorization
   - Click "Review Permissions"
   - Select your Google account
   - You may see "Google hasn't verified this app"
     - Click "Advanced"
     - Click "Go to [Your Project Name] (unsafe)"
     - This is YOUR own script, it's safe
   - Click "Allow"
4. You'll see: "✅ Automation Setup Complete!"

**What this does:**
- Creates a trigger that runs on the 1st of each month at 9:00 AM
- Automatically creates a new monthly sheet
- No manual intervention needed

### Step 7: Create Your First Monthly Sheet
1. Click **📊 Attendance System**
2. Click **📅 Create New Month**
3. Wait ~30-60 seconds
4. A new sheet appears: "January 2026" (or current month)

**What you'll see:**
- Only student names (from Column A of template)
- NO Contact or مربی columns
- Date columns starting from Column B
- ALL days of the month (1-31)
- Format: "01 (اتوار)", "02 (پیر)", etc.
- Dropdown menus on student rows (حاضر, غیر حاضر, چھٹی, تعطیل)
- Group headers (2 rows, dark green across all columns)
- **Auto-frozen Row 1 and Column A**

### Step 8: Test the Attendance System

### Take Sample Attendance:

1. Go to your monthly sheet (e.g., "January 2026")
2. Click on any student's cell under a date
3. You'll see a dropdown appear
4. Select an option:
   - **حاضر** (Present) → Cell turns 🟢 GREEN
   - **غیر حاضر** (Absent) → Cell turns 🔴 RED
   - **چھٹی** (Leave) → Cell turns 🟡 YELLOW
   - **تعطیل** (Holiday) → Cell turns ⚫ GRAY
5. Watch the cell automatically change color!
6. Repeat for multiple students and dates

### Verify Features:

1. **Group headers:** Should be dark green across ALL columns (2 rows)
2. **Dropdowns:** Only appear on student rows (not group headers)
3. **Auto-coloring:** Cells change color when you select attendance
4. **Weekends:** Saturday/Sunday shown in light gray
5. **Fridays:** Shown in light green

### Step 9: Create Reports Dashboard

1. After marking some attendance
2. Click **📊 Attendance System**
3. Click **📊 Create Reports**
4. Wait a few seconds
5. A new sheet **REPORTS** will be created

**What you'll see:**
- Title in Urdu: "حاضری رپورٹس - بلحاظ گروپ"
- Summary table with all attendance data
- **7 separate multi-bar charts** (one per group)
- Each chart shows 4 bars per month:
  - 🟢 حاضر (Green)
  - 🔴 غیر حاضر (Red)
  - 🟡 چھٹی (Yellow)
  - ⚫ تعطیل (Gray)
- All chart text in Urdu

---

## 📊 How It Works

### Automatic Monthly Sheet Creation

**When**: 1st of each month at 9:00 AM

**What Happens**:
1. Script runs automatically
2. Creates new blank sheet named "January 2026" (or current month)
3. Copies ONLY Column A (student names) from TEMPLATE
4. Sets up ALL days of the month with Urdu day names
5. Extends group headers (2 rows, dark green) across all columns
6. Adds attendance dropdowns (حاضر, غیر حاضر, چھٹی, تعطیل)
7. Places dropdown ONLY on student rows (not group headers)
8. Auto-freezes Row 1 and Column A
9. Moves new sheet to front position

**Performance:** Completes in ~30-60 seconds

### Manual Sheet Creation

**When**: Anytime you want

**How**:
1. Click: **📊 Attendance System** → **📅 Create New Month**
2. Sheet created for current month
3. If sheet already exists, you'll get a warning

### Automatic Cell Coloring

**When**: Every time you mark attendance

**How it works**:
1. You select attendance from dropdown
2. `onEdit` trigger runs automatically
3. Script checks the value you selected
4. Cell background changes to appropriate color:
   - حاضر → Light green (#d9ead3)
   - غیر حاضر → Light red (#f4cccc)
   - چھٹی → Light yellow (#fff2cc)
   - تعطیل → Light gray (#efefef)
5. Happens instantly!

---

## 👥 Managing Students & Groups

### Adding Students to Template
1. Go to **TEMPLATE** sheet
2. Find the group where you want to add student
3. Insert new row(s) below existing students
4. Enter:
   - Column A: Student name
   - Column B: Contact number
   - Column C: مربی (teacher/supervisor)
5. Save the sheet
6. **Future monthly sheets** will include this student

### Editing Student Information
1. Edit directly in **TEMPLATE** sheet
2. Changes apply to future monthly sheets only
3. Existing monthly sheets remain unchanged

### About Contact & مربی Columns
- These columns exist ONLY in TEMPLATE
- They are NOT copied to monthly sheets
- Use template as your master student database
- Monthly sheets only track attendance (Column A + dates)

### Adding/Removing Groups
Currently fixed at 7 groups. To modify:
1. Edit `Template.gs` script
2. Change `numGroups` variable and `urduGroupNames` array
3. Run "Create Template" again

---

## 📊 Taking Attendance

### Daily Workflow
1. Open the current month's sheet (e.g., "January 2026")
2. For each student:
   - Click the cell under the appropriate date
   - Select from dropdown:
     - **حاضر** - Student is present → Cell turns GREEN
     - **غیر حاضر** - Student is absent → Cell turns RED
     - **چھٹی** - Student on leave → Cell turns YELLOW
     - **تعطیل** - Holiday (no class) → Cell turns GRAY
3. Cell automatically changes color!

### Important Notes
- Group header rows (2 dark green rows) have NO dropdowns
- Only student rows have attendance dropdowns
- Data is saved automatically
- Cells auto-color based on your selection
- Each day shows: "01 (پیر)" format (date with Urdu day)
- **All days shown** including weekends:
  - Fridays: Light green background
  - Saturday/Sunday: Light gray background

### Color Guide

| Attendance | Urdu | Cell Color | Usage |
|------------|------|------------|-------|
| Present | حاضر | 🟢 Light Green | Student attended |
| Absent | غیر حاضر | 🔴 Light Red | Student didn't attend |
| Leave | چھٹی | 🟡 Light Yellow | Student on approved leave |
| Holiday | تعطیل | ⚫ Light Gray | School/class holiday |

---

## 📈 Viewing Reports

### Reports Sheet
1. Click on **REPORTS** sheet tab
2. View automatically generated:
   - **Title in Urdu:** حاضری رپورٹس - بلحاظ گروپ
   - **Summary Table** with columns:
     - ماہ (Month)
     - گروپ (Group)
     - حاضر (Present)
     - غیر حاضر (Absent)
     - چھٹی (Leave)
     - تعطیل (Holiday)
   - **7 Multi-Bar Charts** (one per group):
     - Title: گروپ: اولیٰ (etc.)
     - X-axis: ماہ (Month)
     - Y-axis: تعداد (Count)
     - 4 colored bars per month:
       - 🟢 Green bar = حاضر
       - 🔴 Red bar = غیر حاضر
       - 🟡 Yellow bar = چھٹی
       - ⚫ Gray bar = تعطیل
     - Legend at bottom
     - Side-by-side bars (not stacked)

### Updating Reports
1. Click: **📊 Attendance System** → **📊 Create Reports**
2. All tables and charts refresh with latest data
3. Old data is cleared before writing new data

---

## 🛠️ Menu Options Explained

### 📊 Attendance System Menu

| Menu Item | What It Does |
|-----------|-------------|
| **📝 Create Template** | Creates/recreates the TEMPLATE sheet with 7 Urdu groups |
| **📅 Create New Month** | Manually creates a sheet for current month |
| **⚙️ Setup Automation** | Sets up automatic monthly sheet creation |
| **📊 Create Reports** | Creates or refreshes the REPORTS sheet with charts |
| **🔧 Fix Validation** | Fixes dropdown issues if they occur |
| **ℹ️ System Info** | Shows system status and configuration |

---

## 🔧 Troubleshooting

### Problem: Monthly sheet not creating automatically

**Solution**:
1. Go to **Extensions** → **Apps Script**
2. Click **⏰ Triggers** (clock icon on left sidebar)
3. Check if trigger exists for `createMonthlySheetAutomatically`
4. If missing, run: **Setup Automation** again

### Problem: Cells not auto-coloring

**Solution**:
1. Make sure you're selecting from dropdown (not typing)
2. Check if you're on a monthly sheet (not TEMPLATE or REPORTS)
3. Try selecting again from dropdown
4. If still not working, run: **Fix Validation**

### Problem: Dropdowns not appearing on student rows

**Solution**:
1. Click: **📊 Attendance System** → **🔧 Fix Validation**
2. This reapplies dropdowns to correct rows only

### Problem: Dropdowns appearing on group header rows

**Solution**:
1. This shouldn't happen with proper script
2. If it does, run: **Fix Validation**
3. Script will clear dropdowns from header rows

### Problem: Can't see Urdu text properly

**Solution**:
1. Your browser/system might need Urdu fonts
2. Install "Noto Nastaliq Urdu" font
3. Google Sheets usually displays Urdu correctly by default

### Problem: Sheet already exists error

**Cause**: Trying to create a monthly sheet that already exists

**Solution**: This is normal - you can only create each month once

### Problem: Contact and مربی columns not showing in monthly sheet

**This is correct!** Monthly sheets only copy student names (Column A). Contact and مربی columns stay in TEMPLATE only.

---

## 💡 Performance Notes

### Optimization Applied
The system is optimized to process only actual data rows:
- **Before**: Processing 1000 rows (default sheet size) = 6+ minutes (TIMEOUT)
- **After**: Processing ~90 rows (actual data) = 30-60 seconds ✅

### What Was Optimized
1. `identifyStudentRows()` - Only checks actual data rows
2. `identifyGroupHeaderRows()` - Only checks actual data rows
3. `highlightFridays()` - Only colors actual data rows
4. Reports - Reads actual attendance data directly
5. Auto-coloring - Instant (onEdit trigger)

---

## 📌 Data Structure Details

### Template Sheet Structure
```
Row 1:         Header row (FROZEN) - Student Names | Contact No | مربی | Date→
Rows 2-3:      اولیٰ header (2 rows, dark green across A-C, Column A merged)
Rows 4-13:     اولیٰ students (10 rows default, can be more)
Rows 14-15:    ثانیہ header (2 rows, dark green)
Rows 16-25:    ثانیہ students
... (pattern repeats for 7 groups)
```

### Monthly Sheet Differences
- Only Column A copied from template (student names)
- NO Contact or مربی columns
- Date columns start from Column B
- ALL days of month (including weekends)
- Group headers (2 rows) colored dark green across ALL columns
- Attendance data is EMPTY (ready for input)
- Cells auto-color when attendance marked

### Reports Sheet
- Reads actual attendance data from all monthly sheets
- 7 separate multi-bar charts (one per group)
- Shows trends over time
- All text in Urdu
- 4 colored bars per month showing all attendance types

---

## 🔐 Security & Privacy

### Data Storage
- All data stays in YOUR Google Sheet
- No external servers or databases
- Only you control access

### Script Permissions
Scripts need permission to:
- Read/write spreadsheet data
- Create time-based triggers
- Run automatically on schedule

### Sharing
- Control sharing via Google Sheets normal sharing
- Scripts run with YOUR permissions
- Others with edit access can view/edit attendance

---

## 🎯 Best Practices

### 1. Template Management
- Keep TEMPLATE sheet clean and organized
- Update student names regularly
- Use Contact and مربی columns for reference
- Don't delete TEMPLATE sheet
- Row 1 and Column A are auto-frozen

### 2. Monthly Sheets
- Don't rename monthly sheets (breaks reports)
- One sheet per month only
- Row 1 and Column A are auto-frozen
- Archive old sheets if needed (move to different spreadsheet)
- Watch cells auto-color as you mark attendance!

### 3. Attendance Entry
- Enter attendance regularly (daily/weekly)
- Use dropdown selections (strict validation)
- Don't manually type status (will be rejected)
- Enjoy the automatic color coding!
- Weekends shown in gray, Fridays in light green

### 4. Reports
- Update reports after significant attendance entries
- Use charts for presentations
- Reports clear old data before updating
- 7 multi-bar charts show all attendance types

### 5. Backup
- Google Sheets auto-saves
- Optionally: File → Make a copy (for backup)

---

## 📄 Version History

**Version 3.0** - Color Coding & All Days Update
- ✅ Automatic cell coloring based on attendance
- ✅ Shows ALL days of month (including weekends)
- ✅ Added مربی column to template
- ✅ Monthly sheets only copy Column A (student names)
- ✅ Date columns start from Column B
- ✅ Weekend highlighting (gray), Friday highlighting (green)
- ✅ 7 multi-bar charts in reports (all 4 attendance types)
- ✅ All report text in Urdu
- ✅ Strict dropdown validation

**Version 2.0** - Performance & Features Update
- ✅ Optimized to process only actual data rows (~90 instead of 1000)
- ✅ Monthly sheet creation: 30-60 seconds
- ✅ Group headers color across ALL columns with dark green background
- ✅ Group names left-aligned
- ✅ Reports clear old data before updating
- ✅ Auto-freezing Row 1 and Column A

**Version 1.0** - Initial Release
- 7 groups with dynamic student rows
- Urdu language support (days and attendance)
- Monday-Friday only
- Monthly automation
- Reports dashboard
- Data validation on student rows only

---

## 📞 Support & Maintenance

### Checking Script Logs
1. Go to **Extensions** → **Apps Script**
2. Click **Executions** (📋 icon on left)
3. View script run history and errors
4. Check execution time (should be 30-60 seconds for monthly creation)

### Viewing Triggers
1. Go to **Extensions** → **Apps Script**
2. Click **⏰ Triggers** (clock icon)
3. See all automatic triggers

### Modifying Scripts
- Edit script files in Apps Script editor
- Save changes
- Test manually before relying on automation

---

## ✅ Quick Start Checklist

- [ ] Google Sheet created
- [ ] Apps Script editor opened
- [ ] 4 script files created and saved:
  - [ ] Template.gs
  - [ ] Monthly.gs
  - [ ] Reports.gs
  - [ ] Menu.gs
- [ ] Sheet refreshed, menu visible
- [ ] TEMPLATE sheet created (auto-frozen)
- [ ] Student names added to Column A
- [ ] Contact numbers added to Column B
- [ ] مربی names added to Column C
- [ ] Monthly automation setup
- [ ] Permissions granted
- [ ] First monthly sheet created (30-60 seconds)
- [ ] Auto-frozen Row 1 and Column A verified
- [ ] Attendance dropdowns tested
- [ ] **Auto-coloring tested** (cells change color!)
- [ ] Group headers verified (2 rows, dark green across all columns)
- [ ] Weekends verified (Saturday/Sunday in gray)
- [ ] Some attendance marked
- [ ] REPORTS sheet created
- [ ] 7 multi-bar charts visible (all 4 attendance types)
- [ ] System working correctly

---

**System Version:** 3.0  
**Performance:** Optimized  
**Last Updated:** January 2026  
**Status:** Production Ready ✅  
**New Features:** 🎨 Auto-coloring | 📅 All days | 📊 Multi-bar charts

---

*You're now ready to manage student attendance efficiently with Urdu language support, automatic cell coloring, all days of the month, and beautiful visual reports!* 🎉