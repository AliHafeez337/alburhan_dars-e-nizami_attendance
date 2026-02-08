/**
 * MENU.GS - COMPLETE FILE WITH COLORING & ADVANCED REPORTS
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu('📊 Attendance System')
    .addItem('📝 Create Template', 'createAttendanceTemplate')
    .addSeparator()
    .addItem('📅 Create New Month', 'createMonthlySheetManually')
    .addItem('⚙️ Setup Automation', 'setupMonthlyAutomation')
    .addSeparator()
    .addItem('📊 Create Reports', 'createOrUpdateReports')
    .addItem('📅 Weekly Reports', 'generateWeeklyReports')          // NEW: Weekly Reports
    .addItem('📈 Monthly Report', 'generateMonthlyReport')  // NEW: Monthly Comparison
    .addSeparator()
    .addItem('🎨 Customize Day Colors', 'showDayColorDialog')       // Your coloring feature
    .addSeparator()
    .addItem('🔧 Fix Validation', 'fixDataValidation')
    .addItem('ℹ️ System Info', 'showSystemInfo')
    .addToUi();
}

function setupMonthlyAutomation() {
  try {
    // Remove existing triggers
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'createMonthlySheetAutomatically') {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
    
    // Create new trigger
    ScriptApp.newTrigger('createMonthlySheetAutomatically')
      .timeBased()
      .onMonthDay(1)
      .atHour(9)
      .create();
    
    Logger.log('✓ Automation setup successfully');
    
    try {
      SpreadsheetApp.getUi().alert('Automation setup successfully! Monthly sheets will be created on the 1st of each month at 9:00 AM.');
    } catch (e) {}
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    try {
      SpreadsheetApp.getUi().alert('Failed to setup automation: ' + error.toString());
    } catch (e) {}
  }
}

function fixDataValidation() {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var sheetName = sheet.getName();
    
    if (sheetName === 'TEMPLATE' || sheetName === 'REPORTS') {
      Logger.log('Cannot fix validation on ' + sheetName);
      try {
        SpreadsheetApp.getUi().alert('Please select a monthly sheet (not TEMPLATE or REPORTS)');
      } catch (e) {}
      return;
    }
    
    var studentRows = identifyStudentRows(sheet);
    var headerRows = identifyGroupHeaderRows(sheet);
    var lastCol = sheet.getLastColumn();
    
    // Fix group headers - color 2 rows, no horizontal merge
    for (var i = 0; i < headerRows.length; i++) {
      var headerRow = headerRows[i];
      var groupName = sheet.getRange(headerRow, 1).getValue();
      
      // Break merges
      try {
        sheet.getRange(headerRow, 1, 2, lastCol).breakApart();
      } catch (e) {}
      
      // Clear
      sheet.getRange(headerRow, 1, 2, lastCol).clearContent();
      sheet.getRange(headerRow, 1, 2, lastCol).clearDataValidations();
      
      // Color all cells (no horizontal merge)
      sheet.getRange(headerRow, 1, 2, lastCol)
        .setBackground('#38761d')
        .setFontColor('white')
        .setFontWeight('bold')
        .setFontSize(12);
      
      // Merge Column A vertically only
      sheet.getRange(headerRow, 1, 2, 1).merge()
        .setValue(groupName)
        .setHorizontalAlignment('left')
        .setVerticalAlignment('middle');
    }
    
    // Apply dropdowns to student rows
    var startCol = 2;  // Column B (dates start at B now)
    if (lastCol >= startCol) {
      var attendanceOptions = ['حاضر', 'غیر حاضر', 'چھٹی', 'تعطیل'];
      
      var rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(attendanceOptions, true)
        .setAllowInvalid(false)
        .setHelpText('Select attendance')
        .build();
      
      for (var i = 0; i < studentRows.length; i++) {
        var row = studentRows[i];
        sheet.getRange(row, startCol, 1, lastCol - startCol + 1).setDataValidation(rule);
      }
    }
    
    Logger.log('✓ Validation fixed!');
    
    try {
      SpreadsheetApp.getUi().alert('Validation fixed!\n\n' +
                                    '✓ ' + headerRows.length + ' group headers colored\n' +
                                    '✓ ' + studentRows.length + ' student rows with dropdowns');
    } catch (e) {}
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    throw error;
  }
}

function showSystemInfo() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var allSheets = ss.getSheets();
    
    var hasTemplate = false;
    var hasReports = false;
    var monthlyCount = 0;
    
    for (var i = 0; i < allSheets.length; i++) {
      var name = allSheets[i].getName();
      if (name === 'TEMPLATE') hasTemplate = true;
      else if (name === 'REPORTS') hasReports = true;
      else monthlyCount++;
    }
    
    var triggers = ScriptApp.getProjectTriggers();
    var hasAutomation = false;
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === 'createMonthlySheetAutomatically') {
        hasAutomation = true;
        break;
      }
    }
    
    var info = 'SYSTEM STATUS\n\n' +
               'Template: ' + (hasTemplate ? '✓' : '✗') + '\n' +
               'Reports: ' + (hasReports ? '✓' : '✗') + '\n' +
               'Automation: ' + (hasAutomation ? '✓' : '✗') + '\n' +
               'Monthly Sheets: ' + monthlyCount;
    
    Logger.log(info);
    
    try {
      SpreadsheetApp.getUi().alert('System Information', info, SpreadsheetApp.getUi().ButtonSet.OK);
    } catch (e) {}
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
  }
}

// Helper functions
function identifyStudentRows(sheet) {
  var lastRow = sheet.getLastRow();
  var studentRows = [];
  
  for (var row = 2; row <= lastRow; row++) {
    var cell = sheet.getRange(row, 1);
    var mergedRanges = cell.getMergedRanges();
    
    if (mergedRanges.length === 0) {
      var value = cell.getValue();
      if (value && value.toString().trim() !== '' && 
          !value.toString().includes('Date Columns')) {
        studentRows.push(row);
      }
    }
  }
  
  return studentRows;
}

function identifyGroupHeaderRows(sheet) {
  var lastRow = sheet.getLastRow();
  var headerRows = [];
  
  for (var row = 2; row <= lastRow; row++) {
    var cell = sheet.getRange(row, 1);
    var mergedRanges = cell.getMergedRanges();
    
    if (mergedRanges.length > 0) {
      var value = cell.getValue();
      if (value && value.toString().trim() !== '' && 
          !value.toString().includes('Date Columns')) {
        headerRows.push(row);
        row++;
      }
    }
  }
  
  return headerRows;
}