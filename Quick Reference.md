# 📌 Quick Reference Guide - Student Attendance System

## 🎯 At a Glance

**System Type:** Google Sheets-based Attendance Tracker  
**Language Support:** Urdu + English  
**Working Days:** ALL days (Mon-Sun, including weekends)  
**Groups:** 7 groups (Urdu names: اولیٰ, ثانیہ, ثالثہ, رابعہ, خامسہ, سادسه, سابعه)  
**Automation:** Monthly sheet creation (1st of month, 9:00 AM)  
**Performance:** Optimized - 30-60 seconds  
**Auto-Features:** 🎨 Cell coloring | ❄️ Row/column freezing  
**Charts:** 7 multi-bar charts (all 4 attendance types)  
**Day Coloring:** 🎨 Customizable via menu

---

## 🚀 Quick Start (5 Minutes)

1. Create Google Sheet
2. Add 5 script files via Apps Script
3. Run: **📊 Attendance System** → **📝 Create Template**
4. ✅ **Auto-frozen** Row 1 & Column A
5. Add student names (Column A), contacts (Column B), مربی (Column C)
6. Run: **⚙️ Setup Automation**
7. Run: **📅 Create New Month** (30-60 seconds)
8. ✅ **Auto-frozen** + **Attendance auto-coloring** enabled
9. Mark attendance → Watch cells change color! 🎨
10. Customize day colors: **🎨 Customize Day Colors**
11. ✅ Done!

---

## 📊 Menu Commands

### Main Menu: **📊 Attendance System**

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| **📝 Create Template** | Creates TEMPLATE with 7 Urdu groups | First time setup only |
| **📅 Create New Month** | Creates monthly sheet for current month | Manually create any month |
| **⚙️ Setup Automation** | Enables automatic monthly creation | Initial setup (once) |
| **📊 Create Reports** | Creates/refreshes REPORTS with 7 charts | View attendance statistics |
| **🎨 Customize Day Colors** | Colors specific day columns | Customize which days to highlight |
| **🔧 Fix Validation** | Fixes dropdown issues | If dropdowns malfunction |
| **ℹ️ System Info** | Displays system status | Check configuration |

---

## 📋 Sheet Types

### 1. TEMPLATE Sheet
- **Purpose:** Master template with all groups
- **Columns:**
  - A: Student Names
  - B: Contact Numbers
  - C: مربی (Supervisor/Teacher)
  - D+: Placeholder
- **Usage:** Edit to add/remove students
- **Rule:** Changes affect future monthly sheets only

### 2. Monthly Sheets (e.g., "January 2026")
- **Purpose:** Daily attendance tracking
- **Columns:**
  - A: Student Names (copied from template)
  - B+: Date columns (ALL days 1-31)
- **Usage:** Take attendance daily/weekly
- **Rule:** One sheet per month
- **Features:**
  - 🎨 **Attendance auto-coloring** only (حاضر=Green, غیر حاضر=Red, چھٹی=Yellow, تعطیل=Gray)
  - ❄️ Auto-frozen Row 1 & Column A
  - 📅 All days shown (including weekends)
  - ⚪ **All cells white initially** - no automatic Friday/weekend coloring
  - 🎨 **Custom day coloring** available via menu

### 3. REPORTS Sheet
- **Purpose:** Analytics and visualization
- **Content:** 7 Multi-Bar Charts + Summary Table
  - Each chart shows 4 colored bars per month
  - All text in Urdu
- **Usage:** View attendance trends and patterns
- **Update:** Run "Create Reports" (clears old data first)

---

## 🎨 Color System

### 1. Attendance Auto-Coloring (ALWAYS ACTIVE)

| English | Urdu | Cell Color | When to Use |
|---------|------|------------|-------------|
| Present | حاضر | 🟢 Light Green | Student attended |
| Absent | غیر حاضر | 🔴 Light Red | Student didn't attend |
| Leave | چھٹی | 🟡 Light Yellow | Approved leave |
| Holiday | تعطیل | ⚫ Light Gray | School holiday |

**Note:** Cells automatically change color when you select from dropdown!

### 2. Custom Day Coloring (OPTIONAL - via menu)

**New Feature:** Color entire day columns for visual grouping

**How to use:**
1. Click: **📊 Attendance System** → **🎨 Customize Day Colors**
2. Select which days to color (checkboxes)
3. Choose a color
4. Click Apply → Entire columns colored instantly!

**Examples:**
- Color Mondays & Wednesdays light blue
- Color all weekdays yellow
- Color specific days for special classes

**Note:** Custom colors apply to empty cells. Attendance cells keep their attendance colors.

---

## ⚙️ Automation Details

### Trigger Configuration

| Setting | Value |
|---------|-------|
| Function | `createMonthlySheetAutomatically` |
| Frequency | Monthly |
| Day | 1st of each month |
| Time | 9:00 AM (your timezone) |
| Action | Creates new monthly sheet |

### What Happens Automatically

1. **Date Check:** Script checks if today is 1st of month
2. **Sheet Creation:** Creates blank sheet with month name
3. **Copy Names:** Copies ONLY Column A from TEMPLATE
4. **Date Setup:** Adds ALL days of month with Urdu names
5. **Dropdowns:** Applies strict validation to student rows
6. **Coloring:** Sets up auto-coloring (onEdit trigger for attendance only)
7. **Freezing:** Auto-freezes Row 1 and Column A
8. **Placement:** Moves new sheet to front
9. **NO automatic Friday/weekend coloring** - all cells start white

---

## 🔧 Common Tasks

### Daily: Take Attendance

1. Open current month sheet
2. For each student, click cell under date
3. Select from dropdown
4. **Watch cell automatically change color!** 🎨
5. Data auto-saves

### Customize Day Colors

1. Open monthly sheet
2. Click: **📊 Attendance System** → **🎨 Customize Day Colors**
3. Select days (checkboxes)
4. Choose color
5. Click Apply
6. Entire columns colored instantly!

### Weekly: Review Data

1. Scan for patterns (absences, etc.)
2. Check all dates filled
3. Notice color-coded cells at a glance
4. Use custom day colors for visual grouping

### Monthly: Generate Reports

1. Click: **📊 Attendance System** → **📊 Create Reports**
2. View REPORTS sheet
3. Check 7 multi-bar charts (one per group)
4. Each chart shows 4 colored bars per month

### As Needed: Add Students

1. Open TEMPLATE sheet
2. Insert row in appropriate group
3. Add name (A), contact (B), مربی (C)
4. Save
5. Future monthly sheets include this student

---

## 🎨 Visual Indicators

### Color Coding

| Element | Color | Meaning |
|---------|-------|---------|
| Header row | Blue (`#4a86e8`) | Column headers |
| Group headers | Dark green (`#38761d`) | Group identifiers (2 rows) |
| حاضر cells | Light green (`#d9ead3`) | Present |
| غیر حاضر cells | Light red (`#f4cccc`) | Absent |
| چھٹی cells | Light yellow (`#fff2cc`) | Leave |
| تعطیل cells | Light gray (`#efefef`) | Holiday |
| **Custom day colors** | **Your choice** | **Via "Customize Day Colors" menu** |
| **Initial cells** | **White (`#ffffff`)** | **Before attendance/custom coloring** |

### Frozen Elements

- **Row 1:** Auto-frozen (header stays visible)
- **Column A:** Auto-frozen (names stay visible)

### Group Header Appearance
- **2 rows tall** (merged vertically in Column A)
- **Dark green** across ALL columns
- **Text left-aligned** (appears in Column A)

---

## 🚨 Troubleshooting Quick Fixes

### Problem → Solution

| Issue | Quick Fix |
|-------|-----------|
| Menu not showing | Refresh sheet (F5) |
| Dropdowns broken | Run "Fix Validation" |
| Cells not auto-coloring | Select from dropdown (don't type) |
| Dropdowns on headers | Run "Fix Validation" |
| Can't see Urdu | Check browser/system fonts |
| Permission error | Re-run "Setup Automation" |
| Sheet exists error | Normal - can't create twice |
| Automation not working | Check triggers in Apps Script |
| Contact/مربی not in monthly | **Correct!** Only Column A copied |
| **Custom colors not applying** | **Use "Customize Day Colors" menu** |
| **Friday/weekend not colored** | **Now customizable via menu** |

---

## 📱 Mobile Usage

### Compatible Features

✅ View attendance  
✅ Take attendance via dropdowns  
✅ See auto-colored cells  
✅ View reports  
✅ Add students  

### Limited Features

⚠️ Creating template (use desktop)  
⚠️ Setting up automation (use desktop)  
⚠️ Script editing (use desktop)  
⚠️ Customize Day Colors menu (use desktop)

---

## 💾 Backup Strategy

### Automatic

- Google Sheets auto-saves every change
- Revision history available (File → Version history)

### Manual (Recommended Monthly)

1. File → Make a copy
2. Name: "Attendance Backup - [Month Year]"
3. Store in separate folder

---

## 📊 Reports Overview

### Available Metrics

**Summary Table:**
- ماہ (Month)
- گروپ (Group)
- حاضر (Present)
- غیر حاضر (Absent)
- چھٹی (Leave)
- تعطیل (Holiday)

**7 Multi-Bar Charts (One Per Group):**
- **Title:** گروپ: اولیٰ (etc.)
- **X-axis:** ماہ (Month names)
- **Y-axis:** تعداد (Count)
- **4 Bars per month:**
  - 🟢 Green = حاضر
  - 🔴 Red = غیر حاضر
  - 🟡 Yellow = چھٹی
  - ⚫ Gray = تعطیل
- **Layout:** Side-by-side bars
- **Legend:** At bottom
- **Size:** 600×350 pixels

---

## 🔐 Permissions & Sharing

### Script Permissions Needed

- ✅ Read/write spreadsheet data
- ✅ Create time-based triggers
- ✅ Run automatically

### Sharing the Sheet

**To share with others:**
1. Click **Share** button (top-right)
2. Add email addresses
3. Set permission: **Editor** (for attendance entry)
4. Scripts run with YOUR permissions

**Note:** Others can enter data but can't modify scripts

---

## 🎓 Best Practices

### DO's ✅

- ✅ Update TEMPLATE before creating new monthly sheets
- ✅ Use dropdowns (don't type manually - will be rejected!)
- ✅ Enjoy the auto-coloring feature
- ✅ Take attendance regularly
- ✅ Update reports monthly
- ✅ Backup important data
- ✅ Check automation status quarterly
- ✅ Use Contact/مربی columns in template for reference
- ✅ **Use "Customize Day Colors" for day highlighting**
- ✅ **Customize which days to color based on your schedule**

### DON'Ts ❌

- ❌ Delete TEMPLATE sheet
- ❌ Rename monthly sheets (breaks reports)
- ❌ Edit group headers in monthly sheets
- ❌ Type attendance status manually (use dropdown)
- ❌ Add students directly to monthly sheets
- ❌ Expect Contact/مربی columns in monthly sheets (they stay in template)
- ❌ **Expect automatic Friday/weekend coloring** (now customizable)
- ❌ **Manually color cells** (use the menu for consistency)

---

## 📞 Support Checklist

**Before asking for help, check:**

1. [ ] Menu appears after refresh?
2. [ ] All 5 script files saved?
3. [ ] TEMPLATE sheet exists?
4. [ ] Permissions granted for automation?
5. [ ] Execution logs checked? (Apps Script → Executions)
6. [ ] Trigger status checked? (Apps Script → Triggers)
7. [ ] System info reviewed? (Menu → Show System Info)
8. [ ] Auto-coloring working? (Try marking attendance)
9. [ ] **Custom colors working? (Try Customize Day Colors)**

---

## 📄 Version Information

**Current Version:** 3.1  
**Release Date:** January 2026  
**Status:** ✅ Production Ready & Optimized

**Features:**
- ✅ 7 groups with Urdu names
- ✅ Urdu language support
- ✅ ALL days of month (including weekends)
- ✅ Automatic monthly creation
- ✅ **🎨 Attendance auto-coloring cells** (حاضر=Green, غیر حاضر=Red, etc.)
- ✅ **🎨 Custom day coloring** via menu
- ✅ **❄️ Auto-freezing** Row 1 & Column A
- ✅ Performance optimized (30-60 sec)
- ✅ 7 multi-bar charts in reports
- ✅ Smart dropdown placement
- ✅ Strict validation (dropdown-only)
- ✅ مربی column in template
- ✅ Monthly sheets copy only Column A
- ✅ **No automatic Friday/weekend coloring** (now customizable)

**What's New in v3.1:**
- 🎨 **Custom Day Coloring Menu** - color any days you want
- ⚪ **Clean monthly sheets** - all cells start white
- 🎯 **Flexible highlighting** - choose which days to color
- 🎨 **Color picker** - choose any color
- ⚡ **Batch coloring** - colors entire columns instantly
- 🗓️ **Complete control** over day highlighting

**What's Changed from v3.0:**
- ❌ **Removed automatic Friday coloring**
- ❌ **Removed automatic weekend coloring**
- ✅ **Added customizable day coloring**
- ✅ **Better control over visual appearance**

---

## 📚 System Limits

| Element | Limit | Notes |
|---------|-------|-------|
| Groups | 7 | Fixed (Urdu names) |
| Students per group | Unlimited | Add rows as needed |
| Monthly sheets | Unlimited | One per month |
| Date columns | 31 max | All days of month |
| Days shown | ALL days | Including weekends |
| Data validation | Student rows only | Not on group headers |
| Attendance auto-coloring | Instant | onEdit trigger |
| Custom day coloring | Any days | Via menu selection |

---

## 🎯 Quick Commands

### From Menu Bar
📊 Attendance System
├─ 📝 Create Template
├─ 📅 Create New Month
├─ ⚙️ Setup Automation
├─ 📊 Create Reports
├─ 🎨 Customize Day Colors ← NEW
├─ 🔧 Fix Validation
└─ ℹ️ System Info

### Keyboard Shortcuts

- **F5** = Refresh sheet
- **Ctrl+S** = Save (in Apps Script)
- **Ctrl+/** = Show keyboard shortcuts

---

## 💡 Pro Tips

1. **Auto-Coloring:** Just select from dropdown - colors change instantly!
2. **Custom Day Colors:** Use menu to highlight important days
3. **Color Coding:** Use different colors for different class types
4. **Contact Reference:** Use template to look up student contacts
5. **مربی Tracking:** Template shows which teacher supervises each student
6. **Multiple Students:** Just add rows in template - no limit
7. **Archive Old Sheets:** Move to separate spreadsheet after year-end
8. **Print Reports:** File → Print from REPORTS sheet
9. **Export Data:** File → Download → Excel/CSV
10. **Visual Scanning:** Custom colors make patterns obvious at a glance

---

## ⚡ Performance Notes

**System Optimization:**
- **Before Fix:** Processing 1000 rows = 6+ minutes (TIMEOUT)
- **After Fix:** Processing ~90 actual rows = 30-60 seconds ✅

**What Was Optimized:**
- Student row identification
- Group header identification  
- Reports data reading
- Auto-coloring (instant onEdit)
- **Custom coloring (batch operations)**

**Expected Timings:**
- Create Template: ~5 seconds
- Create Monthly Sheet: ~30-60 seconds
- Update Reports: ~10-20 seconds
- Auto-coloring: Instant
- **Custom Day Coloring: < 2 seconds**

---

## 🎨 Color Features Summary

### 1. Attendance Auto-Coloring (AUTOMATIC)
- ✅ حاضر → 🟢 Light green
- ✅ غیر حاضر → 🔴 Light red  
- ✅ چھٹی → 🟡 Light yellow
- ✅ تعطیل → ⚫ Light gray
- ✅ Works automatically when marking attendance

### 2. Custom Day Coloring (MANUAL - via menu)
- ✅ Choose which days to color
- ✅ Choose any color
- ✅ Colors entire columns
- ✅ Works on empty cells
- ✅ Attendance cells keep their colors
- ✅ Fast batch operations

### Benefits

- **Visual clarity** - See patterns at a glance
- **Instant feedback** - No manual formatting needed
- **Customizable** - Color days based on your schedule
- **Professional look** - Clean, organized appearance
- **Flexible** - Change colors anytime

### Troubleshooting Auto-Coloring

- ✅ Works on monthly sheets only
- ✅ Requires dropdown selection (not manual typing)
- ✅ Runs automatically (no action needed)
- ✅ If not working, try "Fix Validation"

---

**📌 IMPORTANT REMINDERS:**
1. Row 1 and Column A auto-freeze when creating sheets
2. Group headers are 2 rows tall, dark green across ALL columns
3. Monthly creation takes 30-60 seconds (normal)
4. Reports show 7 multi-bar charts (one per group, 4 bars per month)
5. Contact and مربی columns stay in TEMPLATE only
6. ALL days shown in monthly sheets (including weekends)
7. Cells auto-color when you mark attendance 🎨
8. **NO automatic Friday/weekend coloring** - use menu for custom colors
9. **Use "Customize Day Colors"** menu to highlight specific days

*Keep this document handy for quick lookups!* 📌

---

**Last Updated:** January 2026  
**Quick Help:** Menu → System Info  
**Full Docs:** See README.md (v3.1)  
**Performance:** Optimized for speed ⚡  
**Auto-Features:** 🎨 Attendance Coloring | 🎨 Custom Day Coloring | ❄️ Freezing | 📊 Charts
