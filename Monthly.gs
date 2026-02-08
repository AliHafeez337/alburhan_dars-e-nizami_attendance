/**
 * MONTHLY.GS - CLEAN VERSION WITHOUT FRIDAY/WEEKEND COLORING
 * Creates monthly sheets with ALL days
 * AUTO-COLORS cells based on attendance value ONLY
 * No automatic Friday/weekend coloring
 */

function onEdit(e) {
  /**
   * Automatically colors cells based on attendance value
   * Runs every time a cell is edited
   */
  
  if (!e) return;
  
  var sheet = e.range.getSheet();
  var sheetName = sheet.getName();
  
  // Only apply to monthly sheets (not TEMPLATE or REPORTS)
  if (sheetName === 'TEMPLATE' || sheetName === 'REPORTS') {
    return;
  }
  
  var row = e.range.getRow();
  var col = e.range.getColumn();
  var value = e.value;
  
  // Only process cells in column B onwards (date columns) and row 2+ (not header)
  if (row < 2 || col < 2) {
    return;
  }
  
  // Color based on value
  var cell = e.range;
  
  if (value === 'حاضر') {
    cell.setBackground('#d9ead3');  // Light green
  } else if (value === 'غیر حاضر') {
    cell.setBackground('#f4cccc');  // Light red
  } else if (value === 'چھٹی') {
    cell.setBackground('#fff2cc');  // Light yellow
  } else if (value === 'تعطیل') {
    cell.setBackground('#efefef');  // Light gray
  } else {
    cell.setBackground('#ffffff');  // White (if cleared)
  }
}

function createMonthlySheetManually() {
  createMonthlySheet();
}

function createMonthlySheetAutomatically() {
  var today = new Date();
  if (today.getDate() !== 1) {
    Logger.log('Not the 1st of the month. Skipping...');
    return;
  }
  createMonthlySheet();
}

function createMonthlySheet() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get template
    var templateSheet = ss.getSheetByName('TEMPLATE');
    if (!templateSheet) {
      Logger.log('ERROR: TEMPLATE sheet not found!');
      try {
        SpreadsheetApp.getUi().alert('TEMPLATE sheet not found. Create it first.');
      } catch (e) {
        Logger.log('Run createAttendanceTemplate() first');
      }
      return;
    }
    
    // Generate month name
    var today = new Date();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
    var sheetName = monthNames[today.getMonth()] + ' ' + today.getFullYear();
    
    // Check if already exists
    if (ss.getSheetByName(sheetName)) {
      Logger.log('Sheet "' + sheetName + '" already exists');
      try {
        SpreadsheetApp.getUi().alert('Sheet "' + sheetName + '" already exists!');
      } catch (e) {}
      return;
    }
    
    Logger.log('Creating sheet: ' + sheetName);
    
    // Create new blank sheet (don't copy template)
    var newSheet = ss.insertSheet(sheetName);
    
    // Copy only student names from template (column A)
    copyStudentNames(templateSheet, newSheet);
    
    // Setup monthly sheet
    setupMonthlySheet(newSheet, today);
    
    // Move to front
    ss.setActiveSheet(newSheet);
    ss.moveActiveSheet(1);
    
    Logger.log('✓ Monthly sheet "' + sheetName + '" created successfully!');
    
    try {
      SpreadsheetApp.getUi().alert('Monthly sheet "' + sheetName + '" created!\n\n' +
                                    '✓ All days of month added\n' +
                                    '✓ Urdu day names\n' +
                                    '✓ Only student names copied\n' +
                                    '✓ Cells will auto-color:\n' +
                                    '  • حاضر = Green\n' +
                                    '  • غیر حاضر = Red\n' +
                                    '  • چھٹی = Yellow\n' +
                                    '  • تعطیل = Gray');
    } catch (e) {}
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    throw error;
  }
}

function copyStudentNames(templateSheet, newSheet) {
  /**
   * Copies only column A (student names and group headers) from template
   * Does NOT copy Contact No or مربی columns
   */
  
  var lastRow = templateSheet.getLastRow();
  
  // Copy column A values
  var columnAValues = templateSheet.getRange(1, 1, lastRow, 1).getValues();
  newSheet.getRange(1, 1, lastRow, 1).setValues(columnAValues);
  
  // Copy formatting from column A
  var columnAFormats = templateSheet.getRange(1, 1, lastRow, 1);
  columnAFormats.copyTo(newSheet.getRange(1, 1, lastRow, 1));
  
  // Set column width
  newSheet.setColumnWidth(1, 150);
  
  Logger.log('✓ Copied student names (column A only)');
}

function setupMonthlySheet(sheet, date) {
  Logger.log('Setting up monthly sheet...');
  
  // Step 1: Add date columns
  var dateColumns = addDateColumns(sheet, date);
  Logger.log('✓ Added ' + dateColumns.length + ' date columns');
  
  // Step 2: Color group headers across all columns (NO HORIZONTAL MERGE)
  colorGroupHeaders(sheet, dateColumns.length);
  Logger.log('✓ Colored group headers');
  
  // Step 3: Apply dropdowns to student rows
  applyDropdowns(sheet);
  Logger.log('✓ Applied dropdowns');
  
  // Step 4: NO FRIDAY/WEEKEND HIGHLIGHTING - REMOVED
  // (This step has been removed - no automatic coloring of Fridays/weekends)
  
  // Step 5: Freeze Row 1 and Column A
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);
  Logger.log('✓ Frozen Row 1 and Column A');
  
  Logger.log('✓ Setup complete!');
}

function addDateColumns(sheet, date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  
  // Urdu day names - ALL 7 DAYS
  var urduDays = {
    0: 'اتوار',     // Sunday
    1: 'پیر',       // Monday
    2: 'منگل',      // Tuesday
    3: 'بدھ',       // Wednesday
    4: 'جمعرات',    // Thursday
    5: 'جمعہ',      // Friday
    6: 'ہفتہ'       // Saturday
  };
  
  // Get ALL days in the month (including weekends)
  var allDays = [];
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (var day = 1; day <= daysInMonth; day++) {
    var currentDate = new Date(year, month, day);
    var dayOfWeek = currentDate.getDay();
    
    allDays.push({
      date: day,
      dayOfWeek: dayOfWeek,
      urduDay: urduDays[dayOfWeek]
      // Removed: isFriday, isWeekend properties since we're not highlighting them
    });
  }
  
  // Add date headers starting from column B (since no Contact/مربی columns)
  var startCol = 2;
  var dateColumnInfo = [];
  
  for (var i = 0; i < allDays.length; i++) {
    var col = startCol + i;
    var day = allDays[i];
    
    // Format: "01 (پیر)"
    var dateStr = String(day.date).padStart(2, '0') + ' (' + day.urduDay + ')';
    
    sheet.getRange(1, col)
      .setValue(dateStr)
      .setFontWeight('bold')
      .setBackground('#4a86e8')
      .setFontColor('white')
      .setHorizontalAlignment('center');
    
    sheet.setColumnWidth(col, 80);
    
    // Just store column info without Friday/weekend flags
    dateColumnInfo.push({
      col: col
    });
  }
  
  return dateColumnInfo;
}

function colorGroupHeaders(sheet, numDateColumns) {
  /**
   * Colors group header rows (2 rows) across all columns
   * NO HORIZONTAL MERGING - only vertical merge in Column A
   * Now starts from column B (no Contact/مربی columns)
   */
  
  var headerRows = identifyGroupHeaderRows(sheet);
  var lastCol = 1 + numDateColumns;  // Column A + all date columns
  
  Logger.log('Coloring ' + headerRows.length + ' group headers to column ' + lastCol);
  
  for (var i = 0; i < headerRows.length; i++) {
    var headerRow = headerRows[i];
    var groupName = sheet.getRange(headerRow, 1).getValue();
    
    // Break any existing merges
    try {
      sheet.getRange(headerRow, 1, 2, lastCol).breakApart();
    } catch (e) {}
    
    // Clear content
    sheet.getRange(headerRow, 1, 2, lastCol).clearContent();
    sheet.getRange(headerRow, 1, 2, lastCol).clearDataValidations();
    
    // Apply green color to ALL cells in these 2 rows (NO HORIZONTAL MERGE)
    sheet.getRange(headerRow, 1, 2, lastCol)
      .setBackground('#38761d')
      .setFontColor('white')
      .setFontWeight('bold')
      .setFontSize(12);
    
    // Merge Column A vertically only and put group name
    sheet.getRange(headerRow, 1, 2, 1).merge()
      .setValue(groupName)
      .setHorizontalAlignment('left')
      .setVerticalAlignment('middle');
    
    Logger.log('✓ Colored header: ' + groupName);
  }
}

function applyDropdowns(sheet) {
  var studentRows = identifyStudentRows(sheet);
  var lastCol = sheet.getLastColumn();
  var startCol = 2;  // Start from column B (dates start at B now)
  
  if (lastCol < startCol || studentRows.length === 0) {
    return;
  }
  
  var attendanceOptions = ['حاضر', 'غیر حاضر', 'چھٹی', 'تعطیل'];
  
  // STRICT validation - only dropdown selection allowed
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(attendanceOptions, true)  // Show dropdown
    .setAllowInvalid(false)  // Reject any value not in list
    .setHelpText('⚠️ Select from dropdown only: حاضر, غیر حاضر, چھٹی, تعطیل')
    .build();
  
  for (var i = 0; i < studentRows.length; i++) {
    var row = studentRows[i];
    sheet.getRange(row, startCol, 1, lastCol - startCol + 1)
      .setDataValidation(rule)
      .setBackground('#ffffff');  // Set all cells to white initially
  }
  
  Logger.log('✓ Applied STRICT dropdowns to ' + studentRows.length + ' student rows');
  Logger.log('  Note: Cells will auto-color when attendance is marked');
}

// REMOVED: highlightFridays() function - no longer needed

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