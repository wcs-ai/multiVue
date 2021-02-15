<template>
  <div id="home">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style>
div,h1,h2,h3,h4,h5,h6,p,ul,ol,li,span,b,i,em{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position:absolute;
  width:100%;
  height:100%;
}
.center{
  text-align: center;
}
</style>
