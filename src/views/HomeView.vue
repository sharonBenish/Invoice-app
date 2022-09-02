<template>
  <div class="container" :class="isInvoiceFormOpen && 'formOpen'" >
    <InvoiceOptions @newInvoiceClicked="isInvoiceFormOpen = true" />
    <div class="invoice-list">
      <InvoiceRecord v-for="(invoice, index) in invoiceData" :key="index" :invoice="invoice" />
      <NewInvoiceForm v-if="isInvoiceFormOpen" @discardClicked="isInvoiceFormOpen = false" />
    </div>
  </div>
</template>

<script>
//import { storeToRefs } from "pinia";
import { InvoiceStore } from "@/store/store";
import NewInvoiceForm from "@/components/NewInvoiceForm.vue";
import InvoiceOptions from "../components/InvoiceOptions.vue";
import InvoiceRecord from "@/components/InvoiceRecord.vue";
//import json from '../data.json';
import { ref } from "vue";
export default {
    components: { InvoiceOptions, InvoiceRecord, NewInvoiceForm },
    setup(){
      //const invoiceData = json;
      const isInvoiceFormOpen = ref(false);

      const store = InvoiceStore();
      const { invoiceData } = store;
      
      return{
        invoiceData,
        isInvoiceFormOpen
      }
    }
}
</script>

<style scoped>
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
</style>