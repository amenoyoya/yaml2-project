<template>
  <section>
    <!-- Draggable -->
    <tree :data="animals" draggable="draggable" crossTree="crossTree" class="tree">
      <div slot-scope="{data, store, vm}" :class="data.draggable? 'draggable': ''">
        <template v-if="!data.isDragPlaceHolder">
          <b v-if="data.children && data.children.length" @click="store.toggleOpen(data)">
            <a><i :class="'far ' + (data.open ? 'fa-minus-square' : 'fa-plus-square')"></i>&nbsp;</a>
          </b>
        </template>
        <span>
          <i v-if="data.droppable" class="fas fa-folder"></i>
          <i v-else class="fas fa-file"></i>
          {{data.emoji}} {{data.name}}
        </span>
      </div>
    </tree>

    <!-- Execute -->
    <button class="button is-primary" @click="createYamlFile">YAMLファイル作成</button>
  </section>
</template>

<script>
// babel-polyfill を import しないと async, await が使えない
import 'babel-polyfill'

const animals = [
  { name: '/', draggable: false, droppable: true, children: [
    { emoji: '🐄', name: 'うし', draggable: true, droppable: false },
    { emoji: '🐕', name: 'いぬ', draggable: true, droppable: false },
    { emoji: '🐈', name: 'ねこ', draggable: true, droppable: false },
    { emoji: '🐓', name: 'にわとり', draggable: true, droppable: true, children: [
      { emoji: '🐤', name: 'ひよこ兄', draggable: true, droppable: false },
      { emoji: '🐤', name: 'ひよこ弟', draggable: true, droppable: false },
    ]},
    { emoji:'🐖', name: 'ぶた', draggable: true, droppable: false }
  ]}
]

export default {
  data() {
    return {
      animals: animals,
    }
  },
  methods: {
    async createYamlFile() {
      console.log(this.animals.__ob__.value)
      await saveYamlFile('./saved.yaml', this.animals.__ob__.value)
    }
  }
}
</script>

<style scope>
.draggable {
  cursor: move;
}
.tree {
  display: inline-block;
}
</style>