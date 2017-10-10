<template>
	<el-row class="leftNav">
      <div class="logo_head" >
        <img :src="userData.user_header" @load="successLoadImg" @error="errorLoadImg"/>
        <span>{{userData.real_name}}</span>
      </div>
      <el-menu :default-active="currentPath" class="el-menu-vertical-demo">
        <el-menu-item index="4" :path='"/assignment"'>
         <router-link to="/assignment">
           <img src="./img/left_buzhi.png"  >
           <i>布置作业</i>
         </router-link>
        </el-menu-item>
        <el-menu-item index="5" :path='"/allClass"'>
         <router-link to="/allClass">
           <img src="./img/left_quanban.png"  >
           <i>全班作业情况</i>
         </router-link>
         </el-menu-item>
        <el-menu-item index="6" :path='"/studentMessage"'>
         <router-link to="/studentMessage">
           <img src="./img/left_xuesheng.png"  >
           <i>学生情况</i>
         </router-link>
         </el-menu-item>
        <el-menu-item index="7" :path='"/classManagement"'>
         <router-link to="/classManagement">
           <img src="./img/left_banji.png"  >
           <i>班级管理</i>
         </router-link>
        </el-menu-item>
    </el-menu>
	</el-row>
</template>
<script type="text/javascript">
	export default {
		name:'leftNav',
		data(){
			return{
        user_header:'',
        real_name:''
			}
		},
    computed:{
      currentPath(){
        let path = this.$store.state.curPath;
        let tab ;
        switch(path) {
          case 'assignment':
             tab = '4';
             break;
          case 'improveAssignment':
             tab = '4';
             break;
          case 'correctAssignment':
             tab = '4';
             break;
          case 'allClass':
             tab = '5';
             break;
          case 'allClassInfo':
              tab = '5';
              break;
          case 'taskDetails':
              tab = '5';
              break;
          case 'submitRatio':
              tab = '5';
              break;
          case 'evaluateRatio':
              tab = '5';
              break;
          case 'argueCorrect':
              tab = '5';
              break;
          case 'groupDetails':
              tab = '5';
              break;
          case 'personHomework':
              tab = '5';
              break;
          case 'studentMessage':
              tab ='6';
              break;
          case 'classManagement':
              tab = '7';
              break;
          default:
            tab = "4";
            break;
        }
        return tab;
      }
    },
    props:{
        userData: {
        type: Object,
        default(){
          return{
            name: ''
          }
        }
      },
   },
		methods:{
		},
		mounted(){
			this.$nextTick(()=>{
        let routePath = this.$route.path;
        routePath = routePath.substring(1);
        this.$store.state.curPath = routePath;
      })
		}
	}
</script>
<style lang='scss' scoped>
.leftNav{
	float: left;
  width: 180px;
  padding-top: 100px;
  ul.el-menu,.el-menu-vertical-demo{
    background-color: #2bbe65;

  }
  .el-menu-item{
      height: 40px;
      line-height: 40px;
      padding: 0px 0px 0px 30px!important;
      img{
        vertical-align: sub;
        margin-right: 10px;
      }
      i{
        color: #fff;
      }
      a{
        display: inline-block;
        width: 100%;
      }
  }
  .el-menu-item.is-active{
    background-color: #1fa654;
  }
  .el-menu-item:hover{
    background-color: #1fa654;
  }
  .logo_head{
    padding:20px;
     overflow:hidden;
     height:170px;
     text-align:center;
     img{
      border-radius: 40px;
        width:80px;
        height:80px;
     }
     span{
      display:block;
      overflow:hidden;
      line-height:30px;
      font-size:14px;
      color:#ffffff;
    }
  }
}
</style>