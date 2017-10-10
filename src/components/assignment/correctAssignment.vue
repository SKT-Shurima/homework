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
		            	<textarea v-model="content" placeholder="这里是本次作业的题目信息">
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
		      <i class="ex-point"></i><span class="ex-span">选择批改模式</span>
		   </div>
		   <div class="body-middle" >
		        <p></p>
		        <div class="class-select">
		           <div :class="{selectedClass:isSelWork==1}"  @click="selWorkClass(1)">
		            <p>学生互评(1评1)</p>
		            <p>每名学生评改另一名学生</p>
		            <p>适合大多数学生</p>
		           </div>
		           <img v-if="isSelWork==1" src="../img/pitch_on_triangle.png"/>
		        </div>
		        <div class="class-select">
		           <div :class="{selectedClass:isSelWork==2}"  @click="selWorkClass(2)">
		            <p>学生互评(2评1)</p>
		            <p>每名学生评改另两名学生</p>
		            <p>适合主观题较多的情况</p>
		           </div>
		           <img v-if="isSelWork==2" src="../img/pitch_on_triangle.png"/>
		        </div>
		        <div class="class-select">
		           <div :class="{selectedClass:isSelWork==3}"  @click="selWorkClass(3)">
		            <p>老师批改</p>
		            <p>老师批改全班同学的作业</p>
		            <p>&nbsp;</p>
		           </div>
		           <img v-if="isSelWork==3" src="../img/pitch_on_triangle.png"/>
		        </div>
		        <div class="class-select">
		           <div :class="{selectedClass:isSelWork==4}"  @click="selWorkClass(4)">
		            <p>学生自评</p>
		            <p>学生自己批改自己的作业</p>
		            <p>&nbsp;</p>
		           </div>
		           <img v-if="isSelWork==4" src="../img/pitch_on_triangle.png"/>
		        </div>
		   </div>
		    <div class="body-top  ex-top">
		      <i class="ex-point"></i><span class="ex-span">题号设置</span>
		   </div>
		   <div class="body-middle" >
		       <p>不知道如何设置题号或者不想设置题号，您只需要告诉我们有多少道大题就行了</p>
		       <div class="optionsSelect">
		         <el-checkbox style="font-size:16px;margin-right:20px;" v-model="checked1" @change="isSetQN(checked1,1)" label="不想设置题号" :disabled="checked2"></el-checkbox>
		         <el-select v-model="titleNum" :disabled="checked2" placeholder="请选择大题数量" @change="getTitleNum(titleNum)">
					    <el-option
					      v-for="item in titleOptions"
					      :key="item.title_id"
					      :label="item.title_number"
					      :value="item.title_id">
					    </el-option>
				    </el-select>
		       </div>
		   </div>
		   <div class="body-middle" >
		        <p>注：如果作业题目较多，可以跳过这一步；多道选择题可以合并算作一道大题，填空题，判断题同理</p>
		        <div class="optionsSelect">
		         <el-checkbox style="font-size:16px;margin-right:20px;" v-model="checked2"  @change="isSetQN(checked2,2)" :disabled="checked1" label="设置问题题号"></el-checkbox>
		         
				    <span>数目类型</span>
		            <el-select v-model="titleType" :disabled="checked1" placeholder="请选择">
					    <el-option
					      v-for="item in optionsType"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				    </el-select>
				    <div v-if="isShowTree">
					    <el-tree style="border:0px;"
						  :data="treeData"
						  :props="defaultProps"
						  node-key="id"
						  default-expand-all
						  :expand-on-click-node="false"
						  :render-content="renderContent">
						</el-tree>
				    </div>
		        </div>
		   </div>
		   <div class="body-top  ex-top">
		      <i class="ex-point"></i><span class="ex-span">参考答案</span>
		   </div>
		   <div class="body-middle" >
		      <p>注：老师没有准备参考答案则可跳过这一步，系统自动将成绩最好的学生作业作为参考答案</p>
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
						  :on-remove="handleResultRemove"
						  :on-success="handleResultSuccess"
						  >
						   <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog v-model="dialogVisible" size="tiny">
						    <img width="100%" :src="dialogImageUrl" alt="">
					    </el-dialog>
		            </div>
		        </div>
		   </div>
		   <div class="footer">
			   <router-link :to="{path:'/assignmentoneStep',query:{}}">
			        <el-button :plain="true" style="width:150px" type="success">上一步</el-button>
			    </router-link>
			        <el-button style="width:150px" type="success" @click="publishAssignment">发布</el-button>
		   </div>
		</div>
		<compontent :is='currentView'></compontent>
	</div>
</template>
<script>
import {titleOptions,optionsType} from '../plugins/js/data.js'
import {uploadImgs,createTaskWork} from '../plugins/js/api.js'
 let id = 1000;
	export default {
		data(){
			return{
				tabIndex: 1,
				processBar:20,
				content:'',
				isSelected:{},
				isSelWork:1,
				currentView:'',
				query:{},
				checked1:false,
				checked2:false,
                dialogVisible: false,
                titleOptions:titleOptions,
		        titleType:"1",
		        titleNum:"",
		        isShowTree:false,
		        optionsType:optionsType,
		        treeData:[],
		        review_type:1,
		        enclosure:'',
		        enclosureList:[],
		        number_questions:'',
		        correct_review_pathList:[],
		        defaultProps: {
		          children: 'children',
		          label: 'label',
		          icon:'icon'
		        },
		        numOfTitle:0,
		        signId :0,
		        value: '',
		        questiondata:[],
		        dialogImageUrl:'',
		        numberQS:''
			}
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			isSetQN(val,index){
				if(index==1){
					this.checked1 = val;
				}else if(index==2){
					this.checked2 = val;
					this.treeData = [];
					var treeRoot = new Object();
					treeRoot.id = 0;
					treeRoot.label = "题目树";
					this.treeData.push(treeRoot);
					this.isShowTree = true;
				}
			},
			getTitleNum(titleNum){
				this.number_questions = titleNum;
			},
			selWorkClass(index){
                this.isSelWork = index;
                this.review_type = index;
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
		    handleResultRemove(file, fileList){
		    	console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    handleAvatarSuccess(response, file, fileList){
		    	this.enclosureList = [];
		    	var enclosureLists = [];
		    	for(var i=0;i<fileList.length;i++){
		    		enclosureLists.push(fileList[i].response.data);
		    	}
		    	this.enclosureList = enclosureLists.join(';');
		    },
		    handleResultSuccess(response, file, fileList){
		    	this.correct_review_pathList = [];
		    	var review_pathLists = [];
		    	for(var i=0;i<fileList.length;i++){
		    		review_pathLists.push(fileList[i].response.data);
		    	}
		    	this.correct_review_pathList = review_pathLists.join(';');
		    },
		    append(store, data,node) {
		    	this.$prompt("请输入题号", '提示', {
			            confirmButtonText: '确定',
			            cancelButtonText: '取消',
			        }).then(({ value }) => {
			          this.numberQS = value;
			            this.$message({
			                type: 'success',
			                message:"题号是:" + value,
			           });
			           store.append({ id: node.id, label: "题目"+this.numberQS, children: [] }, data);
			        }).catch(() => {
			            this.$message({
			            type: 'info',
			            message: '取消输入'
			        });       
			    });
			    
		    },
	        remove(store, data) {
	           store.remove(data);
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
	        	var classId = class_id.join(";");
	        	var fenleiId = fenlei_id.join(";");
	        	let params = {
	        		login_id:this.getCookie("login_id"),
	        		model_id:this.getCookie('model_id'),
	        		content:this.content,
	        		content_type:content_type,
	        		review_type:this.review_type,
	        		enclosure:this.enclosureList,
	        		correct_review_pathList:this.correct_review_pathList,
		            number_questions:this.number_questions,
		            questiondata:this.questiondata,
		            class_id:classId,
		            fenlei_id:fenleiId
	        	};
	        	createTaskWork(params).then((res)=>{
	        		let {desc, status, data} = res;
	        		this.errorInfo(status, desc);

	        	});
	        },
	        changed(val,store, data) {
	        	this.questiondata = [];
	        	var zh = ['零','一', '二', '三', '四', '五', '六', '七', '八', '九','十',
				     '十一','十二','十三','十四','十五','十六','十七','十八','十九','二一',
				     '二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十'];
				var zhNum = ['','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'];
				var label="";
				if(store.nodesMap[data.id].childNodes.length>0){
					store.nodesMap[data.id].childNodes=[];
				}
	        	for(var i =0;i<val;i++){
	        		var cId = i+1;
	        		var titleType = this.titleType;
	        		if(this.titleType==1){
						label = "题目"+zh[cId];
					}else if(this.titleType == 2){
						label = "题目("+zh[cId]+')';
					}else if(this.titleType == 3){
						label = "题目"+cId;
					}else if(this.titleType == 4){
						label = "题目("+cId+')';
					}else if(this.titleType == 5){
						label = "题目"+zhNum[cId];
					}else if(this.titleType == 6){
						label = "空栏";
					}
	        		store.append({ id: id++, label: label,icon:titleType, children: [] }, data);
	        	}
	        	this.getArray(store.root.childNodes[0]);
	        },
	        getArray(data){
	        	for (var i in data.childNodes) {
	        		var parseI =i-0+1 ;
	        		this.travel(data.childNodes[i],0,parseI);
                }
	        },
	        travel(data,pindex,index){
	        	//data.code = index;
	        	//data.pcode= pindex;
	        	if(data.childNodes.length==0){
	        		data.is_parent = 0 ;
	        	}
	        	else{
	        		data.is_parent = 1 ;
	        	}
	        	var questionNum = new Object();
	        	questionNum.code = String(index);
	        	questionNum.pcode = String(pindex);
	        	questionNum.is_parent = String(data.is_parent);
	        	questionNum.question_type_id = String(data.icon);
	        	this.questiondata.push(questionNum);
	        	for(var i in data.childNodes){
	        		var parseI =i-0+1 ;
	        		this.travel(data.childNodes[i],index,index+"."+parseI);
	        	}
	        },
			renderContent(h, { node, data, store }) {
				let option = []
	            for (let i = 0; i < this.titleOptions.length; i++) {
	                option.push(
	                    <el-option
	                        key={this.titleOptions[i].title_id}
	                        label={this.titleOptions[i].title_number}
	                        value={this.titleOptions[i].title_id}>
	                    </el-option>
	                )
	            }
				return (
			        <span>
			              {data.id==0?<span style="font-size:18px;">{node.label}</span>:''}
			              {data.id!=0?<span >{node.label}</span>:''}
			            <span style="margin-left:20px;">
			                 {data.id!=0?<em style="font-size:12px;margin-right:20px;">小题数量</em>:''}
			             	<el-select size="small" style="width:100px;margin-right:10px"  value={this.numOfTitle} on-input={(val)=>this.changed(val,store, data)} >
							 {option}
			             	</el-select>
			              
			               {node.level==2?<el-button  size="mini" style="border:0px;color:#2A84C0" on-click={ () => this.remove(store, data) }>删除题目</el-button>:''}
			            </span>
			        </span>);
		    }
					   
		},
		
	}
</script>
<style lang='scss' scoped>
 @import url("./../plugins/css/header.css");
 @import url("./../plugins/css/common.css");
 $primary:#2bbe65;
 .optionsSelect{
 	overflow:hidden;
 	padding:20px 0px;
 	span{
 		padding-right:10px;
 		font-size:16px;
 	}
 	.el-select{
 		margin-right:20px;
 		margin-bottom:20px;
 	}
 }
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
				div{
					margin-top:20px;
					font-size:13px;
					float:left;
					padding:8px 30px;
					border:1px solid #DCDCDC;
					text-align: center;
					p{
						padding:0px;
						line-height:30px;
					}
					p:first-child{
						font-size:16px;
						padding:10px 0px;
						font-weight: bold;
					}
				}
				div:hover{
					border:1px solid $primary;
					cursor:pointer;
					p{
						color:$primary!important;
					}
				}
				.selectedClass{
					border:1px solid $primary;
					p{
						color:$primary!important;
					}
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