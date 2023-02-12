<template>
    <div>
        <div>
            <categoryForm v-if="catForm"/>
            <button v-else @click="newCatClick">NEW CATEGORY</button>
            <categoryList :list="categoryList" type="category"/>
        </div>
        <div>
            <itemForm v-if="itemForm"/>
            <button v-else @click="newItemClick">NEW ITEM</button>
            <categoryList :list="itemList" type="item"/>
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
    data(){
        return{
            catForm:false,
            itemForm: false,
            categoryList:[],
            itemList:[]
        }
    },
    methods:{
        newCatClick(){
            this.catForm = true;
        },
        newItemClick(){
            this.itemForm = true;
        }
    },
    async created(){
        await this.$store.dispatch('getAllCategories');
        await this.$store.dispatch('getAllItems');
        this.categoryList = this.$store.getters['getCategories'];
        this.itemList = this.$store.getters['getItems'];
    }
    
})
</script>


<style>

</style>