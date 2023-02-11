import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/dbConnection'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:null,
        categories:null,
        items:null,
        reviews:null,
        transactions:null
    },
    getters:{
        getCategories(state){
            return state.categories;
        },
        getItems(state){
            return state.items;
        },
        getReviews(state){
            return state.reviews;
        },
        getTransactions(state){
            return state.transactions;
        }        
    },
    actions:{
        async createAccount({commit}, account) {
            let url = "";
            switch(account.role){
                case 'owner':
                    url = '/api/register/createOwner'
                    break;
                case 'business':
                    url = '/api/register/createBusiness'
                    break;
                case 'freelancer':
                    url = '/api/register/createFreelancer'
                    break;
            }
            return await Api().post(url, account).then(res=>{
                if(res.status == 200){
                    commit('setUser', res.data);
                    Vue.$cookies.set('uId', res.data.ID,"24h");
                    account.callback(true);
                    window.location.reload();
                }                
                else{
                    console.error(res);
                }
            }).catch(err=>{
                console.error(err);
            })
        },
        async login({commit}, req){
            return await Api().post('/api/login/', req.user).then(res=>{
                if(res.status == 200){
                    commit('setUser', res.data);
                    Vue.$cookies.set('uId', res.data.ID,"24h");
                    req.callback(true);
                    window.location.reload();
                }
                else{
                    console.error(res);
                }
            })
        },
        async getUser({commit},id){
            try{
                let res = await Api().get(`api/user/getUser/${id}`);
                if(res.status == 200){
                    commit('setUser', res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getUserWithCallback({commit},req){
            try{
                let res = await Api().get(`api/user/getUser/${req.id}`);
                if(res.status == 200){
                    commit('setUser', res.data);
                    req.callback(res.data);
                }
                else{
                    console.error(res.data);
                    req.callback(false);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getSpaces(){
            try{
                let res = await Api().get(`api/space/business/getAllbusinesses/`);
                console.log(res.data);
            }
            catch (err){
                console.log(err);
            }
        },
        //@DIMI
        async getSpacesByCity({commit}, city){
            try{
                let res = await Api().get(`api/space/getSpacesByCity/${city}`);
                if(res.status==200){
                    commit('setSpaces', res.data);
                }
                else{
                    console.error(res);
                }
            }
            catch(err){
                console.log(err);
            }
        },
        async get10Spaces({commit}){
            try{
                let res = await Api().get(`api/space/get10Spaces/`);
                if(res.status==200){
                    commit('setSpaces', res.data);
                }
                else{
                    console.error(res);
                }
            }
            catch(err){
                console.log(err);
            }
        },
        async getCities({commit}, callback){
            try{
                let res = await Api().get(`api/space/getCities/`);
                if(res.status==200){
                    commit('setCities', res.data);
                    callback(res.data);
                }
                else{
                    console.error(res);
                }
            }
            catch(err){
                console.log(err);
            }
        },
        async getRecommendedSpacesFreelancer({commit}, req){
            try{
                let res = await Api().get(`api/space/getRecomendedSpaceFreelancer/${req.city}/${req.userID}`);
                if(res.status==200){
                    commit('setRecommendedSpaces', res.data);
                }
                else{
                    console.error(res);
                }
            }
            catch(err){
                console.log(err);
            }
        },
        async getRecommendedSpacesBusienss({commit}, req){
            try{
                let res = await Api().get(`api/space/getRecomendedSpaceBusiness/${req.city}/${req.userID}`);
                if(res.status==200){
                    commit('setRecommendedSpaces', res.data);
                }
                else{
                    console.error(res);
                }
            }
            catch(err){
                console.log(err);
            }
        },
        async addSpace({commit}, space) {
            return await Api().post('/api/space/createSpace', space).then(res=>{
                if(res.status == 200){
                    commit('addNewSpace', res.data);
                }
                else{
                    console.error(res);
                }
            })
        },
        async deleteSpace({commit}, id){
            try{
                let res = await Api().delete(`api/space/deleteSpace/${id}`);
                if(res.status == 200)
                    commit('removeSpace', id);
                else
                    console.error(res);
            }
            catch (err){
                console.log(err);
            }  
        },
        async getSpacesByUserId({commit}, req){
            try{
                let res = await Api().get(`api/space/getSpaceByOwnerId/${req.userID}`);
                if(res.status == 200){
                    req.callback(res.data);
                    commit('setSpaces', res.data);
                }
                else{
                    req.callback([]);
                }
                console.log(res.data);
            }
            catch (err){
                console.log(err);
            }
        },
        async getRoomsBySpaceID({commit}, req){
            try{
                let res = await Api().get(`api/room/getRoomsBySpaceId/${req.id}`);
                if(res.status == 200){
                    commit('setRooms', res.data);
                    req.callback(res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.error(err);
            }
        },
        async addRoom({commit}, room) {
            return await Api().post('/api/room/createRoom/', room).then(res=>{
                if(res.status == 200){
                    commit('addNewRoom', res.data);
                }
                else{
                    console.error(res);
                }
            })
        },
        async deleteRoom({commit}, id){
            try{
                let res = await Api().delete(`api/room/deleteRoom/${id}`);
                if(res.status == 200)
                    commit('removeRoom', id);
                else
                    console.error(res);
            }
            catch (err){
                console.log(err);
            }  
        },
        async getEquipment({commit}, id){
            try{
                let res = await Api().get(`api/equipment/getEquipment/${id}`);
                if(res.status == 200){
                    commit('setEquipment',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getEquipmentByUserId({commit}, id){
            try{
                let res = await Api().get(`api/equipment/getEquipmentBySpaceId/${id}`);
                if(res.status == 200){
                    commit('setEquipment',res.data);
                }
                else{
                    console.error(res.data);
                }
                console.log(res.data);
            }
            catch (err){
                console.log(err);
            }
        },
        async addEquipment(commit, equipment) {
            return await Api().post('/api/equipment/createEquipment/', equipment).then(res=>{
                if(res.status == 200){
                    commit('addEquipment', res.data);
                }
                else{
                    console.error(res);
                }
            })
        },
        async deleteEquipment(commit, id){
            try{
                let res = await Api().delete(`api/equipment/article/deleteArticle/${id}`);
                if(res.status == 200)
                    commit('removeEquipment', id);
                else
                    console.error(res);
            }
            catch (err){
                console.log(err);
            }  
        },
        async getSeatsByRoomId({commit}, id){
            try{
                let res = await Api().get(`api/place/getPlacesByRoomId/${id}`);
                if(res.status==200){
                    commit('setSeats', res.data);
                }
                console.log(res.data);
            }
            catch (err){
                console.log(err);
            }
        },
        async addSeat({commit}, seat) {
            return await Api().post('/api/place/createPlace', seat).then(res=>{
                if(res.status == 200){
                    commit('addSeat', res.data);
                }
                else{
                    console.error(res);
                }
            })
        },
        async deleteSeat({commit}, id){
            try{
                let res = await Api().delete(`api/place/article/deleteArticle/${id}`);
                if(res.status == 200)
                    commit('removeSeat', id);
                else
                    console.error(res);
            }
            catch (err){
                console.log(err);
            }  
        }       
        
    },
    mutations:{
        setCategories(state, categories){
            state.categories = categories;
        },
        setUser(state, user){
            state.user = user;
        },
        setItems(state, items){
            state.items = items;
        },        
        addNewItem(state, item){
            if(!state.items) state.items = []
            state.items.push(item);
        },
        removeItem(state, id){
            state.items = state.items.filter(p=>p._id != id);
        },

        setReviews(state, reviews){
            state.reviews = reviews;
        },
        addNewReviews(state, review){
            if(!state.reviews) state.reviews = []
            state.reviews.push(review);
        },
        removeReviews(state, id){
            state.reviews = state.reviews.filter(p=>p._id != id);
        },

        setTransactions(state, transactions){
            state.transactions = transactions;
        },
        addTransactions(state, transaction){
            if(!state.transactions) state.transactions = []
            state.transactions.push(transaction);
        }        
    }
})