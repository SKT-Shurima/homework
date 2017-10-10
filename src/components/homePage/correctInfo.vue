<template>
   <div class="wrap">
		<div class="home-top">
		  <span class="header-span">老师信息</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">{{real_name}}</span><i class="header-i">&nbsp;&gt;&nbsp;</i>
		  <span class="header-span">批改详情</span>
		  <a class="header-a" href='javascript:void(0)' @click='back'>返回</a>
		</div>
		<div class="home-body">
		    <div class="body-left">
		        <div class="image-top">
		            <img src="../img/correcting_previous_off.png"/>
		        </div>
		        <div class="image-middle">
		        	<div class="img-large"  style="display: none;">
		        	  <canvas class="drawPic" id="drawPic" @click="eventVoice" width="800" height="800">
						Your browser does not support the HTML5 canvas tag.
					  </canvas>
				        <!-- <img :src="src" alt="" @click='currentImg=src;maskBol=true' width="200">
				      <img src="../img/correcting_zoom_big.png"/> -->
				    </div>
				    <div class="conbineImages">
				        <canvas id="combineCanvas"   width="800" height="800" style="background-repeat: no-repeat;background-size: 100% 100%" :style="{backgroundImage:'url('+originalImg+')'}">
				        </canvas>
				    </div>
			       	<transition name='fade'>
			        	<div class="mask" v-show='maskBol' @click='maskBol=false' >
							<div class="maskBox" @click.stop='maskBol=true'>
								<img :src="currentImg" alt="">
							</div>
						</div>
			        </transition>
		        </div>
		        <div class="image-bottom">
		        	<img src="../img/correcting_next_on.png"/>
		        </div>
		    </div>
		    <div class="body-right">
		        <div class="image-top">
		        	<img src="../img/correcting_previous_off.png"/>
		        </div>
		        <ul class="image-middle">
		         	<li  v-for='(img,index) in drawImages' @click='selectImage(index)'>
		         		 <img :src="img"  :class='{"isClick":imgIndex===index}'/>
		         		 <canvas class="drawPic" id="cccc" width="200" height="200">
						   Your browser does not support the HTML5 canvas tag.
					     </canvas>
		         	</li>
		        </ul>
		        <div class="image-bottom">
		        	<img src="../img/correcting_next_on.png"/>
		        </div>
		    </div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {getImagePreview} from '../plugins/js/api.js'
import correct_wrong from '../img/correct_wrong.png'
import correct_right from '../img/correct_right.png'
import correct_halfRight from '../img/correct_halfRight.png'
import correct_voice from '../img/correct_voice.png'
	export default {
		data(){
			return{
				src:'https://img.alicdn.com/tps/i4/TB1VAsyXE6FK1Jjy1XbSutovXXa.jpg_q100.jpg',
				currentImg: "",
				maskBol: false,
				imgIndex: 0,
				drawData:{},
				drawImages:[],
				voice:'',
				image:'',
				originalImg:'',
				real_name:''
			}
		},
		methods:{
			back(){
				this.$router.back(-1);
			},
			changePage(val){

			},
			eventVoice(ev){
				var c=document.getElementById("drawPic");
				var ctx=c.getContext("2d");
				var isRight = this.drawData.k_event_0;
				for(var k = 0; k< isRight.length; k++){
					if(isRight[k].eventType==2){
						var x = isRight[k].x*800;
				        var y = isRight[k].y*800;
				        ctx.rect(x,y-8,50,50);
				        var evx, evy;  
					    if (ev.layerX || ev.layerX == 0) {  
					        evx = ev.layerX;  
					        evy = ev.layerY;  
					    }else if (ev.offsetX || ev.offsetX == 0) { // Opera  
					        evx = ev.offsetX;  
					        evy = ev.offsetY;  
					    }  

				        if(ctx.isPointInPath(evx, evy)){
				        	ctx.stroke();
				        	var audio = document.createElement("audio");
				        	alert(this.voice);
							audio.src = this.voice;
							audio.play();
				        }
				        
				    }
				}
				

			},
			selectImage(index){
				this.imgIndex = index;
				this.originalImg = this.drawImages[index];
				this.drawPic(index);

			},
			getEventPosition(ev){
				var x, y;  
			    if (ev.layerX || ev.layerX == 0) {  
			        x = ev.layerX;  
			        y = ev.layerY;  
			    }else if (ev.offsetX || ev.offsetX == 0) { // Opera  
			        x = ev.offsetX;  
			        y = ev.offsetY;  
			    }  
			    return {x: x, y: y}; 
			},
			drawPic(t){
				var c = document.getElementById("drawPic");
				var ctx=c.getContext("2d");
				ctx.clearRect(0,0,800,800);
		        ctx.strokeStyle = "red";
		        var lenImages = this.drawImages.length;
		        var lines = this.drawData["k_paint_board_"+t];
			    var isRight = this.drawData["k_event_"+t];
                var img = []; 
                for(var k = 0; k< isRight.length; k++){
			    	if(isRight[k].eventType==1){
			    		img[k] = new Image();
				        if(isRight[k].modType==1){
				        	img[k].src = correct_right;
				        }
				        if(isRight[k].modType==2){
				        	img[k].src = correct_wrong;
				        }
				        if(isRight[k].modType==3){
                           img[k].src = correct_halfRight;
				        }
				        var x = isRight[k].x*800;
				        var y = isRight[k].y*800;
				        //设置字体大小
				        ctx.font = "14px Courier New";
					    //设置字体填充颜色
					    ctx.fillStyle = "red";
				        ctx.drawImage(img[k],x,y,50,50);
				        ctx.fillText('题'+isRight[k].text, x, y+70);  	
			    	}
			    	if(isRight[k].eventType==2){
			    		var imageVoice = new Image();
			    		imageVoice.src = correct_voice;
			    		this.voice = isRight[k].recordSource;
			    		var x = isRight[k].x*800;
				        var y = isRight[k].y*800;
				        ctx.font = "14px Courier New";
				        ctx.fillStyle = "black";
				        ctx.drawImage(imageVoice,x,y);
				        ctx.fillText(Math.round(isRight[k].recordTime), x+30, y+20);
			    	}
			    }
			    for(var i = 1; i<lines.length;i++){
			    	var len = lines[i].move.length;
			    	var points = lines[i].move;
			    	if(lines[i].type==1||lines[i].type==3){
			    		if(points.length>0){
			                ctx.beginPath();
				    		ctx.moveTo( lines[i].start.x*800,lines[i].start.y*800);
				    		for(var j=0;j<len;j++){
		                        ctx.lineTo(points[j].x*800,points[j].y*800);
				    	    } 
				    	    ctx.stroke(); 
				    	    ctx.closePath();
			    	    
					   }
			    	}
			    	if(lines[i].type==2){
			    		ctx.beginPath();
			    		for(var j=0;j<len;j++){
					        ctx.save();
					        ctx.arc(points[j].x*800,points[j].y*800,10,0,Math.PI*2,false)
					        ctx.clip();
					        ctx.clearRect(0,0,800,800)
					        ctx.restore()					        
					    }
					    ctx.closePath();						
			    	}
			    	if(lines[i].type>=4&&lines[i].type<=6){
			    		ctx.font = "14px Courier New";
					    ctx.fillStyle = "red";
					    ctx.fillText(lines[i].text, lines[i].start.x*800, lines[i].start.y*800);  	
			    	}
			    }
			    var img = c.toDataURL("image/png");
			    var combineC= document.getElementById("combineCanvas");
			    var combineCtx = combineC.getContext("2d");
			    var combineImg = new Image();
			    var floatImg = new Image();
			    combineImg.src=img;
			    combineCtx.clearRect(0,0,800,800);
			    combineCtx.drawImage(combineImg,0,0,800,800);
			    var image = combineC.toDataURL("image/png");
			},
			getImagePreviewFn(){
				let params = {
					login_id:this.getCookie("login_id"),
					review_id:this.getHashReq().review_id
				};
				getImagePreview(params).then((res)=>{
					let { desc, status, data} = res;
				    let that  = this;
					if(status === 0){
						this.drawData = eval('(' + data.review.review_path + ')');
						this.drawImages = data.review.my_answer.split(';');
						this.drawPic(0);
						this.originalImg = this.drawImages[0];
						var big = document.getElementById('') 
					}else{
						this.errorInfo(status,desc)
					}
				})
			}
		},
		mounted(){
			this.getImagePreviewFn();
		    this.$nextTick(()=>{
		    	this.real_name = this.$route.query.real_name;
		      	
		    })
	    }
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width:1170px;
		.home-body{
			overflow:hidden;
			margin-top:30px;
			width:1170px;
			background-color:#fff;
			padding:30px;
		}
	
		.home-body{
			overflow:hidden;
			.body-left{
				overflow:hidden;
				float:left;
				width:810px;
				.image-top , .image-bottom{
					width:100%;
					text-align:center;
				}
				.image-middle{
					width:100%;
					padding:20px 0px;
					.img-large{
						overflow:hidden;
						position:relative;
						width:800px;
						height:100%;
						.drawPic{
							position:absolute;
							top:0;
							left:0;
							z-index:88
						}
						img:last-child{
							position:absolute;
							width:14px;
							top:28px;
							right:20px;
					
						};
						img:first-child{
							width:800px;
						}
						
					}
					
				}
			}
			.body-right{
				overflow:hidden;
				float:left;
				padding-left:40px;
				width:250px;
				.image-top , .image-bottom{
					text-align:center;
				}
				.image-middle{
					overflow: hidden; 
					float:left;
					padding:20px 0px;
					li{
						position:relative;
						width: 200px;
						height:200px;
						margin-bottom: 20px;
						.drawPic{
							position:absolute;
							top:0;
							left:0;
							z-index:88
						}
					}
					img{
						width: 100%;
						height:100%;
						border: 3px solid transparent;
					}
					.isClick{
						border-color: #2bbe65;
					}
				}
			}
		}
		.mask{
			position: fixed;
			width: 100%;
			height:100%;
			top:0px;
			left:0px;
			z-index: 99;
			background-color: rgba(0,0,0,.7);
			.maskBox{
				position: absolute;
				top: 25%;
				left: 0px;
				right: 0px;
				bottom: 0px;
				margin: auto;
				width: 800px;
				img{
					width:100%;
				}
			}
         }
         
	}
	 .fade-enter-active, .fade-leave-active{
			  transition: all 0.5s ease     
	  }
	.fade-enter, .fade-leave-active{
		  opacity: 0
		}
</style>
