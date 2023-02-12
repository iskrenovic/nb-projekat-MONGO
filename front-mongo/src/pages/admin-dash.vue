<template>
    <div v-if="loaded">
        <button @click="logout">LOGOUT</button>
        <div>
            <categoryForm v-if="catForm" @cancel="closeCat" :selectedCategory="selectedCat"/>
            <button v-else @click="newCatClick">NEW CATEGORY</button>
            <categoryList :list="getCategoryList" type="category" admin @click="clickCategory"/>
        </div>
        <div>
            <itemForm v-if="itemForm" @cancel="closeItem" :selectedItem="selectedItem"/>
            <button v-else @click="newItemClick">NEW ITEM</button>
            <categoryList :list="getItemList" type="item" admin @click="clickItem"/>
        </div>
        <div class="transaction_list">
            <h3>Trenutne narudžbine:</h3>
            <div class="transactions">
                <div class="transaction" v-for="trans in getCurrentTransactions" :key="trans._id">
                    <h3>Proizvod: <b>{{ getItemName(trans.itemID) }}</b></h3>
                    <h3>Datum: <b>{{ (new Date(trans.dateBought)).toDateString() }}</b></h3>
                    <h4>Način dostave: <b>{{ trans.deliveryType }}</b></h4>
                    <h4>Način plaćanja: <b>{{ trans.paymentType }}</b></h4>
                </div>
            </div>
        </div>
        <div class="transaction_list">
            <h3>Prethodne narudžbine:</h3>
            <div class="transactions">
                <div class="transaction" v-for="trans in transactions" :key="trans._id">
                    <h3>Proizvod: <b>{{ getItemName(trans.itemID) }}</b></h3>
                    <h3>Datum: <b>{{ (new Date(trans.dateBought)).toDateString() }}</b></h3>
                    <h4>Način dostave: <b>{{ trans.deliveryType }}</b></h4>
                    <h4>Način plaćanja: <b>{{ trans.paymentType }}</b></h4>
                </div>
            </div>
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
        },
        getCurrentTransactions(){
            return this.$store.getters['getTransactions'].filter(p=>{
                let d = new Date(p.dateBought);
                let today = new Date();
                return d.toDateString() >=today.toDateString();
            })
        }
    },
    data(){
        return{
            catForm:false,
            itemForm: false,
            loaded:false,
            selectedCat:null,
            selectedItem:null,
            transactions:[]
        }
    },
    methods:{
        newCatClick(){
            this.catForm = true;
            this.selectedCat = null;
        },
        newItemClick(){
            this.itemForm = true;
            this.selectedItem = null;
        },
        closeCat(){
            this.selectedCat = null;
            this.catForm = false;
        },
        closeItem(){
            this.itemForm = false;
            this.selectedItem = null;
        },
        logout(){
            this.$cookies.remove('uId');
            this.$router.push({name:'Login'});
        },
        getItemName(itemId){
            let item = this.$store.getters['getItems'].filter(p=>p._id == itemId)[0];
            return `${item.name} (Preostalo: ${item.count})`;
        },
        clickCategory(category){
            this.selectedCat = category;
            this.catForm = true;
        },
        clickItem(item){
            console.log("ITEM JE", item);
            this.selectedItem = item;
            this.itemForm = true;
        }
    },
    async created(){
        await this.$store.dispatch('getAllCategories');
        await this.$store.dispatch('getAllItems');        
        await this.$store.dispatch('getAllTransactions');
        this.loaded = true;
    }    
})
</script>


<style>
.transaction_list {
    padding: 20px;
    background-color: #F8F8F8;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 700px;
    margin: 20px auto;
    text-align: center;
}

.transaction_list h3 {
    font-size: 22px;
    margin: 20px 0;
    font-weight: bold;
}

.transactions {
    max-height: 500px;
    overflow: auto;
    margin: 20px 0;
}

.transaction {
    background-color: #FFFFFF;
    padding: 20px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.transaction h3 {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
}

.transaction h4 {
    font-size: 16px;
    margin: 10px 0;
    color: #333;
}

</style>