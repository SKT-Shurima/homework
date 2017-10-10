<template>
  <div class="bigWrap">
     <data-head @come-info='comeInfoStatus'></data-head>
     <div class="contents">

        <left-nav v-if="roleIndex==2" :status='status' :userData="userData"></left-nav>
        <teacherLeftNav v-if="roleIndex==3" :status='status' :userData="userData"></teacherLeftNav>
        <transition name='fade'>
          <div class="centerContent" @check-control='getId'>
            <div class="centerBackground">
              <router-view ></router-view>
            </div>
          </div>
        </transition>
     </div>
  </div>
</template>

<script>
import dataHead from "./head.vue"
import leftNav from "./leftNav.vue"
import teacherLeftNav from "./teacherLeftNav.vue"
export default {
  data(){
    return{
      status: null,
      userData:{
         user_header:"",
         real_name:"",
      },
      roleIndex:''
     
    }
  },
  components: {
    dataHead,
    leftNav,
    teacherLeftNav
  },
  mounted(){
      this.$nextTick(()=>{
        this.userData.user_header = this.$route.query.user_header;
        this.userData.real_name = this.$route.query.real_name;
        this.roleIndex = this.getCookie("managerRemeber");
        let routePath = this.$route.path;
        if (this.roleIndex==='2') {
          if(this.$route.path=='/home'){
            this.$router.push('./school');
          }else{
            this.$router.push('.'+this.$route.path);
          }
        } else {
          if(this.$route.path=='/home'){
            this.$router.push('./assignment');
          }else{
            this.$router.push('.'+this.$route.path);
          }
        }
      })
  },
  methods:{
    comeInfoStatus(){
      this.status = true;
    },
    getId(data){
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.bigWrap{
  height: 100%;
  background:#f5f5f5;
  .contents{
  width: 1400px;
  height: 100%;
  background:#2bbe65;
  margin: 0px auto;
  overflow: hidden;
 /*  box-shadow: 2px 0px 4px 4px rgba(0,0,0,0.12); */
   
  .centerContent{
    width: 1220px;
    height: 100%;
    float: left;
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 100px;
    padding-left: 30px;
    padding-right: 40px;
    padding-bottom: 100px;
    overflow-x: hidden;
    overflow-y: scroll;
    .centerBackground{

    }

  }
}
}
.fade-enter-active, .fade-leave-active{
      transition: all 0.5s ease     
      }
    .fade-enter, .fade-leave-active{
      opacity: 0
    }
</style>
