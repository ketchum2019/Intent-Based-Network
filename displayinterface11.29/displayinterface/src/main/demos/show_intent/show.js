/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}




document.getElementById("bt1").onclick=function(){
    var inputValue = document.getElementById("input1").value;
    // alert("获取"+inputValue);

    var fso, f1;
    fso = new ActiveXObject("Scripting.FileSystemObject");
  //  fso = new XMLHttpRequest("Scripting.FileSystemObject");
// 创建文件
    f1 = fso.CreateTextFile("G://ZTE//7.25-初始功能正常通信//displayinterface//src//main//resources//intend.txt", true,-1);
// 填写一行数据
    f1.Write(inputValue);
    // f1.WriteBlankLines(1);
// 关闭文件
    f1.Close();

}


// sendintent(inputValue)

document.getElementById("bt2").onclick=function(){getintent()};
document.getElementById("bt3").onclick=function(){choosepolicy()};




// function sendintent(data) {
//             var blob = new Blob([JSON.stringify(data)]);
//             saveAs(blob, "hello.json");
//          }
function getintent() {
    Q.loadJSON("./show_intent/keywords.json",function (json)
    {
        var keyword=json.keywords;
        var word=[];
        var result="";
        for(var i=0;i<keyword.length;i++)
        {
            word[i] =keyword[i].content;
            result=result+word[i]+"     ";
        }
        document.getElementById("result1").value=result;
    })
}

function choosepolicy() {
    Q.loadJSON("./show_intent/policy.json",function (json)
    {
        var policy=json.policy;
        document.getElementById("result2").value=policy[0].content+" was choosed";
    })
}




var s=document.getElementById("show_list");

if(s.style.display == "none"){
    s.style.display = "block";
}
var g=document.getElementById("graph_panel");

if(g.style.display=="block") {
    g.style.display="none";
}
var p=document.getElementById("policy_optimization");

if(p.style.display=="block") {
    p.style.display="none";
}
/*
var l=document.getElementById("strategy_management");

if(l.style.display=="block") {
    l.style.display="none";
}*/


