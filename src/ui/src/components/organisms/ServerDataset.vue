<template>
  <v-select dense outlined :items="entries" v-bind:value="current" label="dataset" @change="set"></v-select>
</template>

<script>
import { mapState } from "vuex";
import * as peekaboo from "../../lib/peekaboo";

export default {

  computed: mapState({
    entries: state => state.dataset.entries?.values?.map(value => ({value: value.id, text: value.name})) || [],
    current: state => state.dataset.current.value || peekaboo.dataset.default
  }),

  methods: {
    set(id) {
      this.$store.dispatch("dataset/current", id);
    }
  }
};
</script>

