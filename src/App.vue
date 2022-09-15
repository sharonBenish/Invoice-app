<template>
  <div class="main-page" :class="theme.darkMode && 'darkMode'">
    <PageHeader/>
    <transition>
      <DeleteModal :id="invoiceId" v-if="showDeleteModal" @cancelClicked="showDeleteModal = false" @deleteClicked="deleteInvoice" />
    </transition>
    <main>
      <router-view @deleteClicked="OpenDeleteModal" v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue';
import json from "./data.json"
import { InvoiceStore } from "@/store/store";
import { ThemeToggle } from './store/theme';
import { onBeforeMount, ref } from '@vue/runtime-core';
import DeleteModal from './components/DeleteModal.vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth"

const invoiceStore = InvoiceStore()
invoiceStore.loadInvoices(json);
const router = useRouter()

onBeforeMount(()=>{
  const auth = getAuth()
  onAuthStateChanged(auth, (user)=>{
         if(user){
             //const displayName = user.displayName;
             router.push({
                 path:"/invoices"
             })
             invoiceStore.setUser(user);
             invoiceStore.getDatabase()
             console.log('logged in')
         } else{
            console.log('logged out')
         }
     })
})

const showDeleteModal = ref(false);
const invoiceId = ref('');
const OpenDeleteModal = (id)=>{
  showDeleteModal.value = true;
  invoiceId.value= id;
}
const deleteInvoice = ()=>{
  invoiceStore.deleteInvoice(invoiceId.value);
  showDeleteModal.value = false;
  setTimeout(()=>{
    router.go(-1);
  }, 500)
}

const theme = ThemeToggle();
onBeforeMount(()=>{
  theme.initTheme()
})
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700&display=swap');

*{
  padding:0;
  margin:0;
  box-sizing: border-box;
  font-family: 'League Spartan', sans-serif;
}
body{
  font-weight: 100;
}
#app{
  height:100vh;
}
.main-page{
  background: var(--background);
  transition:all var(--transition) ease;
}
main{
  position: relative;
  height:100vh;
  overflow: scroll;
  >div{
    padding:1.5rem;
    padding-top:7rem;
    max-width:850px;
    margin:0 auto;
  }
  
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (min-width:1025px) {
  main{
    width:calc(100% - 6.5rem);
    transform: translateX(6.5rem);
    >div{
      padding-top:5rem;
    }
  }
}
</style>
<style>
  :root{
    --transition:0.25s;
    --background:#F8F8FB;
    --purple: #7c5dfa;
    --purple-light:#9277ff;
    --invoice-bg:#fff;
    --text-bold:#0c0e16;
    --text:#888eb0;
    --order-bg:#F9FAFE;
    --header-bg:#373B53;
    --form-field:#F8F8FB;
    --form-text:#7e88c3;
    --form-text-bold:#888eb0;
    --form-field-border:#dfe3fa;
    --add-item-bg:#DFE3FA;
    --add-item-color: #7e88c3;
    --draft-color: #888eb0;
    --total-bg:#373B53;
  }
  .darkMode{
    --background:#141625;
    --invoice-bg:#1E2139;
    --order-bg:#252945;
    --text-bold:#fff;
    --header-bg:#1e2139;
    --form-field:#1E2139;
    --form-text:#fff;
    --form-text-bold:#fff;
    --form-field-border: #252945;
    --text:#fff;
    --add-item-bg: #252945;
    --ad-item-color: #dfe3fa;
    --draft-color: #dfe3fa;
    --total-bg:#0c0e16;
  }

.fade-left-leave-active{
  animation: fadeOutLeft 1.5s
}

.fade-right-leave-active{
  animation: fadeOutRight 1.5s
}


@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
@keyframes fadeOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
