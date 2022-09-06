<template>
    <!-- <input type="text" @input="$emit('update:modelValue', $event.target.value)"> -->
    <input type="text" @input="$emit('update:modelValue', $event.target.value)" @blur="checkInput"  @focus="reset">
</template>

<script>
//import { ref } from '@vue/reactivity';
export default {
    props:{
        type:{
            type:String,
        }
    },
    setup(props){
        //const isInvalid = ref(false);
        //:class="isInvalid && 'invalid'"
        const checkInput = (event)=>{
            const value = event.target.value;
            if (value.trim() == ''){
                //isInvalid.value = true;
                event.target.classList.add('invalid')
                return
            }
            if (props.type == 'email'){
                if (!validEmail(value)){
                    //isInvalid.value = true;
                    event.target.classList.add('invalid')
                }
                /*else if (validEmail(value)){
                    isInvalid.value =false
                }*/
            }
        }

        const reset = (event)=>{
            //isInvalid.value = false;
            event.target.classList.remove("invalid");
        }

        const validEmail = (email)=>{
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        return{
            reset,
            //isInvalid,
            checkInput
        }
    }
}
</script>

<style>
input.invalid{
    border-color:red;
}
</style>