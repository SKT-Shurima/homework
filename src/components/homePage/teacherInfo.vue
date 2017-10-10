<template>
	<div class="wrap">
		<div class="home-top">
		  <span class="header-span">老师信息</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">{{real_name}}</span>
		  <a class="header-a" href='javascript:void(0)' @click='back'>返回</a>
		</div>
		<div class="home-body">
		   <div class="body-img" >
		     <img :src="user_header"  @load="successLoadImg" @error="errorLoadImg"/>
		     <p>{{real_name}}</p>
		   </div>
		   <div class="body-right">
		      <div class="right-head">
		      	<span>【所带班级】 <em v-for="item in teacherInfos">{{item.name}}&nbsp;&nbsp;&nbsp;</em></span>
		      </div>
		      <div class="right-container">
		         <span @click="tabIndex=1" :class="{isTab:tabIndex===1}">个人动态</span>
		         <span @click="tabIndex=2" :class="{isTab:tabIndex===2}">统计数据</span>
		      </div>
		     <component :is='currnetView' :login_id = "login_id"></component>
		   </div>

		</div>
	</div>
</template>
<script type="text/javascript">
import {getTeacherInfo} from '../plugins/js/api.js'
import personState from './personState'
import statistics  from './statistics'
	export default {
		data(){
			return{
				tabIndex:1,
				currnetView: personState,
				login_id:'',
				pageNum:1,
				teacherInfos:[],
				real_name: '',
				user_header: ''

			}
		},
		watch:{
			tabIndex(newVal,oldVal){
				this.currnetView = newVal===1?personState:statistics
			}
		},
	
		mounted(){
			this.login_id = this.$route.query.login_id;
			this.getTeacherInfoFn();
	        this.$nextTick(()=>{
	      	
	      })
	    },
		methods:{
			back(){
				this.$router.back(-1);
			},
			getTeacherInfoFn(){
				let params = {
					teacher_id:this.login_id,
					pageNum : this.pageNum,
					type:1
				};
				getTeacherInfo(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.teacherInfos =  data.class;
						this.real_name = this.teacherInfos[0].real_name;
						this.user_header = this.teacherInfos[0].user_header;
					}

				});

			},
		},
		
	}
</script>
<style lang='scss' scoped>
.wrap{
	width: 1170px;
	.home-body{
		overflow:hidden;
		margin-top:20px;
		padding:30px 20px;
		width:1170px;
		background-color:#fff;
		.body-img{
			overflow:hidden;
			float:left;
			text-align:center;
			font-size:16px;
			font-weight:600;
			
			height:100px;
			p{
				padding:20px;

			}
			img{
				width:60px;
				border-radius: 30px;
			}
		}
		.body-right{
			overflow:hidden;
			float:left;
			padding-left:20px;
			width:1040px;
			.right-head{
				height:50px;
				font-size:14px;
				line-height:50px;
				border-bottom:1px solid #ddd;
			}
			.right-container{
				height: 50px;
				border-bottom:1px solid #ddd;
				span{
					display: inline-block;
					font-size: 16px;
					line-height: 46px;
					cursor: pointer;
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
	}

	
	.box{
		display: flex;
		flex-wrap: wrap;
		.cardLeft{
			margin-left: 20px;
		}
		.box-card{
			width: 455px;
			margin-top: 36px;
			.clearfix{
				height: 44px;
				background-color: #fbfbfb;
				strong{
					line-height: 44px;
					font-weight: 600;
				}
				span{
					float: right;
					line-height: 44px;
					i{
						font-size: 14px;
					    color: #666;
					}
					.online,.outline{
					   margin-left: 6px;
					   margin-top: 10px;
					   
					   border-radius: 4px;
					   font-size: 14px;
					   line-height: 24px;
					   padding-left: 8px;
					   padding-right: 8px;
					}
					.online{
						border: 1px solid #16bf86;
						color: #16bf86;
					}
					.outline{
						border: 1px solid #666;
						color: #666;
					}
				}
			}
			.cardContent{
				height: 230px;
				.collect,.control,.monitor{
					height: 220px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-direction: column;
					padding: 24px 0px;
				}
				.collect,.control,.monitor{
					button{
						cursor: pointer;
					}
				}
				.collect{
					img{
						border: 1px solid #fb7252;
					}
					button{
						background-color: #fb7252;
					}
				}
				.control{
					img{
						border: 1px solid #16bf86;
					}
					button{
						background-color: #16bf86;
					}
				}
				.monitor{
					img{
						border: 1px solid #3daddd;
					}
					button{
						background-color: #3daddd;
					}
				}
				img{
					width: 92px;
					height: 92px;
					border-radius: 50%;
				}
				strong{
					font-size: 14px;
				}
				button{
					width: 50px;
					height: 24px;
					box-sizing: border-box;
					outline: none;
					border-radius: 4px;
					border-width: 0px;
					color: #fff;
				}
			}
		}
	}
}
</style>