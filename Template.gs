/**
 * TEMPLATE.GS - CLEAN VERSION FROM SCRATCH
 * Creates template with 7 Urdu groups
 * Can run from Apps Script editor OR menu
 */

function createAttendanceTemplate() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Check if TEMPLATE exists
    var templateSheet = ss.getSheetByName('TEMPLATE');
    if (templateSheet) {
      // Try to use UI, but if not available (running from editor), just proceed
      try {
        var ui = SpreadsheetApp.getUi();
        var response = ui.alert(
          'Template Exists',
          'A TEMPLATE sheet already exists. Overwrite it?',
          ui.ButtonSet.YES_NO
        );
        if (response == ui.Button.NO) {
          return;
        }
      } catch (e) {
        // Running from editor - just delete and continue
        Logger.log('Running from Apps Script editor - overwriting existing template');
      }
      ss.deleteSheet(templateSheet);
    }
    
    // Create new TEMPLATE sheet
    templateSheet = ss.insertSheet('TEMPLATE');
    
    // Build structure
    buildTemplate(templateSheet);
    
    // Show success message (only if UI available)
    try {
      SpreadsheetApp.getUi().alert('Template created successfully!\n\n✓ 7 Urdu groups\n✓ Student Names column\n✓ Contact No column\n✓ مربی column\n\nNote: Contact and مربی columns will NOT be copied to monthly sheets.');
    } catch (e) {
      Logger.log('✓ Template created successfully!');
    }
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    throw error;
  }
}

function buildTemplate(sheet) {
  // Clear everything
  sheet.clear();
  
  // Configuration
  var numGroups = 7;
  var studentsPerGroup = 10;
  var urduGroupNames = ['اولیٰ', 'ثانیہ', 'ثالثہ', 'رابعہ', 'خامسہ', 'سادسه', 'سابعه'];
  
  // Set column widths
  sheet.setColumnWidth(1, 150);  // Student Names
  sheet.setColumnWidth(2, 120);  // Contact Numbers
  sheet.setColumnWidth(3, 100);  // مربی
  
  // FREEZE Row 1 and Column A
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);
  
  // Row 1: Header
  sheet.getRange('A1').setValue('Student Names')
    .setFontWeight('bold')
    .setBackground('#4a86e8')
    .setFontColor('white')
    .setHorizontalAlignment('center');
  
  sheet.getRange('B1').setValue('Contact No')
    .setFontWeight('bold')
    .setBackground('#4a86e8')
    .setFontColor('white')
    .setHorizontalAlignment('center');
  
  sheet.getRange('C1').setValue('مربی')
    .setFontWeight('bold')
    .setBackground('#4a86e8')
    .setFontColor('white')
    .setHorizontalAlignment('center');
  
  sheet.getRange('D1').setValue('Date Columns →')
    .setFontWeight('bold')
    .setBackground('#e8eaed')
    .setFontColor('#666666')
    .setHorizontalAlignment('center');
  
  sheet.getRange('A1:D1').setBorder(true, true, true, true, true, true);
  
  // Create all groups
  var currentRow = 2;
  
  for (var g = 0; g < numGroups; g++) {
    var groupName = urduGroupNames[g];
    
    // GROUP HEADER: 2 rows, colored, Column A merged vertically
    // Row 1 & 2: Group header (now spans A:C)
    sheet.getRange(currentRow, 1, 2, 3)  // A:C, 2 rows
      .setBackground('#38761d')
      .setFontColor('white')
      .setFontWeight('bold')
      .setFontSize(12)
      .setBorder(true, true, true, true, true, true);
    
    // Merge Column A vertically only
    sheet.getRange(currentRow, 1, 2, 1).merge()
      .setValue(groupName)
      .setHorizontalAlignment('left')
      .setVerticalAlignment('middle');
    
    currentRow += 2;
    
    // Student rows
    for (var s = 1; s <= studentsPerGroup; s++) {
      sheet.getRange(currentRow, 1).setValue('Student ' + s)
        .setHorizontalAlignment('left');
      
      sheet.getRange(currentRow, 2).setValue('')
        .setHorizontalAlignment('center');
      
      sheet.getRange(currentRow, 3).setValue('')
        .setHorizontalAlignment('center');
      
      // Alternate row colors
      if (s % 2 === 0) {
        sheet.getRange(currentRow, 1, 1, 3).setBackground('#f9f9f9');
      }
      
      currentRow++;
    }
  }
  
  // Borders for entire used range
  var lastRow = currentRow - 1;
  sheet.getRange(1, 1, lastRow, 3).setBorder(true, true, true, true, true, true);
  
  Logger.log('✓ Template created with ' + numGroups + ' groups');
}

// Helper function to identify student rows
function identifyStudentRows(sheet) {
  var lastRow = sheet.getLastRow();
  var studentRows = [];
  
  for (var row = 2; row <= lastRow; row++) {
    var cell = sheet.getRange(row, 1);
    var mergedRanges = cell.getMergedRanges();
    
    // If NOT merged and has content, it's a student row
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

// Helper function to identify group header rows
function identifyGroupHeaderRows(sheet) {
  var lastRow = sheet.getLastRow();
  var headerRows = [];
  
  for (var row = 2; row <= lastRow; row++) {
    var cell = sheet.getRange(row, 1);
    var mergedRanges = cell.getMergedRanges();
    
    // If merged and has content, it's a group header
    if (mergedRanges.length > 0) {
      var value = cell.getValue();
      if (value && value.toString().trim() !== '' && 
          !value.toString().includes('Date Columns')) {
        headerRows.push(row);
        row++; // Skip second row of merge
      }
    }
  }
  
  return headerRows;
}