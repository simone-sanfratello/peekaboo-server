<template>
  <div class="http-url subtitle-1">{{format(url, query)}}</div>
</template>

<script>
import format from "../../lib/format";

export default {
  props: {
    url: String,
    query: String
  },

  methods: {
    format(url, query) {
      let _format = format.url(url);
      if (query) {
        _format += "?" + format.querystring(query)
      }
      return _format;
    }
  }
};
</script>

<style>
.http-url {
  white-space: nowrap;
  max-width: 600px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>