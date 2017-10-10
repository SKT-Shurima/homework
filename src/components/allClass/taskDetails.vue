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
	       <div class="isStop" v-if="teacherInfo.question_state==0">
	            <div class="ex-top">
		           <i class="ex-point"></i><span class="ex-span">完成情况</span>
		        </div>
		        <div class="finishDetails">
			      <ul>
			          <li>
			             <a :href='"index.html?question_id="+question_id+"&login_id="+login_id+"#submitRatio"'>【提交比例】{{submitNum}}/{{totalNum}} <em>&gt;&gt;</em>
			             </a>
			          </li>
			          <li> 
			            <a :href='"index.html?question_id="+question_id+"&login_id="+login_id+"#evaluateRatio"'>【互评完成比例】{{submitNum}}/{{totalNum}} <em>&gt;&gt;</em></a>
			          </li>
			          <li>
			             <a :href='"index.html?question_id="+question_id+"&login_id="+login_id+"&class_id="+class_id+"#argueCorrect"'>【争议评比】{{groupInfo.dispute_count}}/{{totalNum}}<em>&gt;&gt;</em></a>
			          </li>
			      </ul>
			   </div>
			   <div class="ex-top">
			      <i class="ex-point"></i><span class="ex-span">分组情况</span>
			   </div>
			   <div class="groupDetails" >
			       <p class="notFinish">未完成任务的组({{notFinishNum}}/{{groupInfoLength}})</p>
			       <div class="groupLists" v-for="(classErgodic, index) in groupInfo.classMap">
			          <p v-for="(group,pIndex) in groupInfo.class_info" v-if="group.id == classErgodic.alluser[0].group_id&& !classErgodic.workstate" >组{{pIndex+1}}({{group.name}})  <router-link :to="{path:'/groupDetails',query:{group_id:group.id,question_id:question_id}}"><em>查看详情</em></router-link></p>
			          <ul v-if="!classErgodic.workstate">
			             <li v-for="groupMap in classErgodic.alluser">
			                 <img :src="groupMap.user_header"/>
			                 <span>{{groupMap.real_name}}</span>
			              </li>
			          </ul>
			        </div>
			        <p class="notFinish">已完成任务的组({{finishNum}}/{{groupInfoLength}})</p>
			        <div class="groupLists" v-for="(classErgodic, index) in groupInfo.classMap">
			          <p v-for="(group,pIndex) in groupInfo.class_info" v-if="group.id == classErgodic.alluser[0].group_id&& classErgodic.workstate" >组{{pIndex+1}}({{group.name}})<router-link :to="{path:'/groupDetails',query:{group_id:group.id,question_id:question_id}}"><em>查看详情</em></router-link></p>
			          <ul v-if="classErgodic.workstate">
			             <li v-for="groupMap in classErgodic.alluser">
		                   <img :src="groupMap.user_header"/>
		                    <span>{{groupMap.real_name}}</span>
		                 </li>
			            
			          </ul>
			        </div>
			   </div>
	       </div>
	       <!-- 作业正在进行中 -->
	        <div class="isStop" v-show="teacherInfo.question_state==1">
	            <div class="ex-top">
			       <i class="ex-point"></i><span class="ex-span">错题情况</span>
			    </div>
			   <div class="ratio_error">
			        <ul class="ratio-ul">
				       	<li v-for='(item,index) in series_error' class="workList">
				       		<dl @click="outKnowledgeFn(item.id,item.name)">
				       			<dt>题{{item.code}}</dt>
				       			<dd class="slider">
				       				<div :style='{width:item.error_count/series_error[0].error_count*100+"%"}'></div>
				       			</dd>
				       			<dd class="detail">
				       				<span>{{item.error_count}}人次</span>
				       				<em v-if="item.name" @click="getKnowledgePointFn(item.series_id)">知识点:{{item.name}}</em>
				       				<em v-else>尚未对此题关联知识点<i class="hrefModal" @click="getKnowledgePointFn(item.series_id)">&gt;&gt;关联知识点</i></em>
				       			</dd>
				       		</dl>
				       </li>
				    </ul>
			   </div>
			   <div class="ex-top">
		           <i class="ex-point"></i><span class="ex-span">完成情况</span>
		        </div>
		        <div class="finishDetails">
			       <ul>
			          <li>
			             <a :href='"index.html?question_id="+question_id+"&login_id="+login_id+"#submitRatio"'>【提交比例】{{submitNum}}/{{totalNum}} <em>&gt;&gt;</em>
			             </a>
			          </li>
			          <li> 
			            <a :href='"index.html?question_id="+question_id+"&login_id="+login_id+"#evaluateRatio"'>【互评完成比例】{{submitNum}}/{{totalNum}} <em>&gt;&gt;</em></a>
			          </li>
			          <li>
			            <a :href='"index.html?question_id="+question_id+"&login_id="+login_id+"&class_id="+class_id+"#argueCorrect"'>【争议评比】{{groupInfo.dispute_count}}/{{totalNum}}<em>&gt;&gt;</em></a>
			          </li>
			      </ul>
			   </div>
			   <div class="ex-top">
		           <i class="ex-point"></i><span class="ex-span">分组情况</span>
		        </div>
		        <div class="finishDetails">
		            <ul >
			         	<li>【小组完成比例】{{finishNum}}/{{groupInfoLength}} <em>&gt;&gt;</em></li>
		            </ul>
		        </div>
			    <div class="ex-top">
		           <i class="ex-point"></i><span class="ex-span">类别分布</span>
		        </div>
		        <div id="echartId">
		        </div>
		        <div class="echartDiv">
		            <div class="level"><i class="bgColor1"></i><em>A+</em><em>{{echartsData[0].value/totalNum*100}}%</em><em>{{echartsData[0].value}}人</em></div>
		            <div class="level"><i class="bgColor2"></i><em>B-</em><em>{{echartsData[5].value/totalNum*100}}%</em><em>{{echartsData[5].value}}人</em></div>
		            <div class="level"><i class="bgColor3"></i><em>A&nbsp;&nbsp;&nbsp;</em><em>{{echartsData[1].value/totalNum*100}}%</em><em>{{echartsData[1].value}}人</em></div>
		            <div class="level"><i class="bgColor4"></i><em>C+</em><em>{{echartsData[6].value/totalNum*100}}%</em><em>{{echartsData[6].value}}人</em></div>
		            <div class="level"><i class="bgColor5"></i><em>A-</em><em>{{echartsData[2].value/totalNum*100}}%</em><em>{{echartsData[2].value}}人</em></div>
		            <div class="level"><i class="bgColor6"></i><em>C&nbsp;&nbsp;&nbsp;</em><em>{{echartsData[7].value/totalNum*100}}%</em><em>{{echartsData[7].value}}人</em></div>
		            <div class="level"><i class="bgColor7"></i><em>B+</em><em>{{echartsData[3].value/totalNum*100}}%</em><em>{{echartsData[3].value}}人</em></div>
		            <div class="level"><i class="bgColor8"></i><em>C-</em><em>{{echartsData[8].value/totalNum*100}}%</em><em>{{echartsData[8].value}}人</em></div>
		            <div class="level"><i class="bgColor9"></i><em>B&nbsp;&nbsp;&nbsp;</em><em>{{echartsData[4].value/totalNum*100}}%</em><em>{{echartsData[4].value}}人</em></div>
		            <div class="level"><i class="bgColor10"></i><em>其他</em><em>{{echartsData[9].value/totalNum*100}}%</em><em>{{echartsData[9].value}}人</em></div>
		        </div>
		        <div class="ex-top">
		           <i class="ex-point"></i><span class="ex-span">分类统计</span>
		        </div>
		        <div class="problemsTable">
			       <table class="tableList" cellpadding="10" cellspacing="0" border="0">
			          <tr class="listTitle" >
			          	 <th>评改类别</th>
			          	 <th>作业</th>
			          	 <th>提交时间</th>
			          	 <th>组评</th>
			          	 <th>自评</th>
			          	 <th>师评</th>
			          	 <th>终评</th>
			          </tr>
			          <tr v-for="(itemA,index) in  levelA">
			             <td :rowspan="levelA.length" v-if="index==0">A类({{echartsData[0].value+echartsData[1].value+echartsData[2].value}}/{{totalNum}})</td>
			             <td>{{itemA.real_name}}的作业</td>
			             <td>{{itemA.create_time|dateTime}}</td>
			             <td>{{itemA.studentevaluate}}</td>
			             <td>{{itemA.myevaluate}}</td>
			             <td>{{itemA.teacherevaluate}}</td>
			             <td>{{itemA.totalvaluate}}</td>
			          </tr>
			            <tr v-for="(itemB,index) in levelB">
			              <td :rowspan="levelB.length" v-if="index==0">B类({{echartsData[3].value+echartsData[4].value+echartsData[5].value}}/{{totalNum}})</td>
			             <td>{{itemB.real_name}}的作业</td>
			             <td>{{itemB.create_time|dateTime}}</td>
			             <td>{{itemB.studentevaluate}}</td>
			             <td>{{itemB.myevaluate}}</td>
			             <td>{{itemB.teacherevaluate}}</td>
			             <td>{{itemB.totalvaluate}}</td>
			          </tr>
			          <tr v-for="(itemC,index) in levelC">
			             <td :rowspan="levelC.length" v-if="index==0">C类({{echartsData[6].value+echartsData[7].value+echartsData[8].value}}/{{totalNum}})</td>
			             <td>{{itemC.real_name}}的作业</td>
			             <td>{{itemC.create_time|dateTime}}</td>
			             <td>{{itemC.studentevaluate}}</td>
			             <td>{{itemC.myevaluate}}</td>
			             <td>{{itemC.teacherevaluate}}</td>
			             <td>{{itemC.totalvaluate}}</td>
			          </tr>

			       </table>
			       <div class="pages" style="text-align:left;;">
		                 <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
		           </div>
		        </div>
	        </div> 
		</div>
		<div tabindex="-1" class="el-message-box__wrapper" :class="showModal">
			<div class="el-message-box">
			    <div class="el-message-box__header">
			        <div class="el-message-box__title">关联知识点</div>
			            <button type="button" aria-label="Close" class="el-message-box__headerbtn">
			                <i class="el-message-box__close el-icon-close" @click="isShow=false"></i>
			            </button>
			        </div>
			        <div class="el-message-box__content">
			            <div class="el-message-box__status"></div>
			            <div class="el-message-box__message" style="margin-left: 0px;">
				            <div class="search-box">
					            <el-input type="text" placeholder="搜索知识点大全" icon="search">
					            </el-input><el-button >搜索</el-button>
					            <span class="span-box" @click="inputBox"><i class="el-icon-edit"></i>自行输入知识点</span>
					        </div>
			            </div>
			            <div class="el-message-box-Content">
			                <div class="select-tip"><span>---请选择知识点---</span></div>
			                <div class="content-scroll">
			                    <el-tree
								  :data="data2"
								  show-checkbox
								  node-key="id"
								  :default-expanded-keys="[2, 3]"
								  :default-checked-keys="[5]"
								  :props="defaultProps"
								   @check-change="handleCheckChange"
								  >
								</el-tree>
			                </div>

			            </div>
			        </div>
			        <div class="el-message-box__btns">
	                    <button type="button" class="el-button el-button--default el-button--primary ">
	                        <span @click="associationKnowledgeFn">确定</span>
	                    </button></div></div>
		           </div>
		<div class="v-modal" :class="showModal"></div>
		</div>
</template>
<script type="text/javascript">
import echarts from "echarts"
import pagination from '../common/pagination'
import {GroupsWorkDetailTask,getKnowledgePoint,associationKnowledge,outKnowledge} from '../plugins/js/api.js'
import {dateTime,weekTime,hourMinute} from '../plugins/js/filter.js'

	export default {
		data(){
			return{
				data2:[],
				defaultProps: {
			        children: 'children',
			        label: 'label'
			    },
			    pointIdList:[],
				tabIndex:1,
				question_id : '',
				login_id:'',
				teacherInfo:{},
				isShow:false,
				groupInfo:{},
				groupInfoLength:'',
				fenlei_id:'',
				finishNum:0,
				notFinishNum:0,
				totalNum:0,
				submitNum:0,
				evaluateNum:0,
				argueNum:0,
				series_error:[],
				levelA:[],
				levelB:[],
				levelC:[],
				pagesize: 100,
				pointName:'',
				series_id:'',
				modalList:[],
				knowledge_id:'',
				class_id:'',
				echartsData:[
	                {value:0, name:'A+'},
	                {value:0, name:'A'},
	                {value:0, name:'A-'},
	                {value:0, name:'B+'},
	                {value:0, name:'B'},
	                {value:0,name:'B-'},
	                {value:0,name:'C+'},
	                {value:0,name:'C'},
	                {value:0,name:'C-'},
	                {value:0,name:'其他'}
				],
				
			}
				
		},
		
		components:{
			pagination
		},
		computed:{
            showModal() {
                return {
                    show:this.isShow,
                    hide:!this.isShow
                }
            },
        },
		watch:{
			data2:{
				handler(newVal,oldVal){
				},
				deep: true
			}	
		},
		filters:{
			weekTime,
			dateTime,
			hourMinute
		},
		methods:{
			inputBox(){
				this.isShow = false;
				this.$prompt('请输入知识点', '提示', {
		           confirmButtonText: '确定',
		           cancelButtonText: '取消',
		        }).then(({ value }) => {
			        this.$message({
			            type: 'success',
			            message: '输入的内容是: ' + value
			        });
			        this.pointName = value;
			        this.associationKnowledgeFn();

		        }).catch(() => {
		            this.$message({
		               type: 'info',
		               message: '取消输入'
		            });       
		        });
			},
			outKnowledgeFn(knowledge_id,knowledge_name){
				let params = {
					user_id:this.login_id,
					model_id:this.getCookie('model_id'),
					knowledge_id:knowledge_id,
					knowledge_name:knowledge_name

				};
				outKnowledge(params).then((res)=>{
					let {desc, status, data} = res;
					this.errorInfo('',desc);
				});
			},
			back(){
				this.$router.back(-1);
			},
			checkDetails(){
				this.$router.push({path:'/groupDetails'});
			},
			associationKnowledgeFn(){
				let params = {
					series_id:this.series_id,
					name:this.pointName,
					knowledge_id:this.knowledge_id
				};
				associationKnowledge(params).then((res)=>{
					let {desc, status,data} = res;
					this.errorInfo('',desc);
					if(status==0){
						this.isShow = false;
					}
					
				});
				this.GroupsWorkDetailTaskFn();
			},
			newArrayFn(arr ,id){
				if(arr.indexOf(id)!=-1){
					arr.splice(arr.indexOf(id),1);
				}
				if(arr.length==1){
					arr = [];
				}
				return arr;
			},
			 handleCheckChange(data, checked, indeterminate) {
			 	if(checked){
			 		this.pointIdList.push(data.id);
			 	}else{
			 		this.newArrayFn(this.pointIdList,data.id);
			 	}
			 	this.knowledge_id = this.pointIdList.join(',');
		      },
		     
			getKnowledgePointFn(series_id){
				this.series_id = series_id;
				this.pointIdList = [];
				this.isShow = true;
				let params = {
					model_id:this.getCookie("model_id"),
					fenlei_id:this.fenlei_id
				};
				getKnowledgePoint(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						//this.modalList = data;
						let temp = 0;
						let data2 =[] ;
						for(let i=0;i<data.length;i++){
							if(data[i].p_id==0){
								data2[temp] = new Object();
								data2[temp].id = data[i].id;
								data2[temp].label = data[i].name;
								data2[temp].children = [];
								// console.log(this.data2[temp]);
								let tex = 0;
								for(let k=0;k<data.length;k++){
									if(data2[temp].id==data[k].p_id){
										data2[temp].children[tex] = new Object();
										data2[temp].children[tex].id = data[k].id;
										data2[temp].children[tex].label = data[k].name;
										tex++;
									}
								} 
								temp++;
							}
						}
						this.data2 = data2;
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
						this.series_error = data.series_error;
						this.teacherInfo = data.questions;
						this.fenlei_id = data.questions.fenlei_id;
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
						for(var i=0; i<this.groupInfoLength;i++){
							var temp = data.classMap[i].workAndView.work;
							for(var j =0;j<temp.length;j++){
								if(temp[j].totalvaluate=='A+'){
									this.levelA.push(temp[j]);
								    this.echartsData[0].value++;
							    }
							    if(temp[j].totalvaluate=='A'){
							    	this.levelA.push(temp[j]);
									this.echartsData[1].value++;
								}
								if(temp[j].totalvaluate=='A-'){
									this.levelA.push(temp[j]);
									this.echartsData[2].value++;
								}
								if(temp[j].totalvaluate=='B+'){
									this.levelB.push(temp[j]);
									this.echartsData[3].value++;
								}
								if(temp[j].totalvaluate=='B'){
									this.levelB.push(temp[j]);
									this.echartsData[4].value++;
								}
								if(temp[j].totalvaluate=='B-'){
									this.levelB.push(temp[j]);
									this.echartsData[5].value++;
								}
								if(temp[j].totalvaluate=='C+'){
									this.levelC.push(temp[j]);
									this.echartsData[6].value++;
								}
								if(temp[j].totalvaluate=='C'){
									this.levelC.push(temp[j]);
									this.echartsData[7].value++;
								}
								if(temp[j].totalvaluate=='C-'){
									this.levelC.push(temp[j]);
									this.echartsData[8].value++;
								}
								if(temp[j].totalvaluate==''){
									this.echartsData[9].value++;
								}
							}
						}
						this.notFinishNum = this.groupInfoLength - this.finishNum;
						this.getEcharts();
					}
				})
			},
			changePage(val){

			},
			getEcharts(){
				var echarts = require('.3.7.2@echarts/lib/echarts');
			// 引入柱状图
				require('.3.7.2@echarts/lib/chart/line');
				// 引入提示框和标题组件
				require('.3.7.2@echarts/lib/component/tooltip');
				require('.3.7.2@echarts/lib/component/title');
				// 基于准备好的dom，初始化echarts实例
		        let myChart = echarts.init(document.getElementById('echartId'));
				// 绘制图表
				var data = this.echartsData; 
				myChart.setOption({
				    series:[
				        {
				            name: 'level',
				            type: 'pie',
				            radius: '55%',
				            data:data
				        }
				    ]
				});
		    }
		},

		name: 'chart',
		created(){
			var searchParam = this.getRequest();
			console.log(searchParam);
			this.question_id = searchParam.question_id;
	      	this.login_id = searchParam.login_id;
	      	this.class_id = searchParam.class_id;
		},
		mounted(){

	      this.$nextTick(()=>{
	      	
	      	this.GroupsWorkDetailTaskFn();
	      })
	    
	    }
	}

        
</script>
<style lang='scss' scoped>
.wrap{
	width: 1170px;
	.el-message-box__wrapper{
	    position: fixed;
	    z-index:1999;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    text-align: center;
	}
	.show{
		display:block;
	}
	.hide{
		display:none;
	}
	.content-scroll{
			padding-top:20px;
			height:320px;
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
	.el-message-box__btns{
		text-align:center;
	}
	.span-box{
		background-color:#EF9D2F;
		padding:12px 20px;
		border-radius:4px;
		color:#fff;
		float:right;
	}
	.el-message-box-Content{
		overflow:hidden;
		.select-tip{
			padding:20px;
			font-size: 14px;
			font-weight:600;
			text-align:center;
		}
	}
	.el-message-box__btns{
		position:absolute;
		bottom:0px;
		left:0px;
		right:0px;
		.el-button{
			width:120px;
		}
	}
	.el-message-box{
		text-align: left;
	    display: inline-block;
	    position:relative;
	    height:560px;
	    vertical-align: middle;
	    background-color: #fff;
	    width: 580px;
	    border-radius: 5px;
	    font-size: 16px;
	    overflow: hidden;
	    -webkit-backface-visibility: hidden;
	    backface-visibility: hidden;
	}
	.search-box{
		overflow:hidden;
		.el-input{
			width:200px;
			margin-right:20px;
		}
	}
	.el-message-box__header{
		text-align:center;
		padding-bottom:16px;
		background-color:#2bbe6f;
	}
	.el-message-box__title,.el-message-box__close{
        color:#fff;
	}
	.el-message-box__close{
		border:1px solid #fff;
		padding:2px 5px;
		border-radius:14px;
		font-weight:500;
	}
	.v-modal{
		position: fixed;
		z-index:1998;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    opacity: .5;
	    background: #000;
	}

	.problemsTable table td, th{
		border-left: 1px solid #ddd;
		border-top: 1px solid #ddd;
		text-align:center;
		font-size:14px;
		

	}
	.problemsTable{
		overflow:hidden;
		padding-right:20px;
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
	.content{
		overflow:hidden;
		background-color: #ffffff;
		margin-top:20px;
		padding:20px;
		.isStop{
			overflow:hidden;
			clear:both;
		}
		#echartId{
			float:left;
			height:500px;
			width:500px;
		}
		.echartDiv{
			height:420px;
			width:600px;
			float:left;
			padding:40px;
			.level{
				float:left;
			    padding:18px;
			    width:260px;
				overflow:hidden;
				line-height:30px;
				font-size:14px;
				i{
					padding:5px 15px;
					
				}
				.bgColor1{
					background-color:#C23531;
				}
				.bgColor2{
					background-color:#749F83;
				}
				.bgColor3{
					background-color:#2F4554;
				}
				.bgColor4{
					background-color:#D49C4B;
				}
				.bgColor5{
					background-color:#61A0A8;
				}
				.bgColor6{
					background-color:#BDA29A;
				}
				.bgColor7{
					background-color:#D48265;
				}
				.bgColor8{
					background-color:#CA8622;
				}
				.bgColor9{
					background-color:#91C7AE;
				}
				.bgColor10{
					background-color:#546570;
				}
				em{
					padding:20px;

				}
			}
		}
		.ratio_error{
			overflow:hidden;
			.ratio-ul{
				overflow:hidden;
				padding:20px 10px;
				.hrefModal{
					color:#1F60BA;
				}
				.workList{
					dl{
						font-size: 12px;
						padding:10px 0px;
						overflow:hidden;
					}
					dt{
						float: left;
						width: 50px;
					}
					dd{
						float: left;
					}
					.slider{
						width: 500px;
						height: 14px;
						border-radius:7px;
						background-color: #eee;
						div{
							background-color: #ff8a4a;
							height: 14px;
							border-radius: 7px;
						}
					}
					.detail{
						span{
							margin: 0px 26px;
						}
					}
				}
			}
		}
		.finishDetails{
			overflow:hidden;
			padding:20px 10px;
			font-size:14px;
			line-height:30px;

			em{

				padding-left:10px;
				color:#4883DE;
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
			.notFinish{
				font-weight:bold!important;
			}
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