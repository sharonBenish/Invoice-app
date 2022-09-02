<template>
    <div>
        <div>{{id}}</div>
        <div>{{info}}</div>
    </div>
</template>

<script>
import { ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
export default {
    setup(){
        const route= useRoute()
        const id = ref();
        id.value = route.params.id;
        const info = ref({});
        info.value =JSON.parse(route.params.info);
        return{
            id,
            info
        }
        

    }
}
</script>

<style>

</style>