function main() {
//- folderID = the top-level directory you want to run the script in. 
//- oldText = existing string, 
//- newText = replacement string.
    universalFindAndReplace("folderId", "oldText", "newText")
}
//- Shouldn't need to touch the rest here.
function universalFindAndReplace(parentFolderId, oldText, newText) {
    let parentFolder = DriveApp.getFolderById(parentFolderId);
    let folders = parentFolder.getFolders();
    // iterate through folders in the folders fetched from parent folder
    while (folders.hasNext()) {
        let folder = folders.next();
        // get folder name
        Logger.log(folder.getName());
        universalFindAndReplace(folder.getId(), oldText, newText); // look for folders inside
    }
    let sheets = parentFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
    while (sheets.hasNext()) {
        let file = sheets.next();
        let sheet = SpreadsheetApp.openById(file.getId());
        sheet.createTextFinder(oldText).replaceAllWith(newText);
    }

}
