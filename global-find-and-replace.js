function main() {
//- folderID = the top-level directory you want to run the script in. In Google Drive, this is everything after `folders/` in that folder's URL. 
//- oldText = existing string. 
//- newText = replacement string.
    globalFindAndReplace("parentFolderId", "oldText", "newText")
}
//- Shouldn't need to touch the rest here.
function globalFindAndReplace(parentFolderId, oldText, newText) {
    let parentFolder = DriveApp.getFolderById(parentFolderId);
    let folders = parentFolder.getFolders();
    // iterate through all folders fetched from parent folder
    while (folders.hasNext()) {
        let folder = folders.next();
        Logger.log(folder.getName());
        globalFindAndReplace(folder.getId(), oldText, newText);
    }
    let sheets = parentFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
    while (sheets.hasNext()) {
        let file = sheets.next();
        let sheet = SpreadsheetApp.openById(file.getId());
        sheet.createTextFinder(oldText).replaceAllWith(newText);
    }

}
