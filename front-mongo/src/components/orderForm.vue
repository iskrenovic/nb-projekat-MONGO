<template>
    <div class="reservation-form">
        <h3>Vaša porudžbina:</h3>
        <h2>Datum:</h2>
        <input type="date" v-model="datum"/>
        <h2>Način plaćanja:</h2>
        <select v-model="placanje">
            <option value="">Svi</option>
            <option v-for="p in placanja" :key="p">{{ p }}</option>
        </select>
        <h2>Način isporuke:</h2>
        <select v-model="isporuka">
            <option value="">Svi</option>
            <option v-for="isp in isporuke" :key="isp">{{ isp }}</option>
        </select>
        <button @click="potvrdi">Potvrdi</button>
    </div>
</template>


<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name:'reservationForm',
    props:{
        business:{
            type:Boolean,
            required:false,
            default:false
        },
        user:{
            type:Object,
            required:true
        },
        item:{
            required:true
        }
    },
    data(){
        return {
            datum:'',
            placanja:["gotovina", "kartica"],
            isporuke:["samostalno", "standard", "ekspres"]

        }
    },
    //@DIMI izmenila sam ovde parametre da se poklapa sa Najdom (datum pocetka i kraja samo)
    methods:{
        async potvrdi(){
            let link = 'addRequestAsFreelancer'
            if(this.business){
                link = 'addRequestAsBusiness';
            }
            console.log("SALJEM");
            console.log(this.user);
            console.log(this.item);            
            await this.$store.dispatch(link,{
                order:{
                    date: new Date(this.datum),
                    placanje:this.placanje,
                    isporuka:this.isporuka,
                    userID: this.user.ID,
                    itemID: this.item.ID
                },
                callback:(id)=>{
                    if(!id){
                        alert("NEUSPEŠNA PORUDZBINA");
                        return;
                    }
                    this.$router.push({name:'OrderPage', params:{id}});
                }
            })

        },
    },
    emits:['orderMade']
})
</script>

<style scoped>
.reservation-form {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
    text-align: center;
}

.reservation-form h3 {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: bold;
}

.reservation-form h2 {
    margin-bottom: 10px;
    font-size: 18px;
}

.reservation-form input {
    width: 80%;
    padding: 12px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 10px #ccc;
}

.reservation-form button {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 5px;
    border: none;
    font-size: 18px;
    cursor: pointer;
}

.reservation-form button:hover {
    background-color: #3e8e41;
}
</style>