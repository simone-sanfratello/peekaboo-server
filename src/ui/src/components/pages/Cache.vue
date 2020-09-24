<template>
  <div id="cache">
    <v-data-iterator :items="cache.value" hide-default-footer loading loading-text>
      <template v-slot:header>
        <v-toolbar flat class="mb-1 deep-orange">
          <v-toolbar-title>Cache</v-toolbar-title>

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
          <v-btn small @click="() => clearCache()">clear cache</v-btn>
        </v-toolbar>
      </template>

      <v-progress-circular v-if="cache.status == 'loading'" indeterminate color="primary"></v-progress-circular>
      <v-expansion-panels v-for="entry of cache.value" :key="entry.hash" class="mb-2">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col sm="1">
                <http-method v-bind:method="entry.summary.request.method"></http-method>
              </v-col>
              <v-col sm="8">
                <http-url v-bind:url="entry.summary.request.route"></http-url>
              </v-col>
              <v-col sm="2">
                <v-btn @click="remove(entry.hash)" class="right" color="red white--text">Remove</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <cache class="mb-2" v-bind:hash="entry.hash" :opened="true"></cache>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-data-iterator>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HttpMethod from "../atoms/HttpMethod";
import HttpUrl from "../atoms/HttpUrl";
import HttpRequest from "../molecules/HttpRequest";
import Cache from "../organisms/Cache";

export default {
  components: {
    HttpMethod,
    HttpUrl,
    HttpRequest,
    Cache
  },

  data: () => ({
    filter: ""
  }),

  computed: mapState({
    cache: state => state.cache.summary
  }),

  methods: {
    clearCache: async function() {
      await this.$store.dispatch("cache/clear")
      this.$store.dispatch("cache/summary")
    },
    remove: async function(hash) {
      this.$store.dispatch("cache/remove", hash)
    }
  },

  created: function() {
    this.$store.dispatch("cache/summary")
  }
};
</script>

<style>
</style>