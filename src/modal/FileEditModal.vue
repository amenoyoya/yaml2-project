<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">ファイル編集</p>
    </header>
      <section class="modal-card-body">
        <b-field label="Content">
          <b-input type="textarea" v-model="data.content"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button is-primary" @click="$parent.close()">OK</button>
      </footer>
    </div>
</template>

<script>
export default {
  props: ['data'],
}
</script>