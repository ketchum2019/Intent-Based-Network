var s=document.getElementById("show_list");

if(s.style.display == "block"){
    s.style.display = "none";
}

var g=document.getElementById("graph_panel");

if(g.style.display == "block"){
    g.style.display = "none";
}

var p=document.getElementById("policy_optimization");

if(p.style.display=="none") {
    p.style.display="block";
}



function moveMessage(ele){
    var elem=document.getElementById(ele);
    var current_x=parseInt(elem.style.left);
    if(current_x==615){
        return true;
    }
    if(current_x<615){
        current_x=current_x+50;
    }
    if(current_x>615){
        current_x=current_x-50;
    }
    elem.style.left=current_x+"px";
}


function getCurrentRule() {
    Q.loadJSON("./Policy_optimization/current_rules.json",function (json)
    {
        var old=json.current_rules;
        rules=[];
        for(var i=0;i<old.length;i++)
        {
            rules[i] =old[i].name;
            // console.log(rules[i]);
        }
    })
}


function showNewRule(){
    var fso;
    fso=new ActiveXObject("Scripting.FileSystemObject");
    var openf1=fso.OpenTextFile("G:/ZTE/7.25-初始功能正常通信/displayinterface/src/main/demos/Policy_optimization/test.drl");
    var str1=openf1.ReadAll();
    document.getElementById("input4").value=str1;
}


document.getElementById("bt12").onclick=function(){

    window.setInterval(function()
    {
        for(var i=0;i<rules.length;i++)
        {
            moveMessage(rules[i])
        }
    }, 1000);
    getCurrentRule();
    var wait=setTimeout(showNewRule,5000);
};


// document.getElementById()
