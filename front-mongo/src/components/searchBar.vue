<template>
    <div class="search-bar">        
        <h3>Filtriraj rezultate</h3>
        <h2>Pol:</h2>
        <select v-model="gender">
            <option disabled :value="''">SELECT GENDER</option>
            <option>Muški</option>
            <option>Ženski</option>
        </select>
        <h2>Tagovi:</h2>
        <div class="tags">
            <div v-for="tag in tagovi" :key="tag" class="tag-item">
                <label :for="tag">{{tag}}</label>
                <input :id="tag" type="checkbox" v-model="tags" :value="tag"/>
            </div>
        </div>
              
        <button @click="pronadji">Pronadji</button>
        <button v-if="filtered" @click="cancelFilter">UGASI FILTERE</button>
    </div>
</template>


<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name:'search-bar',
    props:{
        business:{
            type:Boolean,
            required: false,
            default: false
        },
        items:{
            type:Array,
            required:true
        }
    },
    data(){
        return {
            tagovi:[],
            gender:'',
            tags:[],
            filtered:false
            
        }
    },
    
    created(){
        this.tagovi = [];
        this.items.forEach(item=>{
            item.tags.forEach(tag=>{
                if(this.tagovi.indexOf(tag) < 0){
                    this.tagovi.push(tag);
                }
            })
        })
    },    
    methods:{
        pronadji(){            
            this.$emit('searchBy', {
                gender:this.gender,
                tags:this.tags
            })
            this.filtered = true;
        },
        cancelFilter(){
            this.$emit('cancelFilter');
            this.filtered = false;
            this.gender = '';
            this.tags = [];
        }
    },   
    watch:{
        selectKategorija: function(newValue){
            console.log("Promenjeno na", newValue);
        }
    },
    emits:['searchBy','cancelFilter']
})
</script>


<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.search-bar input[type="text"] {
  width: 60%;
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar h3, .search-bar h2 {
  margin: 10px 0;
  font-size: 18px;
  font-weight: 500;
}

.search-bar select {
  width: 60%;
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar input[type="number"] {
  width: 60%;
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  width: 60%;
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #45a049;
}
.tags{
    display: flex;
}
.tag-item{
    margin:5px;
    
}

</style>