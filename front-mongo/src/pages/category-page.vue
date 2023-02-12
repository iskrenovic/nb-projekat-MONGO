<template>
    <div v-if="loaded">
       <button @click="goBack">Back</button>
       <search-bar @searchBy="searchBy" @cancelFilter="cancelFilter" :items="list"/>
       <div class="section">            
            <category-list :list="list" type="item"/>
        </div>       
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import categoryList from '@/components/category-list.vue';
import searchBar from '@/components/searchBar.vue';
export default defineComponent({
    name:'category-page',
    components:{
        categoryList,
        searchBar
    },
    data(){
        return {
            list:[],
            user:null,
            selectedItem:null,
            openForm:false,
            categoryList:[],
            openCategoryForm:false,
            loaded:false,
        }
    },
    methods:{
        goBack(){
            if(this.admin){
                this.$router.push({name:'Admin'});
                return;
            }
            this.$router.push({name:'Homepage'});
        },
        createItem(){
            this.openForm = true;
        },
        closeForm(){
            this.openForm = false;
        },
        createNewCategory(){
            this.openCategoryForm = true;
        },
        categoryCancel(){
            this.openCategoryForm = false;
        },
        selectItem(item){
            this.selectedItem = item;
        },
        async searchBy(req){
            this.list = this.$store.getters['getItems'];
            this.list = this.list.filter(p=>{
                if(req.gender != ''){
                    if(req.gender != p.gender){
                        return false;
                    }   
                }
                if(req.tags.length == 0) return true;
                let found = false;
                req.tags.forEach(tag=>{
                    console.log(p.tags, tag, p.tags.indexOf(tag));                 
                    if(p.tags.indexOf(tag)>=0){ 
                        found = true;
                        return;
                    }
                })
                return found;                
            })            
         },
         async cancelFilter(){
            this.list = this.$store.getters['getItems'];
           // await this.$store.dispatch('get10Categories');        
           // this.categories = this.$store.getters['getCategories'];
        }
        
    },
    async created(){        
        await this.$store.dispatch('getItemsByCategoryId',this.$route.params.id);
        this.list = this.$store.getters['getItems'];
        this.loaded = true;
        //@NINA kad ti treba primer za getter-evo ti 
    }
})
</script>


<style scoped>
button{
    width: 100%; 
    background-color: #00bcd4;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.section {
  margin: 10px 0;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}

.section h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
}
</style>