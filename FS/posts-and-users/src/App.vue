<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span>Всего постов: </span>
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2">Количество отображаемых на странице постов:</span>
      <v-btn
        text
      >10
      </v-btn> 
      <v-btn
        text
      >25
      </v-btn>  
      <v-btn
        text
      >50
      </v-btn>
    </v-app-bar>

    <v-main>
      <app-pagination/>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
