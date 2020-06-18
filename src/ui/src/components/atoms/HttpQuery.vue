<template>
  <div class="http-query body-2">{{format(query)}}</div>
</template>

<script>
export default {
  props: {
    query: String
  },

  methods: {
    format(query) {
      return query || ''
      /*
      if(!query) {
        return {}
      }
      const _query = {}
      query.split('&').forEach(q => {
        const [key, value] = q.split('=')
        _query[key] = value
      })
      return _query
      */
    }
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