<template>
	 <div class="wrap">
       <div class="problemsTable">
		       <table class="tableList" cellpadding="10" cellspacing="0" border="0">
		          <tr class="listTitle" >
		          	 <th>时间</th>
		          	 <th>布置作业次数</th>
		          	 <th>批改作业次数</th>
		          	 <th>关联知识点次数</th>
		          	 <th>操作作业秀时间</th>
		          	 <th>实际所花时间</th>
		          </tr>
		          <tr class="listContent">
		             <td>今日</td>
		          	 <td>{{todayStatistics['4']-0 + todayStatistics['6']-0}}</td>
	       			 <td>{{todayStatistics['5']}}</td>
	       			 <td>{{todayStatistics['7']}}</td>
	       			 <td>{{todayStatistics.real_time | hours}}</td>
	       			 <td>{{todayStatistics.time_length | hours}}</td>
		          </tr>
		           <tr class="listContent">
		             <td>近一周</td>
		          	 <td>{{nearWeek['4']-0+ nearWeek['6']-0}}</td>
	       			 <td>{{nearWeek['5']}}</td>
	       			 <td>{{nearWeek['7']}}</td>
	       			 <td>{{nearWeek.real_time | hours}}</td>
	       			 <td>{{nearWeek.time_length | hours}}</td>
		          </tr>
		           <tr class="listContent">
		             <td>近一月</td>
		          	 <td>{{nearMonth['4']-0 + nearMonth['6']-0}}</td>
	       			 <td>{{nearMonth['5']}}</td>
	       			 <td>{{nearMonth['7']}}</td>
	       			 <td>{{nearMonth.real_time | hours}}</td>
	       			 <td>{{nearMonth.time_length | hours}}</td>
		          </tr>
		           <tr class="listContent">
		             <td>全部</td>
		          	 <td>{{allStatistics['4']-0 + allStatistics['6']-0}}</td>
	       			 <td>{{allStatistics['6']}}</td>
	       			 <td>{{allStatistics['7']}}</td>
	       			 <td>{{allStatistics.real_time | hours}}</td>
	       			 <td>{{allStatistics.time_length | hours}}</td>
		          </tr>
		          <tr class="listContent" v-for='(item,index) in dataLists'>
		          	 <td>{{item['create_time']}}</td>
		          	 <td>{{item['4'] + item['6']}}</td>
	       			 <td>{{item['5']}}</td>
	       			 <td>{{item['7']}}</td>
	       			 <td>{{item.real_time | hours}}</td>
	       			 <td>{{item.time_length | hours}}</td>
		          </tr>

		       </table>
		       <div class="pages" style="text-align:left;;">
	                 <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
	           </div>
		   </div>
		   
    </div>
</template>
<script type="text/javascript">
import {hours} from '../plugins/js/filter.js'
import pagination from '../common/pagination'
import {getTeacherInfo} from '../plugins/js/api.js'
	export default {
		data(){
			return{
				pagesize: 100,
				statisticsList: [],
				pageNum:1,
				pagesize:1,
				todayStatistics:'',
				nearWeek:'',
				nearMonth:'',
				allStatistics:'',
				dataLists:[]
				
			}
		},
		props:{
	        login_id:String
		},
		mounted(){
            this.login_id = this.$route.query.login_id;
            this.getTeacherInfoFn();
		},
		components:{
			pagination
		},
	    filters:{
			hours
		},
		methods:{
			getTeacherInfoFn(){
				let params = {
					teacher_id:this.login_id,
					pageNum : this.pageNum,
					type:1
				};
				getTeacherInfo(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.pagesize = data.work.ageCount;
						this.todayStatistics = data.work.today;
						this.nearWeek = data.work.week;
						this.nearMonth = data.work.month;
						this.allStatistics = data.work.all;
						this.dataLists = data.work.each;

					}

				});

			},
			changePage(val){

			}
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
.wrap{
	width:1170px;
	.problemsTable table td, th{
		border-left: 1px solid #ddd;
		border-top: 1px solid #ddd;
	}
	.problemsTable{
		overflow:hidden;
		width:1040px;
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
}

</style>