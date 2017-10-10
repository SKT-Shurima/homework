<template>
  <div class="right-footer">
     <div class="pages-text">
      <router-link to='/homeworkIndfo'>
        <p><span>陈家栋讲解了知识点关联</span><span>刚刚</span></p>
      </router-link>
      <router-link to='/correctInfo'>
        <p><span>陈家栋批改了知识点关联</span><span>刚刚</span></p>
      </router-link>
       <p><span>陈家栋讲解了知识点关联</span><span>50分钟前</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>2小时前</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>昨天</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>2015-01-02</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>刚刚</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>50分钟前</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>2小时前</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>昨天</span></p>
       <p><span>陈家栋讲解了知识点关联</span><span>2015-01-02</span></p>
     </div>
  	 <div class="pages">
        <pagination :pagesize='pagesize' @changePage='changePage'></pagination>
      </div>
  </div>
</template>
<style lang='scss'>
  	.right-footer{
				overflow:hidden;
				
				padding-top:30px;
				.pages-text{
					overflow:hidden;
					width:500px;
				}
				p{
					font:14px SimSun;
				    
					overflow:hidden;
					line-height:36px;
					span:first-child{
						color:#111111;
						float:left;
					}
					span:last-child{
						color:#999999;
						float:right;
					}
				}
			}
</style>