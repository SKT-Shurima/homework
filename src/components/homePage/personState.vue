<template>
	 <div class="right-footer">
        <ul class="pages-text">
         	<li class="dynamicsList" v-for='(item,index) in dataLists'>
         		<dl v-if="item.target_type==4" @click='checkDeatil(item.target_type,item.id,item.review_id,item.real_name)'>
         			<dt>
         				{{item.real_name}}老师给{{item.target_name}}单独发布作业
         			</dt>
         			<dd>{{item.question_time | timeTrans}}</dd>
         		</dl>
         		<dl v-if="item.target_type==5" @click='checkDeatil(item.target_type,item.id,item.review_id,item.real_name)'>
         			<dt>
         				{{item.real_name}}老师批改{{item.target_name}}作业
         			</dt>
         			<dd>{{item.question_time | timeTrans}}</dd>
         		</dl>
         		<dl v-if="item.target_type==6" @click='checkDeatil(item.target_type,item.id,item.review_id,item.real_name)'>
         			<dt>
         				{{item.real_name}}给{{item.target_name}}班级布置了统一作业
         			</dt>
         			<dd>{{item.question_time | timeTrans}}</dd>
         		</dl>
         		<dl v-if="item.target_type==7" @click='checkDeatil(item.target_type,item.id,item.review_id,item.real_name)'>
         			<dt>
         				{{item.real_name}}老师给{{item.target_name}}作业进行了知识点关联
         			</dt>
         			<dd>{{item.question_time | timeTrans}}</dd>
         		</dl>
         	</li>
        </ul>
      	<div class="pages">
	        <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	    </div>
    </div>
</template>
<script type="text/javascript">
import pagination from '../common/pagination'
import {getTeacherInfo} from '../plugins/js/api.js'
import {timeTrans} from '../plugins/js/filter.js'
	export default {
		data(){
			return{
				pagesize: 100,
				teacher_id:'',
				pageNum:1,
				pagesize:0,
				dataLists:[],
				real_name:''

			}
		},
		components:{
			pagination,
		},
		filters:{
			timeTrans

		},
		mounted(){
            this.login_id = this.$route.query.login_id;
            this.getTeacherInfoFn();
		},
		methods:{
			checkDeatil(mask,id,review_id,real_name){
				this.real_name = real_name;
				if(mask==4){
					this.$router.push({path: '/homeworkInfo?view=${mask}',query:{question_id:id,real_name:real_name}});
				}else if(mask==5){
					this.$router.push({path: '/correctInfo?view=${mask}',query:{review_id:review_id,real_name:real_name}});
				}
			},
			getTeacherInfoFn(){
				let params = {
					teacher_id:this.login_id,
					pageNum : this.pageNum,
					type:0
				};
				getTeacherInfo(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.pagesize = data.work.pageCount;
						this.dataLists = data.work.data;						
					}
				});

			},
			changePage(val){
				this.pageNum = val;
				this.getTeacherInfoFn();

			}
		}
	}
</script>
<style type="text/css" lang='scss' scoped>

		.right-footer{
			overflow:hidden;
			padding-top:30px;
			.pages-text{
				overflow:hidden;
				width:500px;
			}
			.dynamicsList{
				font:14px SimSun;
				overflow:hidden;
				line-height:36px;
				cursor: pointer;
				dl{
					overflow: hidden;
				}
				dt{
					color:#111111;
					float:left;
				}
				dd{
					color:#999999;
					float:right;
				}
			}


		}
</style>