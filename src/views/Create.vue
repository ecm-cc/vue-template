<template>
  <div class="create">
    <v-chip
      class="ma-2"
      close
      color="red"
      text-color="white"
    >
      Remove
    </v-chip>
  </div>
</template>

<script>

export default {
  name: 'Create',
  created() {
    console.log('Query param', this.$route.query.id);
  }
}
</script>
