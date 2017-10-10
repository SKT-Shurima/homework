<template>
	<div class="wrap">
		<div class="navBox">
			<div class="select">
				<ul class='selectList'>
					<li class="options">
					    <span>当前班级</span>
						<el-select v-model="class_id" placeholder="请选择班级" @change="guideStudentsFn">
						    <el-option
						      v-for="item in classLists"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						   </el-option>
						</el-select>
					</li>
					<!-- <li class="inputName">
						<el-input v-model="student_name" placeholder="请输入想找的学生姓名"></el-input>
					</li>
					<li class="btn">
						<el-button type='primary'>查询</el-button>
					</li> -->
				</ul>
			</div>
		</div>
		<div class="studentMessageContent">
		    <div class="content-tip" v-if="false">
		       暂时没有统计数据
		    </div>
		    <div class="studentList" v-for="item  in data">
		        <div class="studentAvater">
		        	<img :src="item.user.user_header"/>
		        	<span>{{item.count}}份给张三单独布置的作业待修改&gt;&gt;</span>
		        </div>
		        <div class="workList">
		        	<ul>
		        	  <li v-for="itemRow in item.work"><span>{{itemRow.create_time | dateTime}}<em v-if="itemRow.question_answer_type==2">单独布置的作业</em><em v-if="itemRow.question_answer_type==1">班级群作业</em></span>
		        	  <span class="result_score"><em v-if="itemRow.result_score">{{itemRow.result_score}}</em><img v-else src="../img/task_wit.png"/></span></li>
		        	</ul>
		        </div>
		    </div>
		</div>
	</div>
</template>
<script>
import {dateTime} from '../plugins/js/filter.js'
import {guideStudents,getTeacherTeachClass} from '../plugins/js/api.js'
	export default {
		data(){
			return{
				tabIndex: 0,
				class_id:'',
				classLists:[],
				data:[],
                student_name:''

			}
		},
		filters:{
             dateTime 
		},
		methods:{
			getTeacherTeachClassFn(){
                let params = {
					login_id:this.getCookie('login_id'),
					model_id:this.getCookie('model_id')
				};
				getTeacherTeachClass(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.classLists = data.group;
						this.class_id = this.classLists[0].id;
					}
				})
			},
			guideStudentsFn(){
			    let params = {
			    	class_id:this.class_id,
			    	login_id:this.getCookie("login_id")
			    };	
			    guideStudents(params).then((res)=>{
			    	let {desc, status, data} = res;
					if(status==0){
						this.data = data;
						console.log(data);
					}
			    })
			}
			
		},
		mounted(){
			this.$nextTick(()=>{
				this.getTeacherTeachClassFn();


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
	
	}
	.studentMessageContent{
		margin-top:20px;
		.content-tip{
			padding:20px;
			background-color:#ffffff;
		}
		.studentList:nth-child(even){
			margin-left:30px;
		}
		.studentList:nth-child(odd){
			margin-left:0px;
		}
		.studentList{
			float:left;
			overflow:hidden;
			padding:20px;
			height:220px;
			margin-bottom:20px;
			width:570px;
            background-color:#ffffff;
			.studentAvater{
				overflow:hidden;
				padding-bottom:20px;
				border-bottom:1px solid #dcdcdc;
				*{vertical-align: middle}
				img{
					height:60px;
					width:60px;
					border-radius:30px;
				}
				span{
					color:#2bbe65;
					font-size:14px;
					float:right;
					padding:23px 0px;
				}
			}
			.workList{
				overflow: hidden;
				padding-top:20px;
				ul li{
                    overflow: hidden;
                    padding-bottom:20px;
                    *{vertical-align: middle}
                    span{
                    	font-size: 16px;
                    }
                    .result_score{
                    	float:right;
                    }
				}

			}

		}
	}
}
</style>