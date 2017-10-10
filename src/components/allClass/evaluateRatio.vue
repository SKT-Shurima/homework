<template>
	<div class="wrap">
		<div class="home-top">
		  <span class="header-span">全班作业情况</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">班级作业详情</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">争议评改</span>
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
	          <p>&nbsp;{{teacherInfo.real_name}}发布于{{teacherInfo.create_time-0 | dateTime}} <em>提前截止</em><em>发出提醒</em></p>
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
		      <i class="ex-point"></i><span class="ex-span">评改已完成<em>({{evaluateListsNum}}/{{totalNum}})</em></span>
		   </div>
		     <div class="groupDetails">
		       <div class="groupLists" >
		          <ul>
		             <li v-for="(item, index) in evaluateLists">
		              <img :src="item.user_header"/><span>{{item.real_name}}</span>
		              </li>
		               <li v-if="evaluateLists.length<=0">暂时没有数据</li>
		          </ul>
		       </div>
		   </div>
		   <div class="ex-top">
		      <i class="ex-point"></i><span class="ex-span">评改未完成<em>({{notEvaluateListsNum}}/{{totalNum}})</em></span>
		   </div>
		     <div class="groupDetails">
		       <div class="groupLists" >
		          <ul>
		             <li v-for="(item, index) in notEvaluateLists">
		             <img :src="item.user_header"/><span>{{item.real_name}}</span>
		              </li>
		              <li v-if="notEvaluateLists.length<=0">暂时没有数据</li>
		          </ul>
		       </div>
		   </div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {GroupsWorkDetailTask} from '../plugins/js/api.js'
import {dateTime,weekTime,hourMinute} from '../plugins/js/filter.js'
	export default {
		data(){
			return{
				tabIndex:1,
				question_id : '',
				login_id:'',
				teacherInfo:{},
				evaluateLists:[],
				evaluateListsNum:0,
				notEvaluateLists:[],
				notEvaluateListsNum:0,
				totalNum:0
			}
		},
		filters:{
			dateTime,weekTime,hourMinute
		},
		watch:{
			
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			GroupsWorkDetailTaskFn(){
				let params = {
					login_id:this.login_id,
					question_id:this.question_id
				};
				GroupsWorkDetailTask(params).then((res)=>{
					let {status, desc , data} = res;
						if(status==0){
						this.totalNum = 0;
						this.evaluateLists = [];
						this.evaluateListsNum = 0;
						this.notEvaluateLists = [];
						this.notEvaluateListsNum = 0;
						this.teacherInfo = data.questions;
						this.groupInfo = data;
						this.groupInfoLength = data.classMap.length;
						for(var i=0; i<this.groupInfoLength;i++){
							for(var j=0;j<data.classMap[i].alluser.length;j++){
								if(data.classMap[i].alluser[j].submit_review==1){
									this.evaluateLists.push(data.classMap[i].alluser[j]);
									this.evaluateListsNum++;
								}else if(data.classMap[i].alluser[j].submit_review==0){
									this.notEvaluateLists.push(data.classMap[i].alluser[j]);
									this.notEvaluateListsNum++;
								}
							}
						}
						for(var i=0; i<this.groupInfoLength;i++){
							var temp = data.classMap[i].alluser;
							for(var j =0;j<temp.length;j++){
								this.totalNum++;
							}
						}
					}
				})
			}
		},
		mounted(){
	        this.$nextTick(()=>{
	        	var searchParam = this.getRequest();
		      	this.question_id = searchParam.question_id;
		      	this.login_id = searchParam.login_id;
		      	this.GroupsWorkDetailTaskFn();
	      })
	    }
	}
</script>
</script>
<style lang='scss' scoped>
.wrap{
	width: 1170px;
	.content{
		overflow:hidden;
		background-color: #ffffff;
		margin-top:20px;
		padding:20px;
		.ex-top{
			em{
				color:#000;
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
		.groupDetails{
			overflow:hidden;
			padding:20px 10px;
			font-size:14px;
			line-height: 30px;
			
			.groupLists{
				overflow:hidden;
				em{
					padding:3px 14px;
					margin-left:10px;
					border-radius:4px;
					border:1px solid #2bbe65;
					font-size:12px;
					color:#2bbe65;
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