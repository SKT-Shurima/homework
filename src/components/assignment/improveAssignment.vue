<template>
   <div class="wrap">
		<div class="home-body">
		   <div class="body-top  ex-top">
		      <i class="ex-point"></i><span class="ex-span">完善题目信息</span>
		   </div>
		   <div class="body-middle">
		        <p>注：如果学生已经知道作业题目，则可跳过这一步</p>
		        <div class="task-class">
		            <div class="taskPos task-title">
		                <span>作业题目：</span>
		            </div>
		            <div class="taskPos task-content">
		            	<textarea  v-model="content" placeholder="这里是本次作业的题目信息">
		            	</textarea>
		            </div>
		        </div>
		        <div class="task-class">
		            <div class="taskPos task-title">
		                <span>插入图片：</span>
		            </div>
		            <div class="taskPos task-imgs">
		                <el-upload 
		                  name="files"
						  action="/MutualLearnWritingShow/moblieInterface/uploadImgs.jhtml"
						  list-type="picture-card"
						  :on-preview="handlePictureCardPreview"
						  :on-remove="handleRemove"
						  :on-success="handleAvatarSuccess">
						   <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog v-model="dialogVisible" size="tiny">
						    <img width="100%" :src="dialogImageUrl" alt="">
					    </el-dialog>
		            </div>
		        </div>
		   </div>
		    <div class="body-top  ex-top">
		      <i class="ex-point"></i><span class="ex-span">选择评改方向(必填)</span>
		   </div>
		   <div class="body-middle" style="width:70%;">
		      <p></p>
		      <div class="class-select" v-for="(item, index) in compositions">
		           <span :class="{selectedClass:isSelWork==index}"  @click="selWorkClass(index)">{{item.need}}</span>
		           <img v-if="isSelWork==index" src="../img/pitch_on_triangle.png"/>
		        </div>
		        <div class="class-select">
		           <span :class="{selectedClass:isSelWork==7}"  @click="selWorkClass(7)">
		           自定义(10字以内)</span>
		           <img v-if="isSelWork==7" src="../img/pitch_on_triangle.png"/>
		        </div>
		   </div>
		   <div class="footer">
			   <router-link to="/assignmentoneStep">
			         <el-button :plain="true" style="width:150px" type="success">上一步</el-button>
			    </router-link>
			        <el-button style="width:150px" type="success" @click="publishAssignment">发布</el-button>
		   </div>
		</div>
		<compontent :is='currentView'></compontent>
	</div>
</template>
<script>
import {uploadImgs,createGroupWork} from '../plugins/js/api.js'
	export default {
		data(){
			return{
				tabIndex: 1,
				processBar:20,
				isSelected:{},
				isSelWork:0,
				compositions:[{need:'全部'},{need:'内容'},{need:'结构'},{need:'语言'},{need:'中心'},{need:'立意'},{need:'思想'}],
				currentView:'',
				query:{},
				dialogImageUrl: '',
                dialogVisible: false,
                selectedClasses:[],
                content:'',
                enclosure:'',
                enclosureList:[],
                customContent:"",
                review_direction_type:''

			}
		},
		mounted(){
			this.$nextTick(()=>{
			});
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			selWorkClass(index){
				this.isSelWork = index;
				if(index==0){
					this.review_direction_type=0;
				}else{
					this.review_direction_type=1;
				}
				if(index==7){
					this.$prompt("请输入自定义内容", '提示', {
			            confirmButtonText: '确定',
			            cancelButtonText: '取消',
			        }).then(({ value }) => {
			          this.customContent = value;
			            this.$message({
			                type: 'success',
			                message:"你的自定义内容是:" + value,
			           });
			        }).catch(() => {
			            this.$message({
			            type: 'info',
			            message: '取消输入'
			        });       
			      });
				}
			},
			selectClass(index){
				if(this.isSelected[index]){
					this.$set(this.isSelected,index,false)
				}else{
					this.$set(this.isSelected,index,true)
				}
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    handleAvatarSuccess(response, file, fileList){
		    	this.enclosureList = [];
		    	for(var i=0;i<fileList.length;i++){
		    		this.enclosureList.push(fileList[i].response.data);
		    	}
		    	this.enclosure = this.enclosureList.join(';');
		    	
		    },
		    publishAssignment(){
		    	var content_type ;
	        	if(this.enclosureList.length>0&& this.content==''){
	        		content_type = 2; 
	        	}else if(this.enclosureList.length==0&&this.content){
	        		content_type = 1;
	        	}else{
	        		content_type = 3;
	        	}
	        	var classIds = this.$route.query.selectedClasses;
	        	var class_id  = [];
	        	var fenlei_id = [];
	        	for(var i= 0; i<classIds.length;i++){
	        		class_id.push(classIds[i].id);
	        		fenlei_id.push(classIds[i].fenlei_id);
	        	}
	        	class_id.join(';');
	        	fenlei_id.join(';');
		    	let params = {
		    		login_id:this.getCookie("login_id"),
	        		model_id:this.getCookie('model_id'),
	        		content:this.content,
	        		class_id:class_id,
	        		fenlei_id:fenlei_id,
	        		content_type:content_type,
	        		enclosure:this.enclosure,
	        		review_direction:this.customContent,
	        		review_direction_type:this.review_direction_type
		    	};
		    	createGroupWork(params).then((res)=>{
		    		let {desc, status, data} = res;
		    		this.errorInfo(status, desc);
		    	})

		    }
		},
	}
</script>
<style lang='scss' scoped>
 @import url("./../plugins/css/header.css");
 @import url("./../plugins/css/common.css");
 $primary:#2bbe65;
.wrap{
	width: 1170px;
	.home-body{
		overflow:hidden;
		margin-top:30px;
		width:1170px;
		background-color:#fff;
		padding:30px;
		.footer{
			padding:50px 0px;

		}
		.body-top{
			overflow:hidden;
			width:1105px;
			border-bottom:1px solid #dddddd;
			display:inline-block;
		}
		.body-middle{
			overflow:hidden;
			font-size:16px;
			p{
				padding-top:20px;
				font-size:14px;
				color:#999999;
			}
			.task-class{
				overflow:hidden;
				margin-top:20px;
				.taskPos{
					float:left;
					font-size:15px;
				}
				.task-title{
					padding:12px 10px 0px 0px;
				}
				.task-content{
					overflow:hidden;
					textarea{
						font-size:13px;
						border-color:#dcdcdc;
						line-height: 20px;
						height:90px;
						width:700px;
						outline: none;
						padding:10px;

					}
				}
				.task-imgs{
					overflow:hidden;
					img{
						margin:0px 20px 20px 0px;
						width:100px;
					}

				}
			}
			.class-select{
				overflow:hidden;
				float:left;
				margin-right:20px;
				position:relative;
				span{
					display:block;
					margin-top:20px;
					font-size:13px;
					float:left;
					padding:8px 30px;
					border:1px solid #DCDCDC;
					

				}
				span:hover{
					border:1px solid $primary;
				}
				.selectedClass{
					border:1px solid $primary;
				}
				img{
					position:absolute;
					z-index:999;
					right:0;
					bottom:0;
				}

			}
		}
	
	}
	
	
	
}
</style>