<template>
	<div class="wrap">
		<div class="navBox">
			<div class="select">
				<ul class='selectList'>
					<li class="options">
					    <span>当前班级</span> 
						 <el-select v-model="group_id" placeholder="请选择班级"  @change="groupsAllWorkFn()">
						    <el-option
						      v-for="item in classLists"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id"
						     >
						    </el-option>
						  </el-select>
					</li>
					</li>
				</ul>
			</div>
		</div>
		<div class="content">
		    <div class="assignment" v-for='(item,index) in dataLists'>
		       <a :href='"index.html?question_id="+item.id+"&login_id="+item.login_id+"&class_id="+group_id+"#taskDetails"'>
		           <p class="assignmentTime"> {{item.create_time |dateTime}} &nbsp;&nbsp;{{item.create_time| weekTime}} &nbsp;&nbsp;{{item.content}}</p>
		       </a>
		       <div class="teacherAvatar">
		       	  <img :src="item.user_header" @load="successLoadImg" @error="errorLoadImg"/>
		       </div>
		       <div class="taskDetail">
		          <p>&nbsp;{{item.real_name}}发布于 {{item.create_time |dateTime}}</p>
		          <ul>
		          	<li>【截止时间】{{item.deadline | dateTime}}&nbsp;&nbsp;{{item.deadline | weekTime}} {{item.deadline | hourMinute }}</li>
		          	<!-- <li>【提交比例】15/20</li>
		          	<li>【评改比例】15/20</li> -->
		          </ul>
		       </div>
		      <!--  <div class="moreAssignment">
		         <p>6个易错待关联知识点&gt;&gt;</p>
		         <p></p>
		      </div> -->
		    </div>
		</div>
		<div class="pages">
             <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
       </div>
	</div>
</template>
<script>
import pagination from '../common/pagination'
import {getTeacherTeachClass,groupsAllWork} from '../plugins/js/api.js'
import {dateTime,weekTime,hourMinute} from '../plugins/js/filter.js'
	export default {
		data(){
			return{
				tabIndex: 1,
				processBar:50,
				pageNum:1,
				group_id:'',
				classLists:[] ,
				dataLists:[],
				pagesize:0
			}
		},
		components:{
			pagination
		},
		filters:{
			dateTime,
			weekTime,
			hourMinute
		},
		methods:{
			changePage(val){
				console.log(val);
                this.pageNum =  parseInt(val);
				this.groupsAllWorkFn();
			},
			getTeacherTeachClassFn(){
				let params = {
					login_id:this.getCookie('login_id'),
					model_id:this.getCookie('model_id')
				};
				
				getTeacherTeachClass(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.classLists = data.group;
						this.group_id = data.group[0].id;
						this.groupsAllWorkFn();
					}
				})
			},

			groupsAllWorkFn(){
				let params = {
					login_id:this.getCookie('login_id'),
					group_id:this.group_id,
					model_id:this.getCookie('model_id'),
					pageNum:this.pageNum

				};
				groupsAllWork(params).then((res)=>{
					let {desc, status, data,count} = res;
					var number = Math.ceil(count/6 );
					this.pagesize = parseInt(number);
					if(status==0){
						this.dataLists = data;
					}

				})
			},

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

		.teacherAvatar{
			overflow:hidden;
			img{
				height:60px;
				width:60px;
				border-radius: 30px;
			}

		}
		.content{
			overflow:hidden;
			width:100%;
			padding-top:20px;
		}
		.moreAssignment{
			padding-left:74px;
			font-size:14px;
			height:40px;
			color:#FE413F;
			clear:both;
			overflow:hidden;
		}
		.assignment{
			margin:30px 0px 0px 0px;
			padding:0px 35px 20px 35px;
			background-color:#fff;
			overflow:hidden;
			width:49%;
			float:left;
			.assignmentTime{
				padding:20px 0px;
				font-size:14px;
				font-weight:bold;
				color:#2bbe65;
				border-bottom:1px solid #dcdcdc;
			}

		}
		.assignment:nth-child(odd){
			margin-left:0px;
		}
		.assignment:nth-child(even){
			margin-left:2%;
		}
	}
</style>