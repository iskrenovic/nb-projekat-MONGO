<template>
    <div class="ui">
        <div class="seg">
            <h3>Name:</h3>
            <input type="text" v-model="name"/>
        </div>
        <div class="seg">
            <h3>Brand:</h3>
            <input type="text" v-model="brand"/>
        </div>
        <div class="seg">
            <h3>Count:</h3>
            <input type="number" v-model="count"/>
        </div>
        <div class="seg">
            <h3>Price:</h3>
            <input type="number" v-model="price"/>
        </div>            
        <div class="seg">
            <h3>Gender:</h3>
            <select v-model="gender">
                <option disabled :value="''">SELECT GENDER</option>
                <option>Muški</option>
                <option>Ženski</option>
            </select>
        </div>
        <div class="seg">
            <h3>Category:</h3>
            <select v-model="category">
                <option disabled :value="''">SELECT CATEGORY</option>
                <option v-for="opt in getCategories" :key="opt._id" :value="opt._id">{{ opt.name }}</option>
            </select>
        </div>
        <div class="seg">
            <h3>Tags:</h3>
            <textarea v-model="tags"></textarea>
            <p>Odvojite tagove ; karakterom</p>
        </div>

        <button @click="createItem">{{(selectedItem?'Update':'Create')}}</button>
        <button @click="cancel">Cancel</button>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import {validateObjects} from '@/helpers/data-cheker'

export default defineComponent({
    name:'item-form',
    props:{
        selectedItem:{
            required:false
        }
    },
    data(){
        return{
            name:'',
            brand:'',
            count:1,
            price:0,
            gender:'',
            tags:'',
            category:'',
            categories:[],

        }
    },
    computed:{
        getCategories(){
            return this.$store.getters['getCategories'];
        }
    },
    methods:{
        selectImage(img){
            console.log("Selected image is:", img);
            this.image = img;
        },        
        async createItem(){
            if(validateObjects(this.name, this.brand, this.count, this.price, this.gender, this.category)){
                if(!this.selectedItem){
                    await this.$store.dispatch('addItem', {
                        name:this.name,
                        brand:this.brand,
                        count:this.count,
                        price: this.price,
                        gender:this.gender,
                        tags:this.tags.split(';'),
                        categoryID: this.category
                    });
                }
                else{
                    await this.$store.dispatch('updateItem', {
                        item:{
                            _id: this.selectedItem._id,
                            name:this.name,
                            brand:this.brand,
                            count:this.count,
                            price: this.price,
                            gender:this.gender,
                            tags:this.tags.split(';'),
                            categoryID: this.category
                        },
                        callback: (valid)=>{
                            alert((valid?"Uspešno promenjeno.":"Neuspešno."));
                            this.$emit('cancel');
                        }
                    });
                }
                
            }
        },
        cancel(){
            this.$emit('cancel');
        },
        getTagStringFromArray(tags){
            let str = "";
            tags.forEach(tag=>{
                str+=`${tag};`;
            })
            str = str.substring(0, str.length - 1);
            return str;
        },
        setupItem(){
            console.log(this.selectedItem);
            if(!this.selectedItem){
                this.name = "";
                this.brand = "";
                this.count = 0;
                this.price = 0;
                this.gender = "";
                this.tags = "";
                this.category = "";
               
            }
            else{  
                this.name = this.selectedItem.name;
                this.brand = this.selectedItem.brand;
                this.count = this.selectedItem.count;
                this.price = this.selectedItem.price;
                this.gender = this.selectedItem.gender;
                this.tags = this.getTagStringFromArray(this.selectedItem.tags);
                this.category = this.selectedItem.categoryID;
            }
        }
    },
    created(){
        this.setupItem();
    },
    watch:{
        selectedItem : function(){
            this.setupItem();
        }
    },
    emits:['cancel']
})
</script>


<style scoped>
.ui {
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.ui input[type="text"] {
  width: 70vw;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.ui button {
  width: 100%; 
  background-color: #00bcd4;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.ui button:hover {
  background-color: #00acc1;
}

input[type="file"] {
  /* Add some padding and a nice font */
  padding: 1em;
  font-family: sans-serif;
  
  /* Add some custom styles */
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #333;
}

/* Style the button that is used to trigger the file browser */
input[type="file"]::-webkit-file-upload-button {
  /* Add some padding and a nice font */
  padding: 1em;
  font-family: sans-serif;
  
  /* Add some custom styles */
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #f5f5f5;
  
  /* Add some hover effects */
  transition: background-color 0.2s ease;
}

input[type="file"]::-webkit-file-upload-button:hover {
  background-color: #444;
}
.seg{
    display: flex;
    width: 100%;
    height: 50px;
    padding: 5px;
}
</style>