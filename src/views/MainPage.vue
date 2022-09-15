<template>
  <div class="container" :class="isInvoiceFormOpen && 'formOpen'" >
    <InvoiceOptions @newInvoiceClicked="isInvoiceFormOpen = true" @checked="filter" />
    <div>
      <div v-if="store.database.length > 0">{{store.database}}</div>
      <h1 v-else>Database empty</h1>
    </div>
    <div class="invoice-list">
      <InvoiceRecord v-for="(invoice, index) in invoiceList" :key="index" :invoice="invoice" />
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
import { ref } from "vue";
export default {
    components: { InvoiceOptions, InvoiceRecord, NewInvoiceForm },
    setup(){
      const isInvoiceFormOpen = ref(false);
      const invoiceList = ref()
  
      const store = InvoiceStore();
      const { invoiceData } = store;
      invoiceList.value = invoiceData
      
      const filter = (type)=>{
        if (type == 'all'){
          invoiceList.value = invoiceData;
        }else{
          invoiceList.value = store.filterByStatus(type);
        }
      }
      const closeForm = ()=>{
        //setTimeout(()=>{
          isInvoiceFormOpen.value = false
        //}, 340)
      }
      return{
        invoiceList,
        isInvoiceFormOpen,
        filter,
        closeForm,
        store
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

</style>