import { defineStore } from "pinia";

export const InvoiceStore = defineStore("invoice", {
    state: ()=>({
        invoiceData:[],
    }),
    getters:{
        getInvoiceById:(state)=>{
            return (invoiceId)=>state.invoiceData.find((invoice)=> invoice.id === invoiceId)
        },
        invoiceCount:(state)=>{
            return state.invoiceData.length
        },
        filterByStatus:(state)=>{
            return (status)=> state.invoiceData.filter((invoice)=> invoice.status === status)
        }
    },
    actions:{
        loadInvoices(data){
            this.invoiceData = data
        },
        addNewInvoice(data){
            this.invoiceData.unshift(data)
        },
        markAsPaid(id){
            const invoice = this.invoiceData.find(invoice => invoice.id == id);
            //console.log(invoice);
            invoice.status = "paid";
            //console.log(this.invoiceData)
        },
        deleteInvoice(id){
            this.invoiceData = this.invoiceData.filter(invoice => invoice.id !== id);
        },
        saveChanges(id, changes){
            const indx = this.invoiceData.findIndex(invoice => invoice.id == id);
            this.invoiceData[indx] = changes;
        }
    }
})