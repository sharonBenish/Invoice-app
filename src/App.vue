<template>
  <div class="main-page">
    <PageHeader />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue';
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700&display=swap');
$background:#F8F8FB;
$purple: #7c5dfa;
$purple-light:#9277ff;

*{
  padding:0;
  margin:0;
  box-sizing: border-box;
  font-family: 'League Spartan', sans-serif;
}
body{
  font-weight: 100;
}
#app{
  height:100vh;
  background: $background;
}
main{
  >div{
    padding:1rem;
    max-width:850px;
    margin:0 auto;
  }
  
}

@media (min-width:1025px) {
  main{
    width:calc(100% - 6.5rem);
    transform: translateX(6.5rem)
  }
}
</style>
