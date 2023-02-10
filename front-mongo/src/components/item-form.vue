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
            <input type="text" v-model="gender"/>
        </div>    

        <button @click="createItem">Create</button>
        <button @click="cancel">Cancel</button>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import {validateObjects} from '@/helpers/data-cheker'

export default defineComponent({
    name:'item-form',
    data(){
        return{
            name:'',
            brand:'',
            count:1,
            price:0,
            gender:'',
            tags:[]

        }
    },
    methods:{
        selectImage(img){
            console.log("Selected image is:", img);
            this.image = img;
        },       
        async createItem(){
            if(validateObjects(this.name, this.brand, this.count, this.price, this.gender, this.tags)){
                await this.$store.dispatch('addItem', {
                    name:this.name,
                    brand:this.brand,
                    count:this.count,
                    price: this.price,
                    gender:this.gender,
                    tags:this.tags,
                    categoryID: this.$route.params.id
                });
            }
        },
        cancel(){
            this.$emit('cancel');
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