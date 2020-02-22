<template>
  <section class="section">
    <div id="rete"></div>
  </section>
</template>

<script>
import Rete from 'rete';
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';

// 数値ノード
class NumComponent extends Rete.Component {
  constructor() {
    super('Number');
  }

  builder(node) {
    const numSocket = new Rete.Socket('Number value');
    const out = new Rete.Output('num', 'Number', numSocket);

    node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    outputs['num'] = node.data.num;
  }
}

export default {
  mounted() {
    const editor = new Rete.NodeEditor('test@rete', document.querySelector('#rete'));
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    
    const numComponent = new NumComponent();
    editor.register(numComponent);

    const engine = new Rete.Engine('demo@0.1.0');
    engine.register(numComponent);

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
    });
  }
};
</script>
