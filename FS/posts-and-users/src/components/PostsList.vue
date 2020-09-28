<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row  
          v-for="(post, i) in postsToDisplay" 
          :key="i"      
          class="subheading mx-3">
          <div class="post">
            <div class="post__header">
              <div class="post__id"> {{ post.id }} </div>
              <div class="post__title">{{ post.title }}</div>
            </div>
            <div class="post__body">{{ post.body }}</div>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PostsList',
    props: ['postsToDisplay'],
  }
</script>

<style lang="scss" scoped>
  .post {
    text-align: left;
    margin-bottom: 2rem;
    border: .3rem solid #1976d2;
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;

    &__header {
      display: flex;
      flex-direction: row;
      font-size: 1.5rem;
      text-transform: uppercase;
    }

    &__body {
      font-size: 1.1rem;
    }

    &__id {
      margin-right: 1rem;
    }
  }
</style>
