<template>
  <div class="container">
    <div ref="form" class="form_container">
        <h2 v-if="id">Edit <span>#</span>{{ id }}</h2>
        <h2 v-else>Create Invoice</h2>
        <div class="form">
            <h3>Bill From</h3>
            <div>
                <div class="address">
                    <label for="from-address">Street Address</label>
                    <InputField v-model="formDetails.senderAddress.street"/>
                </div>
                <div class="city">
                    <label for="from-city">City</label>
                    <InputField v-model="formDetails.senderAddress.city" />
                </div>
                <div class="postcode">
                    <label for="from-postcode">Post Code</label>
                    <InputField v-model="formDetails.senderAddress.postCode" />
                </div>
                <div class="country">
                    <label for="from-country">Country</label>
                    <InputField v-model="formDetails.senderAddress.country" />
                </div>
            </div>
            <h3>Bill To</h3>
            <div>
                <div class="name">
                    <label for="client-name">Client's Name</label>
                    <InputField v-model="formDetails.clientName" />
                </div>
                <div class="email">
                    <label for="">Client's Email</label>
                    <InputField v-model="formDetails.clientEmail" :type="'email'" class="email" />
                </div>
                <div class="address">
                    <label for="to-address">Street Address</label>
                    <InputField v-model="formDetails.clientAddress.street" />
                </div>
                <div class="city">
                    <label for="to-city">City</label>
                    <InputField v-model="formDetails.clientAddress.city" />
                </div>
                <div class="postcode">
                    <label for="to-postcode">Post Code</label>
                    <InputField v-model="formDetails.clientAddress.postCode" />
                </div>
                <div class="country">
                    <label for="to-country">Country</label>
                    <InputField v-model="formDetails.clientAddress.country" />
                </div>
                <div class="invoice-date">
                    <p class="label">Invoice Date</p>
                    <p class="input">{{todayDate}}<span><img src="../assets/icon-calendar.svg" alt=""></span></p>
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
                    <InputField v-model="formDetails.description" />
                </div>
            </div>
            <h3 class="items-heading">Item List</h3>
            <div class="invoice-items" v-for="(i,index) in invoiceItemsNumber" :key="i" >
                <div class="item-name">
                    <label>Item name</label>
                    <InputField v-model="formDetails.items[index].name" />
                </div>
                <div class="items">
                    <div class="qty">
                        <label>Qty</label>
                        <InputField v-model="formDetails.items[index].quantity" @input="getTotal(index)" :type="'number'" />
                    </div>
                    <div class="price">
                        <label>Price</label>
                        <InputField v-model="formDetails.items[index].price" @input="getTotal(index)" :type="'number'" />
                    </div>
                    <div class="total">
                        <label>Total</label>
                        <input type="number" readonly v-model="formDetails.items[index].total">
                    </div>
                    <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" @click="deleteItem(index)"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fill-rule="nonzero"/></svg>
                </div>
            </div>
            <button class="add-item" @click="addNewItem">+ Add New Item</button>
            <div class="errors">
                <p ref="emptyField">- All fields must be filled.</p>
                <p ref="noItem">- An item must be added.</p>
                <p ref="invalidEmail">- Invalid email.</p>
            </div>
        </div>
        <div v-if="id" class="button-group edit-mode">
            <button class="discard-btn" @click="closeForm">Cancel</button>
            <button class="save-changes" @click="saveChanges">Save Changes</button>
        </div>
        <div v-else class="button-group">
            <button class="discard-btn" @click="closeForm">Discard</button>
            <button class="draft-btn" @click="saveAsDraft">Save as Draft</button>
            <button class="save-btn" @click="saveInvoice">Save & Send</button>
        </div>
    </div>
</div>
</template>

<script>
import { nanoid } from 'nanoid';
import { InvoiceStore } from '@/store';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import InputField from './InputField.vue';
export default {
    props: {
        isOpen: {
            type: Boolean
        },
        id: {
            type: String
        }
    },
    setup(props, ctx) {
        const store = InvoiceStore();
        const form = ref();
        const formDetails = ref({
            id: "",
            createdAt: "",
            paymentDue: "",
            status: "pending",
            senderAddress: {
                street: "",
                city: "",
                postCode: "",
                country: ""
            },
            clientAddress: {
                street: "",
                city: "",
                postCode: "",
                country: ""
            },
            clientName: "",
            clientEmail: "",
            paymentTerms: 1,
            description: "",
            items: [],
            total: null
        });
        const invoiceItemsNumber = ref(0); 
        if (props.id) {
            formDetails.value = JSON.parse(JSON.stringify(store.getInvoiceById(props.id)));
            invoiceItemsNumber.value = formDetails.value.items.length;
        }
        const addNewItem = () => {
            invoiceItemsNumber.value++;
            console.log(formDetails.value.items);
            formDetails.value.items.push({
                name: "",
                quantity: null,
                price: null,
                total: null,
            });
        };
        const deleteItem = (index) => {
            console.log(index);
            formDetails.value.items.splice(index, 1);
            invoiceItemsNumber.value -= 1;
        };
        const todayDate = computed(() => {
            const date = new Date;
            const options = { month: "short", day: "numeric", year: "numeric" };
            return date.toLocaleDateString("en-US", options);
        });
        const getTotal = (indx) => {
            const item = formDetails.value.items[indx];
            const qty = item.quantity;
            const price = item.price;
            formDetails.value.items[indx].total = qty * price;
        };
        const invoiceTotal = computed(() => {
            return formDetails.value.items.map(item => item.total).reduce((a, b) => a + b, 0);
        });
        const addToInvoiceList = () => {
            const date = new Date();
            const paymentDate = new Date();
            paymentDate.setDate(date.getDate() + formDetails.value.paymentTerms);
            const paymentDue = paymentDate.toISOString().substring(0, 10);
            const createdAt = date.toISOString().substring(0, 10);
            //console.log(createdAt);
            //console.log(paymentDue);
            formDetails.value.id = nanoid(6).toUpperCase();
            formDetails.value.createdAt = createdAt;
            formDetails.value.paymentDue = paymentDue;
            formDetails.value.total = invoiceTotal.value
            //console.log(formDetails.value);
            store.addNewInvoice(formDetails.value);
        };

        const resetValidationVariables = ()=>{
            isValid.value = true;
            emptyField.value.style.display = 'none';
            invalidEmail.value.style.display = 'none';
            noItem.value.style.display ='none';
        };

        const saveInvoice = (event) => {
            resetValidationVariables();
            formValidation(event);
            if(isValid.value){
                addToInvoiceList();
                closeForm();
            }
        };
        const saveAsDraft = () => {
            formDetails.value.status = "draft";
            addToInvoiceList();
            closeForm();
        };

        const closeForm = () => {
            form.value.classList.add('out');
            form.value.parentNode.classList.add('out');
            ctx.emit("closeForm");
        };
        const saveChanges = (event) => {
            resetValidationVariables();
            formValidation(event);
            if(isValid.value){
                formDetails.value.total = invoiceTotal.value;
                store.saveChanges(props.id, formDetails.value, store.getInvoiceById(props.id).docId);
                closeForm()
            }
        };
        
        //FORM VALIDATION

        const invalidEmail = ref(null);
        const noItem = ref(null);
        const emptyField = ref(null);

        const isValid = ref(true);

        const formValidation = (event)=>{
            const inputs = event.target.parentNode.parentNode.querySelectorAll('input');
            inputs.forEach(input=>{
                input.focus();
                input.blur();
                if (input.classList.value.includes('invalid')){
                    isValid.value = false;
                    if(input.value.trim() ==""){
                        emptyField.value.style.display = 'block';
                    }
                    if(input.classList.value.includes('email')){
                        invalidEmail.value.style.display = 'block';
                    } 
                }
            })
            if (formDetails.value.items.length == 0){
                isValid.value = false;
                noItem.value.style.display ='block';
            }
        }

        return {
            todayDate,
            getTotal,
            invoiceItemsNumber,
            addNewItem,
            deleteItem,
            formDetails,
            saveInvoice,
            saveAsDraft,
            saveChanges,
            invalidEmail,
            noItem,
            emptyField,
            closeForm,
            form
        };
    },
    components: { InputField }
}
</script>

<style scoped lang="scss">
$animation-duration: 0.35s;
.container{
    position:absolute;
    top:5rem;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    left:0;
    right:0;
    bottom:0;
}

.form_container{
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    padding:20px;
    background: var(--background);
    animation-name:slidein;
    animation-duration: $animation-duration;
    transition:all var(--transition) ease;
}

@keyframes slidein {
    from {transform: translateX(-100%)}
    to {transform:translateX(0)}
}
@keyframes slideout {
    from {transform: translateX(0)}
    to {transform:translateX(-100%)}
}
/*@keyframes colorFadeIn {
    from {opacity: 0;}
    to {opacity: 1}
}
@keyframes colorFadeOut {
    from {opacity: 1};
    to {opacity:0}
}*/

.form_container.out{
    animation-name:slideout;
    animation-duration: $animation-duration;
}

h2{
    font-weight:500;
    color:var(--text-bold)
}
h2 > span{
    color:#7e88c3;
}

h3{
    font-size: 1rem;
    line-height: 1.125;
    color: var(--purple);
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
        color: var(--form-text);
        margin-bottom: 10px;
    };
    >div{
        width:100%;
    }
    .postcode, .city, .invoice-date, .payment-terms{
        width:calc(50% - 10px);
    }
    .payment-terms .input:hover{
        cursor:pointer;
    }
    .input{
        font-weight:bold;
        font-size:0.85rem;
    }
    input, .input{
        width:100%;
        outline: 0;
        color:var(--text-bold);
        background:var(--form-field);
        border: 1px solid var(--form-field-border);
        border-radius: 4px;
        padding: 1rem 1.25rem;
        &:focus{
            border-color: #7c5dfa;
        }
        &::placeholder{
            color:var(--form-text-bold);
        }
    }
    input.invalid{
        border-color: #ec5757;
    }
    label.invalid{
        color:#ec5757;
    }
    
}

.items-heading{
    margin-bottom: 1.5rem;
    color: var(--form-text-bold);
    font-size: 1.5rem;
}

.add-item{
    width:100%;
    background: var(--add-item-bg);
    color: var(--add-item-color);
    padding: 1rem 1.5rem;
    outline:0;
    border:0;
    border-radius: 10rem;
    margin-bottom:20px;
    &:hover{
        cursor: pointer;
    }
}

.button-group{
    display:flex;
    padding-top:1.5rem ;
    justify-content: space-between;
    align-items: center;
    button{
    padding: 1rem 1.3rem;
    outline:0;
    border:0;
    border-radius: 2rem;
    cursor:pointer;
    }
    .discard-btn{
    background: var(--add-item-bg);
    color: var(--add-item-color); 
    }
    .draft-btn{
        background: var(--header-bg);
        color: var(--draft-color);
    }
    .save-btn{
        background: var(--purple);
        color:#fff;
    }
}

.button-group.edit-mode{
    justify-content:flex-end;
    gap:20px;
    .save-changes{
        background: var(--purple);
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
    svg:hover{
        cursor:pointer;
        >path{
            fill:rgb(236, 87, 87);
        }
    }
}

.invoice-date >p{
    display:flex;
    justify-content:space-between;
    align-items: center;
}
.errors{
    display:block !important;
    color:rgb(236, 87, 87);
    p{
        margin-bottom:6px;
        font-size:small;
        display:none;
        font-weight:500;
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