<template>
	<div class="wrap">
		<div class="navBox">
			<div class="select">
				<ul class='selectList'>
					<li class="options">
					    <span>当前班级</span>
						 <el-select v-model="group_id" placeholder="请选择班级" @change="classGroupDataFN">
						    <el-option
						      v-for="item in classLists"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
					</li>
				</ul>
				
			</div>
		</div>
		<div class="content">
		    <div class="body-top  ex-top">
		        <i class="ex-point"></i><span class="ex-span">班级群信息</span>
		    </div>
		    <div class="classGroup">
			    <ul>
		          	<li><em>【班级群名称】</em>{{classMessage.create_time | dateTime}} {{classMessage.create_time | weekTime}}  {{classMessage.create_time | hourMinute}}</li>
		          	<li><em>【班级群ID】</em>{{classMessage.id}}</li>
		          	<li><em>【加群口令】</em>{{classMessage.password}}</li>
		          	<li><em>【我的真实姓名】</em>{{classMessage.user_name}}</li>
		        </ul>
		    </div>
		    <div class="body-top  ex-top">
		        <i class="ex-point"></i><span class="ex-span">班级群成员</span><span>(3/{{memberLists.person_count}}未分类)</span>
		    </div>
		    <div class="classMemebers">
		       <div class=" peoOfClass" >
		       	   <a v-for="member in memberLists.person_all" v-if="member.is_teacher == 1 || member.is_teacher == 2"> <img :src="member.user_header"/><span>{{member.user_name}}</span></a>
		       </div>
		       <div class=" peoOfClass" >
		           <a v-for="member in memberLists.person_all" v-if="member.is_teacher == 0"><img :src="member.user_header"/><span>{{member.user_name}}</span><em>{{member.grade | notA}}</em></a>
		       </div>
		    </div>
		</div>

	</div>
</template>
<script>
import {classGroupData,getTeacherTeachClass} from '../plugins/js/api.js'
import {dateTime,weekTime,hourMinute,notA} from '../plugins/js/filter.js'
	export default {
		data(){
			return{
				tabIndex: 1,
				val1:"",
				pageNum:1,
				group_id:'',
				model_id:"",
				login_id:'',
				classLists:[],
				classMessage:{},
				memberLists:{},
				teacherList:[],
				studentList:[]
			}
		},
		filters:{
			dateTime,
			weekTime,
			hourMinute,
			notA
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
						this.group_id = this.classLists[0].id;
					}
				})
			},
			classGroupDataFN(){
				console.log(this.group_id);
			    var params = {
			    	login_id : this.login_id,
			    	model_id:this.model_id,
			    	group_id: this.group_id
			    };
				classGroupData(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.classMessage = data.classData;
						this.memberLists = data.data;
						console.log(data);

					}
				});
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getTeacherTeachClassFn();
				this.model_id = this.getCookie("model_id");
				this.login_id = this.getCookie("login_id");
				

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
			.selectList{
				overflow: hidden;
				padding:20px;
			}
			
			.options{
				font-size:14px;
				span{
					padding-right:20px;
				}
			}
		}
		.content{
			overflow:hidden;
			background-color: #ffffff;
			margin-top:20px;
			padding:20px;
		}
		.classMemebers{
			overflow:hidden;
			padding:20px;
			.peoOfClass{
				overflow:hidden;
				a{
					margin-right:30px;
					display:block;
					float:left;
					margin-bottom:20px;
					*{vertical-align: middle}
					img{
						height:40px;
						width:40px;
						border-radius: 20px;

					}
					span{
						padding:6px;
					}
					em{
						padding:4px 8px;
						border-radius: 6px;
						border:2px solid #2bbe65;
						font-size:16px;
						color:#2bbe65;
				    }

				}
			}
		}
		.classGroup{
			overflow:hidden;
			padding:20px;
			ul li{
				height:30px;
				font-size:14px;
				em{
					display:block;
					float:left;
					width:150px;
				}
			}
		}
	}
</style>