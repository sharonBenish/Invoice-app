<template>
  <div class="container" :class="isInvoiceFormOpen && 'formOpen'" >
    <InvoiceOptions @newInvoiceClicked="isInvoiceFormOpen = true" @checked="filter" />
    <div v-if="!store.demoMode && !store.databaseLoaded" class="loading-spinner">
      <img src="../assets/Rolling-1s-200px.svg" alt="loading spinner">
    </div>
    <div v-if="(store.databaseLoaded && invoices.length == 0) ||(store.demoMode && invoices.length == 0 ) " class="empty">
      <img src="../assets/empty-folder.png" alt="loading spinner">
      <h2>No invoices found.</h2>
    </div>
    <div class="invoice-list">
      <InvoiceRecord v-for="(invoice, index) in invoices" :key="index" :invoice="invoice" />
      <transition name="fade">
        <NewInvoiceForm v-if="isInvoiceFormOpen" @closeForm="closeForm" />
      </transition>
    </div>
  </div>
</template>

<script>
import { InvoiceStore } from "@/store/store";
import NewInvoiceForm from "@/components/NewInvoiceForm.vue";
import InvoiceOptions from "../components/InvoiceOptions.vue";
import InvoiceRecord from "@/components/InvoiceRecord.vue";
import { computed, ref } from "vue";
export default {
    components: { InvoiceOptions, InvoiceRecord, NewInvoiceForm },
    setup(){
      const isInvoiceFormOpen = ref(false);
      const type = ref("all");
  
      const store = InvoiceStore();
      const invoices = computed(()=>{ 
        if (type.value == "all"){
          return store.invoiceData
        } else{
          return store.filterByStatus(type.value)
        }
      });
      
      const filter = (filter)=>{
        if (filter == 'all'){
          type.value = "all"
        }else{
          type.value= filter
        }
      }
      const closeForm = ()=>{
          isInvoiceFormOpen.value = false
      }
      return{
        isInvoiceFormOpen,
        filter,
        closeForm,
        store,
        invoices
      }
    }
}
</script>

<style scoped>
.container{
  transition:all var(--transition) ease;
}
.container.formOpen{
  max-height: 100vh;
  overflow: hidden;
}
.invoice-list{
  display: flex;
  flex-direction: column;
  gap:1rem;
  margin:1.5rem 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading-spinner, .empty{
  display:flex;
  justify-content: center;
  padding:2rem 0;
  height:30vh;
}
.empty{
  flex-direction: column;
  align-items: center;
  color:var(--text-bold)
}
.empty> img{
  height: 80%;
}
</style>