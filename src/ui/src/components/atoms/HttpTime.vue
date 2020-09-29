<template>
  <div class="http-time subtitle-1">{{format(time)}}</div>
</template>

<script>
export default {
  props: {
    time: Number
  },

  methods: {
    format(value) {
      if (!value) return "...";
      if(value < 1000) {
        return value + ' ms'
      }
      return (value/1000).toFixed(1) + ' s'
    }
  }
}
</script>

<style>
.http-time {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
</style>