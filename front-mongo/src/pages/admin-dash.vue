<template>
    <div v-if="loaded">
        <button @click="logout">LOGOUT</button>
        <div>
            <categoryForm v-if="catForm" @cancel="closeCat"/>
            <button v-else @click="newCatClick">NEW CATEGORY</button>
            <categoryList :list="getCategoryList" type="category" admin/>
        </div>
        <div>
            <itemForm v-if="itemForm" @cancel="closeItem"/>
            <button v-else @click="newItemClick">NEW ITEM</button>
            <categoryList :list="getItemList" type="item" admin/>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import categoryForm from '@/components/category-form.vue';
import categoryList from '@/components/category-list.vue';
import itemForm from '@/components/item-form.vue';
export default defineComponent({
    name:'admin-dash',
    components:{
        categoryForm,
        categoryList,
        itemForm
    },
    computed:{
        getCategoryList(){
            return this.$store.getters['getCategories'];
        },
        getItemList(){
            return this.$store.getters['getItems'];
        }
    },
    data(){
        return{
            catForm:false,
            itemForm: false,
            loaded:false
        }
    },
    methods:{
        newCatClick(){
            this.catForm = true;
        },
        newItemClick(){
            this.itemForm = true;
        },
        closeCat(){
            this.catForm = false;
        },
        closeItem(){
            this.itemForm = false;
        },
        logout(){
            this.$cookies.remove('uId');
            this.$router.push({name:'Login'});
        }
    },
    async created(){
        await this.$store.dispatch('getAllCategories');
        await this.$store.dispatch('getAllItems');        
        this.loaded = true;
    }    
})
</script>


<style>

</style>