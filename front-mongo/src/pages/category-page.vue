<template>
    <div v-if="loaded">
       <button @click="goBack">Back</button>
       <div class="section">
            <button v-if="admin && !openForm" @click="createItem">CREATE ITEM</button> 
            <item-form v-if="admin && openForm" @cancel="closeForm"/>
            <category-list :list="list" type="item" :admin="admin" :linkable="user.role.toLowerCase() != 'business'" @click="selectItem"/>
        </div>
       <div class="section" v-if="admin">
            <h3>Category</h3>
            <category-form v-if="openCategoryForm" @cancel="categoryCancel"/>
            <button v-else @click="createNewcategory">CREATE NEW</button>
            <category-list :list="categoryList" type="category" admin :linkable="false"/>
            <!--LISTA EQUIPMENTA-->
        </div>
    </div>
</template>


<script>
import { defineComponent } from '@vue/composition-api'
import categoryList from '@/components/category-list.vue';
import itemForm from '@/components/item-form.vue';
import categoryForm from '@/components/category-form.vue';
export default defineComponent({
    name:'category-page',
    components:{
        categoryList,
        itemForm,
        categoryForm
    },
    data(){
        return {
            list:[],
            admin:false,
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
        }
        
    },
    async created(){
      /*  this.admin = this.$route.name == "OwnerSpacePage"
        await this.$store.dispatch('getRoomsBySpaceID',{
            id:this.$route.params.id,
            callback:(resp)=>{
                this.list = resp;
            }
        })
        this.user = this.$store.getters['getUser'];
        if(!this.user){
            await this.$store.dispatch('getUser', this.$cookies.get('uId'));
            this.user = this.$store.getters['getUser'];
        } 
        await this.$store.dispatch('getEquipmentByUserId',this.$route.params.id);
        this.equipmentList = this.$store.getters['getEquipment'];
        if(!this.equipmentList) this.equipmentList = [];
        this.loaded = true;
        //@NINA kad ti treba primer za getter-evo ti */
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