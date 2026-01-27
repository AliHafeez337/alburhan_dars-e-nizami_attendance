/**
 * REPORTS.GS - MULTI-BAR CHARTS WITH ALL 4 ATTENDANCE TYPES IN URDU
 * Creates 7 separate charts (one per group) showing all attendance types
 */

// Main function
function createReportsDashboard() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create REPORTS sheet
    var reportsSheet = ss.getSheetByName('REPORTS');
    if (reportsSheet) {
      ss.deleteSheet(reportsSheet);
    }
    
    reportsSheet = ss.insertSheet('REPORTS');
    
    // Get template to identify groups
    var templateSheet = ss.getSheetByName('TEMPLATE');
    if (!templateSheet) {
      reportsSheet.getRange('A1').setValue('خرابی: TEMPLATE شیٹ نہیں ملی!');
      Logger.log('ERROR: TEMPLATE sheet not found');
      return;
    }
    
    // Get all monthly sheets
    var monthlySheets = [];
    var allSheets = ss.getSheets();
    
    for (var i = 0; i < allSheets.length; i++) {
      var name = allSheets[i].getName();
      if (name !== 'TEMPLATE' && name !== 'REPORTS') {
        monthlySheets.push(allSheets[i]);
      }
    }
    
    if (monthlySheets.length === 0) {
      reportsSheet.getRange('A1').setValue('ماہانہ شیٹس نہیں ملیں۔ پہلے ماہانہ شیٹس بنائیں۔');
      Logger.log('No monthly sheets to report on');
      return;
    }
    
    // Identify groups from template
    var groups = identifyGroups(templateSheet);
    Logger.log('Found ' + groups.length + ' groups');
    
    // Collect attendance data per group per month
    var groupData = collectGroupAttendance(monthlySheets, groups);
    
    // Build the reports sheet
    buildReportsSheet(reportsSheet, groupData, monthlySheets);
    
    Logger.log('✓ Reports created with ' + groups.length + ' group charts!');
    
    try {
      SpreadsheetApp.getUi().alert('رپورٹس کامیابی سے بن گئیں!\n\n✓ ' + groups.length + ' گروپ چارٹس بنائے گئے\n✓ ' + monthlySheets.length + ' ماہ کا تجزیہ');
    } catch (e) {}
    
  } catch (error) {
    Logger.log('ERROR in createReportsDashboard: ' + error.toString());
    throw error;
  }
}

function identifyGroups(templateSheet) {
  /**
   * Identifies all groups in the template
   * Returns array of {name, startRow, endRow}
   */
  var groups = [];
  var lastRow = templateSheet.getLastRow();
  
  var currentGroup = null;
  
  for (var row = 2; row <= lastRow; row++) {
    var cell = templateSheet.getRange(row, 1);
    var mergedRanges = cell.getMergedRanges();
    var value = cell.getValue();
    
    // If merged and has value, it's a group header
    if (mergedRanges.length > 0 && value && value.toString().trim() !== '') {
      // Save previous group
      if (currentGroup) {
        currentGroup.endRow = row - 1;
        groups.push(currentGroup);
      }
      
      // Start new group
      currentGroup = {
        name: value.toString(),
        startRow: row + 2,  // Students start 2 rows after header
        endRow: null
      };
      
      row++; // Skip second row of merged header
    }
  }
  
  // Save last group
  if (currentGroup) {
    currentGroup.endRow = lastRow;
    groups.push(currentGroup);
  }
  
  return groups;
}

function collectGroupAttendance(monthlySheets, groups) {
  /**
   * Collects ALL 4 attendance types for each group for each month
   * Returns: {groupName: {monthName: {present, absent, leave, holiday}}}
   */
  var groupData = {};
  
  // Initialize structure
  for (var g = 0; g < groups.length; g++) {
    groupData[groups[g].name] = {};
  }
  
  // For each monthly sheet
  for (var m = 0; m < monthlySheets.length; m++) {
    var sheet = monthlySheets[m];
    var monthName = sheet.getName();
    
    Logger.log('Processing month: ' + monthName);
    
    // For each group
    for (var g = 0; g < groups.length; g++) {
      var group = groups[g];
      var startRow = group.startRow;
      var endRow = group.endRow;
      
      var present = 0;
      var absent = 0;
      var leave = 0;
      var holiday = 0;
      
      // Count attendance in this group's rows
      var lastCol = sheet.getLastColumn();
      
      for (var row = startRow; row <= endRow; row++) {
        for (var col = 2; col <= lastCol; col++) {  // Start from column B (dates start at B now)
          var value = sheet.getRange(row, col).getValue();
          
          if (value === 'حاضر') present++;
          else if (value === 'غیر حاضر') absent++;
          else if (value === 'چھٹی') leave++;
          else if (value === 'تعطیل') holiday++;
        }
      }
      
      // Store data
      groupData[group.name][monthName] = {
        present: present,
        absent: absent,
        leave: leave,
        holiday: holiday
      };
      
      Logger.log('  Group ' + group.name + ': P=' + present + ', A=' + absent + ', L=' + leave + ', H=' + holiday);
    }
  }
  
  return groupData;
}

function buildReportsSheet(sheet, groupData, monthlySheets) {
  /**
   * Builds the reports sheet with summary table and multi-bar charts
   */
  sheet.clear();
  
  // Title in Urdu
  sheet.getRange('A1').setValue('حاضری رپورٹس - بلحاظ گروپ')
    .setFontWeight('bold')
    .setFontSize(16)
    .setBackground('#4a86e8')
    .setFontColor('white');
  sheet.getRange('A1:F1').merge();
  
  // Get month names
  var monthNames = [];
  for (var i = 0; i < monthlySheets.length; i++) {
    monthNames.push(monthlySheets[i].getName());
  }
  
  // Get group names
  var groupNames = Object.keys(groupData);
  
  // Create summary table
  var startRow = 3;
  
  // Headers in Urdu
  sheet.getRange(startRow, 1).setValue('ماہ').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 2).setValue('گروپ').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 3).setValue('حاضر').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 4).setValue('غیر حاضر').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 5).setValue('چھٹی').setFontWeight('bold').setBackground('#e8eaed');
  sheet.getRange(startRow, 6).setValue('تعطیل').setFontWeight('bold').setBackground('#e8eaed');
  
  // Write summary data
  var dataRow = startRow + 1;
  for (var m = 0; m < monthNames.length; m++) {
    var monthName = monthNames[m];
    
    for (var g = 0; g < groupNames.length; g++) {
      var groupName = groupNames[g];
      var data = groupData[groupName][monthName];
      
      sheet.getRange(dataRow, 1).setValue(monthName);
      sheet.getRange(dataRow, 2).setValue(groupName);
      sheet.getRange(dataRow, 3).setValue(data ? data.present : 0);
      sheet.getRange(dataRow, 4).setValue(data ? data.absent : 0);
      sheet.getRange(dataRow, 5).setValue(data ? data.leave : 0);
      sheet.getRange(dataRow, 6).setValue(data ? data.holiday : 0);
      
      dataRow++;
    }
  }
  
  // Format the summary table
  var tableRange = sheet.getRange(startRow, 1, (monthNames.length * groupNames.length) + 1, 6);
  tableRange.setBorder(true, true, true, true, true, true);
  
  // Set column widths
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 80);
  sheet.setColumnWidth(4, 80);
  sheet.setColumnWidth(5, 80);
  sheet.setColumnWidth(6, 80);
  
  // Create separate multi-bar chart for each group
  createGroupCharts(sheet, groupData, groupNames, monthNames, dataRow + 2);
  
  Logger.log('✓ Reports sheet built with multi-bar charts');
}

function createGroupCharts(sheet, groupData, groupNames, monthNames, chartStartRow) {
  /**
   * Creates 7 separate MULTI-BAR charts (one per group)
   * Each chart shows 4 bars per month (حاضر, غیر حاضر, چھٹی, تعطیل)
   * All text in Urdu
   */
  
  for (var g = 0; g < groupNames.length; g++) {
    var groupName = groupNames[g];
    
    // Calculate position for this chart
    var chartDataStartRow = chartStartRow + (g * 20);  // Space charts vertically
    var chartDataCol = 1;
    
    // Write headers in Urdu
    sheet.getRange(chartDataStartRow, chartDataCol).setValue('ماہ').setFontWeight('bold');
    sheet.getRange(chartDataStartRow, chartDataCol + 1).setValue('حاضر').setFontWeight('bold');
    sheet.getRange(chartDataStartRow, chartDataCol + 2).setValue('غیر حاضر').setFontWeight('bold');
    sheet.getRange(chartDataStartRow, chartDataCol + 3).setValue('چھٹی').setFontWeight('bold');
    sheet.getRange(chartDataStartRow, chartDataCol + 4).setValue('تعطیل').setFontWeight('bold');
    
    // Write data for each month
    for (var m = 0; m < monthNames.length; m++) {
      var monthName = monthNames[m];
      var data = groupData[groupName][monthName];
      
      var row = chartDataStartRow + 1 + m;
      sheet.getRange(row, chartDataCol).setValue(monthName);
      sheet.getRange(row, chartDataCol + 1).setValue(data ? data.present : 0);
      sheet.getRange(row, chartDataCol + 2).setValue(data ? data.absent : 0);
      sheet.getRange(row, chartDataCol + 3).setValue(data ? data.leave : 0);
      sheet.getRange(row, chartDataCol + 4).setValue(data ? data.holiday : 0);
    }
    
    // Create multi-bar chart
    var chartDataRange = sheet.getRange(
      chartDataStartRow, 
      chartDataCol, 
      monthNames.length + 1, 
      5  // Month + 4 data columns
    );
    
    var chart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(chartDataRange)
      .setPosition(chartDataStartRow, chartDataCol + 6, 0, 0)  // Position to the right
      .setOption('title', 'گروپ: ' + groupName)  // Title in Urdu
      .setOption('width', 600)
      .setOption('height', 350)
      .setOption('legend', {position: 'bottom'})  // Show legend for 4 types
      .setOption('hAxis', {title: 'ماہ'})  // X-axis in Urdu
      .setOption('vAxis', {title: 'تعداد'})  // Y-axis in Urdu
      .setOption('colors', ['#38761d', '#cc0000', '#f1c232', '#999999'])  // Green, Red, Yellow, Gray
      .setOption('isStacked', false)  // Side-by-side bars
      .setOption('series', {
        0: {targetAxisIndex: 0},  // حاضر
        1: {targetAxisIndex: 0},  // غیر حاضر
        2: {targetAxisIndex: 0},  // چھٹی
        3: {targetAxisIndex: 0}   // تعطیل
      })
      .build();
    
    sheet.insertChart(chart);
    
    Logger.log('✓ Created multi-bar chart for group: ' + groupName);
  }
}

// Wrapper function for compatibility
function createOrUpdateReports() {
  createReportsDashboard();
}