<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row justify="center"  
          v-for="(post, i) in postsToDisplay" 
          :key="i"      
          class="subheading mx-3">
          {{ post }}
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PostsList',
    props: ['posts', 'postsPerPage', 'pageNumber'],
    computed: {
      postsToDisplay: function () {
        if(this.pageNumber === 1) {
          return this.posts.slice(0, this.postsPerPage);
        }
        else {
          return this.posts.slice(this.pageNumber * this.postsPerPage, this.pageNumber * this.postsPerPage + this.postsPerPage);
        }
      }
    } 
  }
</script>
