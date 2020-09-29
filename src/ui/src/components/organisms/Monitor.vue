<template>
  <v-row>
    <v-col>
      <realtime-status v-bind:connection="connection"></realtime-status>
    </v-col>

    <v-col>
      <v-btn
        fab
        dark
        small
        @click="connect"
        v-if="connection === 'disconnected'"
        color="green"
      >
        <v-icon>mdi-satellite-uplink</v-icon>
      </v-btn>

      <!--
      <v-btn
        fab
        dark
        small
        @click="disconnect"
        v-if="connection === 'connected'"
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

let _connecting;
let _attempts = 0;
let _retries = 10;
let _deelay = 1000;

export default {
  components: {
    RealtimeStatus,
  },

  computed: mapState({
    connection: function (state) {
      if (
        state.history?.connection != "connected" &&
        !_connecting &&
        _attempts < _retries
      ) {
        _connecting = setTimeout(() => {
          _connecting = null;
          this.connect();
        }, _deelay * ++_attempts);
      } else if (state.history?.connection === "connected") {
        _attempts = 0;
        clearTimeout(_connecting);
        _connecting = null;
      }
      return state.history.connection;
    },
  }),

  methods: {
    connect() {
      this.$store.dispatch("history/connect");
    },
    disconnect() {
      this.$store.dispatch("history/disconnect");
    },
  },
};
</script>

<style>
</style>