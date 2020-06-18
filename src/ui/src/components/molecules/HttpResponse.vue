<template>
  <v-expansion-panels>
    <v-expansion-panel class="blue lighten-2 http-response">
      <v-expansion-panel-header class="title">Response</v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-card class="blue lighten-2" outlined>
          <p class="subtitle-1">
            status {{ response.status }}
            <v-chip
              small
              color="yellow"
              v-if="response.body == 'ENDPOINT_ERROR_TIMEOUT'"
            >timeout</v-chip>
          </p>

          <div class="http-response-content">
            <v-expansion-panels accordion multiple>
              <v-expansion-panel class="mb-1">
                <v-expansion-panel-header class="subtitle-2">headers</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <http-headers :headers="response.headers"></http-headers>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-1">
                <v-expansion-panel-header class="subtitle-2">body</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <http-body :body="response.body" :headers="response.headers"></http-body>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters } from "vuex";
import HttpBody from "../atoms/HttpBody";
import HttpHeaders from "../atoms/HttpHeaders";

export default {
  components: {
    HttpBody,
    HttpHeaders
  },

  props: {
    id: String
  },

  data: () => ({
    entry: null,
    response: {}
  }),

  computed: {
    ...mapGetters({
      get: "history/get"
    })
  },

  created: function() {
    this.$store.dispatch("history/get", this.id);
    this.unwatch = this.$store.watch(
      (state, getters) => getters["history/get"](this.id),
      (new_, old) => {
        this.entry = new_;
        this.response = new_.response;
      }
    );
  },

  beforeDestroy() {
    this.unwatch();
  }
};
</script>

<style>
.http-response-content {
}
</style>