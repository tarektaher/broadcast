/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');



window.Vue = require('vue');

import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/MessageComponent.vue'));

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        typing: '',
        chat:{
            message:[],
            user: [],
            color: [],
            time: []
        },
        numberOfUsers: 0
    },
    watch:{

        message(){
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    methods: {

        send(){

            if(this.message.length != 0 ){
                this.chat.message.push(this.message);
                this.chat.color.push('success');
                this.chat.user.push('moi');
                this.chat.time.push(this.getTime());

                axios.post('/send', {
                   message: this.message,
                    chat: this.chat
                }).
                then(response=>{
                       console.log(response);
                        this.message='';
                    }).

                catch(error =>{
                        //console.log(error);
                    });

            }

        },

        getTime(){

                let time = new Date();
                return time.getHours()+':'+ time.getMinutes();

        },

        getOldMessages(){
            axios.post('/getOldMessage')
                .then(response => {
                console.log(response);
            if (response.data != '') {
                this.chat = response.data;
            }
        })
        .catch(error => {
                console.log(error);
        });
        },

        deleteSession(){
            axios.post('/deleteSession')
                .then(response=> this.$toaster.success('Chat history is deleted') );
        }
    },
    mounted(){

        this.getOldMessages();
        Echo.private('chat')
            .listen('ChatEvent', (e) => {

            this.chat.message.push(e.message);
        this.chat.color.push('warning');
        this.chat.user.push(e.user);
        this.chat.time.push(this.getTime());

        axios.post('/saveToSession',{
            chat: this.chat
        }).
        then(response=>{


        }).

        catch(error =>{
            //console.log(error);
        });


            /**/
        })

            .listenForWhisper('typing', (e) => {

                if(e.name !== ""){
            this.typing = 'typing ...' ;
                }else{

            this.typing = '' ;
        }

    });

        Echo.join('chat')
            .here((users) => {
           this.numberOfUsers = users.length;
        })
    .joining((user) => {
            this.numberOfUsers += 1;

        this.$toaster.info(user.name + ' joined the room');
    })
    .leaving((user) => {
            this.numberOfUsers -= 1;

        this.$toaster.warning(user.name + ' leaved the room');
    });


    }

});



