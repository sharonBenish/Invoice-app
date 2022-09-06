<template>
    <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="checkInput"  @focus="reset">
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:'text',
        },
        modelValue:{
        },
    },
    setup(props){
        const checkInput = (event)=>{
            const value = event.target.value;
            if (value.trim() == ''){
                event.target.classList.add('invalid');
                event.target.previousElementSibling.classList.add('invalid');
                return
            }
            if (props.type == 'email'){
                if (!validEmail(value)){
                    event.target.classList.add('invalid');
                    event.target.previousElementSibling.classList.add('invalid');
                }
            }
        }

        const reset = (event)=>{
            event.target.classList.remove("invalid");
            event.target.previousElementSibling.classList.remove('invalid');
        }

        const validEmail = (email)=>{
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        return{
            reset,
            checkInput,
        }
    }
}
</script>

<style>
</style>