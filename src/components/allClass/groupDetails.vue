<template>
	<div class="wrap">
		<div class="home-top">
		  <span class="header-span">全班作业情况</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">班级作业详情</span>
		  <a class="header-a" href='javascript:void(0)' @click='back'>返回</a>
		</div>
		<div class="content">
		   <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">{{teacherInfo.create_time-0 | dateTime}} {{teacherInfo.create_time-0 |weekTime}} {{teacherInfo.content}}</span>
		   </div>
		   <div class="teacherAvatar">
		       <img :src="teacherInfo.user_header" @load="successLoadImg" @error="errorLoadImg"/>
	       </div>
	       <div class="taskDetail">
	          <p>&nbsp;{{teacherInfo.real_name}}发布于{{teacherInfo.create_time-0 | dateTime}} </p>
	          <ul>
	          	<li>【截止时间】{{teacherInfo.deadline-0 | dateTime}} {{teacherInfo.deadline-0 | weekTime}} {{teacherInfo.deadline-0 | hourMinute}}</li>
	          	<li v-if="teacherInfo.content_type==1">{{teacherInfo.content}}</li>
	          	<li v-if="teacherInfo.content_type==2"><img :src="teacherInfo.enclosure"/></li>
	          	<li v-if="teacherInfo.content_type==3">
		          	<span>{{teacherInfo.content}}</span>
		          	<img :src="teacherInfo.enclosure"/>
	          	</li>
	          </ul>
	          <p>显示全部</p>
	       </div>
	       <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">互改关系</span>
		   </div>
		   <div v-if="teacherInfo.review_type==1" >
		      <div class="sixRelation" v-if="relation.length==6">
		         <img class="relation_img sixRelation_img_1" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_2" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_3" src="../img/touxiang_1.png"/>
		         <img src="../img/icon_relation_six_1.png"/>
		         <img class="relation_img sixRelation_img_4" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_5" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_6" src="../img/touxiang_1.png"/>
		      </div>
		      <div class="fiveRelation" v-if="relation.length==5">
		          <img class="relation_img fiveRelation_img_1" src="../img/touxiang_1.png"/>
		          <img class="relation_img fiveRelation_img_2" src="../img/touxiang_1.png"/>
		          <img class="relation_img fiveRelation_img_3" src="../img/touxiang_1.png"/>
		          <img src="../img/icon_relation_five_1.png"/>
		          <img class="relation_img fiveRelation_img_4" src="../img/touxiang_1.png"/>
		          <img class="relation_img fiveRelation_img_5" src="../img/touxiang_1.png"/>
		      </div>
		      <div class="fourRelation" v-if="relation.length==4">
		          <img class="relation_img relation_img_1" src="../img/touxiang_1.png"/>
		          <img class="relation_img relation_img_2" src="../img/touxiang_1.png"/>
		          <img src="../img/icon_relation_four_1.png"/>
		          <img class="relation_img relation_img_3" src="../img/touxiang_1.png"/>
		          <img class="relation_img relation_img_4" src="../img/touxiang_1.png"/>
		      </div>
		      <div class="threeRelation" v-if="relation.length==3">
		         <img :src="relation[0].user_header"/>
		         <img v-if="relation[0].user_id==relation[1].login_id" class="left_img" :src="relation[1].user_header"/>
		         <img v-if="relation[0].user_id==relation[2].login_id" class="left_img" :src="relation[2].user_header"/>
		         <img src="../img/icon_relation_three_1.png"/>
		         <img class="right_img" v-if="relation[0].login_id==relation[1].user_id" :src="relation[1].user_header"/>
		         <img class="right_img" v-if="relation[0].login_id==relation[2].user_id" :src="relation[2].user_header"/>
		      </div>
		      <div class="relationImgs" v-if="relation.length==3">
		         <img :src="relation[0].user_header"/>
		         <img src="../img/icon_relation_two.png"/>
		         <img :src="relation[1].user_header"/>
		      </div>
		   </div>
		    <div v-if="teacherInfo.review_type==2">
		        <div class="sixRelation" v-if="relation.length==6">
		         <img class="relation_img sixRelation_img_1" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_2" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_3" src="../img/touxiang_1.png"/>
		         <img src="../img/icon_relation_six_2.png"/>
		         <img class="relation_img sixRelation_img_4" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_5" src="../img/touxiang_1.png"/>
		         <img class="relation_img sixRelation_img_6" src="../img/touxiang_1.png"/>
		      </div>
		        <div class="fiveRelation" v-if="relation.length==5">
		          <img class="relation_img fiveRelation_img_1" src="../img/touxiang_1.png"/>
		          <img class="relation_img fiveRelation_img_2" src="../img/touxiang_1.png"/>
		          <img class="relation_img fiveRelation_img_3" src="../img/touxiang_1.png"/>
		          <img src="../img/icon_relation_five_2.png"/>
		          <img class="relation_img fiveRelation_img_4" src="../img/touxiang_1.png"/>
		          <img class="relation_img fiveRelation_img_5" src="../img/touxiang_1.png"/>
		      </div>
		        <div class="fourRelation" v-if="relation.length==4">
		          <img class="relation_img relation_img_1" src="../img/touxiang_1.png"/>
		          <img class="relation_img relation_img_2" src="../img/touxiang_1.png"/>
		          <img src="../img/icon_relation_four_2.png"/>
		          <img class="relation_img relation_img_3" src="../img/touxiang_1.png"/>
		          <img class="relation_img relation_img_4" src="../img/touxiang_1.png"/>
		       </div>
		        <div class="threeRelation" v-if="relation.length==3">
		            <img src="../img/touxiang_1.png"/>
		            <img class="left_img" src="../img/touxiang_1.png"/>
		            <img src="../img/icon_relation_three_2.png"/>
		            <img class="right_img" src="../img/touxiang_1.png"/>
		        </div> 
		   </div>
		   <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">完成情况</span>
		   </div>
		   <div class="finishDetails">
		      <div class="col-box">
		        <ul>
		           <li class="row-1st"></li>
		           <li class="row-else">提交</li>
		           <li class="row-else">批改</li>
		        </ul>
		      </div>
		       <div class="row-box" v-for="(user, index) in alluser">
		          <ul>
		           <li class="row-1st"><img :src="user.user_header"/><em >{{user.real_name}}</em></li>
		           <li class="row-else"><img v-if="user.submit_work==1" src="../img/complete_yes.png"/> <img v-if="user.submit_work==0" src="../img/complete_no.png"/></li>
		           <li class="row-else"><img v-if="user.submit_review==1" src="../img/complete_yes.png"/> <img v-if="user.submit_review==0" src="../img/complete_no.png"/></li>
		        </ul>
		      </div>
		   </div>
	        <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">评改情况</span>
		   </div>
		    <div class="problemsTable">
		       <table class="tableList" cellpadding="10" cellspacing="0" border="0">
		          <tr class="listTitle" >
		          	 <th>作业</th>
		          	 <th>提交时间</th>
		          	 <th>组评</th>
		          	 <th>自评</th>
		          	 <th>师评</th>
		          	 <th>终评</th>
		          </tr>
		          <tr class="listContent" v-for='(evaluate,index) in evaluateDetails'>
		          	 <td>
		          	  <router-link :to="{path:'/personHomework',query:{login_id:evaluate.login_id,work_id:evaluate.work_id,model_id:evaluate.model_id,fenlei_id:evaluate.fenlei_id}}"><img :src="evaluate.user_header"/><em >{{evaluate.real_name}}</em></router-link></td>
		          	 <td>{{evaluate.create_time| timeTrans}}</td>
	       			 <td>
	       			   <a  v-for="item in evaluate.review"><img :src="item.user_header"/><span >{{item.score_level}}</span></a>
	       			 </td>
	       			 <td>{{evaluate.studentevaluate}}</td>
	       			 <td>{{evaluate.teacherevaluate}}</td>
	       			 <td>{{evaluate.totalvaluate}}</td>
		          </tr>
		       </table>
		       <div class="pages">
	                <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	           </div>
		   </div>
	       
		</div>
		
	</div>
</template>
<script type="text/javascript">
import {getTaskByGroupId} from '../plugins/js/api.js'
import {dateTime,weekTime,hourMinute,timeTrans} from '../plugins/js/filter.js'
import pagination from '../common/pagination'
	export default {
		data(){
			return{
				tabIndex:1,
				group_id:'',
				question_id:'',
				pagesize:1,
				teacherInfo:{},
				alluser:[],
				evaluateDetails:[],
				relation:[],
				imgSrc1:''
			}
		},
		components:{
			pagination
		},
		filters:{
			dateTime,
			weekTime,
			hourMinute,
			timeTrans	

		},
		watch:{
			
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			getTaskByGroupIdFn(){
				let params ={
					login_id:this.getCookie("login_id"),
					group_id:this.group_id,
					question_id:this.question_id,
					question_arrange_type:1
				};
				getTaskByGroupId(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.teacherInfo = data.questions;
						this.alluser = data.classMap.alluser;
						this.evaluateDetails = data.classMap.workAndView.work;
						this.relation = data.classMap.relation;

					}

				})
			},
			changePage(){
				
			}
		},
		mounted(){
	      this.$nextTick(()=>{
	      	this.group_id = this.$route.query.group_id;
	      	this.question_id = this.$route.query.question_id;
	      	this.getTaskByGroupIdFn();
	      	
	      })
	    }
	}
</script>
<style lang='scss' scoped>
.wrap{
	width: 1170px;
	.content{
		overflow:hidden;
		background-color: #ffffff;
		margin-top:20px;
		padding:20px;
		.relation_img{
			height:50px;
			width:50px;
			border-radius:25px;
		}
		.relation_img_1{
			position:relative;
			left:114px;
			top:-194px;
		}
		.relation_img_2{
			position:relative;
			left:60px;
			top:-10px;
		}
		.relation_img_3{
			position:relative;
			left:-60px;
			top:-194px;
		}
		.relation_img_4{
			position:relative;
			left:-110px;
			top:-10px;
		}
		.fiveRelation{
			overflow:hidden;

		}
		.fiveRelation_img_1{
			position:relative;
			left:380px;
			top:-200px;
			z-index:10;
		}
		.fiveRelation_img_2{
			position:relative;
			left:120px;
			top:-120px;
			z-index:10;
		}
		.fiveRelation_img_3{
			position:relative;
			left:150px;
			top:-10px;

		}
		.fiveRelation_img_4{
			position:relative;
			left:-46px;
			top:-120px;

		}
		.fiveRelation_img_5{
			position:relative;
			left:-190px;
			top:-6px;

		}
		.sixRelation_img_1{
			position:relative;
			left:282px;
			top:-196px;
		}
		.sixRelation_img_2{
			position:relative;
			left:120px;
			top:-100px;
		}
		.sixRelation_img_3{
			position:relative;
			left:180px;
			top:-10px;
		}
		.sixRelation_img_4{
			position:relative;
			left:-172px;
			top:-196px;
		}
		.sixRelation_img_5{
			position:relative;
			left:-120px;
			top:-100px;
		}
		.sixRelation_img_6{
			position:relative;
			left:-272px;
			top:-6px;
		}
		.threeRelation{
			overflow:hidden;
			img:first-child{
				height:50px;
				width:50px;
				border-radius:25px;
				display: block;
				position:relative;
				z-index:10;
				top:60px;
				left:190px;
			}
			.left_img{
				height:50px;
				width:50px;
				border-radius:25px;
				position:relative;
				z-index:10;
				left:54px;
				bottom:10px;
			}
			.right_img{
				height:50px;
				width:50px;
				border-radius:25px;
				position:relative;
				z-index:10;
				left:-54px;
				bottom:10px;
			}
		}
		.relationImgs{
			overflow:hidden;
			*{vertical-align:middle}
			img:first-child{
				height:40px;
				width:40px;
				border-radius:20px;
				position:relative;
				z-index:10;
				left:50px;
			}
			img:last-child{
				height:40px;
				width:40px;
				border-radius:20px;
				position:relative;
				z-index:10;
				left:-50px;
			}
		}
		.teacherAvatar{
			overflow:hidden;
			img{
				height:60px;
				width:60px;
				border-radius:30px;
			}
		}
		.finishDetails{
			overflow:hidden;
			padding:20px 10px;
			font-size:14px;
			line-height:30px;
			.col-box{
				overflow:hidden;
				float:left;
				width:60px;
				padding:0px 10px;
				.row-1st{
					height:60px;
				}
				.row-else{
					height:30px;
				}

			}
			.row-box{
				overflow:hidden;
				float:left;
				.row-1st{
					height:60px;
					img{
						width:40px;
						border-radius: 20px;
						vertical-align:middle;
					}
					em{
						padding:10px 20px 10px 8px;
						font-size:12px;
					}
				}
				.row-else{
					overflow:hidden;
					height:30px;
					padding:6px 10px;
				}

			}

		}
		.problemsTable table td, th{
			border-left: 1px solid #ddd;
			border-top: 1px solid #ddd;
		}

		.problemsTable img{
			width:26px;
			vertical-align: middle;
		}
		.problemsTable em{
			padding:10px;
			color:#1f60ba;
		}
		.problemsTable span{
			padding:10px;
		}
		
		.problemsTable{
			overflow:hidden;
			padding-right:25px;
			.tableList{
				width: 100%;
				margin-top:20px;
				border-bottom:1px solid #ddd;
				border-right: 1px solid #ddd;
			}
			.listTitle th{
				font-size:14px;
				background-color: #f5f5f5;
				
			}
			.listContent{
				text-align: center;
				font-size:12px;
				img{
					height:30px;
					width:30px;
					border-radius:15px;
				}
			}

		}
	
		
		
	}
	
}
</style>