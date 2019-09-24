/**
 * This file is part of Qunee for HTML5.
 * Copyright (c) 2016 by qunee.com
 **/



var graph = new Q.Graph(canvas);

initDatas();


    function initDatas()
    {
        graph.graphModel.clear();

        var node0 = graph.createNode("0", 0, -100);
        var node1 = graph.createNode("1", -100, 0);
        var node2 = graph.createNode("2", 100, 0);
        var node3 = graph.createNode("3", -100, -200);
        var node4 = graph.createNode("4", 100, -200);
        var node5 = graph.createNode("5", 200, -100);
        var node6 = graph.createNode("6", 300, 0);
        var node7 = graph.createNode("7", 200, 100);
        var node8 = graph.createNode("8", -200, 100);
        var node9 = graph.createNode("9", -300, 0);
        var node10 = graph.createNode("10", -200, -100);

        var button1=createText("Stop Service", -400, -100);
        var button2=createText("Start Service", -400, -200);
        button2.clickable = true;
        button1.dblclickable = true;

        function createEdge(from, to, type, lineWidth, color){
            var edge = graph.createEdge(from, to);
            edge.setStyle(Q.Styles.EDGE_COLOR, color || "#000");
            edge.setStyle(Q.Styles.EDGE_WIDTH, lineWidth || 2);
            edge.edgeType = type || Q.Consts.EDGE_TYPE_DEFAULT;
            edge.setStyle(Q.Styles.ARROW_TO, false);
            return edge;
        }
        var edge1 = createEdge(node0, node1);
        var edge2 = createEdge(node0, node2);
        var edge3 = createEdge(node1, node2);
        var edge4 = createEdge(node0, node3);
        var edge5 = createEdge(node0, node4);
        var edge6 = createEdge(node0, node10);
        var edge7 = createEdge(node1, node9);
        var edge8 = createEdge(node1, node8);
        var edge9 = createEdge(node2, node5);
        var edge10 = createEdge(node2, node6);
        var edge11 = createEdge(node2, node7);
        var edge12 = createEdge(node3, node4);
        var edge13 = createEdge(node4, node5);
        var edge14 = createEdge(node5, node6);
        var edge15 = createEdge(node6, node7);
        var edge16 = createEdge(node7, node8);
        var edge17 = createEdge(node8, node9);
        var edge18 = createEdge(node9, node10);
        var edge19 = createEdge(node10, node3);



        Q.loadJSON("./ShowTopology/buildPath.json",function (json) {
            var topoNodes=json.nodes;
            var relations=json.relations;
            var bandwidth=json.bandwidth;
            initTopology(topoNodes,relations);

            console.log(relations[0]);



            var label={};
            for(var i=0;i<bandwidth.length;i++)
            {
                label[i] = new Q.LabelUI(bandwidth[i].value.toString());
                label[i].position = Q.Position.CENTER_TOP;
                label[i].anchorPosition = Q.Position.CENTER_BOTTOM;
                // 带宽信息
            }
            edge1.addUI(label[0]);
            edge2.addUI(label[1]);
            edge3.addUI(label[2]);
            edge4.addUI(label[3]);
            edge5.addUI(label[4]);
            edge6.addUI(label[5]);
            edge7.addUI(label[6]);
            edge8.addUI(label[7]);
            edge9.addUI(label[8]);
            edge10.addUI(label[9]);
            edge11.addUI(label[10]);
            edge12.addUI(label[11]);
            edge13.addUI(label[12]);
            edge14.addUI(label[13]);
            edge15.addUI(label[14]);
            edge16.addUI(label[15]);
            edge17.addUI(label[16]);
            edge18.addUI(label[17]);
            edge19.addUI(label[18]);
        })


    }




function initTopology(topoNodes,topoRelations)
{
    // graph.graphModel.clear();
    var map={};

    for(var i=0;i<topoNodes.length;i++)
    {
        var node=topoNodes[i];
        var qNode=new Q.Node();
        // qNode.name=node.name;
        qNode.location=new Q.Point(node.x,node.y);
        graph.graphModel.add(qNode);
        map[node.id]=qNode;
        // qNode.image = Q.Graphs.exchanger;#b418b6;e671da;933f6a
        qNode.setStyle(Q.Styles.RENDER_COLOR,"#eaed0a");
        // edge.setStyle(Q.Styles.EDGE_COLOR, color || "#000")
    }


    for(var i=0;i<topoRelations.length;i++)
    {
        var relation=topoRelations[i];
        var nodeFrom=map[relation.from];
        var nodeTo=map[relation.to];

        if(nodeFrom&&nodeTo)
        {
            var edge;
            edge=graph.createEdge(nodeFrom,nodeTo);
            edge.info=relation;
            edge.setStyle(Q.Styles.EDGE_COLOR, "#eaed0a");
            edge.setStyle(Q.Styles.ARROW_TO_OUTLINE_STYLE, "#000");
            edge.setStyle(Q.Styles.EDGE_WIDTH, 5);
        }
    }

}

// var poll=setInterval(initDatas, 1000);
//
//
// graph.ondblclick = function(evt){
//
//     var element = evt.getData();
//     if(element){
//         window.clearInterval(poll);
//     }
// }



function createText(name, x, y, anchorPosition, w, h, fontSize, fontColor, backgroundColor){
    var text = graph.createText(name, x, y);
    text.setStyle(Q.Styles.LABEL_BORDER, 0.5);
    text.setStyle(Q.Styles.LABEL_PADDING, 5);
    text.setStyle(Q.Styles.LABEL_BORDER_STYLE, "#1D4876");
    text.tooltipType = "text";
    // if(host){
    //     text.host = text.parent = host;
    // }
    if(anchorPosition){
        text.anchorPosition = anchorPosition;
        text.setStyle(Q.Styles.LABEL_ALIGN_POSITION, anchorPosition);
    }
    if(w && h){
        text.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(w, h));
    }

    text.setStyle(Q.Styles.LABEL_FONT_SIZE, fontSize || 14);
    text.setStyle(Q.Styles.LABEL_COLOR, fontColor || "#555");
    text.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, backgroundColor || "#FFF");
//    text.setStyle(Q.Styles.LABEL_BACKGROUND_GRADIENT, new Q.Gradient(Q.Consts.GRADIENT_TYPE_LINEAR, ['#00d4f9', '#1ea6e6'], null, Math.PI/2));
    return text;
}



var poll;

graph.addCustomInteraction({

    onclick: function(evt, graph){
        Q.log("click");
        var element = graph.getElementByMouseEvent(evt);
        if(element && element.clickable){
              poll=setInterval(initDatas, 1000);
        }
    },
    ondblclick: function(evt, graph){
        Q.log("dblclick");
        var element = graph.getElementByMouseEvent(evt);
        if(element && element.dblclickable){
            window.clearInterval(poll);
        }
    }
});












// var l=document.getElementById("strategy_management");
//
// if(l.style.display=="block") {
//     l.style.display="none";
// }
var s=document.getElementById("show_list");

if(s.style.display == "block"){
    s.style.display = "none";
}

var g=document.getElementById("graph_panel");

if(g.style.display == "none"){
    g.style.display = "block";
}

var p=document.getElementById("policy_optimization");

if(p.style.display=="block") {
    p.style.display="none";
}