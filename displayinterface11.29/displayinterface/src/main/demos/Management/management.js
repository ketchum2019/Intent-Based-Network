var s=document.getElementById("show_list");

if(s.style.display == "block"){
    s.style.display = "none";
}

var g=document.getElementById("graph_panel");

if(g.style.display == "block"){
    g.style.display = "none";
}

/*var l=document.getElementById("strategy_management");

if(l.style.display=="none") {
    l.style.display="block";
}
*/




function show(){
    var fso;
    fso=new ActiveXObject("Scripting.FileSystemObject");
    var openf1=fso.OpenTextFile("G://SoftDrink.drl");
    var str1=openf1.ReadAll();
    alert(str1);
}



//动态刷新表格内容
document.getElementById("bt32").onclick=function changeContent(){
    var x=document.getElementById("table1").rows[1].cells;
    var str1="G:/ZTE/7.25-初始功能正常通信/displayinterface/src/main/demos/Management/rules engine/change one bottle.drl";
    var obj=str1.lastIndexOf("/");
 //   console.log(str1.substr(obj+1));
 //    console.log(str1.substr(0,obj));
    var obj2=str1.lastIndexOf(".");
    x[0].innerHTML=str1.substring(obj+1,obj2);
}




//查看修改指定策略
document.getElementById("bt33").onclick=function(){
    var inputValue = document.getElementById("input2").value;
    var str1="G:/ZTE/7.25-初始功能正常通信/displayinterface/src/main/demos/Management/rules engine/change one bottle.drl";
    var obj=str1.lastIndexOf("/");
    // console.log(str1.substr(obj+1));
    // console.log(str1.substr(0,obj));
    if(inputValue==str1.substr(obj+1))
    {
        document.getElementById("input3").value=str1.substr(obj+1);
    }
    else{
        document.getElementById("input3").value="";
        alert("not exist");
    }

    document.getElementById("bt34").onclick=function(){
        var fso;
        fso=new ActiveXObject("Scripting.FileSystemObject");
        var openf1=fso.OpenTextFile("G:/ZTE/7.25-初始功能正常通信/displayinterface/src/main/demos/Management/rules engine/change one bottle.drl");
        var str1=openf1.ReadAll();
        document.getElementById("input4").value=str1;
    }
    document.getElementById("bt36").onclick=function(){
        var str1="G:/ZTE/7.25-初始功能正常通信/displayinterface/src/main/demos/Management/rules engine/change one bottle.drl";
        var inputValue = document.getElementById("input4").value;
        var fso, f1;
        fso = new ActiveXObject("Scripting.FileSystemObject");
        f1 = fso.CreateTextFile(str1);
        f1.Write(inputValue);
        f1.Close();
        alert("modify successfully");
    }
}



//生成策略文件
document.getElementById("bt35").onclick=function(){
    var str1="G://ZTE//7.25-初始功能正常通信//displayinterface//src//main//demos//Management//generate.drl";
    var inputValue = document.getElementById("input5").value;
    var fso, f1;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    f1 = fso.CreateTextFile(str1,true,-1);
    f1.Write(inputValue);
    f1.Close();

    //以utf-8格式写入文件：规则中中文
    // var fs = new ActiveXObject("Adodb.Stream");
    // fs.Charset = "utf-8";
    // fs.Open();
    // var inputValue = document.getElementById("input5").value;
    // fs.WriteText(inputValue);
    // fs.SaveToFile("G://ZTE//7.25-初始功能正常通信//displayinterface//src//main//demos//Management//generate.drl", 2); // 这里的2表示覆盖模式
    // fs.Close();
}








//取得策略名
// var inputValue = document.getElementById("input5").value;
// inputValue.split("rule");
// var getname= /\"(.+?)\"/.exec(inputValue.split("rule")[1])[1];
// var fso, f1;
// fso = new ActiveXObject("Scripting.FileSystemObject");
// f1 = fso.CreateTextFile("D://9.19-添加管理界面//interface-test-1//demos//Management//getname.drl", true,-1);
// f1.Write(getname);





// // 获取C:\根目录下的文件句柄
// f2 = fso.GetFile("c:\\testfile.txt");
// // 移动文件到\tmp目录下
// f2.Move ("c:\\tmp\\testfile.txt");
// // 拷贝文件到\temp目录下
// f2.Copy ("c:\\temp\\testfile.txt");
// // 获取文件句柄
// f2 = fso.GetFile("c:\\tmp\\testfile.txt");
// f3 = fso.GetFile("c:\\temp\\testfile.txt");









