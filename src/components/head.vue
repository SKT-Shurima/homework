<template>
	<div class="container">
	<el-row class='wrap'>
      <el-col :span="24" class="header" style='height:50px;'>
       <div class="home-logo">
         <img src="./img/logo_top_wg.png"  style="float:left;padding-top:10px;"/>
         <div class="home-ctrl">
            <img src="./img/top_guanli.png" style="margin-left:60px;"/>
            <span style="font-size:14px;">管理中心</span>
         </div>
         <router-link to="/entry">
             <div class="login_out">
                <span style="font-size:14px;">退出登录</span>
                <img src="./img/signout.png" style="margin-right:60px;"/>
             </div>
          </router-link>
      </div>
      <el-col :span="3" class="userinfo" v-if='userinfo.id'>
        <el-dropdown>
            <span class="el-dropdown-link userinfo-inner"><i>{{userinfo.name}}<i class="el-icon-caret-bottom" style="vertical-align:middle;margin-left: 10px;"></i></i>
            <img :src='userinfo.avatar'/>
            </span>
          <el-dropdown-menu slot="dropdown">
           <router-link to="/personInfo">
            <el-dropdown-item ><div @click="select"><img src="./img/info@2x.png">个人资料</div></el-dropdown-item>
            </router-link>
            <router-link to="/techSuport">
            <el-dropdown-item @click="select"><img src="./img/support@2x.png"  >技术支持</el-dropdown-item>
			      </router-link>
            <el-dropdown-item @click="select"><div  @click='aboutUsFn'> <img src="./img/aboutus@2x.png">关于我们</div></el-dropdown-item>
            <router-link to="/modifyPassword">
            <el-dropdown-item @click="select"><img src="./img/edit@2x.png"  >修改密码</el-dropdown-item>
            </router-link>
            <router-link to="/entry">
            <el-dropdown-item @click="select"><img src="./img/out@2x.png">退出登录</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
</el-row></div>
</template>
<script>
	export default{
		data(){
      return {
          userinfo: [],
          comName:  false
      }
    },
    methods:{
    },
    mounted(){
       this.$nextTick(()=>{
       
      })
    }
	}
</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    height: 50px;
    background: #1FA654;
    position: fixed;
    z-index: 10;
    .wrap{
     width: 1200px;
     margin: 0px auto;
     height: 50px;
     .home-logo{
        vertical-align:middle;
        font-size:14px;
        .home-ctrl{
          overflow:hidden;
          float:left;
          margin-top:6px;
        }
        .login_out{
          float:right;
          color:#fff;
        }
     }
    .header {
      line-height: 50px;
      color:#fff;
      overflow: hidden;
      .msgBox{
        float: right;
        padding-left: 30px;
        .msgNum{
          clear: both;
          vertical-align: middle;
          padding: 0px 6px;
          border-radius: 50%;
          background-color: #ff8628;
          color: #fff;
          }
          .msgBtn{
            clear: both;
            color: #fff;
          }
      }
      .userinfo{
        float: right;
        .el-dropdown{
          float: left;
          height: 50px;
        }
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 16px 10px 10px 10px;
            float: left;
          }
          i{
            display: inline-block;
            width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .logo {
        float: left;
        width:500px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
      }
    }
    }
  }
  .el-dropdown-menu{
            width: 200px; 
            background-color: #2bbe65;
            .el-dropdown-menu__item{
              color: #fff;
            }
            .el-dropdown-menu__item:hover{
              background-color: #13ac76;
            }
            img{
              vertical-align: sub;
              width: 24px;
              margin-right: 12px;
            }
          }
          
</style>