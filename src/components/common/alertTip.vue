<template>
  <div class="alertWrap">
      <div class="alert-tip-modal"  >
            <div class="modal-alert">
               <div class="alert-title">
                  <p >提示</p>
               </div>
               <div class="alert-text">
                 <p class="alert-title-1st">{{alertObj.alertText}}</p>
               </div>
               <div class="alert-footer">
                     <el-button style="width:100px" type="success" @click="alertObj.isAlert=false">确定</el-button>
               </div>
            </div>
         </div>
  </div>
</template>
<script>
export default{
	data(){
		return {
			
		}
	},
	props:{
        alertObj: {
    		type: Object,
	    },
	},
	methods:{
		
	}

}


</script>
<style lang="scss">
$primary:#2bbe65;

	.alert-tip-modal{
    	width:100%;
    	height:100%;
    	position:fixed;
    	top:0px;right:0px;
    	left:0px;bottom:0px;
    	z-index:1111;
    	background-color: rgba(0, 0, 0, 0.3);
    	
    	.modal-alert{
    		position: absolute;
    		background-color:white;
    		width:500px;
    		z-index:9999;
    		top:50%;left:50%;
    		margin-top:-230px;
    		margin-left:-280px;
    		border-radius:8px;
    		.alert-title{
    			padding:20px;
    			border-bottom:1px solid $primary;
    			text-align:center;
    			font-size:18px;
    			background-color:$primary;
    			color:white;
    			border-radius:8px 8px 0px 0px;


    		}
    		.alert-footer{
    			text-align:center;
    			border-top:1px solid $primary;
    			padding:20px;

    		}

    		.alert-text{
    			border-radius:8px 8px 0px 0px;
    			padding:50px 20px;
    			color:#2bbe65;
    			font-size:22px;
    			font-weight:600;
    			text-align:center;
    		}
    		
    		

    	}
    }
</style>