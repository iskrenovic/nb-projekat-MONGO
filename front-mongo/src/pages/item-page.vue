<template>
    <div v-if="loaded">        
        <button @click="goBack">Back</button> 
        <button v-if="admin && !openFrom" @click="openCreateForm">CREATE ITEM</button>
    </div>
</template>


<script>
/*
import { defineComponent } from '@vue/composition-api'
import categoryList from '@/components/category-list.vue';
export default defineComponent({
    name:'item-page',
    components:{
    categoryList
},
    data(){
        return {
            list:[],
            admin:false,
            openFrom:false,
            user:null,
            loaded:false
        }
    },
    methods:{
        goBack(){
            if(this.admin){
                this.$router.push({name:'AdminCategoryPage', params:{
                    id:this.$route.params.categoryId
                }});
                return;
            }
            this.$router.push({name:'CategoryPage', params:{
                    id:this.$route.params.categoryId
                }});
        },
        closeForm(){
            this.openFrom = false;
        },
        openCreateForm(){
            this.openFrom = true;
            console.log("CLOSE");
        }
    },
    async created(){
        this.admin = this.$route.name == "AdminItemPage";
        this.reserved=false;
        this.user = this.$store.getters['getUser'];
        if(!this.user){
            await this.$store.dispatch('getUser', this.$cookies.get('uId'));
            this.user = this.$store.getters['getUser'];
        } 
        await this.$store.dispatch("getSeatsByRoomId", this.$route.params.id);
        this.list = this.$store.getters['getSeats'];
        this.loaded = true;
    }
})
*/
</script>


<style scoped>

</style>