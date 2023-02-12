<template>
    <div class="ui">
        <div class="top-bar">
            <img src="@/assets/logo.png/"> <!--LOGO-->
            <h3 v-if="getUser">Welcome {{ getUser.username }}</h3>
            <button v-if="isAdmin" @click="openAdminDashboard">ADMIN DASHBOARD</button>
            <button @click="loginClick">{{(getUser?'LOGOUT':'LOGIN')}}</button>
        </div>
        
        
        <h3 v-if="filtering">ALL:</h3>
        <category-list v-if="filtering" :list="categories" type="category" />
        <h3 v-if="!filtering">10 categories:</h3>
        <category-list v-if="!filtering" :list="categories" type="category"/>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import CategoryList from '@/components/category-list.vue';
export default defineComponent({
    name:'home-page',
    components:{
        CategoryList
    },
    computed:{
        getUser(){            
            return this.$store.getters['getUser'];
        },
        isAdmin(){
            return this.getUser && this.getUser.role == 'admin';
        }
    },
    methods:{
        //@D
        
        loginClick(){

            if(this.getUser){
                this.$cookies.remove('uId');
                
            }            
            this.$router.push({name:'Login'});
        },
        openAdminDashboard(){
            this.$router.push({name:'Admin'});
        },
        async cancelFilter(){
            this.filtering = false;
           // await this.$store.dispatch('get10Categories');        
           // this.categories = this.$store.getters['getCategories'];
        }
    },
    data(){
        return{
            categories:[],
            user:null,
            filtering:false
        }
    },
    async created(){
        this.user = this.$store.getters['getUser'];
        if(!this.user){
            await this.$store.dispatch('getUser', this.$cookies.get('uId'));
            this.user = this.$store.getters['getUser'];
        } 
        await this.$store.dispatch('getAllCategories');        
        this.categories = this.$store.getters['getCategories'];        
    }
})
</script>


<style scoped>
.top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f4f4f4;
}

.top-bar img {
    width: 50px;
    height: 50px;
}

.top-bar h3 {
    margin: 0;
    padding-left: 10px;
}

.top-bar button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

</style>