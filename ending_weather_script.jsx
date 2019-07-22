clearOutput();
writeLn("program start");

//project variables
var file2 = new File;
var check2 = 0;

//UI
var mainWindow = new Window("palette", "File Reader", undefined);
mainWindow.orientatizzaaq1on = "column";

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
getFileButton2.onClick = function() {
    file2 = file2.openDlg("Open a file, if cancle please restart", "Acceptable Files:*.txt");
    fileLocBox2.text = file2.fsName;
    check2 = 1;
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
    //change us
     for (var i = 0; i < 10 ;i++){
        var Comp32 = app.project.item(14+i);            
        var itemnum = i*4;
        
        //clear layer
        for (var j = 5; j<=12; j++){
                Comp32.layer(j).enabled = false;
        }
        
        //change layer
        writeLn("changing weather: "+data[itemnum]);
        
        //change text
        var textProp =Comp32.layer(3).property("Source Text");
        var textDocument = textProp.value;
        textDocument.text = data[itemnum+2];
        textProp.setValue(textDocument);
        
        //change text 2
        var textProp2 =Comp32.layer(4).property("Source Text");
        var textDocument2 = textProp2.value;
        textDocument2.text = data[itemnum+3];
        textProp2.setValue(textDocument2);
        
        //change weather
        switch(data[itemnum+1]) {
          case "sunny":
            Comp32.layer(11).enabled = true;
            break;
          case "cloudy":
            Comp32.layer(5).enabled = true;
            break;
          case "partlycloudy":
            Comp32.layer(8).enabled = true;
            break;
          case "windy":
            Comp32.layer(12).enabled = true;
            break;
          case "rain":
            Comp32.layer(9).enabled = true;
            break;
          case "thunder":
            Comp32.layer(7).enabled = true;
            break;
          case "snow":
            Comp32.layer(10).enabled = true;
            break;
          default:
            var alertmsg = "please change manually: " + data[itemnum];
            alert(alertmsg);
        }
    }

//change world
     for (var i = 0; i < 10 ;i++){
        var Comp32 = app.project.item(25+i);            
        var itemnum = 40+i*4;
        
        //clear layer
        for (var j = 5; j<=12; j++){
                Comp32.layer(j).enabled = false;
        }
        
        //change layer
        writeLn("changing weather: "+data[itemnum]);
        
        //change text
        var textProp =Comp32.layer(3).property("Source Text");
        var textDocument = textProp.value;
        textDocument.text = data[itemnum+2];
        textProp.setValue(textDocument);
        
        //change text 2
        var textProp2 =Comp32.layer(4).property("Source Text");
        var textDocument2 = textProp2.value;
        textDocument2.text = data[itemnum+3];
        textProp2.setValue(textDocument2);
        
        //change weather
        switch(data[itemnum+1]) {
          case "sunny":
            Comp32.layer(11).enabled = true;
            break;
          case "cloudy":
            Comp32.layer(5).enabled = true;
            break;
          case "partlycloudy":
            Comp32.layer(8).enabled = true;
            break;
          case "windy":
            Comp32.layer(12).enabled = true;
            break;
          case "rain":
            Comp32.layer(9).enabled = true;
            break;
          case "thunder":
            Comp32.layer(7).enabled = true;
            break;
          case "snow":
            Comp32.layer(10).enabled = true;
            break;
          default:
            var alertmsg = "please change manually: " + data[itemnum];
            alert(alertmsg);
        }
    }


}
