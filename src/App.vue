<template>
  <section class="section">
    <!-- <nested-tree /> -->
    <!-- <diagram /> -->
    <LiteGraph />
  </section>
</template>

<script>
import LiteGraph from './components/LiteGraph';

export default {
  components: {
    LiteGraph
  }
};
</script>

<style>
html,
body {
  height: 100%;
  position: relative;
  margin: 0;
}
</style>
