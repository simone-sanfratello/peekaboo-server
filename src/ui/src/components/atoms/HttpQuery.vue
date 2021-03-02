<template>
  <div class="http-query body-2">{{format(query)}}</div>
</template>

<script>
import format from "../../lib/format";

export default {
  props: {
    query: Object
  },

  methods: {
    format: format.querystring
  }
};
</script>

<style>
.http-query {
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>