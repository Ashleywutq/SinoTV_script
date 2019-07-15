clearOutput();
writeLn("program start");

//project variables
var file = new File;
var file2 = new File;
var check = 0;
var check2 = 0;

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

var groupOne2 = mainWindow.add("group", undefined, "groupOne2");
groupOne2.orientation = "row";
var fileLocBox2 = groupOne2.add("edittext", undefined, "Selected weather Location");
fileLocBox2.size = [150, 20];
var getFileButton2 = groupOne2.add("button", undefined, "File...");
getFileButton2.helpTip = "Select a .txt file to update the weather";

var groupTwo2 = mainWindow.add("group", undefined, "groupTwo2");
groupTwo2.orientation = "row";
var applyButton2 = groupTwo2.add("button", undefined, "Apply");

mainWindow.center();
mainWindow.show();

//get file button
getFileButton.onClick = function() {
    file = file.openDlg("Open a file, if cancle please restart", "Acceptable Files:*.txt");
    fileLocBox.text = file.fsName;
    check = 1;
    }

getFileButton2.onClick = function() {
    file2 = file2.openDlg("Open a file, if cancle please restart", "Acceptable Files:*.txt");
    fileLocBox2.text = file2.fsName;
    check2 = 1;
    }

//change content of the comp
applyButton.onClick = function(){
        app.beginUndoGroup("undo onclick");
         if(check == 0) {
                alert("Please select a file");
                return false;
            } else {
                    writeLn("processing ticker...");
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
     var myComp = app.project.item(72);
     if (myComp.layer(2) instanceof TextLayer){
            writeLn("changing date...");
            var textProp = myComp.layer(2).property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = data[0];
            textProp.setValue(textDocument);
    }

    //change news
     for (var i = 1; i <=20 ;i++){
        var newsComp = app.project.item(72+i);            
        if (newsComp.layer(1) instanceof TextLayer){
            writeLn("changing news"+i);
            var textProp =newsComp.layer(1).property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = data[i];
            textProp.setValue(textDocument);
         }
    }
}

//change content of the comp
applyButton2.onClick = function(){
        app.beginUndoGroup("undo onclick");
         if(check2 == 0) {
                alert("Please select a file");
                return false;
            } else {
                    writeLn("processing weather...");
                    var fileData;
                    //   readTXT
                    fileData = readTxt2();
                    writeLn(fileData[2]);
                    changeComp2(fileData);  
                }
            
        alert("done");
        app.endUndoGroup();
    }


function readTxt2() {
    var txtArray = [];
    var currentLine;
    file2.open("r");
    while(!file2.eof){
            currentLine = file2.readln();
            txtArray.push(currentLine);
        }
    file2.close();
    return txtArray;
    }

function changeComp2(data) {
    //change corner22+ny
     for (var i = 0; i <= 31 ;i++){
        var Comp32 = app.project.item(13+i);            
        var itemnum = i*3;
        //clear layer
        Comp32.layer(20).enabled = false;
        for (var j = 2; j<=9; j++){
                Comp32.layer(j).enabled = false;
        }
        for (var j =11; j<=16; j++){
                Comp32.layer(j).enabled = false;
        }
        
        //change layer
        writeLn("changing weather: "+data[itemnum]);
        //change text
        var textProp =Comp32.layer(10).property("Source Text");
        var textDocument = textProp.value;
        textDocument.text = data[itemnum+2];
        textProp.setValue(textDocument);
        //change weather
        switch(data[itemnum+1]) {
          case "sunny":
            Comp32.layer(6).enabled = true;
            Comp32.layer(11).enabled = true;
            break;
          case "cloudy":
            Comp32.layer(7).enabled = true;
            Comp32.layer(13).enabled = true;
            break;
          case "partlycloudy":
            Comp32.layer(5).enabled = true;
            Comp32.layer(12).enabled = true;
            break;
          case "windy":
            Comp32.layer(2).enabled = true;
            Comp32.layer(16).enabled = true;
            break;
          case "rain":
            Comp32.layer(3).enabled = true;
            Comp32.layer(15).enabled = true;
            break;
          case "thunder":
            Comp32.layer(4).enabled = true;
            Comp32.layer(14).enabled = true;
            break;
          case "snow":
            Comp32.layer(8).enabled = true;
            Comp32.layer(20).enabled = true;
            break;
          default:
            var alertmsg = "please change manually: " + data[itemnum];
            alert(alertmsg);
        }
    }

    //change ca
    for (var i = 0; i <= 11 ;i++){
        var Comp32 = app.project.item(55+i);            
        var itemnum = (32*3)+ (i*3);
        //clear layer
        Comp32.layer(20).enabled = false;
        for (var j = 2; j<=9; j++){
                Comp32.layer(j).enabled = false;
        }
        for (var j =11; j<=16; j++){
                Comp32.layer(j).enabled = false;
        }
        
        //change layer
        writeLn("changing weather: "+data[itemnum]);
        //change text
        var textProp =Comp32.layer(10).property("Source Text");
        var textDocument = textProp.value;
        textDocument.text = data[itemnum+2];
        textProp.setValue(textDocument);
        //change weather
        switch(data[itemnum+1]) {
          case "sunny":
            Comp32.layer(6).enabled = true;
            Comp32.layer(11).enabled = true;
            break;
          case "cloudy":
            Comp32.layer(7).enabled = true;
            Comp32.layer(13).enabled = true;
            break;
          case "partlycloudy":
            Comp32.layer(5).enabled = true;
            Comp32.layer(12).enabled = true;
            break;
          case "windy":
            Comp32.layer(2).enabled = true;
            Comp32.layer(16).enabled = true;
            break;
          case "rain":
            Comp32.layer(3).enabled = true;
            Comp32.layer(15).enabled = true;
            break;
          case "thunder":
            Comp32.layer(4).enabled = true;
            Comp32.layer(14).enabled = true;
            break;
          case "snow":
            Comp32.layer(8).enabled = true;
            Comp32.layer(20).enabled = true;
            break;
          default:
            var alertmsg = "please change manually: " + data[itemnum];
            alert(alertmsg);
        }
    }


}
/*
        if (newsComp.layer(1) instanceof TextLayer){
            writeLn("changing news"+i);
            var textProp =newsComp.layer(1).property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = data[i];
            textProp.setValue(textDocument);
         }
    
    */