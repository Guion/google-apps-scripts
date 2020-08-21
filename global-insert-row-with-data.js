function main() {
    //- The top-level Google Drive directory you want to run the script in. In Google Drive, this is everything after `folders/` in that folder's URL. 
    let parentFolderId = "string"
    //- The desired position for new row, as an integer.
    let rowPosition = integer
    //- The values for each cell you're adding data to, as a set of strings.
    let values = [["string", "string", "string"]]
    //- The range of cells you'll be adding data to. The number of cells in range should match number of strings in `values` field. Format ex., "A9:C9" 
    let range = "range"
    globalRowAdd(parentFolderId, rowPosition, values, range)

}

function globalRowAdd(parentFolderId, rowPosition, values, newRange) {
    let parentFolder = DriveApp.getFolderById(parentFolderId);
    let folders = parentFolder.getFolders();
    // iterate through folders in the folders fetched from parent folder
    while (folders.hasNext()) {
        let folder = folders.next();
        Logger.log(folder.getName());
        globalRowAdd(folder.getId(), rowPosition, values, newRange);
    }
    let sheets = parentFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
    while (sheets.hasNext()) {
        let file = sheets.next();
        let sheet = SpreadsheetApp.openById(file.getId());
        sheet.insertRowBefore(rowPosition);
        let range = sheet.getRange(newRange);
        range.setValues(values);
    }

}
