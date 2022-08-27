<template>
  <div class="radio">
    <input type="radio" name="filter">
    <span class="custom-radio"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.radio{
  position:relative;
  width:20px;
  height: 20px;
  input{
    position:absolute;
    cursor:pointer;
    opacity:0;
  }
  .custom-radio{
    border-radius: 3px;
    width:15px;
    height:15px;
    background:#DFE3FA;
    display: block;
    position:absolute;
    bottom:0;
    left:0;
    pointer-events: none;
  } 
}

input:hover + .custom-radio {
  outline: 1px solid #7c5dfa;
}

input:checked + .custom-radio{
  background-color:#7c5dfa
}
input:checked + .custom-radio::after{
  content:"";
  display:block;
  width:15px;
  height:15px;
  background-image: url("../assets/icon-check.svg");
  background-size: cover;
  background-position: center;
  background-size: 10px;
  background-repeat: no-repeat;
}
</style>