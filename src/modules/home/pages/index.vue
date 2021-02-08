<template>
  <div class="hello">
    <layout>
      <div slot="center">
        <img src="../../../assets/logo.png">
        <pop v-model="popstate" :cs.sync="texts"/>

        <h2 class="body-title">个人玩具</h2>
        <div class="body">
          <div class="code-out">
            <div class="code-box" v-for="(val) in pages" :key="val.path" >
              <codeTemp :info="val"/>
            </div>
          </div>
          
        </div>
      </div>
    </layout>
  </div>
</template>

<script>
import {Button} from "muse-ui";
import tool from '@/utils/jsCool';
import layout from "@/components/layout";

const codeTemp = ()=>({
        component: import('@/components/codeTemp'),
        //loading: Loading,
        delay: 200,
        timeout: 3000
      });

export default {
  name: 'home',
  components:{
    layout,
    [Button.name]:Button,
    pop:()=>import('@/components/pop'),
    codeTemp
  },
  data () {
    return {
      texts: ["aa","bb"],
      popstate: true,
      pages:[{
        title: "表格生成",
        descript: "根据每列排版，生成布局复杂的表格。",
        path: "/dangeHold"
      },{
        title: "椎体",
        descript: "css3d属性绘制3d图形。",
        path: "/zuiti"
      }],
    }
  },
  methods:{
    skip(){
      console.warn('>>',this.texts)
    },
  },
  created(){

    // this.$rpc.post("/home/pageList",{
    //   text:"cc拨浪鼓。",
    //   sentence: "此为句子1"
    // }).then(res=>{
    //   console.info('>>',res);
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  height:100%;
  .body-title{
    padding: 15px 0 0 15px;
    text-align:left;
  }
  .body{
    padding:20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .code-out{
      margin-bottom:15px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      width:100%;
      .code-box{
        margin-right:35px;
      }
    }
  }
}
</style>
