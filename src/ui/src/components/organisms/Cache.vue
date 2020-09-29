<template>
  <div>
    <div v-if="status === store.status.LOADING">loading cache ...</div>
    <div v-if="status != store.status.LOADING && !entry">cache is removed</div>

    <v-expansion-panels v-if="entry" :value="open">
      <v-expansion-panel class="grey darken-4 white--text http-request">
        <v-expansion-panel-header class="title">
          Cache
          <template v-slot:actions>
            <v-icon color="white">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card v-if="entry" class="grey darken-4 white--text" outlined>
            <div>
              <span class="subtitle-1">Matching</span>
              <div class="body-2">Expire {{toDate(entry.expire)}}</div>
              <div class="body-2">Stored {{toDate(entry.info.created)}}</div>
              <div class="body-2">Rule {{toJs(entry.info.rule)}}</div>
            </div>

            <div v-if="entry.request" class="mt-5 request">
              <span class="subtitle-1">Request</span>
              <div class="body-2">
                {{entry.request.method}} {{entry.request.route}}
                <div class="ml-5" v-if="entry.request.headers">
                  <div class="subtitle-2">Headers</div>
                  <div class="ml-5 box">
                    <div v-for="(value, key) in entry.request.headers" :key="key">{{key}}: {{value}}</div>
                  </div>
                </div>
                <div class="ml-5" v-if="entry.request.query">
                  <div class="subtitle-2">Query</div>
                  <div class="ml-5">{{entry.request.query}}</div>
                </div>
                <div class="ml-5" v-if="entry.request.body">
                  <div class="subtitle-2">Body</div>
                  <div class="ml-5 box">{{entry.request.body}}</div>
                </div>
              </div>
            </div>

            <div class="mt-5">
              <span class="subtitle-1">Response</span>
              <v-textarea
                v-bind:readonly="!editable"
                v-model="response"
                class="json"
                solo
                flat
                height="500px"
                name="response"
                label="Response"
              ></v-textarea>
            </div>

            <v-card-actions>
              <v-btn v-if="!editable" @click="toggleEditable">Edit</v-btn>
              <v-btn v-if="editable" @click="save" color="green white--text">Save</v-btn>
              <v-btn v-if="editable" @click="cancel">Cancel</v-btn>

              <v-row align="center" justify="end">
                <v-btn @click="remove" class="right" color="red white--text">Remove</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import format from "../../lib/format";
import store from "../../lib/store";

export default {
  props: {
    hash: String,
    opened: Boolean
  },

  data: function() {
    return {
      store,
      open: this.opened ? 0 : null,
      entry: null,
      status: store.status.LOADING,
      editable: false
    };
  },

  computed: {
    ...mapGetters({
      get: "cache/get"
    })
  },

  methods: {
    ...format,
    toggleEditable: function() {
      this.editable = !this.editable;
    },
    save: function() {
      this.$store.dispatch("cache/setResponse", {
        hash: this.hash,
        response: this.response
      });
      this.editable = false;
    },
    cancel: function() {
      this.response = format.toJson(this.entry.response);
      this.editable = false;
    },
    remove: function() {
      this.$store.dispatch("cache/remove", this.hash);
      this.entry = null
    }
  },

  created: function() {
    this.$store.dispatch("cache/get", this.hash);
    this.unwatch = this.$store.watch(
      (state, getters) => getters["cache/get"](this.hash),
      (new_, old) => {
        this.entry = new_.value;
        this.status = new_.status;
        if (!this.entry) {
          this.response = null;
          return;
        }
        this.response = format.toJson(this.entry.response);
      }
    );
  },

  beforeDestroy() {
    this.unwatch();
  }
};
</script>

<style>
.json {
  padding: 5px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
}

.request .box {
  max-height: 150px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
