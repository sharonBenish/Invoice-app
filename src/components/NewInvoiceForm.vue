<template>
  <div class="container">
    <div class="form_container">
        <h2 v-if="id">Edit <span>#</span>{{id}}</h2>
        <h2 v-else>Create Invoice</h2>
        <div class="form">
            <h3>Bill From</h3>
            <div>
                <div class="address">
                    <label for="from-address">Street Address</label>
                    <input type="text" id="from-address" v-model="formDetails.
                    senderAddress.street">
                </div>
                <div class="city">
                    <label for="from-city">City</label>
                    <input type="text" id="from-city" v-model="formDetails.senderAddress.city">
                </div>
                <div class="postcode">
                    <label for="from-postcode">Post Code</label>
                    <input type="text" id="from-postcode" v-model="formDetails.senderAddress.postCode">
                </div>
                <div class="country">
                    <label for="from-country">Country</label>
                    <input type="text" id="from-country" v-model="formDetails.senderAddress.country">
                </div>
            </div>
            <h3>Bill To</h3>
            <div>
                <div class="name">
                    <label for="client-name">Client's Name</label>
                    <input type="text" id="client-name" v-model="formDetails.clientName">
                </div>
                <div class="email">
                    <label for="">Client's Email</label>
                    <input type="text" id="client-email" placeholder="e.g. email@example.com" v-model="formDetails.clientEmail">
                </div>
                <div class="address">
                    <label for="to-address">Street Address</label>
                    <input type="text" id="to-address" v-model="formDetails.clientAddress.street">
                </div>
                <div class="city">
                    <label for="to-city">City</label>
                    <input type="text" id="to-city" v-model="formDetails.clientAddress.city">
                </div>
                <div class="postcode">
                    <label for="to-postcode">Post Code</label>
                    <input type="text" id="to-postcode" v-model="formDetails.clientAddress.postCode">
                </div>
                <div class="country">
                    <label for="to-country">Country</label>
                    <input type="text" id="to-country" v-model="formDetails.clientAddress.country">
                </div>
                <div class="invoice-date">
                    <p class="label">Invoice Date</p>
                    <p class="input">{{todayDate}}</p>
                </div>
                <div class="payment-terms">
                    <p class="label">Payment Terms</p>
                    <select name="devices" class="input" v-model="formDetails.paymentTerms">
                        <option value=1>Next 1 day</option>
                        <option value=7>Next 7 days</option>
                        <option value=14>Next 14 days</option>
                        <option value=30>Next 30 days</option>
                    </select>
                </div>
                <div>
                    <label for="description">Description</label>
                    <input type="text" id="description" placeholder="e.g. Graphic Design Service" v-model="formDetails.description"> 
                </div>
            </div>
            <h3 class="items-heading">Item List</h3>
            <div class="invoice-items" v-for="(i,index) in invoiceItemsNumber" :key="i" >
                <div class="item-name">
                    <label>Item name</label>
                    <input type="text" v-model="formDetails.items[index].name">
                </div>
                <div class="items">
                    <div class="qty">
                        <label>Qty</label>
                        <input type="number" v-model="formDetails.items[index].quantity" @input="getTotal(index)">
                    </div>
                    <div class="price">
                        <label>Price</label>
                        <input type="number" v-model="formDetails.items[index].price" @input="getTotal(index)">
                    </div>
                    <div class="total">
                        <label>Total</label>
                        <input type="number" readonly v-model="formDetails.items[index].total">
                        <!--<div>{{getTotal(index)}}</div>-->
                    </div>
                    <img src="../assets/icon-delete.svg" alt="" @click="deleteItem(index)">
                </div>
            </div>
            <button class="add-item" @click="addNewItem">+ Add New Item</button>
        </div>
        <div v-if="id" class="button-group edit-mode">
            <button class="discard-btn" @click="discardClicked">Edit</button>
            <button class="save-changes" @click="saveChanges">Save Changes</button>
        </div>
        <div v-else class="button-group">
            <button class="discard-btn" @click="discardClicked">Discard</button>
            <button class="draft-btn" @click="saveAsDraft">Save as Draft</button>
            <button class="save-btn" @click="saveInvoice">Save & Send</button>
        </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import { InvoiceStore } from '@/store/store';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
export default {
    props:{
        isOpen:{
            type:Boolean
        },
        id:{
            type:String
        }
    },
    setup(props,ctx){
        const store = InvoiceStore();
        const formDetails = ref({
            id: '',
            createdAt: '',
            paymentDue: '',
            status:"pending",
            senderAddress:{
                street:"",
                city:"",
                postCode:"",
                country:""
            },
            clientAddress:{
                street:"",
                city:"",
                postCode:"",
                country:""
            },
            clientName:"",
            clientEmail:"",
            paymentTerms:1,
            description:"",
            items:[],
            total:null
        });
        const invoiceItemsNumber = ref(0);
        if (props.id){
            formDetails.value= store.getInvoiceById(props.id);
            invoiceItemsNumber.value = formDetails.value.items.length
        }
        
        const addNewItem = ()=>{
            invoiceItemsNumber.value ++;
            console.log(formDetails.value.items)
            formDetails.value.items.push({
                name:"",
                quantity:null,
                price:null,
                total:null,
            })
        }
        const deleteItem = (index)=>{
            console.log(index);
            formDetails.value.items.splice(index,1);
            invoiceItemsNumber.value -=1;
        }

        const todayDate = computed(()=>{
            const date = new Date;
            const options = {month: 'short', day: 'numeric', year: 'numeric'};
            return date.toLocaleDateString('en-US', options)
        })
        const getTotal = (indx)=>{
            const item = formDetails.value.items[indx];
            const qty = item.quantity;
            const price = item.price;
            formDetails.value.items[indx].total = qty * price;
        }

        const invoiceTotal = computed(()=>{
            return formDetails.value.items.map(item => item.total).reduce((a,b)=> a+b, 0)
        })

        const addToInvoiceList=()=>{
            const date = new Date();
            const paymentDate= new Date();
            paymentDate.setDate(date.getDate() + formDetails.value.paymentTerms);
            const paymentDue = paymentDate.toISOString().substring(0,10);
            const createdAt = date.toISOString().substring(0,10);

            console.log(createdAt);
            console.log(paymentDue);

            formDetails.value.id = nanoid(6).toUpperCase();
            formDetails.value.createdAt = createdAt;
            formDetails.value.paymentDue = paymentDue;
            formDetails.value.total = invoiceTotal.value;
            console.log(formDetails.value)
            
            store.addNewInvoice(formDetails.value)
        }

        const saveInvoice = ()=>{
            addToInvoiceList()
            ctx.emit('discardClicked')
        }

        const saveAsDraft = ()=>{
            formDetails.value.status= 'draft';
            saveInvoice()
        }
        const discardClicked = ()=>{
            ctx.emit('discardClicked')
        }

        const saveChanges = ()=>{
            formDetails.value.total = invoiceTotal.value;
            store.saveChanges();
            ctx.emit('discardClicked')
        }
        return{
            todayDate,
            getTotal,
            discardClicked,
            invoiceItemsNumber,
            addNewItem,
            deleteItem,
            formDetails,
            saveInvoice,
            saveAsDraft,
            saveChanges
        }
    }
}
</script>

<style scoped lang="scss">
.container{
    position:absolute;
    top:5rem;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    left:0;
    right:0;
    bottom:0;
}

h2{
    font-weight:500;
}
h2 > span{
    color:rgb(126, 136, 195);
}

h3{
    font-size: 1rem;
    line-height: 1.125;
    color: #7c5dfa;
}

.form_container{
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    padding:20px;
    background: #fff;
}

.form{
    height:80%;
    overflow: scroll;
}

.form >div{
    margin:30px 0;
    gap:20px;
    display:flex;
    flex-wrap: wrap;
    label, .label{
        display: block;
        color: rgb(126, 136, 195);
        margin-bottom: 10px;
    };
    >div{
        width:100%;
    }
    .postcode, .city, .invoice-date, .payment-terms{
        width:calc(50% - 10px);
    }
    .input{
        font-weight:bold;
        font-size:0.85rem;
    }
    input, .input{
        width:100%;
        outline: 0;
        border: 1px solid #dfe3fa;
        border-radius: 4px;
        padding: 1rem 1.25rem;
        &:focus{
            border-color: #7c5dfa;
        }
        &::placeholder{
            color:rgb(136, 142, 176);
        }
    }
    
}

.items-heading{
    margin-bottom: 1.5rem;
    color: rgb(119, 127, 152);
    font-size: 1.5rem;
}

.add-item{
    width:100%;
    background: rgb(249, 250, 254);
    color: rgb(126, 136, 195);
    padding: 1rem 1.5rem;
    outline:0;
    border:0;
    border-radius: 10rem;
    margin-bottom:20px;
}

.button-group{
    display:flex;
    justify-content: space-between;
    button{
    padding: 1rem 1.3rem;
    outline:0;
    border:0;
    border-radius: 2rem;
    cursor:pointer;
    }
    .discard-btn{
    background: rgb(249, 250, 254);
    color: rgb(126, 136, 195);    
    }
    .draft-btn{
        background: rgb(54, 59, 83);
        color: rgb(136, 142, 176);
    }
}

.button-group.edit-mode{
    justify-content:flex-end;
    gap:20px;
    .save-changes{
        background: rgb(124, 93, 250);
        color:#fff;
    }
}

.invoice-items{
    margin-bottom:20px;
    .items{
        justify-content: space-between;
        display:flex;
        align-items: center;
        gap:10px;
    }
    .qty{
        width:20%;
        >input{
            padding:1rem 0.8rem!important;
        }
    }
    .price{
        width:40%;
    }
    .total{
        width:30%;
    }
}

@media (min-width:1025px) {
    .container{
        top:0;
        
    }
    .form_container{
        width:60%;
        max-width:600px;
        border-radius:0 2rem 2rem 0;
        padding:1.5rem 3rem;
        
    }
    h2{
        margin:3rem 0;
        font-size:1.8rem;
    }
    .form >div{
        .city, .postcode, .country{
            width:calc(33.333% - 13.5px)
        }
    }

    .invoice-items{
        justify-content: space-between;
        .items{
            justify-content: space-between;
            align-items: center;
            gap:10px;
            width:calc(60% - 20px);
        }
        .item-name{
            width:40%;
        }
    }
    
}
</style>