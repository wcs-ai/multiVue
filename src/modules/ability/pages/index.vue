<template>
  <div class="hello">
    <h1 id="title">{{ msg }}</h1>
    <h2 class="test">Essential Links</h2>
    
    <pop v-model="popstate" :cs.sync="texts"/>
    <p>v-model：{{ popstate }}</p>
    <mu-button color="info" @click="skip">info</mu-button>
  </div>
</template>

<script>
import {Button} from "muse-ui";
import tool from '@/utils/jsCool';

export default {
  name: 'HelloWorld',
  components:{
    [Button.name]:Button,
    pop:()=>import('@/components/pop')
  },
  data () {
    return {
      texts:['我','是','vvv'],
      popstate:"内容",
      msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted(){
    const _pass = tool.positionPass('helloGoodabcd1234');
    const _pass2 = tool.replacePass('helloGoodabcd1234');

    console.warn(_pass,_pass2);
    $("#title").css({color:"red"});
  },
  methods:{
    skip(){

      console.warn('>>',this.texts)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.test{
  font-size:36px;
}
</style>
