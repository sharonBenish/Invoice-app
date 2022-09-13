<template>
  <div class="container">
    <div v-if="hasAccount" class="intro">
        <h2>Welcome Back! </h2>
        <p>Sign in to continue</p>
    </div>
    <div v-else class="intro">
        <h2>Create Account</h2>
        <p>Create a new account</p>
    </div>
    <form>
        <div class="email">
            <label>Email address</label>
            <input type="text">
        </div>
        <div class="password">
            <label>Password</label>
            <input type="password">
        </div>
        <div v-show="!hasAccount" class="password">
            <label>Confirm Password</label>
            <input type="password">
        </div>
        <button type="submit" class="auth" v-if="hasAccount">Log In</button>
        <button type="submit" class="auth" v-else>Sign Up</button>
        <button type="submit" class="demo"><router-link to="/invoices">Demo</router-link></button>
        <p v-if="hasAccount">Don't have an account? <a @click="hasAccount = false">Sign Up</a></p>
        <p v-else>ALready have an account? <a @click="hasAccount = true">Login</a></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
const hasAccount = ref(true);
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    height:100%;
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
@media (min-width:1025px) {
}
</style>