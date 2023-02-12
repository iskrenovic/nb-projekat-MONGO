import Vue from 'vue'
import Router from 'vue-router'
import store from '@/api-service'
import Homepage from '@/pages/homepage.vue'
import LoginRegister from '@/pages/login-register.vue'
// import SpacePage from '@/pages/space-page.vue'
// import RoomPage from '@/pages/room-page.vue'
import AdminDash from '@/pages/admin-dash.vue'
import CategoryPage from "@/pages/category-page.vue"
import ItemPage from "@/pages/item-page.vue"
// import ReservationMsg from '@/pages/reservation-msg.vue'


Vue.use(Router);
const r = new Router({
    routes:[
        {
            path:'/',
            name: 'Homepage',
            component: Homepage,
            beforeEnter(to, from, next){
                if(!Vue.$cookies.get('uId')){
                    next({name:'Login'});
                    return;
                }
                let u = store.getters['getUser'];
                if(u){
                    console.log(u);
                    if(u.type == 'admin'){
                        next({name:'Admin'})
                        return;
                    }
                    next();
                    return;
                }
                store.dispatch('getUser', Vue.$cookies.get('uId'))
                .then(()=>{
                    let u = store.getters['getUser'];
                    console.log(u);
                    if(!u){
                        next({name:'Login'});
                        return;
                    }
                    if(u.type == 'admin'){
                        next({name:'Admin'})
                        return;
                    }
                    next();
                })
            }
        },        
        {
            path:'/category/:id',
            name: 'CategoryPage',
            component: CategoryPage,
            // beforeEnter(to, from, next){
            //     if(!Vue.$cookies.get('uId')){
            //         next({name:'Login'});
            //         return;
            //     }
            //     next()
            // }
        },
        {
            path:'/item/:categoryId/:id',
            name: 'ItemPage',
            component: ItemPage,
            // beforeEnter(to, from, next){
            //     if(!Vue.$cookies.get('uId')){
            //         next({name:'Login'});
            //         return;
            //     }
            //     next()
            // }
        },    

        {
            path:'/login',
            name:'Login',
            component:LoginRegister,
            beforeEnter(to,from,next){
                if(!Vue.$cookies.get('uId')){
                    next();
                    return;
                }
                next({name:'Homepage'})
            }
        },
        {
            path:'/admin',
            name:'Admin',
            component:AdminDash,
            // beforeEnter(to, from,next){
            //     if(!Vue.$cookies.get('uId')){
            //         next({name:'Login'});
            //         return;
            //     }
            //     let user = store.getters['getUser'];
            //     if(user){
            //         if(user.role == 'owner'){
            //             next();
            //             return;
            //         }
            //         next({name:'Homepage'});
            //         return;
            //     }
            //     if(!user){
            //         store.dispatch('getUserWithCallback',{
            //             id:Vue.$cookies.get('uId'),
            //             callback:(u)=>{
            //                 if(!u){
            //                     next({name:'Login'});
            //                     return;
            //                 }
            //                 if(u.role == 'owner'){
            //                     next();
            //                     return;
            //                 }
            //                 next({name:'Homepage'});
            //             }
            //         })
            //     }               
            // }
        },        
        
    ],
    mode: 'history'
})

export default r;