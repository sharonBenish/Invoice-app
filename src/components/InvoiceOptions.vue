<template>
  <div class="container">
    <div class="intro-text">
        <h1>Invoices</h1>
        <p>There are {{store.invoiceCount}} total invoices</p>
    </div>
    <div class="actions">
        <button class="filter-btn">
            <p @click="openDropDown">Filter <span class="extra-btn-text">by status</span></p>
            <span><img src="../assets/icon-arrow-down.svg" alt="" @click="openDropDown" :class="showDropDown && 'open'" /></span>
            <div class="drop-down" v-show="showDropDown" @change="check">
                <div class="option"><CustomCheckbox :type="'all'" /> All</div>
                <div class="option"><CustomCheckbox :type="'paid'" /> Paid</div>
                <div class="option"><CustomCheckbox :type="'pending'" /> Pending</div>
                <div class="option"><CustomCheckbox :type="'draft'" /> Draft</div>
            </div>
        </button>
        <button class="new-invoice-btn" @click="newInvoiceClicked">
            <span><img src="../assets/icon-plus.svg" alt=""></span>
            <p>New <span class="extra-btn-text">Invoice</span></p>
        </button>
    </div>
  </div>
</template>

<script>
import { InvoiceStore } from '@/store/store';
import { ref } from '@vue/reactivity';
import CustomCheckbox from './CustomCheckbox.vue';
export default {
    components: {CustomCheckbox },
    setup(props, ctx){
        const store = InvoiceStore();

        const newInvoiceClicked = ()=>{
            ctx.emit('newInvoiceClicked')
        }
        const showDropDown = ref(false);
        const openDropDown = ()=>{
            showDropDown.value = !showDropDown.value;
        }
        const check = (event)=>{
            ctx.emit('checked', event.target.id)
        }

        return{
            store,
            showDropDown,
            newInvoiceClicked,
            openDropDown,
            check
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    display:flex;
    justify-content: space-between;
    .intro-text{
        h1{
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        p{
            color: rgb(136, 142, 176);
            line-height: 1.125;
            font-size: 0.7rem;
        }
    }
    .actions{
        display:flex;
        align-items: center;
        gap:1rem;
        button{
            display:flex;
            align-items: center;
            border:none;
            gap:0.5rem;
            font-weight: 600;
        }
    }
}
.filter-btn{
    background: transparent;
    position: relative;
    span{
        display:none
    }
    .drop-down{
        text-align: left;
        position:absolute;
        width:200px;
        top:100%;
        left:0;
        transform: translateX(-50%);
        margin-top:30px;
        box-shadow: rgb(72 84 159 / 25%) 0px 10px 20px;
        border-radius: 10px;
        display:flex;
        flex-direction: column;
        gap:1rem;
        padding:1.5rem 1.2rem;
        .option{
            display:flex;
            align-items: flex-end;
            gap:1rem;
        }
    }
}
.new-invoice-btn{
    height: 50px;
    padding:0 0.8rem;
    color:#fff;
    border-radius: 50px;
    >span{
        width:30px;
        height:30px;
        background: #fff;
        display:flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
}
.extra-btn-text{
    display:none
}

.filter-btn img{
    transition: all 0.35s ease;
}

.filter-btn img.open{
    transform: rotate(-180deg);

}

@media (min-width:1025px) {
    .container{
        .intro-text{
            h1{
                font-size: 1.8rem;
            }
            p{  
                font-size: 0.9rem;
            }
        }
        .actions{
            gap:2.5rem;
            button{
                font-size:0.8rem;
            }
        }
    }
    .extra-btn-text{
        display:inline;
    }
    .filter-btn{
        span{
            display:inline
        }
        .drop-down{
            left:-50px;
            transform: translateX(0);
        }
    }
    
}
</style>

<style scoped>
    .container{
        color:var(--text-bold);
    }
    .filter-btn{
        color:var(--text-bold)
    }
    .filter-btn .drop-down{
        background: var(--invoice-bg);
    }
    .new-invoice-btn{
        background:var(--purple);
    }
    .new-invoice-btn:hover{
        background: var(--purple-light);
    }
</style>