<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <v-btn text @click="changePage(-1)">
                    Previous
                </v-btn> 

                <v-btn text
                    v-for="(page, i) in numberOfPages" 
                    :key="i"
                    :class="{ activePage: i === currentPage - 1 }"   
                >
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
    data: () => ({
        selectedPage: this.currentPage
    }),
    methods: {
        changePage(nextOrPrev) {
            if(this.currentPage >= 1) {
                this.$emit("update-current-page", this.selectedPage += nextOrPrev);
            }
        }
    }
  }
</script>

<style scoped>
    .activePage {
        background-color: #1976d2;
        color: white;
    }
</style>