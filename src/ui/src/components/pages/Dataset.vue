<template>
  <div id="dataset">
    <v-data-iterator :items="dataset.entries" hide-default-footer loading loading-text>
      <template v-slot:header>
        <v-toolbar flat class="mb-1 blue-grey">
          <v-toolbar-title>Dataset</v-toolbar-title>

          <!--
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
            <v-btn small @click="() => clearDataset()">clear all</v-btn>
          -->
        </v-toolbar>
      </template>

      <v-progress-circular v-if="dataset.status === 'loading'" indeterminate color="primary"></v-progress-circular>
      <v-expansion-panels v-for="entry of dataset.entries" :key="entry.id" class="mb-2">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col sm="8">
                <v-text-field label="Name" v-model="entry.name"></v-text-field>
              </v-col>
              <v-col sm="2">
                <v-btn
                  @click="update(entry.id, entry.name)"
                  class="right"
                  color="green white--text"
                >Rename</v-btn>
              </v-col>
              <v-col sm="2">
                <v-btn
                  :disabled="entry.id === dataset.default"
                  @click="remove(entry.id)"
                  class="right"
                  color="red white--text"
                >Remove</v-btn>
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
                <v-text-field v-model="new_" label="New Dataset"></v-text-field>
              </v-col>
              <v-col sm="2">
                <v-btn @click="create(new_)" class="right" color="blue white--text">New</v-btn>
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

export default {
  components: {},

  data: () => ({
    new_: "",
  }),

  computed: mapState({
    dataset: (state) => {
      return {
        ...state.dataset,
        entries: Object.entries(state.dataset.entries).map(([id, name]) => ({
          id,
          name,
        })),
      };
    },
  }),

  methods: {
    create: function (name) {
      this.$store.dispatch("dataset/create", { name });
      this.new_ = "";
    },
    update: function (id, name) {
      this.$store.dispatch("dataset/update", { id, name });
    },
    remove: function (id) {
      this.$store.dispatch("dataset/remove", { id });
    },
  },

  created: function () {
    this.$store.dispatch("dataset/load");
  },
};
</script>

<style>
</style>