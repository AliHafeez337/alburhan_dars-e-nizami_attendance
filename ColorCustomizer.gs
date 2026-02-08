/**
 * COLORCUSTOMIZER.GS - FIXED VERSION
 * Colors entire day columns for ALL student rows
 */

function showDayColorDialog() {
  var htmlOutput = HtmlService
    .createHtmlOutputFromFile('DayColorDialog')
    .setWidth(400)
    .setHeight(500);
  
  SpreadsheetApp.getUi()
    .showModalDialog(htmlOutput, 'Customize Day Colors');
}

function applyDayColors(selectedDays, colorCode) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var sheetName = sheet.getName();
    
    // Don't run on TEMPLATE or REPORTS
    if (sheetName === 'TEMPLATE' || sheetName === 'REPORTS') {
      return { 
        success: false, 
        message: 'Please select a monthly sheet (not TEMPLATE or REPORTS)' 
      };
    }
    
    var lastCol = sheet.getLastColumn();
    var lastRow = sheet.getLastRow();
    
    if (lastCol < 2 || lastRow < 2) {
      return { success: false, message: 'No data found in sheet' };
    }
    
    // Find ALL student rows dynamically
    var studentRows = getAllStudentRows(sheet);
    
    if (studentRows.length === 0) {
      return { success: false, message: 'No student rows found' };
    }
    
    Logger.log('Found ' + studentRows.length + ' student rows');
    
    var columnsColored = 0;
    var totalCells = 0;
    
    // Map English days to Urdu for matching
    var englishToUrdu = {
      'Sunday': 'اتوار',
      'Monday': 'پیر',
      'Tuesday': 'منگل',
      'Wednesday': 'بدھ',
      'Thursday': 'جمعرات',
      'Friday': 'جمعہ',
      'Saturday': 'هفته'
    };
    
    // Process each column to find matching days
    for (var col = 2; col <= lastCol; col++) {
      try {
        var headerCell = sheet.getRange(1, col);
        var headerValue = headerCell.getValue();
        
        if (!headerValue || typeof headerValue !== 'string') continue;
        
        // Extract Urdu day from header like "01 (اتوار)"
        var dayMatch = headerValue.match(/\((.*?)\)/);
        if (!dayMatch) continue;
        
        var urduDay = dayMatch[1];
        
        // Find which English day this Urdu day corresponds to
        var matchedEnglishDay = null;
        for (var engDay in englishToUrdu) {
          if (englishToUrdu[engDay] === urduDay) {
            matchedEnglishDay = engDay;
            break;
          }
        }
        
        // Check if this day is selected
        if (matchedEnglishDay && selectedDays.includes(matchedEnglishDay)) {
          // COLOR ENTIRE COLUMN FOR ALL STUDENT ROWS
          var firstStudentRow = Math.min(...studentRows);
          var lastStudentRow = Math.max(...studentRows);
          var numStudentRows = lastStudentRow - firstStudentRow + 1;
          
          // Create range covering ALL student rows in this column
          var columnRange = sheet.getRange(firstStudentRow, col, numStudentRows, 1);
          columnRange.setBackground(colorCode);
          
          columnsColored++;
          totalCells += numStudentRows;
          
          Logger.log('Colored column ' + col + ' (' + urduDay + ') - rows ' + firstStudentRow + ' to ' + lastStudentRow);
        }
      } catch (e) {
        Logger.log('Error coloring column ' + col + ': ' + e.toString());
        continue;
      }
    }
    
    if (columnsColored === 0) {
      return { 
        success: false, 
        message: 'No matching columns found. Make sure you selected valid days.' 
      };
    }
    
    // Save preferences
    saveColorPreference(selectedDays, colorCode);
    
    return {
      success: true,
      message: `✅ Success!\n\n` +
               `Applied color: ${colorCode}\n` +
               `Days colored: ${selectedDays.join(', ')}\n` +
               `Columns updated: ${columnsColored}\n` +
               `Total cells colored: ${totalCells}\n` +
               `Student rows affected: ${studentRows.length}\n\n` +
               `⚡ Applied instantly using batch operations!`
    };
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return { success: false, message: 'Error: ' + error.toString() };
  }
}

function getAllStudentRows(sheet) {
  /**
   * Finds ALL student rows in the sheet
   * Student rows are: not group headers, have content in column A
   */
  
  var studentRows = [];
  var lastRow = sheet.getLastRow();
  
  for (var row = 2; row <= lastRow; row++) {
    try {
      var nameCell = sheet.getRange(row, 1);
      var isMerged = nameCell.getMergedRanges().length > 0;
      
      // If NOT merged and has content, it's a student row
      if (!isMerged) {
        var cellValue = nameCell.getValue();
        if (cellValue && cellValue.toString().trim() !== '') {
          studentRows.push(row);
        }
      }
    } catch (e) {
      continue;
    }
  }
  
  return studentRows;
}

// Alternative: Even simpler approach - color from row 2 to lastRow
function applyDayColorsSimple(selectedDays, colorCode) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var sheetName = sheet.getName();
    
    if (sheetName === 'TEMPLATE' || sheetName === 'REPORTS') {
      return { 
        success: false, 
        message: 'Please select a monthly sheet' 
      };
    }
    
    var lastCol = sheet.getLastColumn();
    var lastRow = sheet.getLastRow();
    
    if (lastCol < 2 || lastRow < 2) {
      return { success: false, message: 'No data found' };
    }
    
    var columnsColored = 0;
    
    // Map English to Urdu
    var englishToUrdu = {
      'Sunday': 'اتوار',
      'Monday': 'پیر',
      'Tuesday': 'منگل',
      'Wednesday': 'بدھ',
      'Thursday': 'جمعرات',
      'Friday': 'جمعہ',
      'Saturday': 'هفته'
    };
    
    // Process each column
    for (var col = 2; col <= lastCol; col++) {
      try {
        var headerCell = sheet.getRange(1, col);
        var headerValue = headerCell.getValue();
        
        if (!headerValue || typeof headerValue !== 'string') continue;
        
        // Extract Urdu day
        var dayMatch = headerValue.match(/\((.*?)\)/);
        if (!dayMatch) continue;
        
        var urduDay = dayMatch[1];
        
        // Find matching English day
        var matchedEnglishDay = null;
        for (var engDay in englishToUrdu) {
          if (englishToUrdu[engDay] === urduDay) {
            matchedEnglishDay = engDay;
            break;
          }
        }
        
        // Check if selected
        if (matchedEnglishDay && selectedDays.includes(matchedEnglishDay)) {
          // SIMPLE: Color from row 2 to lastRow (includes all rows)
          // This will color everything including group headers, but that's fine
          var columnRange = sheet.getRange(2, col, lastRow - 1, 1);
          columnRange.setBackground(colorCode);
          
          columnsColored++;
          Logger.log('Colored column ' + col + ': rows 2 to ' + lastRow);
        }
      } catch (e) {
        continue;
      }
    }
    
    if (columnsColored === 0) {
      return { success: false, message: 'No matching columns found' };
    }
    
    // Save preferences
    saveColorPreference(selectedDays, colorCode);
    
    return {
      success: true,
      message: `✅ Success!\n\n` +
               `Colored ${selectedDays.join(', ')}\n` +
               `Color: ${colorCode}\n` +
               `Columns: ${columnsColored}\n` +
               `Rows: 2 to ${lastRow} (all rows)\n` +
               `Total cells: ${(lastRow - 1) * columnsColored}`
    };
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return { success: false, message: 'Error: ' + error.toString() };
  }
}

function getSavedColorPreference() {
  try {
    var saved = PropertiesService.getScriptProperties()
      .getProperty('custom_day_colors');
    
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // Ignore errors
  }
  
  return { days: [], color: '#d9ead3' };
}

function saveColorPreference(selectedDays, colorCode) {
  PropertiesService.getScriptProperties()
    .setProperty('custom_day_colors', JSON.stringify({
      days: selectedDays,
      color: colorCode,
      timestamp: new Date().toISOString()
    }));
}