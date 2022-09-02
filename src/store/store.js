import { defineStore } from "pinia";

export const InvoiceStore = defineStore("invoice", {
    state: ()=>({
        invoiceData:[],
    }),
    actions:{
        loadInvoices(data){
            this.invoiceData = data
        },
        addNewInvoice(data){
            this.invoiceData.unshift(data)
        }
    }
})