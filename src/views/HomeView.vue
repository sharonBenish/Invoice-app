<template>
  <div>
    <InvoiceOptions />
    <div class="invoice-list">
      <InvoiceRecord v-for="(invoice, index) in invoiceData" :key="index" :invoice="invoice" />
    </div>
  </div>
</template>

<script>
import InvoiceOptions from "../components/InvoiceOptions.vue";
import InvoiceRecord from "@/components/InvoiceRecord.vue";
import json from '../data.json'
export default {
    components: { InvoiceOptions, InvoiceRecord },
    setup(){
      const invoiceData = json
      return{
        invoiceData
      }
    }
}
</script>

<style scoped>
.invoice-list{
  display: flex;
  flex-direction: column;
  gap:1rem;
  margin:1.5rem 0;
}
</style>