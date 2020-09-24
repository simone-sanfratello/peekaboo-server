<template>
  <v-select
    dense
    outlined
    :items="entries"
    v-bind:value="current"
    label="dataset"
    @change="set"
  ></v-select>
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
    async set(id) {
      await this.$store.dispatch("dataset/set", { id })
      this.$store.dispatch("cache/summary")
    },
  },

  created: function () {
    this.$store.dispatch("dataset/load")
  },
};
</script>

