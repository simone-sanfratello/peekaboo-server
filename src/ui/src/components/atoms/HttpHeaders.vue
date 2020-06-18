<template>
  <v-list class="http-headers" dense>
    <v-list-item-group>
      <v-list-item v-for="(value, key) in headers" :key="key">
        <v-list-item-content>
          <v-list-item-title>{{ key }}</v-list-item-title>
          <v-list-item-subtitle>
            <div class="value">{{ value }}</div>
          </v-list-item-subtitle>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    headers: Object
  },

  methods: {
    format(headers) {
      return headers;
    }
  }
};
</script>

<style>
.http-headers {
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
}
.http-headers .value {
  width: 100%;
  white-space: pre-wrap;
}
</style>