# 📚 Student Attendance Tracking System

## 📋 Overview
A comprehensive Google Sheets-based attendance tracking system for managing student attendance across 7 groups with automated monthly sheet creation, Urdu language support, and visual reporting dashboard.

---

## ✨ Key Features

### 1. **Template-Based Structure**
- Master TEMPLATE sheet with 7 pre-configured groups
- Each group contains:
  - 2-row merged header (e.g., "Group 1", "Group 2", etc.) - merged across ALL columns
  - Dynamic student rows (add as many as needed)
  - Contact number column
  - Daily attendance columns

### 2. **Urdu Language Support**
- **Day Names in Urdu** (Monday to Friday):
  - پیر (Monday)
  - منگل (Tuesday)  
  - بدھ (Wednesday)
  - جمعرات (Thursday)
  - جمعہ (Friday)

- **Attendance Status in Urdu**:
  - حاضر (Present)
  - غیر حاضر (Absent)
  - چھٹی (Leave)
  - تعطیل (Holiday)

### 3. **Monday to Friday Only**
- Automatically includes only working days (Mon-Fri)
- Skips weekends (Saturday & Sunday)
- Displays date format: "01 (پیر)" - Date with Urdu day name

### 4. **Automated Monthly Sheets**
- Automatic creation on the 1st of each month at 9:00 AM
- Manual creation option available anytime
- Sheet naming: "January 2026", "February 2026", etc.
- Structure copied from template, attendance data starts fresh

### 5. **Reports Dashboard**
- **3 Visual Charts:**
  - Overall Attendance Pie Chart
  - Group-wise Bar Chart (compares all 7 groups)
  - Monthly Trend Line Chart
- Group-wise attendance analysis
- Monthly comparison tables
- Auto-updates from all monthly sheets

### 6. **Smart Data Validation**
- Dropdown menus for attendance status (Urdu)
- Applied ONLY to student rows (not group headers)
- Contact numbers in column B
- Student names in column A

### 7. **Performance Optimized**
- Processes only actual data rows (~90 rows), not entire sheet (1000 rows)
- Creates monthly sheets in ~30-60 seconds
- Reports update quickly by reading actual attendance data

---

## 🏗️ Sheet Structure

### TEMPLATE Sheet Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Row 1: [FROZEN] Student Names | Contact No | 01(پیر) | 02(منگل)...│
├─────────────────────────────────────────────────────────────────┤
│ Rows 2-3: Group 1 ─────────────────────────────────────────────→│
│           (merged across ALL columns, left-aligned)              │
├─────────────────────────────────────────────────────────────────┤
│ Rows 4-13: Student 1 | 0300-xxx | [Dropdown] | [Dropdown]...    │
│           Student 2 | 0301-xxx | [Dropdown] | [Dropdown]...    │
│           ...                                                    │
├─────────────────────────────────────────────────────────────────┤
│ Rows 14-15: Group 2 ────────────────────────────────────────────→│
├─────────────────────────────────────────────────────────────────┤
│ Rows 16-25: Student 1 | 0302-xxx | [Dropdown] | [Dropdown]...   │
│            ...                                                   │
├─────────────────────────────────────────────────────────────────┤
│ [... Groups 3-7 follow same pattern ...]                        │
└─────────────────────────────────────────────────────────────────┘
```

### Column Layout
- **Column A**: Student Names (FREEZE THIS MANUALLY)
- **Column B**: Contact Numbers
- **Columns C+**: Daily attendance (Monday-Friday only)

### Row Structure Per Group
1. **Rows 1-2**: Group header (merged across ALL columns, dark green #38761d, text left-aligned)
2. **Rows 3+**: Student data rows with dropdowns

---

## 🚀 Installation & Setup Guide

### Step 1: Create Your Google Sheet
1. Open Google Sheets
2. Create a new blank spreadsheet
3. Name it (e.g., "Student Attendance 2025")

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
4. Click: **📊 Attendance System** → **Create Template**
5. Wait for confirmation: "Template created successfully!"
6. A new sheet tab **TEMPLATE** will appear

### Step 4: Manual Freezing (IMPORTANT!)
Since automatic freezing causes issues, do this manually:
1. Click on the **TEMPLATE** sheet
2. Click on **Column A** header to select it
3. Go to **View** → **Freeze** → **1 column**
4. Click on **Row 1** header to select it
5. Go to **View** → **Freeze** → **1 row**
6. ✅ Now Column A and Row 1 are frozen

### Step 5: Customize Your Template
1. Click on the **TEMPLATE** sheet
2. You'll see the structure:
   - Row 1: Headers (Student Names, Contact No, Date Columns →)
   - Rows 2-3: Group 1 header (merged, dark green)
   - Rows 4-13: Student 1-10 (placeholders)
   - Rows 14-15: Group 2 header (merged, dark green)
   - ... and so on for all 7 groups

### Add Your Student Names:

**For each group, replace the placeholder names:**

**Example - Group 1 (rows 4-13):**
```
Row 4: Ahmad Ali
Row 5: Fatima Hassan
Row 6: Usman Ahmed
Row 7: Ayesha Khan
... (add up to 10 or more students)
```

### Add Contact Numbers:

**In Column B, add phone numbers:**
```
Row 4: 0300-1234567
Row 5: 0321-7654321
Row 6: 0333-9876543
...
```

### Adding More Students:

**If a group needs more than 10 students:**
1. Right-click on a row below the 10th student
2. Click "Insert 1 row below"
3. Add the student name and contact
4. Repeat as needed

**Important:** Don't insert rows BETWEEN group headers and their students!

### Step 6: Setup Automation
1. Click **📊 Attendance System**
2. Click **⚙️ Setup Monthly Automation**
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
3. Wait ~30-60 seconds (optimized for speed!)
4. A new sheet appears: "January 2026" (or current month)

**What you'll see:**
- Same structure as TEMPLATE
- All your student names and contact numbers
- Date columns with Urdu day names (Monday-Friday only)
- Format: "01 (پیر)", "02 (منگل)", etc.
- Dropdown menus on student rows (حاضر, غیر حاضر, چھٹی, تعطیل)
- Group headers merged across ALL columns with dark green background (#38761d)

**Note:** Group headers are left-aligned so "Group 1" text appears in the first column

### Step 8: Manually Freeze the Monthly Sheet
For each new monthly sheet:
1. **View** → **Freeze** → **1 column** (Column A)
2. **View** → **Freeze** → **1 row** (Row 1)

### Step 9: Test the Attendance System

### Take Sample Attendance:

1. Go to your monthly sheet (e.g., "January 2026")
2. Click on any student's cell under a date
3. You'll see a dropdown appear
4. Select an option:
   - **حاضر** (Present)
   - **غیر حاضر** (Absent)
   - **چھٹی** (Leave)
   - **تعطیل** (Holiday)
5. Repeat for multiple students and dates

### Verify Group Headers:

1. Try clicking on group header rows (dark green merged rows)
2. You should NOT see dropdowns
3. These cells should be empty
4. This is correct behavior!

### Step 10: Create Reports Dashboard

1. After marking some attendance
2. Click **📊 Attendance System**
3. Click **📊 Create/Update Reports**
4. Wait a few seconds
5. A new sheet **REPORTS** will be created

**What you'll see:**
- Overall attendance summary table
- Overall attendance pie chart
- Group-wise breakdown table
- Group-wise bar chart (compares all 7 groups)
- Monthly trends table
- Monthly trend line chart (if multiple months exist)

---

## 📊 How It Works

### Automatic Monthly Sheet Creation

**When**: 1st of each month at 9:00 AM

**What Happens**:
1. Script runs automatically
2. Creates new sheet named "January 2026" (or current month)
3. Copies structure from TEMPLATE:
   - All 7 groups with headers
   - All student names and contact numbers
   - Group structure preserved
4. Sets up Monday-Friday dates for the month with Urdu day names
5. Extends group headers across ALL date columns with dark green background
6. Adds attendance dropdowns (حاضر, غیر حاضر, چھٹی, تعطیل)
7. Places dropdown ONLY on student rows (not group headers)
8. Moves new sheet to front position

**Performance:** Completes in ~30-60 seconds (optimized!)

### Manual Sheet Creation

**When**: Anytime you want

**How**:
1. Click: **📊 Attendance System** → **Create New Month**
2. Sheet created for current month
3. If sheet already exists, you'll get a warning

---

## 👥 Managing Students & Groups

### Adding Students
1. Go to **TEMPLATE** sheet
2. Find the group where you want to add student
3. Insert new row(s) below existing students
4. Enter student name in column A
5. Enter contact number in column B
6. Save the sheet
7. **Future monthly sheets** will include this student

### Editing Student Information
1. Edit directly in **TEMPLATE** sheet
2. Changes apply to future monthly sheets only
3. Existing monthly sheets remain unchanged

### Adding/Removing Groups
Currently fixed at 7 groups. To modify:
1. Edit `Template.gs` script
2. Change `numGroups` variable
3. Run "Create Template" again

---

## 📊 Taking Attendance

### Daily Workflow
1. Open the current month's sheet (e.g., "January 2026")
2. For each student:
   - Click the cell under the appropriate date
   - Select from dropdown:
     - **حاضر** - Student is present
     - **غیر حاضر** - Student is absent
     - **چھٹی** - Student on leave
     - **تعطیل** - Holiday (no class)

### Important Notes
- Group header rows (2 merged rows) have NO dropdowns
- Only student rows have attendance dropdowns
- Data is saved automatically
- Each day shows: "01 (پیر)" format (date with Urdu day)
- Friday columns are highlighted in light green

---

## 📈 Viewing Reports

### Reports Sheet
1. Click on **REPORTS** sheet tab
2. View automatically generated:
   - **Overall Summary Table** - Total Present, Absent, Leave, Holiday with percentages
   - **Overall Pie Chart** - Visual distribution of attendance
   - **Group-wise Table** - Present count for each of 7 groups per month
   - **Group-wise Bar Chart** - Visual comparison of all groups
   - **Monthly Comparison Table** - Month-by-month breakdown
   - **Monthly Trend Chart** - Line graph showing attendance trends over time

### Updating Reports
Reports update by reading actual attendance data from all monthly sheets:
1. Click: **📊 Attendance System** → **Create/Update Reports**
2. All tables and charts refresh with latest data
3. Old data is cleared before writing new data

---

## 🛠️ Menu Options Explained

### 📊 Attendance System Menu

| Menu Item | What It Does |
|-----------|-------------|
| **📝 Create Template** | Creates/recreates the TEMPLATE sheet with 7 groups |
| **📅 Create New Month** | Manually creates a sheet for current month |
| **⚙️ Setup Monthly Automation** | Sets up automatic monthly sheet creation |
| **📊 Create/Update Reports** | Creates or refreshes the REPORTS sheet |
| **🔧 Fix Data Validation** | Fixes dropdown issues if they occur |
| **ℹ️ Show System Info** | Shows system status and configuration |

---

## 🔧 Troubleshooting

### Problem: Monthly sheet not creating automatically

**Solution**:
1. Go to **Extensions** → **Apps Script**
2. Click **⏰ Triggers** (clock icon on left sidebar)
3. Check if trigger exists for `createMonthlySheetAutomatically`
4. If missing, run: **Setup Monthly Automation** again

### Problem: Dropdowns not appearing on student rows

**Solution**:
1. Click: **📊 Attendance System** → **🔧 Fix Data Validation**
2. This reapplies dropdowns to correct rows only

### Problem: Dropdowns appearing on group header rows

**Solution**:
1. This shouldn't happen with proper script
2. If it does, run: **Fix Data Validation**
3. Script will clear dropdowns from header rows

### Problem: Can't see Urdu text properly

**Solution**:
1. Your browser/system might need Urdu fonts
2. Install "Noto Nastaliq Urdu" font
3. Google Sheets usually displays Urdu correctly by default

### Problem: Sheet already exists error

**Cause**: Trying to create a monthly sheet that already exists

**Solution**: This is normal - you can only create each month once

### Problem: Monthly sheet creation takes too long

**Cause**: Script was processing 1000 rows instead of actual data

**Solution**: ✅ Already fixed! Script now only processes actual data rows (~90 rows)
- Should complete in 30-60 seconds

### Problem: Reports show old/deleted sheets

**Cause**: Reports weren't clearing old data before updating

**Solution**: ✅ Already fixed! Reports now clear old data before writing new
- Run "Create/Update Reports" to refresh

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

---

## 📝 Data Structure Details

### Template Sheet Structure
```
Row 1:         Header row (FROZEN manually) with column names
Rows 2-3:      Group 1 header (MERGED across all columns, dark green #38761d, left-aligned)
Rows 4-13:     Group 1 students (10 rows default, can be more)
Rows 14-15:    Group 2 header (MERGED across all columns)
Rows 16-25:    Group 2 students
... (pattern repeats for 7 groups)
```

### Monthly Sheet Differences
- Same structure as template
- Dates updated for current month
- Monday-Friday only with Urdu day names
- Group headers extended across ALL date columns
- Attendance data is EMPTY (ready for input)
- All student names and contact numbers copied

### Reports Sheet
- Reads actual attendance data from all monthly sheets
- 3 charts: Pie chart, Group bar chart, Monthly trend chart
- Shows trends over time
- Updates quickly by directly counting attendance

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
- Don't delete TEMPLATE sheet
- Freeze Column A and Row 1 manually after creating template

### 2. Monthly Sheets
- Don't rename monthly sheets (breaks reports)
- One sheet per month only
- Freeze Column A and Row 1 manually for each new month
- Archive old sheets if needed (move to different spreadsheet)

### 3. Attendance Entry
- Enter attendance regularly (daily/weekly)
- Use consistent dropdown selections
- Don't manually type status (use dropdown)
- Friday columns are auto-highlighted in light green

### 4. Reports
- Update reports after significant attendance entries
- Use charts for presentations
- Reports clear old data before updating

### 5. Backup
- Google Sheets auto-saves
- Optionally: File → Make a copy (for backup)

---

## 🔄 Version History

**Version 2.0** - Performance & Features Update
- ✅ Optimized to process only actual data rows (~90 instead of 1000)
- ✅ Monthly sheet creation: 30-60 seconds (was timing out at 6+ minutes)
- ✅ Group headers merge across ALL columns with dark green background
- ✅ Group names left-aligned ("Group 1" appears in first column)
- ✅ Reports clear old data before updating
- ✅ 3 charts: Overall pie, Group bar, Monthly trend
- ✅ Manual freezing (prevents merge conflicts)

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
- [ ] TEMPLATE sheet created
- [ ] Manually froze Column A and Row 1 in template
- [ ] Student names added to template
- [ ] Contact numbers added
- [ ] Monthly automation setup
- [ ] Permissions granted
- [ ] First monthly sheet created (30-60 seconds)
- [ ] Manually froze Column A and Row 1 in monthly sheet
- [ ] Attendance dropdowns tested
- [ ] Group headers verified (no dropdowns, merged across all columns, dark green)
- [ ] Some attendance marked
- [ ] REPORTS sheet created
- [ ] 3 charts visible (pie, group bar, monthly trend)
- [ ] System working correctly

---

**System Version:** 2.0  
**Performance:** Optimized  
**Last Updated:** January 2026  
**Status:** Production Ready ✅

---

*You're now ready to manage student attendance efficiently with Urdu language support, automated monthly tracking, and fast performance!* 🎉

---

## 🏗️ Sheet Structure

### TEMPLATE Sheet Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Row 1: [FROZEN] Student Names | Contact No | 01(پیر) | 02(منگل)...│
├─────────────────────────────────────────────────────────────────┤
│ Row 2-3: Group1 (2 rows merged) | Empty cells                   │
│ Row 4-13: Student 1 | 0300-xxx | [Dropdown] | [Dropdown]...     │
│          Student 2 | 0301-xxx | [Dropdown] | [Dropdown]...     │
│          ...                                                     │
├─────────────────────────────────────────────────────────────────┤
│ Row 14-15: Group2 (2 rows merged) | Empty cells                 │
│ Row 16-25: Student 1 | 0302-xxx | [Dropdown] | [Dropdown]...    │
│           ...                                                    │
├─────────────────────────────────────────────────────────────────┤
│ [... Groups 3-7 follow same pattern ...]                        │
└─────────────────────────────────────────────────────────────────┘
```

### Column Layout
- **Column A**: Student Names (FROZEN)
- **Column B**: Contact Numbers
- **Columns C+**: Daily attendance (Monday-Friday only)

### Row Structure Per Group
1. **Row 1-2**: Group header (merged across columns A-B)
2. **Rows 3+**: Student data rows with dropdowns

---

## 🚀 Installation & Setup Guide

### Step 1: Create Your Google Sheet
1. Open Google Sheets
2. Create a new blank spreadsheet
3. Name it (e.g., "Student Attendance 2025")

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
4. Click: **📊 Attendance System** → **Create Template**
5. Wait for confirmation: "Template created successfully!"

### Step 4: Customize Template (Optional)
1. Open the **TEMPLATE** sheet
2. Add/edit student names in each group
3. Add contact numbers in column B
4. Add more student rows if needed (dropdowns will auto-apply)

### Step 5: Setup Automation
1. Click: **📊 Attendance System** → **Setup Monthly Automation**
2. **Grant permissions** when prompted:
   - Google will ask for authorization
   - Click "Advanced" → "Go to [Your Project]"
   - Click "Allow"
3. Confirmation: "Monthly automation set up successfully!"

---

## 📅 How It Works

### Automatic Monthly Sheet Creation

**When**: 1st of each month at 9:00 AM

**What Happens**:
1. Script runs automatically
2. Creates new sheet named "January 2025" (or current month)
3. Copies structure from TEMPLATE:
   - All 7 groups with headers
   - All student names and contact numbers
   - Group structure preserved
4. Sets up Monday-Friday dates for the month with Urdu day names
5. Adds attendance dropdowns (حاضر, غیر حاضر, چھٹی, تعطیل)
6. Places dropdown ONLY on student rows (not group headers)
7. Moves new sheet to front position

### Manual Sheet Creation

**When**: Anytime you want

**How**:
1. Click: **📊 Attendance System** → **Create New Month**
2. Sheet created for current month
3. If sheet already exists, you'll get a warning

---

## 👥 Managing Students & Groups

### Adding Students
1. Go to **TEMPLATE** sheet
2. Find the group where you want to add student
3. Insert new row(s) below existing students
4. Enter student name in column A
5. Enter contact number in column B
6. Save the sheet
7. **Future monthly sheets** will include this student

### Editing Student Information
1. Edit directly in **TEMPLATE** sheet
2. Changes apply to future monthly sheets only
3. Existing monthly sheets remain unchanged

### Adding/Removing Groups
Currently fixed at 7 groups. To modify:
1. Edit `Template.gs` script
2. Change `numGroups` variable
3. Run "Create Template" again

---

## 📊 Taking Attendance

### Daily Workflow
1. Open the current month's sheet (e.g., "January 2025")
2. For each student:
   - Click the cell under the appropriate date
   - Select from dropdown:
     - **حاضر** - Student is present
     - **غیر حاضر** - Student is absent
     - **چھٹی** - Student on leave
     - **تعطیل** - Holiday (no class)

### Important Notes
- Group header rows (2 merged rows) have NO dropdowns
- Only student rows have attendance dropdowns
- Data is saved automatically
- Each day shows: "01 (پیر)" format (date with Urdu day)

---

## 📈 Viewing Reports

### Reports Sheet
1. Click on **REPORTS** sheet tab
2. View automatically generated:
   - Group-wise attendance summary
   - Monthly attendance trends
   - Present/Absent/Leave/Holiday breakdowns
   - Visual charts and graphs

### Updating Reports
Reports update automatically, but you can manually refresh:
1. Click: **📊 Attendance System** → **Update Reports**
2. All charts and summaries refresh with latest data

---

## 🛠️ Menu Options Explained

### 📊 Attendance System Menu

| Menu Item | What It Does |
|-----------|-------------|
| **Create Template** | Creates/recreates the TEMPLATE sheet with 7 groups |
| **Create New Month** | Manually creates a sheet for current month |
| **Setup Monthly Automation** | Sets up automatic monthly sheet creation |
| **Update Reports** | Refreshes the REPORTS sheet with latest data |
| **Fix Data Validation** | Fixes dropdown issues if they occur |

---

## 🔧 Troubleshooting

### Problem: Monthly sheet not creating automatically

**Solution**:
1. Go to **Extensions** → **Apps Script**
2. Click **⏰ Triggers** (clock icon on left sidebar)
3. Check if trigger exists for `createMonthlySheetAutomatically`
4. If missing, run: **Setup Monthly Automation** again

### Problem: Dropdowns not appearing on student rows

**Solution**:
1. Click: **📊 Attendance System** → **Fix Data Validation**
2. This reapplies dropdowns to correct rows only

### Problem: Dropdowns appearing on group header rows

**Solution**:
1. This shouldn't happen with proper script
2. If it does, run: **Fix Data Validation**
3. Script will clear dropdowns from header rows

### Problem: Can't see Urdu text properly

**Solution**:
1. Your browser/system might need Urdu fonts
2. Install "Noto Nastaliq Urdu" font
3. Google Sheets usually displays Urdu correctly by default

### Problem: Sheet already exists error

**Cause**: Trying to create a monthly sheet that already exists

**Solution**: This is normal - you can only create each month once

---

## 📝 Data Structure Details

### Template Sheet Structure
```
Rows 1:        Header row (FROZEN) with dates
Rows 2-3:      Group1 header (MERGED)
Rows 4-13:     Group1 students (10 rows default, can be more)
Rows 14-15:    Group2 header (MERGED)
Rows 16-25:    Group2 students
... (pattern repeats for 7 groups)
```

### Monthly Sheet Differences
- Same structure as template
- Dates updated for current month
- Monday-Friday only with Urdu day names
- Attendance data is EMPTY (ready for input)
- All student names and contact numbers copied

### Reports Sheet
- Aggregates data from ALL monthly sheets
- Charts update dynamically
- Shows trends over time

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
- Don't delete TEMPLATE sheet

### 2. Monthly Sheets
- Don't rename monthly sheets (breaks reports)
- One sheet per month only
- Archive old sheets if needed (move to different spreadsheet)

### 3. Attendance Entry
- Enter attendance regularly (daily/weekly)
- Use consistent dropdown selections
- Don't manually type status (use dropdown)

### 4. Backup
- Google Sheets auto-saves
- Optionally: File → Make a copy (for backup)

---

## 📞 Support & Maintenance

### Checking Script Logs
1. Go to **Extensions** → **Apps Script**
2. Click **Executions** (📋 icon on left)
3. View script run history and errors

### Viewing Triggers
1. Go to **Extensions** → **Apps Script**
2. Click **⏰ Triggers** (clock icon)
3. See all automatic triggers

### Modifying Scripts
- Edit script files in Apps Script editor
- Save changes
- Test manually before relying on automation

---

## 🔄 Version History

**Version 1.0** - Initial Release
- 7 groups with dynamic student rows
- Urdu language support (days and attendance)
- Monday-Friday only
- Monthly automation
- Reports dashboard
- Data validation on student rows only

---

## 📚 Additional Notes

### Monday-Friday Logic
- Script automatically calculates working days
- Skips weekends (Saturday, Sunday)
- Date format: "DD (Urdu Day)" - e.g., "15 (جمعرات)"

### Group Header Protection
- 2-row merged headers per group
- No data validation on these rows
- Empty cells in date columns (intentional)

### Dynamic Student Rows
- Not limited to 10 students per group
- Add as many rows as needed in TEMPLATE
- All rows copied to monthly sheets

---

## ✅ Quick Start Checklist

- [ ] Create Google Sheet
- [ ] Add all 4 script files
- [ ] Run "Create Template"
- [ ] Add student names to template
- [ ] Setup monthly automation
- [ ] Test with "Create New Month"
- [ ] Enter attendance data
- [ ] View Reports

---

**System Status**: Ready for Production ✅  
**Language Support**: Urdu & English  
**Automation**: Fully Automated  
**Last Updated**: January 2025  

---

*For questions or issues, check the Troubleshooting section or review script execution logs in Apps Script.*# alburhan_dars-e-nizami_attendance
# alburhan_dars-e-nizami_attendance
