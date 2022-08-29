<template>
  <div class="container">
    <div class="form_container">
        <h2>Create Invoice</h2>
        <div class="form">
            <h3>Bill From</h3>
            <div>
                <div class="address">
                    <label for="from-address">Street Address</label>
                    <input type="text" id="from-address">
                </div>
                <div class="city">
                    <label for="from-city">City</label>
                    <input type="text" id="from-city">
                </div>
                <div class="postcode">
                    <label for="from-postcode">Post Code</label>
                    <input type="text" id="from-postcode">
                </div>
                <div class="country">
                    <label for="from-country">Country</label>
                    <input type="text" id="from-country">
                </div>
            </div>
            <h3>Bill To</h3>
            <div>
                <div class="name">
                    <label for="client-name">Client's Name</label>
                    <input type="text" id="client-name">
                </div>
                <div class="email">
                    <label for="">Client's Email</label>
                    <input type="text" id="client-email" placeholder="e.g. email@example.com">
                </div>
                <div class="address">
                    <label for="to-address">Street Address</label>
                    <input type="text" id="to-address">
                </div>
                <div class="city">
                    <label for="to-city">City</label>
                    <input type="text" id="to-city">
                </div>
                <div class="postcode">
                    <label for="to-postcode">Post Code</label>
                    <input type="text" id="to-postcode">
                </div>
                <div class="country">
                    <label for="to-country">Country</label>
                    <input type="text" id="to-country">
                </div>
                <div class="invoice-date">
                    <p class="label">Invoice Date</p>
                    <p class="input">Aug 28, 2022</p>
                </div>
                <div class="payment-terms">
                    <p class="label">Payment Terms</p>
                    <select name="devices" class="input">
                        <option value="1-day">Next 1 day</option>
                        <option value="7-days">Next 7 days</option>
                        <option value="14-days">Next 14 days</option>
                        <option value="30-days">Next 30 days</option>
                    </select>
                </div>
                <div>
                    <label for="description">Description</label>
                    <input type="text" id="description" placeholder="e.g. Graphic Design Service">
                </div>
            </div>
            <h3 class="items-heading">Item List</h3>
            <div class="invoice-items">
                <button class="add-item">+ Add New Item</button>
            </div>
        </div>
        <div class="button-group">
            <button class="discard-btn" @click="discardClicked">Discard</button>
            <button class="draft-btn">Save as Draft</button>
            <button class="save-btn">Save & Send</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    setup(props,ctx){
        const discardClicked = ()=>{
            ctx.emit('discardClicked')
        }
        return{
            discardClicked
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
}

.button-group{
    display:flex;
    justify-content: space-between;
    button{
    padding: 1rem 1.3rem;
    outline:0;
    border:0;
    border-radius: 2rem;
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

@media (min-width:1025px) {
    .container{
        top:0;
        
    }
    .form_container{
        width:60%;
        max-width:700px;
        border-radius:0 2rem 2rem 0;
        padding:1.5rem 3rem;
    }
    h2{
        margin:3rem 0;
        font-size:2rem;
    }
    .form >div{
        .city, .postcode, .country{
            width:calc(33.333% - 13.5px)
        }
    }
    
}
</style>