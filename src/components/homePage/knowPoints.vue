	<div class="home-bottom" v-if="knowContent.question_state==1">
		<div class="ex-top ex-text">
	        <i class="ex-point"></i><span>易错知识点</span>
	    </div>
	    <ul class="bottom-body">
	       	<li v-for='(item,index) in series_error' class="workList">
	       		<dl>
	       			<dt>题{{item.code}}</dt>
	       			<dd class="slider">
	       				<div :style='{width:item.error_count/series_error[0].error_count*100+"%"}'></div>
	       			</dd>
	       			<dd class="detail">
	       				<span>{{item.error_count}}人次</span>
	       				<em v-if="item.name">知识点:{{item.name}}</em>
	       				<em v-else>尚未对此题关联知识点</em>
	       			</dd>
	       		</dl>
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
			this.$nextTick(()=>{
				this.getQuestionInfoFn();
			})
		},
		methods:{
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
	        			that.series_error = data.series_error;
	        		}
	        	})
	        }

		}
	}
</script>
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
</style>