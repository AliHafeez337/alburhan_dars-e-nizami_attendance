/**
 * ADVANCEDREPORTS.GS - WITH PROPER CHART CLEANUP
 */

// Main function for weekly reports
function generateWeeklyReports() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var sheetName = sheet.getName();
    
    // Only generate for monthly sheets
    if (sheetName === 'TEMPLATE' || sheetName === 'REPORTS' || 
        sheetName.includes('Weekly') || sheetName.includes('Comparison')) {
      SpreadsheetApp.getUi().alert('⚠️ Please select a monthly sheet first! (e.g., "January 2026")');
      return;
    }
    
    Logger.log('Generating weekly report for: ' + sheetName + ' in spreadsheet: ' + ss.getName());
    
    // ========== CLEAN UP PREVIOUS REPORTS ==========
    cleanupPreviousReports(sheet);
    
    // Get all date columns
    var dateColumns = getDateColumnsInfo(sheet);
    var studentRows = getStudentRows(sheet);
    
    if (dateColumns.length === 0) {
      SpreadsheetApp.getUi().alert('❌ No date columns found! Make sure this is a monthly sheet with dates.');
      return;
    }
    
    if (studentRows.length === 0) {
      SpreadsheetApp.getUi().alert('❌ No student rows found! Check if student names are in Column A.');
      return;
    }
    
    Logger.log('Found ' + dateColumns.length + ' date columns and ' + studentRows.length + ' student rows');
    
    // Group dates by week (Week 1: 1-7, Week 2: 8-14, etc.)
    var weeks = groupDatesByWeek(dateColumns);
    
    if (weeks.length === 0) {
      SpreadsheetApp.getUi().alert('❌ Could not group dates into weeks. Check date format.');
      return;
    }
    
    Logger.log('Grouped into ' + weeks.length + ' weeks');
    
    // Calculate weekly attendance
    var weeklyData = calculateWeeklyAttendance(sheet, weeks, studentRows);
    
    // Add weekly summary columns AFTER date columns
    addWeeklySummaryColumns(sheet, weeks);
    
    // Fill in the weekly data
    populateWeeklyData(sheet, weeklyData, weeks, studentRows);
    
    // Create WEEKLY CHARTS BELOW STUDENT DATA
    createWeeklyChartsBelowData(sheet, weeklyData, weeks, studentRows);
    
    Logger.log('✅ Weekly reports generated successfully!');
    SpreadsheetApp.getUi().alert('✅ Weekly Reports Generated!\n\n' +
                                 '• Added weekly summary columns\n' +
                                 '• Created group-wise weekly charts\n' +
                                 '• Previous reports cleaned up\n' +
                                 '• Charts placed below student data');
    
  } catch (error) {
    Logger.log('❌ ERROR in generateWeeklyReports: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    SpreadsheetApp.getUi().alert('❌ Error: ' + error.toString() + 
                                 '\n\nCheck script logs for details.');
  }
}

// ========== UPDATED CLEANUP FUNCTION WITH CHART REMOVAL ==========

function cleanupPreviousReports(sheet) {
  try {
    // 1. FIRST: DELETE ALL EXISTING CHARTS
    deleteAllChartsInSheet(sheet);
    
    // 2. Find last student row
    var lastRow = sheet.getLastRow();
    var lastStudentRow = findLastStudentRow(sheet);
    
    if (lastStudentRow === null || lastStudentRow >= lastRow) {
      Logger.log('No previous reports found or no students found');
      return;
    }
    
    // Ask for confirmation
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert(
      'Clean Previous Reports',
      'Do you want to remove previous weekly reports?\n\n' +
      'Last student row: ' + lastStudentRow + '\n' +
      'Total rows in sheet: ' + lastRow + '\n\n' +
      '⚠️ This will delete ALL charts and data below students.',
      ui.ButtonSet.YES_NO
    );
    
    if (response !== ui.Button.YES) {
      Logger.log('User cancelled cleanup');
      return;
    }
    
    // 3. Count how many rows to delete
    var rowsToDelete = lastRow - lastStudentRow;
    
    // 4. Delete rows below last student
    if (rowsToDelete > 0) {
      sheet.deleteRows(lastStudentRow + 1, rowsToDelete);
      Logger.log('✅ Cleaned up ' + rowsToDelete + ' rows of previous reports');
    }
    
    // 5. Also check for "Weekly Summary" columns and remove them
    cleanupWeeklySummaryColumns(sheet);
    
  } catch (error) {
    Logger.log('⚠️ Error during cleanup: ' + error.toString());
    // Continue anyway - don't stop if cleanup fails
  }
}

function deleteAllChartsInSheet(sheet) {
  /**
   * Deletes ALL embedded charts in the sheet
   */
  try {
    var charts = sheet.getCharts();
    var chartCount = charts.length;
    
    if (chartCount > 0) {
      Logger.log('Found ' + chartCount + ' charts to delete');
      
      // Delete all charts
      for (var i = 0; i < chartCount; i++) {
        try {
          sheet.removeChart(charts[i]);
        } catch (e) {
          Logger.log('Error deleting chart ' + i + ': ' + e.toString());
        }
      }
      
      Logger.log('✅ Deleted ' + chartCount + ' charts');
    } else {
      Logger.log('No charts found to delete');
    }
  } catch (error) {
    Logger.log('Error in deleteAllChartsInSheet: ' + error.toString());
  }
}

function findLastStudentRow(sheet) {
  /**
   * Finds the last row with student data (content in Column A)
   * Returns null if no students found
   */
  var lastRow = sheet.getLastRow();
  
  // Start from bottom and go up to find last student
  for (var row = lastRow; row >= 2; row--) {
    try {
      var cell = sheet.getRange(row, 1);
      var value = cell.getValue();
      var mergedRanges = cell.getMergedRanges();
      
      // Check if it's a student row (not merged, has content)
      if (mergedRanges.length === 0 && value && value.toString().trim() !== '') {
        // Also check if this looks like a student name (not a header or chart title)
        var stringValue = value.toString();
        if (!stringValue.includes('Date Columns') && 
            !stringValue.includes('📊') &&
            !stringValue.includes('WEEKLY') &&
            !stringValue.includes('Week ') &&
            !stringValue.includes('Monthly') &&
            !stringValue.includes('Chart') &&
            !stringValue.includes('Graph')) {
          return row;
        }
      }
    } catch (e) {
      continue;
    }
  }
  
  return null;
}

function cleanupWeeklySummaryColumns(sheet) {
  /**
   * Removes "Weekly Summary" columns if they exist
   */
  var lastCol = sheet.getLastColumn();
  var columnsDeleted = 0;
  
  // Look for weekly summary columns (check from right to left)
  for (var col = lastCol; col >= 2; col--) {
    try {
      var header1 = sheet.getRange(1, col).getValue();
      var header2 = sheet.getRange(2, col).getValue();
      var header3 = sheet.getRange(3, col).getValue();
      
      // Check if this is a weekly summary column
      var isWeeklyColumn = false;
      
      if (header1 && typeof header1 === 'string') {
        if (header1.includes('Weekly Summary') || 
            header1.includes('📅 Weekly') ||
            header1.includes('📊')) {
          isWeeklyColumn = true;
        }
      }
      
      if (header2 && typeof header2 === 'string') {
        if (header2.includes('Week ') || header2.includes('حاضر') || header2.includes('غیر حاضر')) {
          isWeeklyColumn = true;
        }
      }
      
      if (header3 && typeof header3 === 'string') {
        if (header3 === 'حاضر' || header3 === 'غیر حاضر' || header3 === 'چھٹی' || header3 === 'تعطیل') {
          isWeeklyColumn = true;
        }
      }
      
      if (isWeeklyColumn) {
        sheet.deleteColumn(col);
        columnsDeleted++;
        Logger.log('Removed weekly summary column at column ' + col);
      }
    } catch (e) {
      continue;
    }
  }
  
  if (columnsDeleted > 0) {
    Logger.log('✅ Removed ' + columnsDeleted + ' weekly summary columns');
  }
}

// ========== SIMPLIFIED createWeeklyChartsBelowData ==========

function createWeeklyChartsBelowData(sheet, weeklyData, weeks, studentRows) {
  try {
    // Find where to start charts (after last student + some space)
    var lastStudentRow = findLastStudentRow(sheet) || sheet.getLastRow();
    var chartStartRow = lastStudentRow + 5; // Leave 5 rows space
    
    Logger.log('Creating charts below student data starting at row: ' + chartStartRow);
    
    // Calculate TOTALS for each week (sum of all students)
    var weekTotals = [];
    for (var w = 0; w < weeks.length; w++) {
      weekTotals.push({
        present: 0,
        absent: 0,
        leave: 0,
        holiday: 0
      });
    }
    
    // Sum up all student data for each week
    for (var s = 0; s < studentRows.length; s++) {
      var row = studentRows[s];
      var dataForRow = weeklyData[row];
      for (var w = 0; w < weeks.length; w++) {
        var weekData = dataForRow[w];
        weekTotals[w].present += weekData.present;
        weekTotals[w].absent += weekData.absent;
        weekTotals[w].leave += weekData.leave;
        weekTotals[w].holiday += weekData.holiday;
      }
    }
    
    // ========== CREATE MAIN WEEKLY SUMMARY CHART ==========
    
    var mainChartStartRow = chartStartRow;
    var mainChartDataCol = 2;
    
    // Title
    sheet.getRange(mainChartStartRow, 2).setValue('📊 WEEKLY ATTENDANCE SUMMARY')
      .setFontWeight('bold')
      .setFontSize(14)
      .setBackground('#4a86e8')
      .setFontColor('white');
    
    // Create data table
    var dataStartRow = mainChartStartRow + 2;
    
    // Headers
    sheet.getRange(dataStartRow, mainChartDataCol).setValue('Week').setFontWeight('bold');
    sheet.getRange(dataStartRow, mainChartDataCol + 1).setValue('Present').setFontWeight('bold');
    sheet.getRange(dataStartRow, mainChartDataCol + 2).setValue('Absent').setFontWeight('bold');
    sheet.getRange(dataStartRow, mainChartDataCol + 3).setValue('Leave').setFontWeight('bold');
    sheet.getRange(dataStartRow, mainChartDataCol + 4).setValue('Holiday').setFontWeight('bold');
    
    // Data rows
    for (var w = 0; w < weeks.length; w++) {
      var dataRow = dataStartRow + 1 + w;
      var week = weeks[w];
      var total = weekTotals[w];
      
      sheet.getRange(dataRow, mainChartDataCol).setValue('Week ' + week.weekNum);
      sheet.getRange(dataRow, mainChartDataCol + 1).setValue(total.present);
      sheet.getRange(dataRow, mainChartDataCol + 2).setValue(total.absent);
      sheet.getRange(dataRow, mainChartDataCol + 3).setValue(total.leave);
      sheet.getRange(dataRow, mainChartDataCol + 4).setValue(total.holiday);
    }
    
    // Create MAIN CHART (only if we have weeks)
    if (weeks.length > 0) {
      var mainChartDataRange = sheet.getRange(
        dataStartRow, mainChartDataCol,
        weeks.length + 1, 5
      );
      
      var mainChart = sheet.newChart()
        .setChartType(Charts.ChartType.COLUMN)
        .addRange(mainChartDataRange)
        .setPosition(dataStartRow, mainChartDataCol + 7, 0, 0)
        .setOption('title', 'Weekly Attendance Overview')
        .setOption('width', 600)
        .setOption('height', 400)
        .setOption('legend', {position: 'bottom'})
        .setOption('hAxis', {title: 'Week Number'})
        .setOption('vAxis', {title: 'Total Count'})
        .setOption('colors', ['#38761d', '#cc0000', '#f1c232', '#999999'])
        .setOption('isStacked', false)
        .build();
      
      sheet.insertChart(mainChart);
    }
    
    // ========== CREATE INDIVIDUAL GROUP CHARTS ==========
    
    var groups = identifyGroupsFromSheet(sheet);
    var groupChartsStartRow = dataStartRow + weeks.length + 15;
    
    for (var g = 0; g < groups.length; g++) {
      var group = groups[g];
      
      // Calculate group weekly totals
      var groupWeeklyTotals = [];
      for (var w = 0; w < weeks.length; w++) {
        groupWeeklyTotals.push({
          present: 0,
          absent: 0,
          leave: 0,
          holiday: 0
        });
      }
      
      // Sum attendance for this group
      for (var s = 0; s < studentRows.length; s++) {
        var row = studentRows[s];
        if (row >= group.startRow && row <= group.endRow) {
          var dataForRow = weeklyData[row];
          for (var w = 0; w < weeks.length; w++) {
            var weekData = dataForRow[w];
            groupWeeklyTotals[w].present += weekData.present;
            groupWeeklyTotals[w].absent += weekData.absent;
            groupWeeklyTotals[w].leave += weekData.leave;
            groupWeeklyTotals[w].holiday += weekData.holiday;
          }
        }
      }
      
      // Create group chart data
      var groupChartStartRow = groupChartsStartRow + (g * 15);
      var groupChartDataCol = 2;
      
      // Group title
      sheet.getRange(groupChartStartRow, 2).setValue('📊 ' + group.name)
        .setFontWeight('bold')
        .setFontSize(12)
        .setBackground('#38761d')
        .setFontColor('white');
      
      // Headers
      sheet.getRange(groupChartStartRow + 2, groupChartDataCol).setValue('Week').setFontWeight('bold');
      sheet.getRange(groupChartStartRow + 2, groupChartDataCol + 1).setValue('Present').setFontWeight('bold');
      sheet.getRange(groupChartStartRow + 2, groupChartDataCol + 2).setValue('Absent').setFontWeight('bold');
      sheet.getRange(groupChartStartRow + 2, groupChartDataCol + 3).setValue('Leave').setFontWeight('bold');
      sheet.getRange(groupChartStartRow + 2, groupChartDataCol + 4).setValue('Holiday').setFontWeight('bold');
      
      // Data
      for (var w = 0; w < weeks.length; w++) {
        var dataRow = groupChartStartRow + 3 + w;
        var week = weeks[w];
        var total = groupWeeklyTotals[w];
        
        sheet.getRange(dataRow, groupChartDataCol).setValue('Week ' + week.weekNum);
        sheet.getRange(dataRow, groupChartDataCol + 1).setValue(total.present);
        sheet.getRange(dataRow, groupChartDataCol + 2).setValue(total.absent);
        sheet.getRange(dataRow, groupChartDataCol + 3).setValue(total.leave);
        sheet.getRange(dataRow, groupChartDataCol + 4).setValue(total.holiday);
      }
      
      // Create group chart
      if (weeks.length > 0) {
        var groupChartDataRange = sheet.getRange(
          groupChartStartRow + 2, groupChartDataCol,
          weeks.length + 1, 5
        );
        
        var groupChart = sheet.newChart()
          .setChartType(Charts.ChartType.COLUMN)
          .addRange(groupChartDataRange)
          .setPosition(groupChartStartRow + 2, groupChartDataCol + 7, 0, 0)
          .setOption('title', group.name)
          .setOption('width', 500)
          .setOption('height', 300)
          .setOption('legend', {position: 'bottom'})
          .setOption('hAxis', {title: 'Week'})
          .setOption('vAxis', {title: 'Count'})
          .setOption('colors', ['#38761d', '#cc0000', '#f1c232', '#999999'])
          .setOption('isStacked', false)
          .build();
        
        sheet.insertChart(groupChart);
      }
    }
    
    Logger.log('✅ Charts created successfully');
    
  } catch (error) {
    Logger.log('❌ ERROR in createWeeklyChartsBelowData: ' + error.toString());
  }
}

// ========== KEEP ALL OTHER FUNCTIONS AS THEY WERE ==========

function generateMonthlyReport() {
  // [Keep the existing monthly comparison function as is]
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    Logger.log('Starting monthly comparison for spreadsheet: ' + ss.getName());
    
    // Get all monthly sheets
    var monthlySheets = [];
    var allSheets = ss.getSheets();
    
    for (var i = 0; i < allSheets.length; i++) {
      var name = allSheets[i].getName();
      // Include only monthly sheets (not template, reports, or other special sheets)
      if (name !== 'TEMPLATE' && name !== 'REPORTS' && 
          !name.includes('Comparison') && !name.includes('Weekly')) {
        monthlySheets.push(allSheets[i]);
      }
    }
    
    if (monthlySheets.length < 2) {
      SpreadsheetApp.getUi().alert('⚠️ Need at least 2 monthly sheets for comparison!\n\nFound: ' + monthlySheets.length + ' monthly sheets');
      return;
    }
    
    Logger.log('Found ' + monthlySheets.length + ' monthly sheets for comparison');
    
    // Get groups from first monthly sheet
    var groups = identifyGroupsFromSheet(monthlySheets[0]);
    
    if (groups.length === 0) {
      SpreadsheetApp.getUi().alert('❌ No groups found in monthly sheets!');
      return;
    }
    
    Logger.log('Found ' + groups.length + ' groups');
    
    // Create or update comparison sheet
    var comparisonSheetName = 'Monthly Report';
    var comparisonSheet = ss.getSheetByName(comparisonSheetName);
    if (comparisonSheet) {
      ss.deleteSheet(comparisonSheet);
    }
    
    comparisonSheet = ss.insertSheet(comparisonSheetName);
    
    // Collect monthly attendance data per group
    var monthlyData = collectMonthlyAttendanceData(monthlySheets, groups);
    
    // Build comparison sheet
    buildComparisonSheet(comparisonSheet, monthlyData, groups, monthlySheets);
    
    // Create monthly comparison charts (one per group)
    createMonthlyComparisonCharts(comparisonSheet, monthlyData, groups);
    
    // Move to front
    ss.setActiveSheet(comparisonSheet);
    
    Logger.log('✅ Monthly report generated!');
    SpreadsheetApp.getUi().alert('✅ Monthly Report Created!\n\n' +
                                 '• ' + groups.length + ' groups\n' +
                                 '• ' + monthlySheets.length + ' months\n' +
                                 '• Group-wise monthly trend charts');
    
  } catch (error) {
    Logger.log('❌ ERROR in generateMonthlyReport: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    SpreadsheetApp.getUi().alert('❌ Error: ' + error.toString() + 
                                 '\n\nCheck script logs for details.');
  }
}

// ========== KEEP ALL HELPER FUNCTIONS ==========

function getDateColumnsInfo(sheet) {
  var dateColumns = [];
  var lastCol = sheet.getLastColumn();
  
  for (var col = 2; col <= lastCol; col++) {
    try {
      var header = sheet.getRange(1, col).getValue();
      if (header && typeof header === 'string' && header.includes('(')) {
        var match = header.match(/(\d+)\s*\(([^)]+)\)/);
        if (match) {
          var dateNum = parseInt(match[1]);
          var dayName = match[2];
          
          var dayMap = {
            'اتوار': 0, 'پیر': 1, 'منگل': 2, 'بدھ': 3,
            'جمعرات': 4, 'جمعہ': 5, 'هفته': 6, 'ہفتہ': 6
          };
          
          dateColumns.push({
            col: col,
            date: dateNum,
            dayName: dayName,
            dayOfWeek: dayMap[dayName] || 0
          });
        }
      }
    } catch (e) {
      Logger.log('Error reading column ' + col + ': ' + e.toString());
      continue;
    }
  }
  
  return dateColumns;
}

function getStudentRows(sheet) {
  var studentRows = [];
  var lastRow = sheet.getLastRow();
  
  for (var row = 2; row <= lastRow; row++) {
    try {
      var cell = sheet.getRange(row, 1);
      var mergedRanges = cell.getMergedRanges();
      
      if (mergedRanges.length === 0) {
        var value = cell.getValue();
        if (value && value.toString().trim() !== '') {
          studentRows.push(row);
        }
      }
    } catch (e) {
      continue;
    }
  }
  
  return studentRows;
}

function groupDatesByWeek(dateColumns) {
  var weeks = [];
  var currentWeek = null;
  
  for (var i = 0; i < dateColumns.length; i++) {
    var colInfo = dateColumns[i];
    
    // Start new week on 1st, 8th, 15th, 22nd, 29th
    if (colInfo.date === 1 || colInfo.date === 8 || 
        colInfo.date === 15 || colInfo.date === 22 || 
        colInfo.date === 29) {
      
      if (currentWeek) {
        weeks.push(currentWeek);
      }
      
      var weekNum = weeks.length + 1;
      currentWeek = {
        weekNum: weekNum,
        startDate: colInfo.date,
        endDate: colInfo.date,
        cols: [colInfo.col],
        dates: [colInfo.date]
      };
    } else if (currentWeek) {
      currentWeek.cols.push(colInfo.col);
      currentWeek.dates.push(colInfo.date);
      currentWeek.endDate = colInfo.date;
    }
  }
  
  if (currentWeek) {
    weeks.push(currentWeek);
  }
  
  return weeks.slice(0, 5); // Max 5 weeks
}

function calculateWeeklyAttendance(sheet, weeks, studentRows) {
  var weeklyData = {};
  
  // Initialize
  for (var i = 0; i < studentRows.length; i++) {
    var row = studentRows[i];
    weeklyData[row] = [];
    for (var j = 0; j < weeks.length; j++) {
      weeklyData[row].push({
        present: 0,
        absent: 0,
        leave: 0,
        holiday: 0,
        totalDays: weeks[j].dates.length
      });
    }
  }
  
  // Calculate
  for (var w = 0; w < weeks.length; w++) {
    var week = weeks[w];
    for (var c = 0; c < week.cols.length; c++) {
      var col = week.cols[c];
      for (var s = 0; s < studentRows.length; s++) {
        var row = studentRows[s];
        try {
          var value = sheet.getRange(row, col).getValue();
          var weekData = weeklyData[row][w];
          
          if (value === 'حاضر') weekData.present++;
          else if (value === 'غیر حاضر') weekData.absent++;
          else if (value === 'چھٹی') weekData.leave++;
          else if (value === 'تعطیل') weekData.holiday++;
        } catch (e) {
          continue;
        }
      }
    }
  }
  
  return weeklyData;
}

function addWeeklySummaryColumns(sheet, weeks) {
  try {
    var lastCol = sheet.getLastColumn();
    
    // Make sure we have enough columns
    if (lastCol < 2) {
      throw new Error('Not enough columns in sheet');
    }
    
    var startCol = lastCol + 2; // Leave one empty column
    
    Logger.log('Adding weekly summary at column: ' + startCol + ', weeks: ' + weeks.length);
    
    // SIMPLIFIED VERSION - No merging to avoid errors
    // Main header in first column only
    sheet.getRange(1, startCol).setValue('📅 Weekly Summary')
      .setFontWeight('bold')
      .setFontSize(11)
      .setBackground('#4a86e8')
      .setFontColor('white');
    
    // Add week headers
    for (var i = 0; i < weeks.length; i++) {
      var week = weeks[i];
      var weekHeaderCol = startCol + (i * 4);
      var weekTitle = 'Week ' + week.weekNum;
      
      // Set week title in first column of each week block
      sheet.getRange(2, weekHeaderCol).setValue(weekTitle)
        .setFontWeight('bold')
        .setBackground('#cfe2f3')
        .setHorizontalAlignment('center');
      
      // Add date range in smaller font
      sheet.getRange(2, weekHeaderCol + 1).setValue('(' + week.startDate + '-' + week.endDate + ')')
        .setFontSize(9)
        .setBackground('#cfe2f3')
        .setHorizontalAlignment('left');
      
      // Attendance type headers
      sheet.getRange(3, weekHeaderCol).setValue('حاضر').setFontWeight('bold').setBackground('#d9ead3');
      sheet.getRange(3, weekHeaderCol + 1).setValue('غیر حاضر').setFontWeight('bold').setBackground('#f4cccc');
      sheet.getRange(3, weekHeaderCol + 2).setValue('چھٹی').setFontWeight('bold').setBackground('#fff2cc');
      sheet.getRange(3, weekHeaderCol + 3).setValue('تعطیل').setFontWeight('bold').setBackground('#efefef');
    }
    
    // Total column
    var totalCol = startCol + (weeks.length * 4);
    sheet.getRange(2, totalCol).setValue('Total Days')
      .setFontWeight('bold')
      .setBackground('#f3e5f5')
      .setHorizontalAlignment('center');
    
    Logger.log('Weekly summary columns added successfully');
    
  } catch (error) {
    Logger.log('❌ ERROR in addWeeklySummaryColumns: ' + error.toString());
    throw error;
  }
}

function populateWeeklyData(sheet, weeklyData, weeks, studentRows) {
  try {
    var lastCol = sheet.getLastColumn();
    var weeklyStartCol = lastCol - (weeks.length * 4) - 1;
    
    Logger.log('Populating weekly data starting at column: ' + weeklyStartCol);
    
    for (var s = 0; s < studentRows.length; s++) {
      var row = studentRows[s];
      var dataForRow = weeklyData[row];
      var rowTotalDays = 0;
      
      for (var w = 0; w < weeks.length; w++) {
        var weekData = dataForRow[w];
        var weekCol = weeklyStartCol + (w * 4);
        
        // Set values safely
        if (weekCol <= sheet.getMaxColumns()) {
          sheet.getRange(row, weekCol).setValue(weekData.present);
        }
        if (weekCol + 1 <= sheet.getMaxColumns()) {
          sheet.getRange(row, weekCol + 1).setValue(weekData.absent);
        }
        if (weekCol + 2 <= sheet.getMaxColumns()) {
          sheet.getRange(row, weekCol + 2).setValue(weekData.leave);
        }
        if (weekCol + 3 <= sheet.getMaxColumns()) {
          sheet.getRange(row, weekCol + 3).setValue(weekData.holiday);
        }
        
        rowTotalDays += weekData.totalDays;
      }
      
      // Total days
      var totalCol = weeklyStartCol + (weeks.length * 4);
      if (totalCol <= sheet.getMaxColumns()) {
        sheet.getRange(row, totalCol).setValue(rowTotalDays);
      }
    }
    
    Logger.log('Weekly data populated successfully');
    
  } catch (error) {
    Logger.log('❌ ERROR in populateWeeklyData: ' + error.toString());
    throw error;
  }
}

function identifyGroupsFromSheet(sheet) {
  var groups = [];
  var lastRow = sheet.getLastRow();
  var currentGroup = null;
  
  for (var row = 2; row <= lastRow; row++) {
    try {
      var cell = sheet.getRange(row, 1);
      var mergedRanges = cell.getMergedRanges();
      var value = cell.getValue();
      
      if (mergedRanges.length > 0 && value && value.toString().trim() !== '') {
        if (currentGroup) {
          currentGroup.endRow = row - 1;
          groups.push(currentGroup);
        }
        
        currentGroup = {
          name: value.toString(),
          startRow: row + 2,
          endRow: null
        };
        
        row++; // Skip second row of merged header
      }
    } catch (e) {
      continue;
    }
  }
  
  if (currentGroup) {
    currentGroup.endRow = lastRow;
    groups.push(currentGroup);
  }
  
  return groups;
}

function collectMonthlyAttendanceData(monthlySheets, groups) {
  var monthlyData = {};
  
  // Initialize structure
  for (var g = 0; g < groups.length; g++) {
    var groupName = groups[g].name;
    monthlyData[groupName] = {};
    for (var m = 0; m < monthlySheets.length; m++) {
      var monthName = monthlySheets[m].getName();
      monthlyData[groupName][monthName] = {
        present: 0,
        absent: 0,
        leave: 0,
        holiday: 0
      };
    }
  }
  
  // Collect data from each sheet
  for (var m = 0; m < monthlySheets.length; m++) {
    var sheet = monthlySheets[m];
    var monthName = sheet.getName();
    var studentRows = getStudentRows(sheet);
    var groupsInSheet = identifyGroupsFromSheet(sheet);
    
    for (var g = 0; g < groupsInSheet.length; g++) {
      var group = groupsInSheet[g];
      var present = 0, absent = 0, leave = 0, holiday = 0;
      
      // Count attendance for this group
      for (var row = group.startRow; row <= group.endRow; row++) {
        if (studentRows.includes(row)) {
          var lastCol = sheet.getLastColumn();
          for (var col = 2; col <= lastCol; col++) {
            try {
              var value = sheet.getRange(row, col).getValue();
              
              if (value === 'حاضر') present++;
              else if (value === 'غیر حاضر') absent++;
              else if (value === 'چھٹی') leave++;
              else if (value === 'تعطیل') holiday++;
            } catch (e) {
              continue;
            }
          }
        }
      }
      
      // Store the data
      if (monthlyData[group.name]) {
        monthlyData[group.name][monthName] = {
          present: present,
          absent: absent,
          leave: leave,
          holiday: holiday
        };
      }
    }
  }
  
  return monthlyData;
}

function buildComparisonSheet(sheet, monthlyData, groups, monthlySheets) {
  sheet.clear();
  
  // Title
  sheet.getRange('A1').setValue('📈 Monthly Attendance Comparison')
    .setFontWeight('bold')
    .setFontSize(16)
    .setBackground('#4a86e8')
    .setFontColor('white');
  sheet.getRange('A1:F1').merge();
  
  // Headers
  var startRow = 3;
  var monthNames = [];
  for (var i = 0; i < monthlySheets.length; i++) {
    monthNames.push(monthlySheets[i].getName());
  }
  monthNames.sort(); // Sort alphabetically
  
  sheet.getRange(startRow, 1).setValue('Group').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 2).setValue('Month').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 3).setValue('Present').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 4).setValue('Absent').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 5).setValue('Leave').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 6).setValue('Holiday').setFontWeight('bold').setBackground('#e8eaed');
  
  // Fill data
  var dataRow = startRow + 1;
  for (var g = 0; g < groups.length; g++) {
    var groupName = groups[g].name;
    for (var m = 0; m < monthNames.length; m++) {
      var month = monthNames[m];
      var data = monthlyData[groupName] && monthlyData[groupName][month] ? 
                 monthlyData[groupName][month] : 
                 {present: 0, absent: 0, leave: 0, holiday: 0};
      
      sheet.getRange(dataRow, 1).setValue(groupName);
      sheet.getRange(dataRow, 2).setValue(month);
      sheet.getRange(dataRow, 3).setValue(data.present);
      sheet.getRange(dataRow, 4).setValue(data.absent);
      sheet.getRange(dataRow, 5).setValue(data.leave);
      sheet.getRange(dataRow, 6).setValue(data.holiday);
      
      dataRow++;
    }
  }
  
  // Format
  var tableRange = sheet.getRange(startRow, 1, (groups.length * monthNames.length) + 1, 6);
  tableRange.setBorder(true, true, true, true, true, true);
  
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 120);
  for (var i = 3; i <= 6; i++) {
    sheet.setColumnWidth(i, 80);
  }
}

function createMonthlyComparisonCharts(sheet, monthlyData, groups) {
  try {
    // Get month names from first group
    var monthNames = [];
    if (groups.length > 0 && monthlyData[groups[0].name]) {
      monthNames = Object.keys(monthlyData[groups[0].name]);
      monthNames.sort(); // Sort alphabetically
    }
    
    if (monthNames.length === 0) {
      Logger.log('No month names found for charts');
      return;
    }
    
    Logger.log('Creating monthly comparison charts for ' + groups.length + ' groups');
    
    // Start position for first chart
    var currentChartRow = sheet.getLastRow() + 10;
    var chartDataCol = 2; // Start from column B
    
    for (var g = 0; g < groups.length; g++) {
      var group = groups[g];
      
      Logger.log('Creating chart for group: ' + group.name + ' at row: ' + currentChartRow);
      
      // Create chart data
      var chartDataStartRow = currentChartRow;
      var chartDataStartCol = chartDataCol;
      
      // Group title
      sheet.getRange(chartDataStartRow, chartDataStartCol).setValue('📈 ' + group.name)
        .setFontWeight('bold')
        .setFontSize(12)
        .setBackground('#4a86e8')
        .setFontColor('white');
      
      // Headers
      sheet.getRange(chartDataStartRow + 2, chartDataStartCol).setValue('Month').setFontWeight('bold');
      sheet.getRange(chartDataStartRow + 2, chartDataStartCol + 1).setValue('Present').setFontWeight('bold');
      sheet.getRange(chartDataStartRow + 2, chartDataStartCol + 2).setValue('Absent').setFontWeight('bold');
      sheet.getRange(chartDataStartRow + 2, chartDataStartCol + 3).setValue('Leave').setFontWeight('bold');
      sheet.getRange(chartDataStartRow + 2, chartDataStartCol + 4).setValue('Holiday').setFontWeight('bold');
      
      // Data
      for (var m = 0; m < monthNames.length; m++) {
        var month = monthNames[m];
        var dataRow = chartDataStartRow + 3 + m;
        var data = monthlyData[group.name] && monthlyData[group.name][month] ? 
                   monthlyData[group.name][month] : 
                   {present: 0, absent: 0, leave: 0, holiday: 0};
        
        sheet.getRange(dataRow, chartDataStartCol).setValue(month);
        sheet.getRange(dataRow, chartDataStartCol + 1).setValue(data.present);
        sheet.getRange(dataRow, chartDataStartCol + 2).setValue(data.absent);
        sheet.getRange(dataRow, chartDataStartCol + 3).setValue(data.leave);
        sheet.getRange(dataRow, chartDataStartCol + 4).setValue(data.holiday);
      }
      
      // Create chart
      var chartDataRange = sheet.getRange(
        chartDataStartRow + 2, chartDataStartCol,
        monthNames.length + 1, 5
      );
      
      // Position chart to the RIGHT of the data (with some space)
      var chartColOffset = chartDataStartCol + 7;
      
      var chart = sheet.newChart()
        .setChartType(Charts.ChartType.COLUMN)
        .addRange(chartDataRange)
        .setPosition(chartDataStartRow + 2, chartColOffset, 0, 0)
        .setOption('title', group.name + ' - Monthly Trend')
        .setOption('width', 600)
        .setOption('height', 350)
        .setOption('legend', {position: 'bottom'})
        .setOption('hAxis', {title: 'Month', slantedText: true, slantedTextAngle: 45})
        .setOption('vAxis', {title: 'Count'})
        .setOption('colors', ['#38761d', '#cc0000', '#f1c232', '#999999'])
        .setOption('isStacked', false)
        .build();
      
      sheet.insertChart(chart);
      
      // Calculate position for NEXT chart (below this one with spacing)
      // Chart height (350px) + data rows + spacing
      var chartHeightInRows = Math.ceil(350 / 21); // Approximate: 21px per row
      var dataHeight = monthNames.length + 3; // Headers + data rows
      var spacing = 5; // Extra rows between charts
      
      currentChartRow = chartDataStartRow + Math.max(chartHeightInRows, dataHeight) + spacing;
      
      Logger.log('Next chart will start at row: ' + currentChartRow);
      
      // If we're running out of space, move to next "column" of charts
      if (currentChartRow > sheet.getMaxRows() - 50) {
        // Reset to top but move right
        chartDataCol += 20; // Move to next column block
        currentChartRow = 10; // Start from top again
        Logger.log('Moving to next column block at column: ' + chartDataCol);
      }
    }
    
    Logger.log('✅ All monthly comparison charts created successfully');
    
  } catch (error) {
    Logger.log('❌ ERROR in createMonthlyComparisonCharts: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
  }
}