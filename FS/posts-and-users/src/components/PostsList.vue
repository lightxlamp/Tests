<template>
  <v-container>
    <v-row class="text-center">
      
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row justify="center">
          {{ post }}
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PostsList',
    props: ['posts']
  }
</script>
