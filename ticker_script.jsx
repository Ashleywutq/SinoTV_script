clearOutput();
writeLn("program start");

//project variables
var file = new File;
var check = 0;

//UI
var mainWindow = new Window("palette", "File Reader", undefined);
mainWindow.orientatizzaaq1on = "column";

var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
var fileLocBox = groupOne.add("edittext", undefined, "Selected ticker Location");
fileLocBox.size = [150, 20];
var getFileButton = groupOne.add("button", undefined, "File...");
getFileButton.helpTip = "Select a .txt file to update the ticker";

var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var applyButton = groupTwo.add("button", undefined, "Apply");

mainWindow.center();
mainWindow.show();

//get file button
getFileButton.onClick = function() {
    file = file.openDlg("Open a file, if cancle please restart", "Acceptable Files:*.txt");
    fileLocBox.text = file.fsName;
    check = 1;
    }

//change content of the comp
applyButton.onClick = function(){
        app.beginUndoGroup("undo onclick");
         if(check == 0) {
                alert("Please select a file");
                return false;
            } else {
                    writeLn("processing apply...");
                    var fileData;
                    //   readTXT
                    fileData = readTxt();
                    changeComp(fileData);
                }
            
        alert("done");
        app.endUndoGroup();
    }

function readTxt() {
    var txtArray = [];
    var currentLine;
    file.open("r");
    while(!file.eof){
            currentLine = file.readln();
            txtArray.push(currentLine);
        }
    file.close();

    for(var i = 1; i<=20;i++){
            txtArray[i]=txtArray[i].substring(5, txtArray[i].length)
        }
    return txtArray;
    }

function changeComp(data) {
    //change date
     var myComp = app.project.item(93);
     if (myComp.layer(2) instanceof TextLayer){
            writeLn("changing date...");
            var textProp = myComp.layer(2).property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = data[0];
            textProp.setValue(textDocument);
    }

    //change news
     for (var i = 1; i <=20 ;i++){
        var newsComp = app.project.item(93+i);            
        if (newsComp.layer(1) instanceof TextLayer){
            writeLn("changing news"+i);
            var textProp =newsComp.layer(1).property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = data[i];
            textProp.setValue(textDocument);
         }
    }
}
/*
        writeLn("button clicked");
        writeLn(comp.numLayers);
        
        var myComp;
        for (var i = 1; i <= app.project.numItems; i ++) {
            if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === 'Comp Name')) {
                myComp = app.project.item(i);
                break;
            }
        }
    
        for (var i = 1; i <=comp.numLayers ;i++){
                    if (comp.layer(i) instanceof TextLayer){
                        writeLn("chan");
                        writeLn("chan");
                        var textProp = comp.layer(i).property("Source Text");
                        var textDocument = textProp.value;
                        textDocument.text = "改變改變";
                        textProp.setValue(textDocument);
                        }
                        }
            }
    
    */