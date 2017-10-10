<template>
   <div class="wrap">
		<div class="home-body">
		   <div class="body-top  ex-top">
		      <i class="ex-point"></i><span class="ex-span">选择班级</span>
		   </div>
		   <div class="body-middle">
		        <p>注：同时可以将作业布置给多个班级</p>
		        <ul class="classList">
		            <li class="class-select" v-for="(item, index) in classLists">
			           <span :class="{selectedClass:isSelected[index]}"  @click="selectClass(index)">{{item.name}}</span>
			           <img v-if="isSelected[index]" src="../img/pitch_on_triangle.png"/>
		            </li>
		        </ul>
		   </div>
		    <div class="body-top  ex-top">
		      <i class="ex-point"></i><span class="ex-span">作业类型</span>
		   </div>
		   <div class="body-middle">
		      <p></p>
		      <div class="class-select" v-for="(item, index) in taskTypes" :key="index">
		           <span :class="{selectedClass:index==indexSign}" :key="index"  @click="selWorkClass(index)">{{item.tip}}</span>
		           <img v-if="index==indexSign" src="../img/pitch_on_triangle.png" :key="index" />
		        </div>
		   </div>
		   <div class="footer">
			   <el-button style="width:150px" type="success" @click="nextStep">下一步</el-button>
		   </div>
		</div>
		<compontent :is='currentView'></compontent>
	</div>
</template>
<script>
import {getTeacherTeachClass} from '../plugins/js/api.js'
	export default {
		data(){
			return{
				tabIndex: 1,
				indexSign:0,
				processBar:20,
				isSelected:{},
				isSelWork:{},
				currentView:'',
				query:{},
				taskTypes:[],
				classLists:[]	
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getTeacherTeachClassFn();
			});
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			selWorkClass(index){
               this.indexSign = index;
			},
			selectClass(index){
				if(this.isSelected[index]){
					this.$set(this.isSelected,index,false)
				}else{
					this.$set(this.isSelected,index,true)
				}
			},
			getTeacherTeachClassFn(){
				let params = {
					login_id:this.getCookie('login_id'),
					model_id:this.getCookie('model_id')
				};
				if(this.getCookie('model_id')==24 || this.getCookie('model_id')==27){
					this.taskTypes = [{tip:'作业'},{tip:'作文'}];
				}else{
					this.taskTypes = [{tip:'作业'}];
				}
				getTeacherTeachClass(params).then((res)=>{
					let {desc, status, data} = res;
					if(status==0){
						this.classLists = data.group;
					}
				})
			},
			nextStep(){

				let selectedClasses = [];
				for(var i =0;i<this.classLists.length;i++){
					if(this.isSelected[i]){
						selectedClasses.push(this.classLists[i]);
					}
				}
				if(selectedClasses.length<=0){
					this.errorInfo('','请选择班级');
					return;
				}
				if(this.indexSign==0){
					this.$router.push({path:'/correctAssignment',query:{selectedClasses:selectedClasses}});
				}else if(this.indexSign==1){
                    this.$router.push({path:'/improveAssignment',query:{selectedClasses:selectedClasses}});
				}
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
			padding:10px 0px;
			width:1105px;
			border-bottom:1px solid #dddddd;
			display:inline-block;
		}
		.body-middle{
			overflow:hidden;
			font-size:16px;
			padding-bottom:10px;
			p{
				padding-top:20px;
				font-size:14px;
				color:#999999;
			}
			.classList{
				overflow:hidden;
			}
			.class-select{
				overflow:hidden;
				float:left;
				margin-right:20px;
				position:relative;
				span{
					margin-top:20px;
					display:block;
					font-size:13px;
					float:left;
					padding:8px 30px;
					border:1px solid #DCDCDC;
				}
				span:hover{
					border:1px solid $primary;
					cursor: pointer;
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