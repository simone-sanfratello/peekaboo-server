<template>
  <div id="dashboard">
    <v-data-iterator :items="history.value" hide-default-footer loading loading-text>
      <template v-slot:header>
        <v-toolbar dark flat class="mb-1">
          <v-toolbar-title>Trace</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-text-field
            v-model="filter"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-file-find"
            label="Filter"
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-btn small color="primary" class="mx-2" @click="() => clearHistory()">clear history</v-btn>
          <v-btn small color="deep-orange darken-1" @click="() => clearCache()">clear cache</v-btn>
        </v-toolbar>
      </template>

      <v-progress-circular v-if="history.status == 'loading'" indeterminate color="primary"></v-progress-circular>
      <v-expansion-panels v-for="entry of history.value" :key="entry.summary.id" class="mb-2">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col sm="1" md="1" lg="1">
                <http-method v-bind:method="entry.summary.method"></http-method>
              </v-col>
              <v-col sm="1" md="1" lg="1">
                <v-progress-circular
                  v-if="!entry.summary.status"
                  indeterminate
                  color="primary"
                  :size="20"
                  :width="3"
                ></v-progress-circular>
                <http-status v-if="entry.summary.status" v-bind:status="entry.summary.status"></http-status>
              </v-col>
              <v-col sm="6" md="6" lg="6">
                <http-url v-bind:url="entry.summary.url" v-bind:query="entry.summary.query"></http-url>
              </v-col>
              <v-col sm="1" md="1" lg="1">
                <v-chip
                  v-if="entry.summary.cached"
                  small
                  color="deep-orange darken-1"
                  text-color="white"
                >using cache</v-chip>
              </v-col>
              <v-col sm="1" md="1" lg="1">
                <http-size v-bind:size="entry.summary.size"></http-size>
              </v-col>
              <v-col sm="1" md="1" lg="1">
                <http-time v-bind:time="entry.summary.time"></http-time>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <http-request class="mb-2" v-bind:id="entry.summary.id"></http-request>
            <http-response class="mb-2" v-bind:id="entry.summary.id"></http-response>
            <cache class="mb-2" v-if="entry.summary.cached" v-bind:hash="entry.summary.cached"></cache>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-data-iterator>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HttpMethod from "../atoms/HttpMethod";
import HttpSize from "../atoms/HttpSize";
import HttpStatus from "../atoms/HttpStatus";
import HttpTime from "../atoms/HttpTime";
import HttpUrl from "../atoms/HttpUrl";
import HttpRequest from "../molecules/HttpRequest";
import HttpResponse from "../molecules/HttpResponse";
import Cache from "../organisms/Cache";

export default {
  components: {
    HttpMethod,
    HttpSize,
    HttpStatus,
    HttpTime,
    HttpUrl,
    HttpRequest,
    HttpResponse,
    Cache
  },

  data: () => ({
    filter: ""
  }),

  computed: mapState({
    history: function(state) {
      return {
        status: state.history.entries.status,
        value: state.history.entries.value.filter(
          entry => entry.summary.url.indexOf(this.filter) != -1
        )
      };
    },
    cache: state => state.cache.entries.value
  }),

  methods: {
    clearHistory: function() {
      this.$store.dispatch("history/clear");
    },
    clearCache: function() {
      this.$store.dispatch("cache/clear");
    }
  },

  created: function() {
    this.$store.dispatch("history/list");
    this.$store.dispatch("cache/list");
  }
};
</script>

<style>
</style>