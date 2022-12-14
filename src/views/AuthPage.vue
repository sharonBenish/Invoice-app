<template>
  <div class="container">
    <div v-if="hasAccount" class="intro">
        <h2>Welcome Back!</h2>
        <p>Sign in to continue</p>
    </div>
    <div v-else class="intro">
        <h2>Create Account</h2>
        <p>Create a new account</p>
    </div>
    <form ref="form">
        <div class="email">
            <label>Email address</label>
            <input type="text" v-model="email">
        </div>
        <div class="username" v-show="!hasAccount">
            <label>Username</label>
            <input type="text" v-model="username">
        </div>
        <div class="password">
            <label>Password</label>
            <input type="password" v-model="password">
        </div>
        <div v-show="!hasAccount" class="password">
            <label>Confirm Password</label>
            <input type="password" v-model="confirmPassword">
        </div>
        <p class="error-msg">{{errorMsg}}</p>
        <button class="auth" v-if="hasAccount" @click.prevent="signIn">Log In
            <img src="../assets/Spinner-1s-200px.svg" alt="" v-if="authenticating">
        </button>
        <button class="auth" v-else @click.prevent="signUp">Sign Up
            <img src="../assets/Spinner-1s-200px.svg" alt="" v-if="authenticating">
        </button>
        <router-link to="/invoices"><button @click="demo" class="demo">Demo</button></router-link>
        <p v-if="hasAccount">Don't have an account? <a @click="hasAccount = false">Sign Up</a></p>
        <p v-else>ALready have an account? <a @click="hasAccount = true">Login</a></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { InvoiceStore } from "@/store";
import json from "../data.json";
import { onMounted, watch } from "@vue/runtime-core";

const store = InvoiceStore();
const hasAccount = ref(true);
const errorMsg = ref("");
const form = ref(null);
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const authenticating = ref(false);

onMounted(()=>{
    form.value.querySelectorAll("input").forEach((input) =>{
        input.addEventListener("focus", ()=>{
            errorMsg.value = ""
        })
    })
})


const auth = getAuth();
const signUp = ()=>{
    store.setToUserMode()
    if (password.value === confirmPassword.value && username.value.trim().length >= 5){
        authenticating.value= true;
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((cred)=>{
                cred.user.displayName= username.value;
                form.value.reset();
            })
            .catch((err)=>{
                console.log(err.message);
                errorMsg.value = err.message;
                authenticating.value= false;
            })
    } else if (username.value.trim() == ""){
        errorMsg.value = "Please provide a username"
    } else if (username.value.trim().length < 5){
        errorMsg.value = "Username must be at least 5 characters"
    } else if (password.value != confirmPassword.value){
        errorMsg.value = "Your password does not match"
    }
}
const signIn = ()=>{
    authenticating.value=true;
    console.log(authenticating.value);
    store.setToUserMode()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((cred)=>{
            console.log('user logged in:', cred.user);
            form.value.reset();
        })
        .catch((err)=>{
            console.log(err.message);
            errorMsg.value = err.message;
            authenticating.value= false;
        })
}

const demo = ()=>{
    store.setToDemoMode()
    store.loadInvoices(json)
}

watch(hasAccount,()=>{
    email.value = "";
    password.value ="";
    confirmPassword.value="";
    username.value ="";
    errorMsg.value = "";
    authenticating.value=false;
})
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    height:100%;
    overflow: scroll;
}
.intro{
    margin-bottom: 2rem;
    line-height: 2rem;
    text-align: center;

    color:var(--text-bold);
}
.intro>p{
    font-size: 1rem;
}
h2{
    font-weight:500;
}
form{
    width:100%;
    max-width:500px;
    text-align: center;
}

form > div{
    margin-bottom: 1rem;
    text-align: left;
    position: relative;
}

form >div::after{
    content:"";
    display:block;
    height:20px;
    width:20px;
    position: absolute;
    bottom: 0.8rem;
    left:0.5rem;
    background-size: contain;
    background-repeat: no-repeat;
}
.email::after{
    background-image: url("../assets/email.png");
}
.password::after{
    background-image: url("../assets/lock.png");
}
.username::after{
    background-image: url("../assets/user.png");
    height:18px;
    width:18px;
}
label{
    display: block;
    color: var(--form-text);
    margin-bottom: 10px;
}
input{
    width:100%;
    outline: none;
    color:var(--text-bold);
    background:var(--form-field);
    border: 1px solid var(--form-field-border);
    border-radius: 4px;
    padding: 1rem 2.3rem;
}
input:focus{
    border-color: #7c5dfa;
}
button{
    width:80%;
    min-width:100px;
    padding: 1rem 1.8rem;
    outline:0;
    border:0;
    border-radius: 2rem;
    cursor:pointer;
    color:#fff;
    margin: 1rem 0;
    position:relative
}
button:active{
    transform: scale(0.95);
}
.auth{
    background: var(--purple);
}
.auth:hover{
    background: #9278FF;
}
p{
    font-size: smaller;
    color:var(--text-bold)
}
a{
    color:var(--purple);
    text-decoration: underline;
    cursor:pointer
}
.demo{
    background: var(--header-bg);
    color: var(--draft-color);
}
.error-msg{
    color:rgb(236, 87, 87);
    font-weight: bolder;
    text-align: left;
}
button>img{
    position:absolute;
    max-width:40px;
    top:50%;
    transform: translateY(-50%);
}
@media (min-width:1025px) {
}
</style>