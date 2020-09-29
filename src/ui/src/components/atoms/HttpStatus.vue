<template>
  <div v-bind:class='classes'>{{status}}</div>
</template>

<script>
export default {
  props: {
    status: Number
  },
  computed: {
    classes: function() {
      const styles = ['http-status', 'subtitle-1'];
      // @todo more fine: 1xx, 2xx, 3xx ...
      if (this.status < 400) {
        styles.push('green--text');
      } else {
        styles.push('red--text');
      }
      return styles;
    }
  }
}
</script>

<style>
.http-status {
  max-width: 45px;
  overflow: hidden;
}
</style>