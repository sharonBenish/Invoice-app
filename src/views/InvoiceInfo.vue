<template>
    <div class="invoice-container" :class="isInvoiceFormOpen && 'formOpen'">
        <transition name="fade">
            <NewInvoiceForm :id="id" @closeForm="closeForm" v-if="isInvoiceFormOpen" />
        </transition>
        <button class="back" @click="goBack">
            <img src="../assets/icon-arrow-left.svg" alt="">
            Go back
        </button>
        <div class="info-container">
            <div class="header">
                <div>
                    <span class="status-text">Status</span>
                    <div class="status-tag">
                        <StatusBadge :status="status"/>
                    </div>
                </div>
                <div>
                    <button class="edit" @click="isInvoiceFormOpen = true">Edit</button>
                    <button class="delete" @click="deleteClicked">Delete</button>
                    <button class="mark" v-if="invoice.status != 'paid'" @click="markAsPaid">Mark As Paid</button>
                </div>
            </div>

            <div class="main-info">
                <div class="info">
                    <div class="id_description">
                        <div class="id"><span>#</span>{{invoice.id}}</div>
                        <div class="description">{{invoice.description}}</div>
                    </div>
                    <div class="sender-address">
                        <p>{{invoice.senderAddress.street}}</p>
                        <p>{{invoice.senderAddress.city}}</p>
                        <p>{{invoice.senderAddress.postCode}}</p>
                        <p>{{invoice.senderAddress.country}}</p>
                    </div>
                    <div class="invoice-date">
                        <p class="title">Invoice Date</p>
                        <p class="date bold">{{invoice.createdAt}}</p>
                    </div>
                    <div class="payment-date">
                        <p class="title">Payment Due</p>
                        <p class="date bold">{{invoice.paymentDue}}</p>
                    </div>
                    <div class="client-info">
                        <p class="title">Bill To</p>
                        <p class="name bold">{{invoice.clientName}}</p>
                        <div class="address">
                            <p>{{invoice.clientAddress.street}}</p>
                            <p>{{invoice.clientAddress.city}}</p>
                            <p>{{invoice.clientAddress.postCode}}</p>
                            <p>{{invoice.clientAddress.country}}</p>
                        </div>
                    </div>
                    <div class="client-mail">
                        <p class="title">Sent To</p>
                        <div class="mail bold">{{invoice.clientEmail}}</div>
                    </div>
                </div>
                <div class="order-table">
                    <table>
                        <tr class="heading">
                            <th>Item Name</th>
                            <th>QTY.</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        <tr v-for="(item, index) in invoice.items" :key="index">
                            <td class="bold">{{item.name }}</td>
                            <td class="qty">{{ item.quantity }}</td>
                            <td class="price">{{ item.price }}</td>
                            <td class="bold">${{ item.total }}</td>
                        </tr>
                    </table>
                </div>
                <div class="total">
                    <p>Amount Due</p>
                    <div>${{invoice.total}}</div>
                </div>
            </div>
        </div>
        <div class="footer">
            <button class="edit" @click="isInvoiceFormOpen = true">Edit</button>
            <button class="delete" @click="deleteClicked">Delete</button>
            <button class="mark" v-if="invoice.status != 'paid'" @click="markAsPaid">Mark As Paid</button>
        </div>
    </div>
</template>

<script setup>
import { InvoiceStore } from '@/store';
import { computed, ref } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router'
import StatusBadge from '@/components/StatusBadge.vue';
import NewInvoiceForm from '@/components/NewInvoiceForm.vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['deleteClicked'])

const route = useRoute();
const router = useRouter();
const store = InvoiceStore();

const id = ref();
id.value = route.params.id;

const status = computed(()=>{
    return store.getInvoiceById(id.value).status
})

const invoice = computed(()=>{
    return store.getInvoiceById(id.value)
})

const deleteClicked = ()=>{
    emit('deleteClicked', id.value)
}

const goBack = ()=>{
    router.go(-1);
}

const {getInvoiceById} = store;
const markAsPaid = ()=>{
    store.markAsPaid(id.value, getInvoiceById(id.value).docId)
}
const isInvoiceFormOpen = ref(false);
const closeForm = ()=>{
    isInvoiceFormOpen.value = false
}
</script>

<style scoped>
.header{
    background:var(--invoice-bg)
}
.info-container  * {
    transition:all var(--transition) ease;
}
</style>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.invoice-container.formOpen{
  max-height: 100vh;
  overflow: hidden;
}
.test{
    position:fixed;
    top:0;
    left:0;
}
.invoice-container{
    max-width:700px;
    .info-container{
        .header{
            margin-top:2rem;
            border-radius:10px;
            padding:1rem 1.5rem;
            display:flex;
            justify-content: space-between;
            >div{
                width:100%;
                display:flex;
                gap: 20px;
                justify-content: space-between;
                align-items: center;
                .status-tag{
                    height:40px;
                }
            }
            >div:last-of-type{
                display:none;
            }
        }
    }
}

.status-text{
    color:var(--add-item-color)
}

button{
    border:none;
    background: transparent;
    color:var(--text-bold);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.back{
    img{
        margin-right: 10px;
    }
    &:hover{
        color:rgb(126, 136, 195)
    }
}

.edit, .delete, .mark{
    border-radius: 10rem;
    padding: 1rem 1.5rem;
    font-weight: 500;
}

.edit{
    background: var(--add-item-bg);
    color: var(--add-item-color);
    &:hover{
        background:rgb(223, 227, 250)
    }
}

.delete{
    background: rgb(236, 87, 87);
    color:#fff;
    &:hover{
        background: #FF9797;
    }
}

.mark{
    background: rgb(124, 93, 250);
    color:#fff;
    &:hover{
        background: #9278FF;
    }
}

.main-info{
    margin-top:1.5rem;
    border-radius:10px;
    background:var(--invoice-bg);
    padding:1.5rem;
}

.bold{
    color:var(--text-bold);
    font-weight:bold;
    font-size:1.2rem;
}

.title{
    margin-bottom:10px;
}

.id{
    font-weight:bold;
    font-size:0.9rem;
    color:var(--text-bold);
    margin-bottom:5px;
    >span{
        color: rgb(126, 136, 195)
    }
}

.name{
    margin-bottom: 10px;
}

.info{
    color:var(--text);
    font-size:1rem;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    row-gap:1.5rem;
    line-height:1rem;
    margin-bottom:3rem;
}

.id_description{
    grid-column: 1;
    grid-row: 1;
}

.sender-address{
    grid-column: 1;
    grid-row: 2;
}

.invoice-date{
    grid-column: 1;
    grid-row:3
}
.payment-date{
    grid-column: 1;
    grid-row:4
}
.client-info{
    grid-column: 2;
    grid-row:3/5;
}
.client-mail{
    grid-column: 1/2;
    grid-row:5;
}

.order-table{
    background:var(--order-bg);
    border-radius: 10px 10px 0 0;
    padding:0.8rem 0.5rem;
}

table{
        width:100%;
        border-spacing: 1rem;
        color:var(--text);
        th{
            color:var(--text);
            font-weight: 200;
            font-size: 0.85rem;
        }
        td{
            font-weight: 1rem;
            font-weight: bold;
            font-size: 1rem;
        }
        td.bold{
            color:var(--text-bold);
            font-size: 1rem;
        }
        td,th{
            text-align: left;
            padding:10px; 
        }
        tr > td:last-of-type, tr >th:last-of-type{
            text-align: right;
        }
    }
.heading{
    display:none;
}
.qty, .price{
    display:none;
}

.total{
    background: var(--total-bg);
    color:#fff;
    display:flex;
    justify-content: space-between;
    border-radius:0 0 10px 10px; 
    font-weight: 500;
    p{
        font-size:1rem;
        padding:1.3rem;
        padding-left:2.5rem;
    }
    div{
        font-size:1.5rem;
        padding:1.3rem;
        padding-right:2.5rem;
        border-left: 0.5px solid #F9FAFE;
    }
}

.footer{
    margin: 0 -1.5rem;
    margin-top:2.5rem;
    padding: 1rem;
    background:var(--invoice-bg);
    display:flex;
    justify-content: flex-end;
    gap:20px;
}

@media (min-width:1025px) {
    .invoice-container{
        .info-container{
            .header{
                padding:1rem 1.5rem;
                >div{
                    width:fit-content;
                }
                >div:last-of-type{
                    display:flex;
                }
            }
        }
    }

    .info{
        grid-template-columns: repeat(4,1fr);
        gap:3rem;
    }

    .id_description{
        grid-column: 1;
        grid-row: 1;
    }

    .sender-address{
        grid-column: 4;
        text-align: right;
        grid-row: 1;
    }

    .invoice-date{
        grid-column: 1;
        grid-row:2
    }
    .payment-date{
        grid-column: 1;
        grid-row:3
    }
    .client-info{
        grid-column: 2;
        grid-row:2/4;
    }
    .client-mail{
        grid-column: 3/5;
        grid-row:2;
    }
    .heading{
        display:table-row;
    }
    .qty, .price{
        display:table-cell;
    }

    .total{
        div{
            border:none
        }
    }

    .footer{
        display:none
    }
}
</style>