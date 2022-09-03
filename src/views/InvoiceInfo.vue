<template>
    <div class="container">
        <button class="back">
            <img src="../assets/icon-arrow-left.svg" alt="">
            Go back
        </button>
        <div class="info-container">
            <div class="header">
                <div>
                    <span>Status</span>
                    <div class="status-tag">
                        <StatusBadge :status="info.status"/>
                    </div>
                </div>
                <div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="mark" v-if="info.status != 'paid'" @click="markAsPaid">Mark As Paid</button>
                </div>
            </div>

            <div class="main-info">
                <div class="info">
                    <div class="id_description">
                        <div class="id"><span>#</span>{{info.id}}</div>
                        <div class="description">{{info.description}}</div>
                    </div>
                    <div class="sender-address">
                        <p>{{info.senderAddress.street}}</p>
                        <p>{{info.senderAddress.city}}</p>
                        <p>{{info.senderAddress.postCode}}</p>
                        <p>{{info.senderAddress.country}}</p>
                    </div>
                    <div class="invoice-date">
                        <p class="title">Invoice Date</p>
                        <p class="date bold">{{info.createdAt}}</p>
                    </div>
                    <div class="payment-date">
                        <p class="title">Payment Due</p>
                        <p class="date bold">{{info.paymentDue}}</p>
                    </div>
                    <div class="client-info">
                        <p class="title">Bill To</p>
                        <p class="name bold">{{info.clientName}}</p>
                        <div class="address">
                            <p>{{info.clientAddress.street}}</p>
                            <p>{{info.clientAddress.city}}</p>
                            <p>{{info.clientAddress.postCode}}</p>
                            <p>{{info.clientAddress.country}}</p>
                        </div>
                    </div>
                    <div class="client-mail">
                        <p class="title">Sent To</p>
                        <div class="mail bold">{{info.clientEmail}}</div>
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
                        <tr v-for="(item, index) in info.items" :key="index">
                            <td class="bold">{{item.name }}</td>
                            <td class="qty">{{ item.quantity }}</td>
                            <td class="price">{{ item.price }}</td>
                            <td class="bold">${{ item.total }}</td>
                        </tr>
                    </table>
                </div>
                <div class="total">
                    <p>Amount Due</p>
                    <div>${{info.total}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { InvoiceStore } from '@/store/store';
import { ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import StatusBadge from '@/components/StatusBadge.vue';
export default {
    setup() {
        const route = useRoute();
        const id = ref();
        id.value = route.params.id;
        
        const store = InvoiceStore();
        const info = store.getInvoiceById(id.value);
        const markAsPaid = ()=>{
            console.log("marked")
            store.markAsPaid(id.value)
        }
        return {
            info,
            markAsPaid
        };
    },
    components: { StatusBadge }
}
</script>

<style scoped lang="scss">
.container{
    max-width:700px;
    .info-container{
        .header{
            margin-top:2rem;
            background: #fff;
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

button{
    border:none;
    background: transparent;
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
    background: rgb(249, 250, 254);
    color: #7e88c3;
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
    background:#fff;
    padding:1.5rem;
}

.bold{
    color:rgb(12, 14, 22);
    font-weight:bold;
    font-size:1.2rem;
}

.title{
    margin-bottom:10px;
}

.id{
    font-weight:bold;
    font-size:0.9rem;
    color:rgb(12, 14, 22);
    margin-bottom:5px;
    >span{
        color: rgb(126, 136, 195)
    }
}

.name{
    margin-bottom: 10px;
}

.info{
    color:rgb(136, 142, 176);
    font-size:1rem;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    gap:1.5rem;
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
    background:#F9FAFE;
    border-radius: 10px 10px 0 0;
    padding:0.8rem 0.5rem;
}

table{
        width:100%;
        border-spacing: 1rem;
        color:rgb(136, 142, 176);
        th{
            color:rgb(136, 142, 176);
            font-weight: 200;
            font-size: 0.85rem;
        }
        td{
            font-weight: 1rem;
            font-weight: bold;
            font-size: 1rem;
        }
        td.bold{
            color:rgb(12, 14, 22);
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
    background: #373B53;
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

@media (min-width:1025px) {
    .container{
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
}
</style>