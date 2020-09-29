<template>
  <v-chip class="ma-2" v-bind:color="color(connection)">{{info(connection)}}</v-chip>
</template>

<script>
const colors = {
  connected: "green",
  connecting: "grey",
  disconnected: "red"
};
const statuses = {
  connected: "connected",
  connecting: "connecting",
  disconnected: "disconnected"
};

export default {
  props: {
    connection: String
  },

  methods: {
    color(connection) {
      return colors[connection] || "grey";
    },
    info(connection) {
      return statuses[connection] || "...";
    }
  }
};
</script>

<style>
.http-time {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
</style>