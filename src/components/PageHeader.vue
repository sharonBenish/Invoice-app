<template>
  <header>
    <div class="logo">
        <img src="../assets/logo.svg" alt="">
    </div>
    <div>
        <div class="theme-toggle" @click="toggleTheme">
            <img v-if="store.darkMode" src="../assets/icon-sun.svg" alt="">
            <img v-else src="../assets/icon-moon.svg" alt="">
        </div>
        <div class="profile">
            <img class="img-fluid" src="../assets/image-avatar.jpeg" alt="avatar" @click="showProfileMenu = !showProfileMenu" @blur="test">
            <div class="pop-up" v-if="showProfileMenu">
                <p>Hi {{invoiceStore.user.displayName|| "User"}}! </p>
                <p v-if="route.path === '/'" class="msg">You can Login, Sign Up or use the app in demo mode.</p>
                <button class="log-out" @click="LogOut"  v-else>Sign Out</button>
            </div>
        </div>
    </div>
  </header>
</template>

<script setup>
    import { getAuth, signOut } from "firebase/auth"
    import { ThemeToggle } from '@/store/theme';
    import { ref } from '@vue/reactivity';
    import { useRoute, useRouter } from "vue-router";
    import { InvoiceStore } from "@/store";
    import { watch } from "@vue/runtime-core";

    const store = ThemeToggle();
    const router = useRouter();
    const route = useRoute();

    const { toggleTheme } = store;
    const invoiceStore = InvoiceStore();

    const showProfileMenu = ref(false);

    const auth = getAuth()
    const LogOut =()=>{
        showProfileMenu.value = false;
        invoiceStore.setToUserMode()
        signOut(auth)
            .then(()=>{
                console.log('user signed out');
                invoiceStore.resetUserData()
            })
            .catch ((err)=>{
                console.log(err.message)
            })
        router.push({
            path:"/"
        })
    }
    //console.log(invoiceStore.user)
    watch( route, ()=>{
        showProfileMenu.value = false;
    })
</script>

<style lang="scss" scoped >
header{
    display: flex;
    height:5rem;
    background: var(--header-bg);
    justify-content: space-between;
    position: fixed;
    left:0;
    right:0;
    z-index:1000;
    transition:all var(--transition) ease;
}
.logo{
    position: relative;
    width:5rem;
    height: 5rem;
    display:flex;
    justify-content: center;
    align-items: center;
    background:var(--purple);
    border-radius: 0px 20px 20px 0px;
}

.logo >img{
    position: relative;
    z-index:100
}

.logo::after{
    content:"";
    position:absolute;
    background: var(--purple-light);
    border-radius:20px 0px;
    width:100%;
    height:50%;
    bottom:0;
}

header > div:last-of-type{
    display:flex;
}

.img-fluid{
    width:100%;
    height: auto;
    object-fit: cover;
}

.theme-toggle{
    padding:1rem;
    margin:auto;
    cursor: pointer;
}

.profile{
    position: relative;
    width:5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #4A4E6E;
    img{
        width:30px;
        height: 30px;
        border-radius:50%;
        cursor: pointer;
    }
}

.pop-up{
    position: absolute;
    width:200px;
    height: auto;
    padding:1rem;
    background: #fff;
    top:110%;
    left:-150px;
    border-radius: 5px;
    background: var(--header-bg);
    color:var(--purple);
    font-weight:bolder;
    font-size:1.2rem;
    text-align: center;
}

.log-out{
    border:none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    padding:0.6rem 1rem;
    margin-top:20px;
    background: #fff;
}

.log-out:hover{
    background: var(--purple-light);
}

.msg{
    font-size: smaller;
    margin-top:1rem;
}
@media (min-width:1025px) {
    header{
        position: fixed;
        left:0;
        height:100vh;
        width:6.5rem;
        flex-direction: column;
        border-radius: 0px 20px 20px 0px;
        .logo{
            width:6.5rem;
            height: 6.5rem;
        }

    }
    header > div:last-of-type{
        flex-direction: column;
    }

    .profile{
        height: 5rem;
        width:6.5rem;
        border-top: 1px solid #4A4E6E;
        border-left: 0;
        flex-direction: column;
    }
    
    .pop-up{
        top:-100%;
        left:120%;
        width:300px;
        padding: 2rem;
    }

}
</style>