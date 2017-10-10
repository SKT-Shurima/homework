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
		      <i class="ex-point"></i><span class="ex-span">争议评改</span>
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
		          	 <th>争议题</th>
		          	 <th>裁定人</th>
		          </tr>
		          <tr class="listContent" v-for='(item,index) in dataList'>
		          	 <td>{{item.work.real_name}}的作业</td>
		          	 <td>{{item.work.create_time | dateTime}}</td>
	       			 <td>{{item.work.studentevaluate}}</td>
	       			 <td>{{item.myevaluate}}</td>
	       			 <td>{{item.teacherevaluate}}</td>
	       			 <td>{{item.totalvaluate}}</td>
	       			 <td>{{item.question_no}}</td>
	       			 <td>@{{item.teacher}}  @{{item.student}}</td>
		          </tr>
		          <tr class="listContent"v-if="dataList.length<=0">
		          	 <td style="text-align:center" colspan="8">暂时没有数据</td>
		          </tr>

		       </table>
		     <!--   <div class="pages">
		     	                 <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
		     	           </div> -->
		   </div>
	       
		</div>
		
	</div>
</template>
<script type="text/javascript">
import pagination from '../common/pagination'
import {GroupsWorkDetailTask,getDisputeTask} from '../plugins/js/api.js'
import {dateTime,weekTime,hourMinute} from '../plugins/js/filter.js'
	export default {
		data(){
			return{
				tabIndex:1,
				pagesize: 100,
				question_id : '',
				login_id:'',
				class_id:'',
				teacherInfo:{},
				dataList:[]
			}
		},
		filters:{
           dateTime,weekTime,hourMinute
		},
		components:{
			pagination
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			changePage(val){

			},
			getDisputeTaskFn(){
				let params = {
					login_id:this.login_id,
					class_id:this.class_id,
					question_id:this.question_id,
					question_arrange_type:1

				};
				getDisputeTask(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.dataList = data;

					}
				});

			},
			GroupsWorkDetailTaskFn(){
				let params = {
					login_id:this.login_id,
					question_id:this.question_id
				};
				GroupsWorkDetailTask(params).then((res)=>{
					let {status, desc , data} = res;
					if(status==0){
						this.teacherInfo = data.questions;
						this.groupInfo = data;
						this.groupInfoLength = data.classMap.length;
						for(var i=0; i<this.groupInfoLength;i++){
							if(data.classMap[i].workstate){
								this.finishNum++;
							}
						}
						for(var i=0; i<this.groupInfoLength;i++){
							var temp = data.classMap[i].alluser;
							for(var j =0;j<temp.length;j++){
								this.totalNum++;
								if(temp[j].submit_work==1){
									this.submitNum ++;
								}
								if(temp[j].submit_review==1){
									this.evaluateNum++;
								}
								
							}
						}
						this.notFinishNum = this.groupInfoLength - this.finishNum;
					}
				})
			}
		},
		mounted(){
	        this.$nextTick(()=>{
		      	var searchParam = this.getRequest();
		      	this.question_id = searchParam.question_id;
		      	this.login_id = searchParam.login_id;
		      	this.class_id = searchParam.class_id;
		      	this.GroupsWorkDetailTaskFn();
		      	this.getDisputeTaskFn();
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
		.teacherAvatar{
			overflow:hidden;
			img{
				height:60px;
				width:60px;
				border-radius:30px;
			}
		}
		.problemsTable table td, th{
			border-left: 1px solid #ddd;
			border-top: 1px solid #ddd;
		}
		.problemsTable{
			overflow:hidden;
			padding-right:25px;
			padding-bottom: 40px;
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
			}

		}
	
		
	}
	
}
</style>