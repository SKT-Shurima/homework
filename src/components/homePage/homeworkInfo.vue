<template>
   <div class="wrap">
		<div class="home-top">
		  <span class="header-span">老师信息</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">{{real_name}}</span><i  class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">作业详情</span>
		  <a class="header-a" href='javascript:void(0)' @click='back'>返回</a>
		</div>
		<div class="home-body">
		   <div class="body-top  ex-top">
		      <i class="ex-point"></i><span class="ex-span">作业题目</span>
		   </div>
		   <div class="body-middle">
		       <p v-if="knowContent.content_type==1"> {{knowContent.content}}</p>
		       <div class="publish-time">发布作业的时间：{{knowContent.create_time|dateTime}}  </div>
		       <div class="publish-time">作业截止的时间：{{knowContent.deadline|dateTime}}</div>
		       
		       <div>
		        <ul>
		          <li v-for="ser in series">{{ser.question_name}}</li>
		        </ul>
		      </div>
		      <div class="ex-img" v-if="knowContent.content_type==2">
		        <div v-for="img in imagesContent">
		           <img :src="img"/>
		        </div>
		      </div>
		   </div>
		</div>
		<compontent :is='currentView'></compontent>
	</div>
</template>
<script>
import {getQuestionInfo} from "../plugins/js/api.js"
import fallibility from './fallibility'
import knowPoints from './knowPoints'
import {dateTime} from '../plugins/js/filter.js'
	export default {
		data(){
			return{
				tabIndex: 1,
				processBar:20,
				currentView:'',
				query:{},
				knowContent:{
					create_time:0,
					deadline:0
				},
				imagesContent:[],
				series:[],
				isEnd:'',
				real_name:''
			}
		},
		components:{
			fallibility
		},
		filters:{
			dateTime
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			 getQuestionInfoFn(){
	        	let params ={
	        		question_id:this.getHashReq().question_id,
	        		login_id:this.getCookie('login_id')
	        	};
	        	var that = this;
	        	getQuestionInfo(params).then((res)=>{
	        		let {des, status, data} = res;
	        		if(status==0){
	        			that.knowContent = data.question;

	        			that.series = data.series;
	        			if(that.knowContent.content_type==2){
	        				that.imagesContent = that.knowContent.content.split(';');

	        			}
	        		}
	        	})
	        }
			
		},
		mounted(){
			this.getQuestionInfoFn();
			this.$nextTick(()=>{
				this.currentView = knowPoints;
				this.real_name =this.$route.query.real_name;

			});
		}
	}
</script>
<style lang='scss' scoped>
 @import url("./../plugins/css/header.css");
 @import url("./../plugins/css/common.css");
.wrap{
	width: 1170px;

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
			font-size:14px;
			p:first-child{
				padding:20px 0px;
				font-size:16px;
			}
			.publish-time{
				padding:10px 0px;
			}

			.ex-text{
				padding:45px 0px 20px 0px;
				border-bottom: 1px solid #dddddd;

			}
			.ex-img img{
				margin-top:10px;
				height:90px;
				weight:90px;


			}
		}
	
	}
	
	
	
}
</style>