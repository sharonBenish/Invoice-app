<template>
  <div class="container" :class="isInvoiceFormOpen && 'formOpen'" >
    <InvoiceOptions @newInvoiceClicked="isInvoiceFormOpen = true" @checked="filter" />
    <div class="invoice-list">
      <InvoiceRecord v-for="(invoice, index) in invoiceList" :key="index" :invoice="invoice" />
      <NewInvoiceForm v-if="isInvoiceFormOpen" @discardClicked="isInvoiceFormOpen = false" />
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
      return{
        invoiceList,
        isInvoiceFormOpen,
        filter
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