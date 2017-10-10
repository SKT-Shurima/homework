<template>
	<div class="wrap">
		<div class="home-top">
		  <span class="header-span">全班作业情况</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">班级作业详情</span>
		  <i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">{{dataObj.real_name}}的作业</span>
		  <a class="header-a" href='javascript:void(0)' @click='back'>返回</a>
		</div>
		<div class="content">
		   <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">2015-05-08 星期一班级统一布置作业</span>
		   </div>

		   <div class="teacherAvatar">
		       	  <img src="../img/touxiang_2.png"/>
	       </div>
	       <div class="taskDetail">
	          <p>&nbsp;王老师发布于 2017-05-08 <em>提前截止</em><em>发出提醒</em></p>
	          <ul>
	          	<li>【截止时间】2015-05-10 星期三 12:00</li>
	          	<!-- <li>一、做完课后习题</li>
	          	<li>二、背诵课文</li> -->
	          </ul>
	          <p>显示全部</p>
	       </div>
	       <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">解答</span>
		   </div>
		     <div class="groupDetails">
		       <div class="groupLists" >
		          <ul>
		             <li>
		              <img :src="dataObj.user_header"/>
		              <span><em>{{dataObj.real_name}}</em>
		              <em>上传于{{dataObj.create_time | dateTime}}</em>
		              <em>浏览{{dataObj.review_num}}次</em>
		              <em>被赞{{dataObj.Forward_num}}次</em>
		              <em>评级{{dataObj.teacherevaluate}}</em></span>
		              </li>
		          </ul>
		          <div class="imgList" >
		             <div class="zoom-big" v-for="image in imgLists">
		                <img  :src="image" @click='currentImg=image;maskBol=true'/><img src="../img/correcting_zoom_big.png"/>
		             </div>
		             <transition name='fade'>
			        	<div class="mask" v-show='maskBol' @click='maskBol=false' >
							<div class="maskBox" @click.stop='maskBol=true'>
								<img :src="currentImg" alt="">
							</div>
						</div>
			        </transition>
		          </div>
		       </div>
		   </div>
		   <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">评改</span>
		   </div>
		    <div class="evaluate">
		       <ul>
		           <li>【分配评改人】 <em v-for="review in reviewers">@{{review.real_name}}</em></li>
		           <li>【争议题】{{question_no}}<em></em></li>
		           <li>【裁定人】<em>@{{adjudication_man.teacher}}</em></li>
		        </ul>
		   </div>
		   <div class="groupDetails">
		       <div class="groupLists" v-for="list in dataObj.reviewList">
		          <ul>
		             <li >
		              <img :src="list.user_header"/>
		              <span>
		                <em>{{list.real_name}}</em>
		                <em>{{list.create_time | dateTime}}</em>
		                <em>回复{{list.comment_num}}条</em>
		                <em>被赞{{list.good_num}}次</em>
		                <em>打分{{list.score_level}}</em>
		                </span>
		              </li>

		          </ul>
		          <div class="imgList">
		             <div class="zoom-big" >
		                <img :src="list.content" @click='currentImg=image;maskBol=true'/><img src="../img/correcting_zoom_big.png"/>
		             </div>
		             <transition name='fade'>
			        	<div class="mask" v-show='maskBol' @click='maskBol=false' >
							<div class="maskBox" @click.stop='maskBol=true'>
								<img :src="currentImg" alt="" @load="successLoadImg" @error="errorLoadImg">
							</div>
						</div>
			        </transition>
		          </div>
		          <div>
		             <span v-if="list.content_type==1">{{list.content}}</span>
		          </div>
		       </div>
		   </div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
import {getWorkInfo} from "../plugins/js/api.js"
import {dateTime} from '../plugins/js/filter.js'
	export default {
		data(){
			return{
				tabIndex:1,
				queryData:{},
				dataObj:{},
				imgLists:[],
				currentImg:'',
				maskBol:false,
				adjudication_man:{},
				question_no:'',
				reviewers:[],
				imageLists:[]
			}
		},
		filters:{
			dateTime
		},
		watch:{
			
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			getWorkInfoFn(){
				let params={
					login_id:this.queryData.login_id,
					work_id:this.queryData.work_id,
					pageNum:1,
					model_id:this.queryData.model_id,
					fenlei_id:this.queryData.fenlei_id,
					limitNum:20	

				};
				getWorkInfo(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.dataObj = data.work;
						if(data.work.review_type==3){
							this.reviewers=[];
							for(var i =0; i< data.reviewers.length;i++){
								if(data.reviewers[i].auth_teacher==1){
									this.reviewers.push(data.reviewers[i]);
								}
							}
						}else{
							this.reviewers=[];
							for(var i =0; i<data.reviewers.length;i++){
								if(data.reviewers[i].auth_teacher==0){
									this.reviewers.push(data.reviewers[i]);
								}
							}
						}
						this.imgLists = data.work.my_answer.split(";");
						this.adjudication_man = data.adjudication_man;
						this.question_no = data.question_no;
						this.imageLists = data.work.reviewList;
						/*for(var j = 0;j<data.work.reviewList.length;j++){
							this.imageLists.push(data.work.reviewList[j]);
						}*/
					}

				})
			}
		},
		mounted(){
	      this.$nextTick(()=>{
	      	this.queryData = this.$route.query;
	      	this.getWorkInfoFn();
	      	
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
		.mask{
			position: fixed;
			width: 100%;
			height:100%;
			top:0px;
			left:0px;
			z-index: 99;
			background-color: rgba(0,0,0,.7);
			.maskBox{
				position: absolute;
				top: 25%;
				left: 0px;
				right: 0px;
				bottom: 0px;
				margin: auto;
				width: 800px;
				img{
					width:100%;
				}
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
		.personHomework{
			overflow:hidden;
			img{
				height:60px;
				width:60px;
				border-radius:30px;
			}
		}
		.imgList{
			overflow:hidden;
			clear:both;
			.zoom-big{
				float:left;
				overflow:hidden;
				position:relative;
				img:first-child{
					height:300px;
					width:200px;
					margin-right:20px;
			    }
			    img:last-child{
			    	position:absolute;
			    	top:10px;
			    	right:28px;
			    }
			}
		}
		.evaluate{
			overflow:hidden;
			padding:20px 10px;
			font-size:14px;
			line-height:30px;
			border-bottom:1px solid #ddd;

			em{

				padding-left:10px;
				color:#4883DE;
			}
		}

		.groupDetails{
			overflow:hidden;
			padding:20px 10px;
			font-size:14px;
			line-height: 30px;
			.groupLists{
				overflow:hidden;
				padding-bottom:20px;
				border-bottom:1px solid #ddd;
				em{
					
					margin-right:10px;
					
				}
				ul li{
					float:left;
					padding:14px 24px 14px 0px;
				}
				ul li span{
					padding:8px;
					font-size:14px;

				}
				ul li img{
					width:40px;
					vertical-align:middle;
					border-radius:20px;
				}
			}
		}
		
	}
	
}
</style>