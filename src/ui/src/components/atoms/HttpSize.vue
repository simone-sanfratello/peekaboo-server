<template>
  <div class="http-size subtitle-1">{{format(size)}}</div>
</template>

<script>
const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

export default {
  props: {
    size: Number
  },

  methods: {
    format(value) {
      if (value === 0) return "0";
      if (!value) return "...";
      const n = parseInt(Math.floor(Math.log(value) / Math.log(1024)));
      return Math.round(value / Math.pow(1024, n), 2) + " " + sizes[n];
    }
  }
};
</script>

<style>
.http-size {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
</style>