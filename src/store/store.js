import { defineStore } from "pinia";
import { getFirestore, onSnapshot,collection,addDoc /*doc, setDoc*/} from '@firebase/firestore';

export const InvoiceStore = defineStore("invoice", {
    state: ()=>({
        invoiceData:[],
        user:[],
        database:[],
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
            invoice.status = "paid";
        },
        deleteInvoice(id){
            this.invoiceData = this.invoiceData.filter(invoice => invoice.id !== id);
        },
        saveChanges(id, changes){
            const indx = this.invoiceData.findIndex(invoice => invoice.id == id);
            this.invoiceData[indx] = changes;
            console.log(this.invoiceData)
        },
        setUser(uid){
            this.user = uid;
        },
        resetUserData(){
            this.database =[];
            this.user = [];
        },
        getDatabase(){
            const db = getFirestore();
            const colRef = collection(db, `users/${this.user.uid}/invoices`);
            onSnapshot(colRef, (snapshot)=>{
                 let books=[];
                 snapshot.docs.forEach((doc)=>{
                     books.push(doc.data())
                 })
                 console.log(books)
                 this.database = books
             })
            // const docRef = doc(db, "users", this.user.uid);
            // onSnapshot(docRef, (snapshot)=>{
            //     const invoices = [];
            //     console.log(snapshot)
            //     // console.log(snapshot.data())
            //     snapshot.forEach((doc)=>{
            //         invoices.push({...doc.data()})
            //     })
            //     console.log(invoices)
            // })
            
        },
        addUser(userId){
            const db = getFirestore();
            const usersRef = collection(db,`users/${userId}/invoices`);
            addDoc(usersRef, {
                id: "RT3080",
                createdAt: "2021-08-18",
                paymentDue: "2021-08-19",
                description: "Re-branding",
                paymentTerms: 1,
                clientName: "Jensen Huang",
                clientEmail: "jensenh@mail.com",
                status: "paid",
                senderAddress: {
                    street: "19 Union Terrace",
                    city: "London",
                    postCode: "E1 3EZ",
                    country: "United Kingdom"
                },
                clientAddress: {
                    street: "106 Kendell Street",
                    city: "Sharrington",
                    postCode: "NR24 5WQ",
                    country: "United Kingdom"
                },
                items: [
                    {
                        name: "Brand Guidelines",
                        quantity: 1,
                        price: 1800.90,
                        total: 1800.90
                    }
                ],
                total: 1800.90
            }
            ).then(()=>{
                console.log("document added")
            })

            //addDoc(usersRef, {userId})
            //setDoc(doc(db, "users", userId), {invoices:[]}
            // {
            //     id: "RT3080",
            //     createdAt: "2021-08-18",
            //     paymentDue: "2021-08-19",
            //     description: "Re-branding",
            //     paymentTerms: 1,
            //     clientName: "Jensen Huang",
            //     clientEmail: "jensenh@mail.com",
            //     status: "paid",
            //     senderAddress: {
            //         street: "19 Union Terrace",
            //         city: "London",
            //         postCode: "E1 3EZ",
            //         country: "United Kingdom"
            //     },
            //     clientAddress: {
            //         street: "106 Kendell Street",
            //         city: "Sharrington",
            //         postCode: "NR24 5WQ",
            //         country: "United Kingdom"
            //     },
            //     items: [
            //         {
            //             name: "Brand Guidelines",
            //             quantity: 1,
            //             price: 1800.90,
            //             total: 1800.90
            //         }
            //     ],
            //     total: 1800.90
            // }
            // )
        }
    }
})