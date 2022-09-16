import { defineStore } from "pinia";
import { getFirestore, onSnapshot,collection,addDoc, doc, updateDoc, deleteDoc, orderBy, query, serverTimestamp /*, setDoc*/} from '@firebase/firestore';

export const InvoiceStore = defineStore("invoice", {
    state: ()=>({
        invoiceData:[],
        user:[],
        database:[],
        demoMode:false,
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
        setToDemoMode(){
            this.demoMode = true
        },
        setToUserMode(){
            this.demoMode = false
        },
        loadInvoices(data){
            this.invoiceData = data
        },
        addNewInvoice(data){
            if (this.demoMode){
                this.invoiceData.unshift(data)
            }else{
                const db = getFirestore();
                const docRef = collection(db,`users/${this.user.uid}/invoices`);
                addDoc(docRef, {...data, timeStamp:serverTimestamp() }
                ).then(()=>{
                    console.log("document added")
                })
            }
        },
        markAsPaid(id, docId){
            if (this.demoMode){
                const invoice = this.invoiceData.find(invoice => invoice.id == id);
                invoice.status = "paid";
            }else{
                const db = getFirestore();
                const docRef = doc(db, 'users', this.user.uid, 'invoices', docId)
                updateDoc(docRef, {
                    status:"paid"
                })
                .then(()=>{
                    console.log("status changed")
                })
            }
        },
        deleteInvoice(id, docId){
            if (this.demoMode){
                this.invoiceData = this.invoiceData.filter(invoice => invoice.id !== id);
            } else{
                const db = getFirestore();
                const docRef = doc(db, 'users', this.user.uid, 'invoices', docId);
                deleteDoc(docRef)
                    .then(()=>{
                        console.log("invoice deleted")
                    })
            }
            
        },
        saveChanges(id, changes, docId){
            if (this.demoMode){
                const indx = this.invoiceData.findIndex(invoice => invoice.id == id);
                this.invoiceData[indx] = changes;
                console.log(this.invoiceData)
            }else{
                const db = getFirestore();
                const docRef = doc(db, 'users', this.user.uid, 'invoices', docId);
                updateDoc(docRef, changes)
                .then(()=>{
                    console.log("invoice updated")
                })
            }
             
        },
        setUser(uid){
            this.user = uid;
        },
        resetUserData(){
            this.invoiceData =[];
            this.user = [];
        },
        getDatabase(){
            const db = getFirestore();
            const colRef = collection(db, `users/${this.user.uid}/invoices`);
            const q = query(colRef, orderBy('timeStamp', "desc"))
            onSnapshot(q, (snapshot)=>{
                 let invoices=[];
                 snapshot.docs.forEach((doc)=>{
                     invoices.push({...doc.data(), docId: doc.id})
                 })
                 console.log(invoices)
                 this.invoiceData = invoices
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
            
        }
    }
})