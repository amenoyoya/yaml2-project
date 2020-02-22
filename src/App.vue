<template>
  <section style="width:100%; height:100%">
    <canvas id='mycanvas' width='1024' height='720' style='border: 1px solid'></canvas>
  </section>
</template>

<script>
import { LiteGraph, LGraph, LGraphCanvas, LGraphNode } from './litegraph/litegraph';
import './litegraph/litegraph.css';

/**
 * 自作ノード
 */
class MyNode extends LGraphNode {
  constructor() {
    super('自作ノード');
    this.title = 'インクリメント';
    this.addInput('入力', 'number');
    this.addOutput('出力', 'number');
  }
  onExecute() {
    let a = this.getInputData(0);
    if (a === undefined) {
      a = 0;
    }
    this.setOutputData(0, ++a);
  }
}

export default {
  mounted() {
    const graph = new LGraph();
    const canvas = new LGraphCanvas("#mycanvas", graph);
    
    // デフォルトの登録済みノードをクリア
    // LiteGraph.registered_node_types = {};
    // LiteGraph.searchbox_extras = {};

    // 自作ノード登録
    LiteGraph.registerNodeType('自作/test', MyNode);

    const node_const = LiteGraph.createNode("basic/const");
    node_const.pos = [200,200];
    graph.add(node_const);
    node_const.setValue(4.5);

    var node_watch = LiteGraph.createNode("basic/watch");
    node_watch.pos = [700,200];
    graph.add(node_watch);
    node_const.connect(0, node_watch, 0 );
    graph.start()
  }
};
</script>
