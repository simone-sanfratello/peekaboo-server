<template>
  <v-expansion-panels>
    <v-expansion-panel class="yellow lighten-1 http-request">
      <v-expansion-panel-header class="title">Request</v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-card class="yellow lighten-1" outlined>
          <p class="subtitle-1">
            {{ request.method }} {{ request.url }}
            <v-btn absolute right small @click="() => clipboardCurl()">copy as cURL</v-btn>
            <input :id="'curl-'+id" :value="curl" class="curl-helper" />
          </p>

          <div class="http-request-content">
            <v-expansion-panels accordion multiple>
              <v-expansion-panel class="mb-1" v-if="request.query">
                <v-expansion-panel-header class="subtitle-2">query</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <http-query :query="request.query"></http-query>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-1" v-if="request.headers">
                <v-expansion-panel-header class="subtitle-2">headers</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <http-headers :headers="request.headers"></http-headers>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-1" v-if="request.body">
                <v-expansion-panel-header class="subtitle-2">body</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <http-body :body="request.body" :headers="request.headers"></http-body>
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
import HttpQuery from "../atoms/HttpQuery";
import HttpHeaders from "../atoms/HttpHeaders";

export default {
  components: {
    HttpBody,
    HttpHeaders,
    HttpQuery
  },

  props: {
    id: String
  },

  data: () => ({
    entry: null,
    request: {},
    curl: null
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
        this.curl = new_.request.curl;
        this.request = new_.request;
      }
    );
  },

  beforeDestroy() {
    this.unwatch();
  },

  methods: {
    clipboardCurl: function() {
      const text = document.getElementById("curl-" + this.id);
      text.select();
      text.setSelectionRange(0, 99999);
      document.execCommand("copy");
    }
  }
};
</script>

<style>
.http-request-content {
}
.curl-helper {
  position: absolute;
  left: -999em;
}
</style>