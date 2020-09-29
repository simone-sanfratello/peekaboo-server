<template>
  <v-select dense outlined :items="modes" v-bind:value="mode" label="mode" @change="set"></v-select>
</template>

<script>
import { mapState } from "vuex";
import * as peekaboo from "../../lib/peekaboo";

export default {
  data: () => ({
    modes: Object.values(peekaboo.mode)
  }),

  computed: mapState({
    mode: state => state.server.mode.value
  }),

  methods: {
    set(value) {
      this.$store.dispatch("server/setMode", value);
    }
  },

  created: function() {
    this.$store.dispatch("server/getMode");
  }
};
</script>

