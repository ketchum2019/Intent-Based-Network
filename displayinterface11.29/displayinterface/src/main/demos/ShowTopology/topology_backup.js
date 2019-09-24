/**
 * This file is part of Qunee for HTML5.
 * Copyright (c) 2016 by qunee.com
 **/

var graph = new Q.Graph("canvas");

// var node={};
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

function createEdge(from, to, type, lineWidth, color){
    var edge = graph.createEdge(from, to);
    edge.setStyle(Q.Styles.EDGE_COLOR, color || "#000");
    edge.setStyle(Q.Styles.EDGE_WIDTH, lineWidth || 2);
    edge.edgeType = type || Q.Consts.EDGE_TYPE_DEFAULT;
    edge.setStyle(Q.Styles.ARROW_TO, false);
    return edge;
}
var edge1 = createEdge(node0, node3);
var edge2 = createEdge(node0, node4);
var edge3 = createEdge(node0, node1);
var edge4 = createEdge(node0, node2);
var edge5 = createEdge(node0, node10);
var edge6 = createEdge(node0, node5);
var edge7 = createEdge(node1, node2);
var edge8 = createEdge(node1, node9);
var edge9 = createEdge(node1, node8);
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





function initDatas()
{
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


// window.requestAnimationFrame(initDatas);

initDatas();
// initDatas();
// $("#canvas").empty();
// .getElementById("canvas")
// document.execCommand("Refresh");
// document.getElementById("canvas").innerHTML = toString(graph);
// function test()
// {
//     graph.DrawableInteraction = true;
//     initDatas();
//     console.log(1);
// }
// setTimeout(initDatas,500);
// setInterval(test, 1000);
// setInterval(function() {
//     initDatas()
// }, 500);

//     graph.fullRefresh=true;
// var timer;
// function Click(){
//     clearInterval(timer);//每次触发都先清除一次
//     console.log(1);
//     timer = setInterval(initDatas,500);
// }
// Click();




/*
var graph = new Q.Graph("canvas");
var node1 = graph.createNode("001", -230, -150);
var node2 = graph.createNode("002", 200, -150);
var node3 = graph.createNode("003", 0, 0);
var node4 = graph.createNode("004", -200, 150);
var node5 = graph.createNode("005", 200, 150);
var node6 = graph.createNode("006", -350, 100);

function createEdge(from, to, type, lineWidth, color){
    var edge = graph.createEdge(from.name + " --> " + to.name, from, to);
    edge.setStyle(Q.Styles.EDGE_COLOR, color || "#000");
    edge.setStyle(Q.Styles.EDGE_WIDTH, lineWidth || 2);
    edge.edgeType = type || Q.Consts.EDGE_TYPE_DEFAULT;
    return edge;
}

var edge = createEdge(node1, node2);
edge.setStyle(Q.Styles.ARROW_FROM, true);
edge.setStyle(Q.Styles.ARROW_FROM_OFFSET, {x: 0.5});

var loopedEdge = createEdge(node1, node1, null, 1, "red");
createEdge(node1, node1, null, 1, "blue");
createEdge(node1, node1, null, 1, "blue");
var edge = createEdge(node2, node1, null, 1, "red");
createEdge(node1, node2, null, 3, "blue");
createEdge(node1, node3, Q.Consts.EDGE_TYPE_ORTHOGONAL_HORIZONTAL);
createEdge(node2, node3, Q.Consts.EDGE_TYPE_EXTEND_RIGHT);

var edge1 = createEdge(node3, node4, Q.Consts.EDGE_TYPE_ELBOW);
edge1.setStyle(Q.Styles.EDGE_LINE_DASH, [8, 4, 0.01, 4]);
edge1.setStyle(Q.Styles.LINE_CAP, "round");
edge1.setStyle(Q.Styles.ARROW_TO, Q.Consts.SHAPE_TRIANGLE);
edge1.setStyle(Q.Styles.ARROW_TO_SIZE, {width: 16, height: 14});
edge1.setStyle(Q.Styles.ARROW_TO_STROKE, 1);
edge1.setStyle(Q.Styles.ARROW_TO_STROKE_STYLE, "#000");
edge1.setStyle(Q.Styles.ARROW_TO_FILL_GRADIENT, Q.Gradient.RAINBOW_LINEAR_GRADIENT_VERTICAL);
edge1.setStyle(Q.Styles.ARROW_FROM, Q.Consts.SHAPE_CIRCLE);
edge1.setStyle(Q.Styles.ARROW_FROM_SIZE, 8);
edge1.setStyle(Q.Styles.EDGE_OUTLINE, 1);
edge1.setStyle(Q.Styles.EDGE_OUTLINE_STYLE, "#0F0");

var edge2 = createEdge(node3, node5, Q.Consts.EDGE_TYPE_VERTICAL_HORIZONTAL, 2, Colors.blue);
edge2.setStyle(Q.Styles.EDGE_LINE_DASH, [2, 1]);
edge2.setStyle(Q.Styles.ARROW_TO_LINE_DASH, [2, 1]);
var edge3 = createEdge(node1, node4, Q.Consts.EDGE_TYPE_ORTHOGONAL);
edge3.setStyle(Q.Styles.ARROW_FROM, Q.Consts.SHAPE_CROSS);
edge3.setStyle(Q.Styles.ARROW_FROM_FILL_COLOR, "#58F");
edge3.setStyle(Q.Styles.ARROW_FROM_OFFSET, {x: 20});
edge3.setStyle(Q.Styles.ARROW_FROM_STROKE, 1);
edge3.setStyle(Q.Styles.ARROW_TO, Q.Consts.SHAPE_ARROW_3);
edge3.setStyle(Q.Styles.ARROW_TO_FILL_COLOR, "#000");
edge3.setStyle(Q.Styles.ARROW_TO_STROKE, 1);

var edge4 = createEdge(node2, node4);
edge4.addPathSegment([200, -180]);
edge4.addPathSegment([250, -180]);
edge4.addPathSegment([250, 200]);
edge4.addPathSegment([-250, 200]);
edge4.addPathSegment([-250, 150]);
var label1 = new Q.LabelUI();
label1.position = Q.Position.LEFT_BOTTOM;
label1.anchorPosition = Q.Position.LEFT_BOTTOM;
label1.offsetX = 10;
edge4.addUI(label1, {bindingProperty : "data",
    property : "leftLabel",
    propertyType : Q.Consts.PROPERTY_TYPE_STYLE});
var label2 = new Q.LabelUI();
label2.position = Q.Position.RIGHT_BOTTOM;
label2.anchorPosition = Q.Position.RIGHT_TOP;
label2.offsetX = -10;
edge4.addUI(label2, {bindingProperty : "data",
    property : "rightLabel",
    propertyType : Q.Consts.PROPERTY_TYPE_STYLE});
edge4.setStyle("leftLabel", "Left");
edge4.setStyle("rightLabel", "Right");


var edge5 = graph.createEdge(node1, node6);
edge5.setStyle(Q.Styles.ARROW_TO, false);
var label2 = new Q.LabelUI('256kbps');
label2.position = Q.Position.CENTER_TOP;
label2.anchorPosition = Q.Position.LEFT_BOTTOM;
var icon2 = new Q.ImageUI(Q.Shapes.getShape(Q.Consts.SHAPE_ARROW_2, -20, 10));
icon2.fillColor = '#0EE';
icon2.position = Q.Position.CENTER_TOP;
icon2.anchorPosition = Q.Position.RIGHT_BOTTOM;
icon2.padding = 3;
edge5.addUI(label2);
edge5.addUI(icon2);
var label2 = new Q.LabelUI('132kbps');
label2.position = Q.Position.CENTER_BOTTOM;
label2.anchorPosition = Q.Position.RIGHT_TOP;
var icon2 = new Q.ImageUI(Q.Shapes.getShape(Q.Consts.SHAPE_ARROW_2, 20, 10));
icon2.fillColor = '#0EE';
icon2.position = Q.Position.CENTER_BOTTOM;
icon2.anchorPosition = Q.Position.LEFT_TOP;
icon2.padding = 3;
edge5.addUI(label2);
edge5.addUI(icon2);

var offset = 0;
var index = 0;
var timer = setInterval(function(){
    offset += -1;
//    edge2.setStyle(Q.Styles.EDGE_LINE_DASH_OFFSET, offset);
    edge1.setStyle(Q.Styles.EDGE_LINE_DASH_OFFSET, offset);
    index++;
    index = index%20;
    edge2.setStyle(Q.Styles.ARROW_TO_OFFSET, -0.3 -0.02 * (20 - index));
    edge1.setStyle(Q.Styles.ARROW_FROM_OFFSET, {x: 0.3 + 0.02 * (20 - index), y: -10});
}, 150);

function destroy(){
    clearInterval(timer);
}*/
var s=document.getElementById("show_list");

if(s.style.display == "block"){
    s.style.display = "none";
}

var g=document.getElementById("graph_panel");

if(g.style.display == "none"){
    g.style.display = "block";
}