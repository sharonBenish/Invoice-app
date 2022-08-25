<template>
  <div class="header">
    <div class="logo">
        <img src="../assets/logo.svg" alt="">
    </div>
    <div>
        <div class="theme-toggle">
            <img src="../assets/icon-moon.svg" alt="">
            <!--<img src="../assets/icon-sun.svg" alt="">-->
        </div>
        <div class="profile">
            <img class="img-fluid" src="../assets/image-avatar.jpeg" alt="avatar">
        </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped >
.header{
    display: flex;
    height:80px;
    background: #373B53;
    justify-content: space-between;
}
.logo{
    position: relative;
    width:5rem;
    height: 5rem;
    display:flex;
    justify-content: center;
    align-items: center;
    background:rgb(124, 93, 250);
    border-radius: 0px 20px 20px 0px;
}

.logo >img{
    position: relative;
    z-index:100
}

.logo::after{
    content:"";
    position:absolute;
    background: rgb(146, 119, 255);
    border-radius:20px 0px;
    width:100%;
    height:50%;
    bottom:0;
}

.header > div:last-of-type{
    display:flex;
}

.img-fluid{
    width:100%;
    height: auto;
    object-fit: cover;
}

.theme-toggle{
    padding:1rem;
    margin:auto;
}

.profile{
    width:5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #4A4E6E;
    img{
        width:30px;
        height: 30px;
        border-radius:50%;
    }
}
</style>