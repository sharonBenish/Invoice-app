<template>
  <div class="status" :style="badgeStyle">
    <p>{{status}}</p>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
    props:{
        status:{
            type:String
        }
    },
    setup(props){
        const badgeStyle = computed(()=>{
            if (props.status == 'paid'){
                const style =  {'--badgeBackground': '#F4FDF9' ,'--badgeText': '#32D69F'}
                return style
            } else if (props.status == 'pending'){
                const style =  {'--badgeBackground': '#FFF8F1' ,'--badgeText': '#FF8F00'}
                return style
            } else if (props.status == 'draft'){
                const style =  {'--badgeBackground': '#F3F4F5' ,'--badgeText': '#373B53'}
                return style
            }
        })

        return{
            badgeStyle
        }
    }
}
</script>

<style scoped>
    .status{
        border-radius: 5px;
        background: var(--badgeBackground);
        color:var(--badgeText);
        display:flex;
        justify-content: center;
        align-items: center;
        height:100%;
        width:100px;
    }
    p::before{
            content:"";
            width:10px;
            display: inline-block;
            height:10px;
            border-radius: 50%;
            margin-right: 10px;
            background: var(--badgeText);
        }
</style>