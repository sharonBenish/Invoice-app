<template>
  <div class="modal-container">
    <div class="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete invoice {{id}}</p>
        <div class="button-group">
            <button class="cancel" @click="cancelClicked">Cancel</button>
            <button class="delete" @click="deleteClicked">Delete</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        id:{
            type:String
        }
    },
    setup(props,ctx){
        const cancelClicked = ()=>{
            ctx.emit('cancelClicked')
        }

        const deleteClicked = ()=>{
            ctx.emit('deleteClicked');
        }
        
        return{
            cancelClicked,
            deleteClicked
        }
    }

}
</script>

<style scoped lang="scss">
.modal-container{
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000000;
    max-width:100vw;
}

.modal-content{
    background: #fff;
    border-radius: 10px;
    padding:2rem 1.5rem;
}

.button-group{
    display:flex;
    justify-content: flex-end;
    gap:20px;
    margin-top:1rem;
}

p{
    margin:1rem 0;
    color:rgb(136, 142, 176);
}

button{
    border:none;
    border-radius: 10rem;
    padding: 1rem 1.5rem;
    font-weight: 500;
}

.cancel{
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

@media (min-width:1025px) {
  
}
</style>