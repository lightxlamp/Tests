<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span>Number of posts in DB: {{posts.length}} </span>
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2">Posts per page</span>
      <v-btn text @click="setPostsPerPage(10)">
        10
      </v-btn>  

      <v-btn text @click="setPostsPerPage(25)">
        25
      </v-btn>   
      
      <v-btn text @click="setPostsPerPage(50)">
        50
      </v-btn>  

    </v-app-bar>
    <v-main>

      <app-pagination 
        :currentPage="currentPage" 
        :numberOfPages="numberOfPages" 
        @update-current-page="onUpdatePropPageSelected"
      />

      <posts-list 
        :postsToDisplay="postsToDisplay" 
      />

      <app-pagination 
        :currentPage="currentPage" 
        :numberOfPages="numberOfPages" 
        @update-current-page="onUpdatePropPageSelected"
      />
    </v-main>
  </v-app>
</template>

<script>
import PostsList from './components/PostsList';

export default {
  name: 'App',

  components: {
    PostsList,
  },

  data: () => ({
    posts: [], // array of posts
    users: [], // array of users
    baseUrl: 'https://jsonplaceholder.typicode.com/', // base request url,
    requestError: null,
    postsPerPage: 10,
    currentPage: 1
  }),

  computed: {
    usersUrl: function () {
      return this.baseUrl + 'users'  // request url for users
    },

    postsUrl: function () {
      return this.baseUrl + 'posts' // request url for posts
    },

    numberOfPages: function() {
      return this.posts.length / this.postsPerPage
    },

    postsToDisplay: function () {
      if(this.currentPage === 1) {
        return this.posts.slice(0, this.postsPerPage);
      }
      else {
        return this.posts.slice(this.currentPage * this.postsPerPage, this.currentPage * this.postsPerPage + this.postsPerPage);
      }
    }
  },

  // According to task it is not allowed to use third-party libraries, so I refused from AXIOS 
  // Fetch - "is not universal", probably it has some issued with old browsers. Upadte: I've checked: 
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
  // please see "browser compatibility" table at the bottom of the page 
  // So I decided to use XHR
  methods: {
    sendRequest: function(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = () => {
          if(xhr.status > 400) {
            reject(xhr.response)
          }
          else {
            resolve(xhr.response)
          }
        }

        xhr.onerror = () => {
          reject(xhr.response)
        }

        xhr.send()
      })
    },

    /**
    * Change postsPerPage value
    * @param  {Number} postsPerPage number of posts to display on a page
    */
    setPostsPerPage(postsPerPage) {
      this.postsPerPage = postsPerPage
    },
  
    onUpdatePropPageSelected (newPage) {
      this.currentPage = newPage
    }
  },

  mounted () {
    this.sendRequest(this.postsUrl).then(data => this.posts = data).catch(err => this.requestError = err)
    this.sendRequest(this.usersUrl).then(data => this.users = data).catch(err => this.requestError = err)
  }
};
</script>
