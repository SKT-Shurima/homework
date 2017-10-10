<template>
	<div class="wrap">
		<div class="navBox">
			<div class="select">
				<ul class='selectList'>
					<li class="inputName">
						<el-input v-model="student_name" placeholder="输入学生姓名"></el-input>
					</li>
					<li class="options">
						 <el-select v-model="fenlei_id" placeholder="请选择年级">
						    <el-option
						      v-for="item in gradeLists"
						      :key="item.fenlei_id"
						      :label="item.grade"
						      :value="item.fenlei_id">
						    </el-option>
						  </el-select>
					</li>
					<li class="options">
						 <el-select v-model="model_id" placeholder="请选择科目">
						    <el-option
						      v-for="item in subjectLists"
						      :key="item.model_id"
						      :label="item.subject"
						      :value="item.model_id">
						    </el-option>
						  </el-select>
					</li>
					<li class="btn">
						<el-button type='primary' @click="findStudentInfoFn">查询</el-button>
					</li>
				</ul>
			</div>
		</div>
		<div class="home-body" v-if="!data">
			请对你想知道的学生信息进行查询
		</div>
		<div v-else>
		    <div class="home-body" >
			   <div class="student_info" >
			       <ul>
			           <li>查询范围：</li>
			           <li v-for="(item,index) in studentInfoList" :class='{studentDefault:studentIndex==index}'  @click="selectStudent(index,item.login_id)">
			         	  <em v-if="fenlei_id==1">小学1-3年级</em>
				   	      <em v-if="fenlei_id==2">小学4-6年级</em>
				   	      <em v-if="fenlei_id==3">初中</em>
				   	      <em v-if="fenlei_id==4">高中</em>
				   	      <em v-if="model_id==24">-语文作文</em>
				   	      <em v-if="model_id==27">-英语作文</em>
				   	      <em v-if="model_id==28">-数学</em>
				   	      <em v-if="model_id==29">-物理</em>
				   	      <em v-if="model_id==30">-化学</em>
				   	      <em v-if="model_id==31">-历史</em>
				   	      <em v-if="model_id==32">-地理</em>
				   	      <em v-if="model_id==33">-生物</em>
				   	      <em>-{{item.real_name}}</em>
			           </li>
			       </ul>
			   </div>
			   <div class="body-top  ex-top-tip">
			      <i class="ex-point"></i><span class="ex-span">统计数据</span>
			   </div>
			   <div class="body-middle">
			      <p>人均提交次数：<span>{{workCount}}次</span></p>
			      <p>人均批改次数：<span>{{reviewCount}}次</span></p>
			      <div class="ex-top-tip ex-text">
			        <i class="ex-point"></i><span>易错知识点</span>
			      </div>
			   </div>
		    </div>
			<div class="home-bottom">
			    <div class="bottom-head">
			       <ul>
			          <li @click="selectType(0)" :class="{isTab:tabIndex===0}">全部</li>
			          <li @click="selectType(1)" :class="{isTab:tabIndex===1}">近一次</li>
			          <li @click="selectType(2)" :class="{isTab:tabIndex===2}">近一周</li>
			          <li @click="selectType(3)" :class="{isTab:tabIndex===3}">近一月</li>
			       </ul>
			    </div>
			    <div class="bottom-body" v-if="data.allKnowledge.length<=0">
			       暂时没有统计数据
			    </div>
			    <div class="bottom-body" v-if="data.allKnowledge.length>0">
				    <li v-for='(item,index) in data.allKnowledge' class="workList">
			       		<dl>
			       			<dt>{{item.name}}</dt>
			       			<dd class="slider">
			       				<div :style='{width:item.count/data.allKnowledge[0].count*500+"px"}'></div>
			       			</dd>
			       			<dd class="detail">
			       				<span>{{item.count}}</span>
			       			</dd>
			       		</dl>
		            </li>
			      
			    </div>
			</div>
		</div>
		
	</div>
</template>
<script>
import {gradeLists,subjectLists} from '../plugins/js/data.js'
import {getStudentInfo,findStudentInfo,easyWrongKnowledge} from '../plugins/js/api.js'
	export default {
		data(){
			return{
				tabIndex: 0,
				processBar:50,
				val1:"",
				studentIndex:0,
				data:"",
				fenlei_id:'',
				student_name:'',
				model_id:'',
				gradeLists:gradeLists ,
		        subjectLists:subjectLists,
		        user_id:'',
		        studentInfoList:[],
		        type:0,
		        workCount:'',
		        reviewCount:''

			}
		},
		methods:{
			getStudentInfoFn(){
				let params ={
					user_id:this.user_id,
					model_id:this.model_id
				};
				getStudentInfo(params).then((res)=>{
					let {desc, status, data, } = res;
					if(status==0){
						this.data = data;
						this.reviewCount = data.reviewCount;
						this.workCount = data.workCount;
					}
				});
			},
			selectType(index){
				this.tabIndex = index;
				this.type = index;
				this.easyWrongKnowledgeFn();

			},
			selectStudent(index,user_id){
				this.studentIndex = index;
				this.user_id = user_id;
				this.getStudentInfoFn();
			},
			easyWrongKnowledgeFn(id){
				let params = {
					model_id:this.model_id,
					user_id:this.user_id,
					type:this.type

				};
				easyWrongKnowledge(params).then((res)=>{
					 let {desc, status, data, } = res;
					if(status==0){
						this.data = data;
					}

				});

			},
			findStudentInfoFn(){
				if(!this.model_id){
					 this.errorInfo('', "科目必选");
				}
				let params = {
					school_id:this.getCookie("school_id"),
					student_name:this.student_name,
					fenlei_id:this.fenlei_id,
					model_id:this.model_id
				};
				let that = this;
				findStudentInfo(params).then((res)=>{
                    let {desc, status, data, } = res;
					if(status==0){
						if(data.student.length>0){
							this.studentInfoList = data.student;
							this.user_id = data.student[0].login_id;
						}
						this.reviewCount = data.reviewCount;
						this.workCount = data.workCount;
						that.getStudentInfoFn();
						
					}
				});
			}
		},
		mounted(){
			this.$nextTick(()=>{
				

			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1170px;
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
			
		}
		.home-body{
		overflow:hidden;
		margin-top:30px;
		width:1170px;
		background-color:#fff;
		padding:30px;
		.body-top{
				overflow:hidden;
				padding:10px 0px;
				width:1105px;
				border-bottom:1px solid #dddddd;
				display:inline-block;
				
		}
		
		.body-middle{
			overflow:hidden;
			font-size:16px;
			padding-top:10px;
			p{
				padding:10px 0px;
				font-size:14px;
			}
			.ex-text{
				padding:30px 0px 10px 0px;
				border-bottom: 1px solid #dddddd;

			}
			.ex-img img{
				height:90px;
				weight:90px;

			}
		}
	
	}
	.ex-top-tip{
		overflow:hidden;
		.ex-point{
					display:block;
					margin:4px;
					float:left;
					width:8px;
					height:8px;
					background-color:#2bbe65;
				}
				span{
					padding-left:6px;
					font-size:16px;
					font-weight:bold;
					color:#2bbe65;
				}
	}
	.student_info{
		overflow:hidden;
		margin-bottom:10px;
	    ul{
	    	background-color:#f5f5f5;
	    	font-size:12px;
	    	overflow:hidden;
	    	padding:10px 4px;
	    	li{
	    		padding:8px 10px;
	    		list-style:none;
	    		float:left;
	    		border:1px solid #f5f5f5;
	    	}
	    	li:hover{
	    		border:1px solid #2bbe65;
	    		border-radius:4px;
	    	}
	    	.studentDefault{
	    		background-color:#2bbe65;
	    		color:#fff;
	    		border-radius:4px;
	    	}
	    }

	}
	.home-bottom{
			overflow:hidden;
			padding:0px 30px;
			background-color:#fff;
			.bottom-body{
				overflow:hidden;
				padding:20px 10px;
				.workList{
				dl{
					font-size: 12px;
					padding:10px 0px;
					overflow:hidden;
				}
				dt{
					float: left;
					width: 100px;
				}
				dd{
					float: left;
				}
				.slider{
					height: 14px;
					border-radius:7px;
					background-color: #fff;
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
			.bottom-head{
				overflow:hidden;
				ul{
					overflow:hidden;
					li{
						list-style: none;
						float:left;
						text-align: center;
						border:1px solid #ffffff;
						font-size:14px;
						padding:6px 20px;
						text-align:center;
					}
					.isTab{
						border-radius:15px;
						border:1px solid #2bbe65;
						color:#2bbe65;
					}
				}
				
			}
	}
	}
</style>