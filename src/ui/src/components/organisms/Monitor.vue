<template>
  <v-row>
    <v-col>
      <realtime-status v-bind:connection="connection"></realtime-status>
    </v-col>

    <v-col>
      <v-btn fab dark small @click="connect" v-if="connection == 'disconnected'" color="green">
        <v-icon>mdi-satellite-uplink</v-icon>
      </v-btn>

      <!--
      <v-btn
        fab
        dark
        small
        @click="disconnect"
        v-if="connection == 'connected'"
        color="red"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      -->
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import RealtimeStatus from "../atoms/RealtimeStatus";

export default {
  components: {
    RealtimeStatus
  },

  computed: mapState({
    connection: state => state.history.connection
  }),

  methods: {
    connect() {
      this.$store.dispatch("history/connect");
    },
    disconnect() {
      this.$store.dispatch("history/disconnect");
    }
  }
};
</script>

<style>
</style>