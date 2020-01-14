<template>
  <div class="columns">
    <div class="column">
      <b-menu>
        <b-menu-list label="Menu">
          <b-menu-item
            icon-pack="fas" icon="cog"
            :active="isMenuActive"
            :expanded="isMenuActive"
            @click="isMenuActive = !isMenuActive"
          >
            <template slot="label" slot-scope="props">
              Control
              <b-icon
                  class="is-pulled-right"
                  pack="fas"
                  :icon="props.expanded ? 'chevron-down' : 'chevron-up'">
              </b-icon>
            </template>
            <b-menu-item @click="createNewDir" label="新規ディレクトリ"></b-menu-item>
            <b-menu-item @click="createNewFile" label="新規ファイル"></b-menu-item>
          </b-menu-item>
        </b-menu-list>
        <b-menu-list label="Actions">
          <b-menu-item @click="createYamlFile" label="YAMLファイル作成"></b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>

    <div class="column">
      <tree :data="files" draggable="draggable" crossTree="crossTree" class="tree">
        <div slot-scope="{data, store, vm}" :class="data.draggable? 'draggable': ''">
          <template v-if="!data.isDragPlaceHolder">
            <!-- children 要素を持つデータ: トグル機能 -->
            <b v-if="data.children && data.children.length" @click="store.toggleOpen(data)">
              <a><i :class="'far ' + (data.open ? 'fa-minus-square' : 'fa-plus-square')"></i>&nbsp;</a>
            </b>
          </template>
          <span>
            <i v-if="data.droppable" class="fas fa-folder"></i>
            <i v-else class="fas fa-file"></i>
            <!-- 編集アイコン -->
            <b-button v-if="!data.droppable" class="is-primary" size="is-small" @click="fileEditModal(data)">
              <i class="fas fa-edit"></i>
            </b-button>
            <!-- ファイル名変更用に input でファイル名表示 -->
            <input type="text" v-model="data.name" onClick="this.select()" />
          </span>
        </div>
      </tree>
    </div>
  </div>
</template>

<script>
// babel-polyfill を import しないと async, await が使えない
import 'babel-polyfill'

// 各コンポーネント import
import FileEditModal from '../modal/FileEditModal'

// NestedTreeデータを通常のオブジェクト配列に変換
const stripData = (array) => {
  const res = []
  for (const data of array) {
    res.push({
      open: data.open,
      active: data.active,
      draggable: data.draggable,
      droppable: data.droppable,
      name: data.name,
      content: data.content || '',
      children: stripData(data.children)
    })
  }
  return res
}

export default {
  data() {
    return {
      isMenuActive: true,
      files: [],
    }
  },

  methods: {
    createNewDir() {
      this.files.push({name: '新規ディレクトリ', draggable: true, droppable: true})
    },

    createNewFile() {
      this.files.push({name: '新規ファイル', content: '', draggable: true, droppable: false})
    },

    fileEditModal(data) {
      this.$buefy.modal.open({
        parent: this,
        props: {
          data: data,
        },
        component: FileEditModal,
        hasModalCard: true,
        fullScreen: true,
        trapFocus: true
      })
    },

    async createYamlFile() {
      const files = stripData(this.files)
      console.log(JSON.stringify(files))
      await saveYamlFile('./saved.yaml', files)
      window.alert('saved.yaml に保存しました')
    },
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