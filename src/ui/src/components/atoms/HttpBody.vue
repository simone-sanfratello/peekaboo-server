<template>
  <p class="http-body grey lighten-3">{{format()}}</p>
</template>

<script>
import http from "../../lib/http";
import format from "../../lib/format";

export default {
  props: {
    body: String | Object,
    headers: Object
  },

  methods: {
    format() {
      let body = this.body;
      if (http.response.isJson({ body: this.body, headers: this.headers })) {
        if (typeof body === "string") {
          try {
            body = JSON.parse(body);
          } catch (error) {}
          return format.toJson(body);
        }
      }
      return body;
    }
  }
};
</script>

<style>
.http-body {
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  max-width: 100%;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px;
}
</style>