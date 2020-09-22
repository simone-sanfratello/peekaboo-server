<template>
  <v-select dense outlined :items="entries" v-bind:value="current" label="dataset" @change="set"></v-select>
</template>

<script>
import { mapState } from "vuex";
import * as peekaboo from "../../lib/peekaboo";

export default {
  computed: mapState({
    entries: (state) =>
      Object.entries(state.dataset.entries).map(([key, value]) => ({
        value: key,
        text: value,
      })) || [],
    current: (state) => state.dataset.current || state.dataset.default,
  }),

  methods: {
    set(id) {
      this.$store.dispatch("dataset/current", { id });
    },
  },

  created: function () {
    this.$store.dispatch("dataset/load");
  },
};
</script>

