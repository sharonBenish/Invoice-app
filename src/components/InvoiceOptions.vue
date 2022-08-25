<template>
  <div class="container">
    <div class="intro-text">
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
    </div>
    <div class="actions">
        <button class="filter-btn">
            <p>Filter <span class="extra-btn-text">by status</span></p>
            <span><img src="../assets/icon-arrow-down.svg" alt=""/></span>
        </button>
        <button class="new-invoice-btn">
            <span><img src="../assets/icon-plus.svg" alt=""></span>
            <p>New <span class="extra-btn-text">Invoice</span></p>
        </button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$purple: #7c5dfa;
$purple-light:#9277ff;
.container{
    display:flex;
    justify-content: space-between;
    color:rgb(12, 14, 22);
    .intro-text{
        h1{
            font-size: 1.6rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        p{
            color: rgb(136, 142, 176);
            line-height: 1.125;
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
    background: none;
    span{
        display:none
    }
}
.new-invoice-btn{
    height: 50px;
    padding:0 0.8rem;
    color:#fff;
    background:$purple;
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
    &:hover{
        background: $purple-light;
    }
}
.extra-btn-text{
    display:none
}

@media (min-width:1025px) {
    .container{
        .intro-text{
            h1{
                font-size: 2.5rem;
            }
            p{  
                font-size: 1.3rem;
            }
        }
        .actions{
            button{
                font-size:1rem;
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
    }
}
</style>