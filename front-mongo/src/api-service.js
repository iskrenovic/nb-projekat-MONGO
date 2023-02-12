import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/dbConnection'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:null,
        categories:null,
        items:null,
        item:null,
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
        getItem(state){
            return state.item;
        },
        getReviews(state){
            return state.reviews;
        },
        getTransactions(state){
            return state.transactions;
        },
        getUser(state){
            return state.user;
        }        
    },
    actions:{
        async createAccount({commit}, account) {
            
            return await Api().post('/api/register/', account.user).then(res=>{
                if(res.status == 200){
                    commit('setUser', res.data);
                    Vue.$cookies.set('uId', res.data._id,"24h");
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
                    Vue.$cookies.set('uId', res.data._id,"24h");
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
       
        /*async getRecommendedSpacesFreelancer({commit}, req){
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
        }, */
        /* async getSpacesByUserId({commit}, req){
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
        }, */

        //  C A T E G O R Y

        async getAllCategories({commit}){
            try{
                let res = await Api().get(`api/category/getAllCategories/`);
                if(res.status==200){                    
                    commit('setCategories', res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getCategory({commit}, id){
            try{
                let res = await Api().get(`api/category/getCategory/${id}`);
                if(res.status==200){
                    commit('setCategories', res.data);
                }
                else{
                    console.error(res);
                }
            }
            catch(err){
                console.log(err);
            }
        },
        async addCategory({commit}, category) {
            return await Api().post('/api/category/createCategory', category).then(res=>{
                if(res.status == 200){
                    commit('addNewCategory', res.data);
                }
                else{
                    console.error(res);
                }
            })
        },
        async updateCategory({commit}, req) {
            return await Api().put(`/api/category/updateCategory`, req.category).then(res=>{
                if(res.status == 200){
                    commit('removeCategory', req.category._id);
                    commit('addNewCategory', res.data);
                }
                else{
                    console.error(res);
                }
                req.callback(res.status == 200);
            }).catch(err=>{
                req.callback(false);
                console.error(err);
            })
        },
        async deleteCategory({commit}, id){
            try{
                let res = await Api().delete(`api/category/deleteCategory/${id}`);
                if(res.status == 200)
                    commit('removeCategory', id);
                else
                    console.error(res);
            }
            catch (err){
                console.log(err);
            }  
        },
       
        // I T E M S 
        async addItem({commit}, item) {
            return await Api().post('/api/item/createItem/', item).then(res=>{
                if(res.status == 200){
                    commit('addNewItem', res.data);
                }
                else{
                    console.error(res);
                }
            })
        },
        async updateItem({commit}, req) {
            return await Api().put('/api/item/updateItem/', req.item).then(res=>{
                if(res.status == 200){
                    commit('removeItem', req.item._id);
                    commit('addNewItem', res.data);
                }
                else{
                    console.error(res);
                }
                req.callback(res.status == 200);
            }).catch(err=>{
                req.callback(false);
                console.error(err);
            })
        },
        async deleteItem({commit}, id){
            try{
                let res = await Api().delete(`api/item/deleteItem/${id}`);
                if(res.status == 200)
                    commit('removeItem', id);
                else
                    console.error(res);
            }
            catch (err){
                console.log(err);
            }  
        },
        async getAllItems({commit}){
            try{
                let res = await Api().get(`api/item/getAllItems/`);
                if(res.status==200){
                    commit('setItems', res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getItem({commit}, id){
            try{
                let res = await Api().get(`api/item/getItem/${id}`);
                if(res.status == 200){
                    commit('setItem',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getItemsByCategoryId({commit}, id){
            try{
                let res = await Api().get(`api/item/getItemsByCategoryId/${id}`);
                if(res.status == 200){
                    commit('setItems',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getItemsByGender({commit}, gender){
            try{
                let res = await Api().get(`api/item/getItemsByGender/${gender}`);
                if(res.status == 200){
                    commit('setItems',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getItemsByTags({commit}, tags){
            try{
                let res = await Api().get(`api/item/getItemsByTags/${tags}`);
                if(res.status == 200){
                    commit('setItems',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        // R E V I E W S
        async getReviews({commit}){
            try{
                let res = await Api().get(`api/review/getAllReviews/`);
                if(res.status==200){
                    commit('setReviews', res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getReview({commit}, id){
            try{
                let res = await Api().get(`api/review/getReview/${id}`);
                if(res.status == 200){
                    commit('setReviews',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getReviewsByUserId({commit}, userid){
            try{
                let res = await Api().get(`api/review/getReviewsByUserId/${userid}`);
                if(res.status == 200){
                    commit('setReviews',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getReviewsByItemId({commit}, itemid){
            try{
                let res = await Api().get(`api/review/getReviewsByItemId/${itemid}`);
                if(res.status == 200){
                    commit('setReviews',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async addReview({commit}, review) {
            return await Api().post('/api/review/createReview/', review).then(res=>{
                if(res.status == 200){
                    commit('addNewReviews', res.data);
                }
                else{
                    console.error(res);
                }
            })
        },
        async deleteReview({commit}, id){
            try{
                let res = await Api().delete(`api/review/deleteReview/${id}`);
                if(res.status == 200)
                    commit('removeReviews', id);
                else
                    console.error(res);
            }
            catch (err){
                console.log(err);
            }  
        },

        // T R A N S A C T I O N S

        async getAllTransactions({commit}){
            try{
                let res = await Api().get(`api/transaction/getAllTransactions/`);
                if(res.status==200){
                    commit('setTransactions', res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getTransaction({commit}, id){
            try{
                let res = await Api().get(`api/transaction/getTransaction/${id}`);
                if(res.status == 200){
                    commit('setTransactions',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getTransactionsByUserId({commit}, userid){
            try{
                let res = await Api().get(`api/transaction/getTransactionsByUserId/${userid}`);
                if(res.status == 200){
                    commit('setTransactions',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async getTransactionsByItemId({commit}, itemid){
            try{
                let res = await Api().get(`api/transaction/getTransactionsByItemId/${itemid}`);
                if(res.status == 200){
                    commit('setTransactions',res.data);
                }
                else{
                    console.error(res.data);
                }
            }
            catch (err){
                console.log(err);
            }
        },
        async addTransaction({commit}, req) {
            return await Api().post('/api/transaction/createTransaction/', req.transaction).then(res=>{
                if(res.status == 200){
                    commit('addTransactions', res.data);
                    
                }
                else{
                    console.error(res);
                }
                req.callback(res.status == 200);
            }).catch(err=>{
                req.callback(false);
                console.error(err);
            })
        },
        async deleteTransaction({commit}, id){
            try{
                let res = await Api().delete(`api/transaction/deleteTransaction/${id}`);
                if(res.status == 200)
                    commit('removeTransactions', id);
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
        setItem(state, item){
            state.item = item;
        },       
        addNewItem(state, item){
            if(!state.items) state.items = []
            state.items.push(item);
        },
        addNewCategory(state, category){
            if(!state.categories) state.categories = []
            state.categories.push(category);
        },
        removeItem(state, id){
            state.items = state.items.filter(p=>p._id != id);
        },
        removeCategory(state, id){
            state.categories = state.categories.filter(p=>p._id != id);
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
        removeTransactions(state, id){
            state.transactions = state.transactions.filter(p=>p._id != id);
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