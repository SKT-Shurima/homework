<template>
	<div class="home-bottom" v-if="knowContent.question_state==1">
		<div class="ex-top ex-text">
	        <i class="ex-point"></i><span>易错知识点</span>
	    </div>
	    <div class="bottom-head">
	       <ul>
	          <li><span @click="tabIndex=1" :class="{isTab:tabIndex===1}">近一次</span></li>
	          <li><span @click="tabIndex=2" :class="{isTab:tabIndex===2}">近一周</span></li>
	          <li><span @click="tabIndex=3" :class="{isTab:tabIndex===3}">近一月</span></li>
	          <li><span @click="tabIndex=4" :class="{isTab:tabIndex===4}">全部</span></li>
	       </ul>
	    </div>
	    <ul class="bottom-body">
	       	<li v-for='(item,index) in series_error' class="workList">
	       		<dl>
	       			<dt>题{{item.code}}</dt>
	       			<dd :style='{width:index*50+"px"}'></dd>
	       		</dl>
	       		<dd class="detail">
	   				<span>{{item.error_count}}人次</span>
	   				<em v-if="item.name">知识点:{{item.name}}</em>
	   				<em v-else>尚未对此题关联知识点</em>
	       		</dd>
	       </li>
	    </ul>
	</div>
</template>
<script type="text/javascript">
import {getQuestionInfo} from "../plugins/js/api.js"
	export default {
		data(){
			return {
				tabIndex: 1,
				knowContent:{},
				series_error:[]

			}
		},
		mounted(){
			this.getQuestionInfoFn();
		},
		methods:{
		    getQuestionInfoFn(){
	        	let params ={
	        		question_id:3656,
	        		login_id:this.getCookie('login_id')
	        	};
	        	var that = this;
	        	getQuestionInfo(params).then((res)=>{
	        		let {des, status, data} = res;
	        		if(status==0){
	        			that.knowContent = data.question;
	        			that.series_error = data.series_error;
	        		}
	        	})
	        }

		}
	}
</script>
<style type="text/css" lang='scss' scoped>
.ex-top{
		overflow:hidden;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #ddd;
		.ex-point{
			display: inline-block;
			width:8px;
			height:8px;
			vertical-align: 2px;
			background-color:#2bbe65;
		}
		span{
			padding-left:6px;
			font-size:16px;
			font-weight:bold;
			color:#2bbe65;
		}
	}
	.home-bottom{
		overflow:hidden;
		padding:0px 30px 30px;
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
					width:200px;
				}
				dd{
					float: left;
					height: 14px;
					background: #ff8a4a;
					border-radius:7px;
				}
			}
		}
		.bottom-head{
			margin-top: 20px;
			ul{
				list-style: none;
				overflow: hidden;
				li{
					float:left;
					width:100px;
					text-align: center;
					span{
						display: inline-block;
						height:30px;
						width:78px;
						border-radius:15px;
						border:1px solid transparent;
						font-size:14px;
						line-height:28px;
						text-align:center;
						cursor: pointer;
					}
					.isTab{
						border-color: #2bbe65;
						color: #2bbe65;
					}
				}
			}
			
		}
	}
</style>