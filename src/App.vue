<template>
  <section class="section">
    <h2 class="title">BaklavaJS</h2>
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
  </section>
</template>

<script>
import { Editor } from '@baklavajs/core';
import { ViewPlugin } from '@baklavajs/plugin-renderer-vue';

export default {
  data() {
    return {
      editor: new Editor(),
      viewPlugin: new ViewPlugin()
    }
  },
  created() {
    this.editor.use(this.viewPlugin);
  }
};
</script>
