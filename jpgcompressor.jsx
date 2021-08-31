run()

function run() {

    //Init 
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;

    //get folder reference
    var folderRef = (new File($.fileName)).parent;
    
    const sourceFolderParentRef = '/images/uncompressed/pending';
    const targetFolderRef = '/images/compressed/photoshop/';
    var sourceFolderRef = folderRef + sourceFolderParentRef; 
    
    //get images
    var sourceFolder = File(sourceFolderRef);
    var sourceImages = sourceFolder.getFiles();


    for (var i = 0; i < sourceImages.length; i++) {
        var doc = app.open(sourceImages[i]);

        var nameSplit = sourceImages[i].name.split(".");
        var path = folderRef + targetFolderRef + nameSplit[0] + '.jpg'
        saveJpg(doc, path)

        doc.close(SaveOptions.DONOTSAVECHANGES);
    }

    alert("Success!")

}


/*
This function saves the document as a jpg in a given folder with a given name. It appends the
corresponding frame to the name of the saved image.
*/
function saveJpg(document, path) {
    var file = new File(path);
    var saveOpts = new JPEGSaveOptions(); //code equivalent of the save options screen
    saveOpts.quality = 0;
    document.saveAs(file, saveOpts, true); //boolean refers to save as copy
}
