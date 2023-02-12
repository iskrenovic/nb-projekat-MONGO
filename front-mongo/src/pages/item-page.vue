<template>    
    <div v-if="item">
        <button @click="back">BACK</button>
        <div class="item">
            <h3>NAZIV: {{ item.name }}</h3>
            <h3>CENA: {{ item.price }} RSD</h3>
            <h4>POL: {{ item.gender }}</h4>            
            <h4>Tags: {{ getTags(item.tags) }}</h4>
            <div v-if="openForm" >
                <h4>Nacin placanja:</h4>
                <select v-model="paymentType">
                    <option disabled :value="''">IZABERITE NAČIN PLAĆANJA</option>
                    <option>Keš</option>
                    <option>Kartica</option>
                </select>
                <h4>Nacin dostave:</h4>
                <select v-model="deliveryType">
                    <option disabled :value="''">IZABERITE NAČIN DOSTAVE</option>
                    <option>Na adresu</option>
                    <option>U radnju</option>
                </select>
                <button @click="buy">KUPI</button>
                <button>OTKAŽI</button>
            </div>         
            <button v-else @click="openBuyForm">KUPI</button>
        </div>
        <div>
            <div class="comment">
                <h3>OSTAVITE KOMENTAR</h3>
                <h4>Ocena:</h4>
                <input type="number" :min="1" :max="5" v-model="grade"/>
                <h4>Komentar:</h4>
                <textarea v-model="comment"/>
                <button @click="postComment">Postavi</button>
            </div>
            <div class="comment" v-for="comm in reviews" :key="comm._id">                
                <h4>Ocena: <b>{{ comm.grade }}</b></h4>
                <h4>Komentar: <i>{{ comm.comment }}</i></h4>                
            </div>
        </div>
    </div>
</template>


<script>
import { defineComponent } from '@vue/composition-api'
import {validateObjects} from '@/helpers/data-cheker'
export default defineComponent({
    name:'item-page',
    components:{
},
    data(){
        return {
           item:null,
           reviews:[],
           openForm:false,
           grade:1,
           comment:'',
           paymentType:'',
           deliveryType:''
        }
    },
    methods:{
        getTags(tags){
            let str = "";
            tags.forEach(tag=>{
                str += tag + "; ";
            })
            return str;
        },
        async postComment(){
            await this.$store.dispatch('addReview',{
                grade:this.grade,
                comment:this.comment,
                userID: this.$cookies.get('uId'),
                itemID: this.$route.params.id
            })        
        },
        back(){
            this.$router.push({name:'CategoryPage', params:{
                id:this.$route.params.categoryId
            }});
        },
        openBuyForm(){
            this.openForm = true;
        },
        async buy(){
            if(validateObjects(this.paymentType, this.deliveryType)){
                await this.$store.dispatch('addTransaction',{
                    paymentType: this.paymentType,
                    deliveryType:this.deliveryType,
                    userID: this.$cookies.get('uId'),
                    itemID: this.$route.params.id
                })
            }
            else{
                console.error("LOSE");
            }
        }
    },
    async created(){
        await this.$store.dispatch('getItem', this.$route.params.id);
        this.item = this.$store.getters['getItem'];
        await this.$store.dispatch('getReviewsByItemId', this.$route.params.id);
        this.reviews = this.$store.getters['getReviews']
        console.log(this.reviews);
    }
})
</script>


<style scoped>.item {
    padding: 20px;
    background-color: #F8F8F8;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    margin: 20px auto;
    text-align: center;
}

.item h3 {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bold;
}

.item h4 {
    font-size: 16px;
    margin: 10px 0;
    color: #333;
}

.item select {
    padding: 10px;
    border-radius: 5px;
    border: none;
    width: 100%;
    font-size: 16px;
    margin-bottom: 20px;
}

.item button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #333;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin: 10px;
}

.item button:hover {
    background-color: #555;
}


.comment {
    padding: 20px;
    background-color: #F8F8F8;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    margin: 20px auto;
}

.comment h3 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
}

.comment h4 {
    font-size: 18px;
    margin: 10px 0;
}

.comment input[type="number"] {
    padding: 10px;
    border-radius: 5px;
    border: none;
    width: 100%;
    font-size: 16px;
    margin-bottom: 20px;
}

.comment textarea {
    padding: 10px;
    border-radius: 5px;
    border: none;
    width: 100%;
    font-size: 16px;
    height: 100px;
    margin-bottom: 20px;
    resize: none;
}

button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #333;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

button:hover {
    background-color: #555;
}

</style>