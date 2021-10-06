run(1500)

function run(max_dimensions_in_px) {
    

    //Init 
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;

    //get folder reference
    var folderRef = (new File($.fileName)).parent;
    
    const sourceFolderParentRef = '/images/uncompressed';
    const targetFolderRef = '/images/compressed/';
    var sourceFolderRef = folderRef + sourceFolderParentRef; 
    
    //get images
    var sourceFolder = File(sourceFolderRef);
    var sourceImages = sourceFolder.getFiles();


    for (var i = 0; i < sourceImages.length; i++) {
        var doc = app.open(sourceImages[i]);

        //Resize image
        resizeImageForWeb(doc, max_dimensions_in_px);

        var newName = getNewName(sourceImages[i].name);
        
        var path = folderRef + targetFolderRef + newName + '.jpg'
        saveJpg(doc, path)

        doc.close(SaveOptions.DONOTSAVECHANGES);
    }

    alert("Success!")

}

function getNewName(sourceName) {
    var nameSplit = sourceName.split(".");
    var ret = nameSplit[0];
    for (var i = 1; i < nameSplit.length - 1; i++) {
        ret += "." + nameSplit[i];
    }
    return ret;
}

/*
This function saves the document as a jpg in a given folder with a given name. It appends the
corresponding frame to the name of the saved image.
*/
function saveJpg(document, path) {
    var file = new File(path);
    var saveOpts = new JPEGSaveOptions(); //code equivalent of the save options screen
    saveOpts.quality = 5;
    document.saveAs(file, saveOpts, true); //boolean refers to save as copy
}

function resizeImageForWeb(doc, max_dimensions_in_px) {
    var currLayer = doc.artLayers.getByName("Background");
    doc.activeLayer = currLayer;

    var length = currLayer.bounds[2] - currLayer.bounds[0];
    var height = currLayer.bounds[3] - currLayer.bounds[1];
    
    // if length or height is larger than max dimension, resize but maintain aspect ratio
    //alert("Length: " + length + "max: " + max_dimensions_in_px );
    //alert("height: " + height + "max: " + max_dimensions_in_px );
    if (length > max_dimensions_in_px || height > max_dimensions_in_px) { //convert const type to int
        if (length > height) {
            //alert("Length called");
            resizeWithLength(doc, length, height, max_dimensions_in_px);
        } else if (height > length) {
            //alert("Height called");
            resizeWithHeight(doc, length, height, max_dimensions_in_px);
        } else {
            //alert("Both called");
            doc.resizeImage(max_dimensions_in_px, max_dimensions_in_px, 72, ResampleMethod.BICUBIC);
        }
    } else {
        //alert("No change called");
        doc.resizeImage(length, height, 72, ResampleMethod.BICUBIC); // no change
    }
    

}

function resizeWithLength(doc, length, height, max_dimensions_in_px) {
    var aspectRatio = length / height;
    var newLength = max_dimensions_in_px;
    var newHeight = newLength / aspectRatio;
    doc.resizeImage(newLength, newHeight, 72, ResampleMethod.BICUBIC);
}

function resizeWithHeight(doc, length, height, max_dimensions_in_px) {
    var aspectRatio = length / height;
    var newHeight = max_dimensions_in_px;
    var newLength = newHeight * aspectRatio;
    doc.resizeImage(newLength, newHeight, 72, ResampleMethod.BICUBIC);
}