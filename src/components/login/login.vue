<template>
   
	<div class="wrap">
		 <div class="login-header">
		    <div class="top">
		       	<div class="logo_top"><img src="./img/logo_top_bg.png"/></div>
			    <div class="btn_top">
				    <a href="#">首页</a>
				    <a @click="getAllSchoolFn()" :class="{loginRole:roleIndex===2}">学校登录</a>
				    <a @click="teacherLogin()" :class="{loginRole:roleIndex===3}">老师登录</a>
			    </div>
		    </div>
         </div>
         <div class="login-body" >
	        <div  class="content">
		        <div class="login-img">
		          <img src="./img/login-phone.png" >
		        </div>
		        <div class="login-text">
		           <div class="text-content">
	                    <h1>{{role}}</h1>
	                    <input class="username" v-model="username" type="text" placeholder="用户名/手机号/邮箱"/>
	                    <input class="password" v-model="password" type="text" placeholder="您的登录密码"/>
	                    <div class="remember">
	                       <i></i><span>记住账号</span>
	                    </div>
	                    <a class="login-btn" @click="login">登录</a>
	                    
		           </div>
		        </div>
	        </div>
         </div>
         <div class="login-footer">
             <p>客服邮箱：admin@zuoyexiu.com</p>
             <p>客服QQ：23424242424</p>
             <p>鄂ICP备：2342424</p>
             <p>Copyright 作业秀 </p>
         </div>
        <div class="homework-modal"  :class="showModal">
            <div class="modal-alert">
            	<div class="alert-title"><span class="alert-title-1st">学校列表</span><span class="alert-title-2nd"  @click="isShow=false">×</span></div>
               
				<div class="alert-content">
				   <div class="content-scroll">
				       <p class="school-list" v-for="list in schoolList" @click="selectSchool(list.id)">{{list.name}}</p>
				   </div>
				</div>
            </div>
	    </div>
	</div>
</template>
<script type='text/esmascript-6'>
import { getAllSchool,managerLogin} from './plugins/js/api.js'
    let role = "学校登录";
	export default {
		data(){
			return {
				input: '',
				isShow:false,
				roleIndex:1,
				role:role,
				schoolList:"",
				username:'',
				password:'',
				schoolId:'-1'
			}
		},
		computed:{
            showModal:function () {
                return {
                    show:this.isShow,
                    hide:!this.isShow
                }
            },
        },
		mounted(){
			this.$nextTick(()=>{

			})
		},
		methods:{
		    login(){
		       var login_id =  this.username;
		       var password =  this.password;
		       if(!login_id){
		          alert('请填写用户名');
		          return;
		       }
		       if(!password){
		          alert("请填写密码");
		          return;
		       }
		       if( this.schoolId==='-1'){
		          alert("请选择学校");
		       }
		       let params = {
                   login_id:login_id,
                   school_id:this.schoolId,
                   password:password
		       };

		       managerLogin(params).then((res)=>{
				    let { desc, status, data } = res;
				    alert(data);
				    if(status==0){
				       alert("登录成功");
				    }else{
				     alert(1);
				    
				    }

			    });
		    },
		    teacherLogin(){
                this.roleIndex = 3;
                this.role = "老师登录";
		    },
		    selectSchool:function(id){
		        this.schoolId = id;
		        this.isShow = false;

		    }, 
			getAllSchoolFn(){
			    this.roleIndex = 2;
                this.role = "学校登录";
			    this.isShow = true;
			    let params = {};
			    var that = this;
				 getAllSchool(params).then((res)=>{
				    let { desc, status, data } = res;
				    if(status==0){
				       that.schoolList =  data.school;
				    }else{
				    alert(1);
				    }

			    });
			}
		}
	}
</script>
<style lang='scss' scoped>
   .loginRole{
   	 background-color:#2bbe65;
   	 color:#ffffff!important;
   }

   .show{
    	display:block;
    }
    .hide{
    	display:none;
    }
    .homework-modal{
    	width:100%;
    	height:100%;
    	position:fixed;
    	top:0px;right:0px;
    	left:0px;bottom:0px;
    	z-index:1111;
    	background-color: rgba(0, 0, 0, 0.3);
    	.alert-content{
    		overflow:hidden;
    		.content-p{
    			text-align:center;
    			font-size:18px;
    			color:#000000;

    		}
    		.content-scroll{
    			padding-top:20px;
    			height:360px;
    			overflow-y: scroll;
    			.school-list{
    				margin-top:10px;
    				width:96%;
    				border:1px solid #dedede;
    				padding:8px 20px;
    				background-color:#f9f9f9;
    				font-size:14px;
    				border-radius: 2px ;

    			}
    			.school-list:hover{
    				color:#2bbe65;
    			}

    		}

    	}
    	.modal-alert{
    		position: absolute;
    		background-color:white;
    		width:560px;
    		z-index:9999;
    		top:50%;left:50%;
    		margin-top:-330px;
    		margin-left:-280px;
    		border-radius:8px;
    		.alert-content{
    			overflow:hidden;
    			padding:20px;

    		}
    		.alert-footer{
    			text-align:center;
    			padding:20px;
    		}

    		
    		.alert-title{
    			border-radius:8px 8px 0px 0px;
    			padding:20px;
    			color:white;
    			font-size:18px;
    			background-color:#2bbe65;
    			text-align:center;
    			.alert-title-1st{
    				

    			}
    			
    			.alert-title-2nd{
    				border:1px solid white;
    				border-radius:10px;
    				height:20px;width:20px;
    				text-align:right;
    				text-align:center;
    				line-height:16px;
    				float:right;
    			}
    		}

    	}
    }
   
	.wrap{
		over-flow:hidden;
		height:100%;
		.navBox{
			width: 100%;
			background-color: #fff;
			.select{
				padding: 16px 26px;
				height: 70px;
			}
			.selectList{
				overflow: hidden;
			}
			.inputName,.options,.btn{
				float: left;
				margin-right: 10px;
			}
			.inputName{
				width: 200px;
			}
			.options{
				width: 140px;
			}
			.tab{
				height: 50px;
				padding: 0px 18px;
				span{
					display: inline-block;
					font-size: 16px;
					line-height: 46px;
					color: #111;
					padding: 0px 10px;
					border-bottom: 4px solid transparent;
				}
				.isTab{
					color: #2bbe65;
					border-bottom-color:#2bbe65; 
				}
			}
		}
		 .login-header{
	    	overflow:hidden;
	    	height:100px;
	    	.top{
	    		width:1000px;		
	    		position:absolute;
	    		left:24%;
	    		display:inline;
	    		.logo_top{
		    		padding-top:3%;
		    		float:left;
		    	}
		    	.btn_top{
		            padding-left:460px;
		    		padding-top:3%;
		    		overflow:hidden;
		    		float:left;
		    		a:hover{
                        background-color:#2bbe65;
                      	color:#ffffff;
		    		}

		    	}
		    	.btn_top a{
		    		display:block;
		    		float:left;
		    		width:100px;
		    		border-radius:4px;
		    		border:1px solid #2bbf67;
		    		margin-left:20px;
		    		color:#2bbf67;
		    		text-align:center;
		    		font-size:14px;
		    		padding:10px;
		    	}
	    	}
	    }
		.login-body{
			overflow:hidden;
			min-height:700px;
			clear:both;
			background:#2bbe65;
			position:relative;
			.content{
				overflow:hidden;
				position:absolute;
				padding-top:100px;
				min-width:900px;
				display:inline;
				left:28%;
				.login-img{
				     overflow:hidden;
				     float:left;
			    }
				.login-text{
					padding-top:30px;
					padding-left:70px;
					overflow:hidden;
					float:left;
					width:400px;
					.text-content{
						border-radius:10px;
						padding:34px ;
						background:#ffffff;
						.username{
							background-image:url("./img/signin_user.png");
							background-position:8px 10px;
							background-repeat:no-repeat;

						}
						.password{
							background-image:url("./img/signin_password.png");
							background-position:8px 10px;
							background-repeat:no-repeat;
						}
						.remember{
							text-align:center;
							line-height:40px;
							font-size:12px;
						}
						.login-btn{
							display:block;
							width:100%;
							background:#2bbe65;
							font-size:14px;
							color:#ffffff;
							text-align:center;
							padding:16px;
							border-radius:6px;
							margin-top:10px;

						}
					}
					.text-content h1{
						width:100%;
						text-align:center;
						font-size:30px;
						color:#2bbf67;
						padding-bottom:20px;

					}
					.text-content input{
						margin:12px 0px;
						line-height:38px;
						vertical-align:middle;
						padding-left:28px;
						font-size:14px;
						outline:none;
						-webkit-appearance: none;
						border-radius:6px;
						border:1px solid #dcdcdc;
						width:90%;

					}
					
				}
			}
			
		}
		.login-footer{
			padding-top:40px;
			overflow:hidden;
			text-align:center;
			line-height:24px;
			font-size:14px;
		}

	}
</style>