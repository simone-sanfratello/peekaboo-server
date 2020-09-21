<template>
  <div id="dataset">
    <v-data-iterator :items="dataset.entries.values" hide-default-footer loading loading-text>
      <template v-slot:header>
        <v-toolbar flat class="mb-1 blue-grey">
          <v-toolbar-title>Dataset</v-toolbar-title>

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
          <!--
            <v-btn small @click="() => clearDataset()">clear all</v-btn>
          -->
        </v-toolbar>
      </template>

      <v-progress-circular v-if="dataset.status == 'loading'" indeterminate color="primary"></v-progress-circular>
      <v-expansion-panels v-for="entry of dataset.entries.values" :key="entry.id" class="mb-2">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col sm="8">
                <v-text-field label="Name" v-model="entry.name"></v-text-field>
              </v-col>
              <v-col sm="2">
                <v-btn @click="update(entry)" class="right" color="green white--text">Rename</v-btn>
              </v-col>
              <v-col sm="2">
                <v-btn :disabled="entry.id == peekaboo.dataset.default" @click="remove(entry)" class="right" color="red white--text">Remove</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <!--
          <v-expansion-panel-content>
            {{entry}}
          </v-expansion-panel-content>
          -->
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels class="mb-2">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col sm="10">
                <v-text-field label="New Dataset"></v-text-field>
              </v-col>
              <v-col sm="2">
                <v-btn @click="create()" class="right" color="blue white--text">New</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-data-iterator>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as peekaboo from '../../lib/peekaboo'

export default {
  components: {},

  data: () => ({
    filter: "",
    peekaboo
  }),

  computed: mapState({
    dataset: (state) => state.dataset,
  }),

  methods: {
    create: function (name) {
      this.$store.dispatch("dataset/create", name);
    },
    update: function (entry) {
      this.$store.dispatch("dataset/update", entry.id, entry.name);
    },
    remove: function (entry) {
      this.$store.dispatch("dataset/remove", entry.id);
    },
  },

  created: function () {
    this.$store.dispatch("dataset/load");
  },
};
</script>

<style>
</style>