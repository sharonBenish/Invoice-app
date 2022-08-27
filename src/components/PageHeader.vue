<template>
  <header>
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
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped >
$purple: #7c5dfa;
$purple-light:#9277ff;
header{
    display: flex;
    height:5rem;
    background: #373B53;
    justify-content: space-between;
    position: fixed;
    left:0;
    right:0;
    z-index:1000;
}
.logo{
    position: relative;
    width:5rem;
    height: 5rem;
    display:flex;
    justify-content: center;
    align-items: center;
    background:$purple;
    border-radius: 0px 20px 20px 0px;
}

.logo >img{
    position: relative;
    z-index:100
}

.logo::after{
    content:"";
    position:absolute;
    background: $purple-light;
    border-radius:20px 0px;
    width:100%;
    height:50%;
    bottom:0;
}

header > div:last-of-type{
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

@media (min-width:1025px) {
    header{
        position: fixed;
        left:0;
        height:100vh;
        width:6.5rem;
        flex-direction: column;
        border-radius: 0px 20px 20px 0px;
        .logo{
            width:6.5rem;
            height: 6.5rem;
        }

    }
    header > div:last-of-type{
        flex-direction: column;
    }

    .profile{
        height: 5rem;
        width:6.5rem;
        border-top: 1px solid #4A4E6E;
        border-left: 0;
        flex-direction: column;
    }
}
</style>