<template>
	<div class="wrap">
		<div class="navBox">
			<div class="select">
				<ul class='selectList'>
					<li class="inputName">
						<el-input placeholder='输入想找的老师姓名' v-model="teacher_name"></el-input>
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
						 <el-select v-model="model_id" placeholder="请选择年级">
						    <el-option
						      v-for="item in subjectLists"
						      :key="item.model_id"
						      :label="item.subject"
						      :value="item.model_id">
						    </el-option>
						  </el-select>
					</li>
					<li class="btn">
						<el-button type='primary' @click="searchTeacherFn">查询</el-button>
					</li>
				</ul>
			</div>
			<div class="tab">
				<span @click='sortType(0)' :class='{isTab:tabIndex===0}'>综合排序</span>
				<span @click='sortType(1)' :class='{isTab:tabIndex===1}'>按操作作业秀时间排序</span>
				<span @click='sortType(2)' :class='{isTab:tabIndex===2}'>按每天所花时间排序</span>	
			</div>
		</div>
		<div class="container">
		     <div class="teach-box" v-for='(item,index) in teachersList'  v-if='item.user'>
		       <div class="box-header">
		          <router-link :to="{path:'/teacherInfo',query:{login_id:item.user.login_id}}">
		          	 <div class="header-img"><img class="defaultImg" @load="successLoadImg" @error="errorLoadImg" :src="item.user.user_header"   :key='item.user.login_id'/>
		          	 </div> 
			          <div class="header-text">
			             <p>  &nbsp;{{item.user.real_name}}
			             <p>【所带班级】<span v-for='classItem in item.school'>{{classItem}}</span></p>
			          </div>
		          </router-link>
		       </div>
		       <div class="box-body">
		           <h1>今日动态</h1>
		           <ul>
		                <li style="color:red;" v-show="!item.work">暂时没有数据</li>
		           		<li v-for='(workItem,index) in item.work' >
		           		   <p v-if="workItem.target_type==4"> 
		           		       <span>{{workItem.real_name}}老师给{{workItem.target_name}}单独发布作业</span>
		           		       <em>{{workItem.question_time | timeTrans}}</em>
		           		   </p>
		           		   <p v-if="workItem.target_type==5"> 
		           		       <span>{{workItem.real_name}}老师批改{{workItem.target_name}}作业</span>
		           		       <em>{{workItem.question_time | timeTrans}}</em>
		           		   </p>
		           		   <p v-if="workItem.target_type==6"> 
		           		       <span>{{workItem.real_name}}给{{workItem.target_name}}班级布置了统一作业</span>
		           		       <em>{{workItem.question_time | timeTrans}}</em>
		           		   </p>
		           		   <p v-if="workItem.target_type==7"> 
		           		       <span>{{workItem.real_name}}老师给{{workItem.target_name}}作业进行了知识点关联</span>
		           		       <em>{{workItem.question_time | timeTrans}}</em>
		           		   </p>

		           		</li>
		           </ul>
		       </div>
		       <dl class="box-footer">
		          <dt>最近一周平均每天操作左文秀时间：<span>{{item.time_length | hours}}</span></dt>
		          <dd>最近一周平均实际每天所花时间(估计)：<span>{{item.real_time | hours}}</span></dd>
		       </dl>
		      
		    </div>
		   
		</div>
		<div class="pages" >
	        <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	    </div>
		
	</div>
	
</template>
<script>
import pagination from '../common/pagination'
import {getallTeacher,searchTeacher} from '../plugins/js/api.js'
import {timeTrans,hours} from '../plugins/js/filter.js'
import {gradeLists,subjectLists} from '../plugins/js/data.js'
	export default {
		data(){
			return{
				tabIndex: 0,
				isShow:false,
				teachersList:[],
				pagesize:0,
				val1:"",
				type:0,
				teacher_id:'',
				page:1,
				teacher_name:'',
				fenlei_id:'',
				model_id:'',
				school_id:'',
				gradeLists:gradeLists ,
		        subjectLists:subjectLists,
		        sort_type:0
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getallTeacherFn();
               this.school_id = this.getCookie("school_id")
			})
		},
		components:{
			pagination
		},
		filters:{
			timeTrans,
			hours
		},
		methods:{
			sortType(index){
				this.tabIndex = index;
				this.sort_type = index;
				this.getallTeacherFn();
			},
			searchTeacherFn(){
				let params = {
					teacher_name:this.teacher_name,
					fenlei_id:this.fenlei_id,
					model_id:this.model_id,
					school_id:this.school_id
				};
				searchTeacher(params).then((res)=>{
					let {desc, status, data} = res;
					let that = this;
					let teacherIds = '';
					if(status==0){
						teacherIds = data.teacher;
						that.type = 1;
						teacherIds = teacherIds.join(';');
						that.teacher_id = teacherIds;
						that.getallTeacherFn();
					}

				});

			},
			getallTeacherFn(){
				let params = {
					type:this.type,
					teacher_id:this.teacher_id,
					page:this.page,
					sort_type:this.sort_type 
				};
				getallTeacher(params).then((res)=>{
					let { desc, status, data} = res;
				    let that  = this;
					if(status === 0){
						that.teachersList = data.dataMap;
						that.pagesize = data.pageCount;

					}else{
						this.errorInfo(status,desc)
					}
				});

			},
			changePage(val){
				this.page =  val;
				this.getallTeacherFn();

			},
		
		},
	   computed:{
            showModal:function () {
                return {
                    show:this.isShow,
                    hide:!this.isShow
                }
            },
        },
		
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1170px;
		.container{
			overflow:hidden;
			.teach-box{
				margin:30px 0px 0px 0px;
				padding:0px 35px 5px 35px;
				background-color:#fff;
				overflow:hidden;
				width:570px;
				float:left;
			}
			.teach-box:nth-child(even){
				margin-left:30px;
			}
			.teach-box:nth-child(odd){
				margin-left:0px;
			}
			.box-body{
				overflow:hidden;
				border-bottom: 1px solid #dddddd;
				font:14px SimSun;
				color:#111111;
				line-height:30px;
				ul{
					padding-bottom: 8px;
					height:190px;
				}
				li{
					overflow:hidden;
					margin-bottom: 18px;
					span{
						float:left;
					}
					em{
						float:right;
						color: #999;
					}
				}
				h1{
					font-weight:bold;
					color:#2bbe65;
					padding: 18px 0px;
				}

			}
			.box-footer{
				overflow:hidden;
				font:14px SimSun;
				color:#111111;
				line-height:30px;
				padding: 20px 0px 30px;
			}
			.box-header{
				padding:25px 0px;
				overflow:hidden;
				border-bottom:1px solid #dddddd;
				.header-img , .header-text{
					overflow:hidden;float:left;
					border-radius:30px;

				}
				.header-img img{
					width:60px;
					border-radius: 30px;
				}
				.header-text{
					overflow:hidden;
					padding:8px 10px;
					p:first-child{
						font-size:16px;
						font-weight:bold;
						padding-bottom:10px;

					}
					p:last-child{
                        font-size:14px;
					}
				}

			}
		}
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
			.tab{
				height: 50px;
				padding: 0px 18px;
				span{
					display: inline-block;
					font-size: 16px;
					line-height: 46px;
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
</style>