<template>
	<el-row class="leftNav">
      <div class="logo_head" >
        <img :src="userData.user_header" @load="successLoadImg" @error="errorLoadImg"/>
        <span>{{userData.real_name}}</span>
      </div>
      <el-menu :default-active="currentPath" class="el-menu-vertical-demo">
        <el-menu-item index="1" :path='"home"'>
          <router-link to="/teacherList">
            <img src="./img/left_laoshi.png" >
            <i>老师信息</i>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2" :path='"/classMessage"'>
          <router-link to="/classMessage">
            <img src="./img/left_quanban.png"  >
            <i>班级信息</i>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3" :path='"/staff"'>
          <router-link to="/staff">
            <img src="./img/left_xuesheng.png"  >
            <i>学生信息</i>
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
          case 'home':
             tab = '1';
            break;
          case 'teacherInfo':
            tab = "1";
            break;
          case 'homeworkIndfo':
            tab = "1";
            break;
          case 'correctInfo':
            tab = "1";
            break;
          case 'classMessage':
            tab = "2";
            break;
          case 'staff':
            tab = "3";
            break;
          default:
            tab = "1";
            break;
        }
        return tab;
      }
    },
    props:{
        userData: {
        type: Object,
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