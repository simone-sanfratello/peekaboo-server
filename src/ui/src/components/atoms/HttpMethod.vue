<template>
  <div class="http-method subtitle-1">{{method}}</div>
</template>

<script>
export default {
  props: {
    method: String
  }
}
</script>

<style>
.http-method {
  max-width: 65px;
  overflow: hidden;
}
</style>