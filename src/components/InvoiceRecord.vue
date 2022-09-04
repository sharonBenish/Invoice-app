<template>
  <div class="record" @click="goToRecordInfo()">
    <div class="invoice_id">#<span>{{invoice.id}}</span></div>
    <div class="due_date">Due {{formatDate}}</div>
    <div class="client_name">{{invoice.clientName}}</div>
    <div class="due_total">${{invoice.total}}</div>
    <div class="status">
        <StatusBadge :status = "invoice.status" />
    </div>
    <div class="arrow"><img src="../assets/icon-arrow-right.svg" alt=""></div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import StatusBadge from './StatusBadge.vue';

export default {
    props: {
        invoice: {
            type: Object
        }
    },
    setup(props) {
        const formatDate = computed(() => {
            const dateString = new Date(props.invoice.paymentDue).toDateString();
            return `${dateString.substring(8, 10)} ${dateString.substring(4, 7)} ${dateString.substring(11, 15)}`;
        });

        const router = useRouter();
        const goToRecordInfo = ()=>{
            router.push({
                name:'InvoiceInfo',
                params:{
                    id:props.invoice.id,
                }
            })
        }
        return {
            formatDate,
            goToRecordInfo
        };
    },
    components: { StatusBadge }
}
</script>

<style scoped lang="scss">
.record{
    background: #fff;
    padding:1rem 1.5rem;
    border-radius: 10px;
    color:rgb(136, 142, 176);
    &:hover{
        outline:1px solid #7c5dfa;
    }
} 
.arrow{
    display:none
}
.record{
    display:grid;
    column-gap: 30px;
    grid-template-columns: 1fr 1fr;
    row-gap:10px;
}
.invoice_id{
    grid-column: 1;
    grid-row:1;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 0.9rem;
    >span{
        color:rgb(12, 14, 22);
    }
}
.due_date{
    grid-column: 1;
    grid-row:2 ;
}
.client_name{
    grid-column: 2;
    grid-row:1;
    justify-self: right;
}
.due_total{
    grid-column: 1;
    grid-row:3;
    color:rgb(12, 14, 22);
    font-size:1.3rem;
    font-weight:bold;
}
.status{
    grid-column: 2;
    grid-row:2/4;
    justify-self: right;
}

@media (min-width:1025px) {
    .arrow{
        display:block
    }
    .record{
        grid-template-columns:80px 120px 150px 1fr 75px auto 10px;
        row-gap: 0;
        align-items: center;
        >div{
            grid-row: 1;
        }
    }
    .invoice_id{
        grid-column: 1;
       margin-bottom: 0;
    }
    .due_date{
        grid-column: 2;
    }
    .client_name{
        grid-column: 3;
        justify-self:left;
    }
    .due_total{
        grid-column: 5;
        justify-self: right;
    }
    .status{
        grid-column: 6;
        height:40px;
        align-self: stretch;
    }
    .arrow{
        grid-column: 7;
    }

}
</style>