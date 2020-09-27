<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <v-btn text @click="changePage(-1)">
                    Previous
                </v-btn> 

                <v-btn text
                    v-for="(page, i) in numberOfPages" 
                    :key="i">
                    {{page}}
                </v-btn>
                
                <v-btn text @click="changePage(1)">
                    Next
                </v-btn>  
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'Pagination',
    props: ['currentPage', 'numberOfPages'], 
    methods: {
        changePage(nextOrPrev) {
            if(this.currentPage >= 1){
                this.currentPage += nextOrPrev;
            }
        }
    }
  }
</script>