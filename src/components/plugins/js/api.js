import axios from 'axios'

// 开发
let base = '/MutualLearnWritingShow' ;
// let base =  'http://192.168.31.119:8080/MutualLearnWritingShow/';
// 测试
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
 


const trans = params => {
    // Do whatever you want to transform the data
    
    return encodeURIComponent(JSON.stringify(params)) ;
}
//获取学校列表
export const  getAllSchool = params=>{
  params =  trans(params);
  return axios.post(`${base}/backstage/bc/getAllSchool.jhtml`,params).then( res => res.data);
}

// 学校登录
export const  managerLogin = params=>{
   params = trans(params);
  return axios.get(`${base}/backstage/bc/managerLogin.jhtml?param=${params}`).then( res => res.data);
}

//获取全校老师信息
export const  getallTeacher = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/bc/getallTeacher.jhtml?param=${params}`).then( res => res.data);
}
//学校搜索老师
export const searchTeacher = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/bc/searchTeacher.jhtml?param=${params}`).then( res => res.data);
}

//获取老师详细信息
export const getTeacherInfo = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/bc/getTeacherInfo.jhtml?param=${params}`).then( res => res.data);
}

//作业图片预览
export const getImagePreview = params=>{
  params = trans(params);
  return axios.get(`${base}/moblieInterface/hbj/getImagePreview.jhtml?param=${params}`).then(res => res.data);
}

//作业详情
export const getQuestionInfo =  params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/bc/getQuestionInfo.jhtml?param=${params}`).then(res => res.data);

}  

//获取学生信息
export const  getStudentInfo = params => {
  params = trans(params);
  return axios.get(`${base}/backstage/bc/getStudentInfo.jhtml?param=${params}`).then(res=>res.data);
} 
//查找学生信息
export const findStudentInfo = params =>{
  params = trans(params);
  return axios.get(`${base}/backstage/bc/findStudentInfo.jhtml?param=${params}`).then(res=>res.data);
}
//获取易错知识点接口
export const easyWrongKnowledge = params =>{
  params = trans(params);
  return axios.get(`${base}/moblieInterface/gw/easyWrongKnowledge.jhtml?param=${params}`).then(res=>res.data);
}
//搜索班级群
export const findClassInfo = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/bc/findClassInfo.jhtml?param=${params}`).then(res=>res.data);
}

//获取班级信息
export const getClassInfo = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/bc/getClassInfo.jhtml?param=${params}`).then(res=>res.data);
}
//班级易错知识点
export const easyWrongKnowledgeforClass = params=>{
  params = trans(params);
  return axios.get(`${base}/moblieInterface/gw/easyWrongKnowledgeforClass.jhtml?param=${params}`).then(res=>res.data);
}
//老师登录学校后台
export const studentLogin = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/tm/studentLogin.jhtml?param=${params}`).then(res=>res.data);
}
//发布班级作业任务
export const createTaskWork = params=>{
  params = trans(params);
  return axios.get(`${base}/moblieInterface/gw/createTaskWork.jhtml?param=${params}`).then(res=>res.data);
}
//发布班级作文任务
export const createGroupWork = params=>{
  params = trans(params);
  return axios.get(`${base}/moblieInterface/gw/createGroupWork.jhtml?param=${params}`).then(res=>res.data);

}
//获取老师所带的班级
export const getTeacherTeachClass = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/tm/getTeacherTeachClass.jhtml?param=${params}`).then(res=>res.data);
}
//获取班级群全部互评任务
export const groupsAllWork = params=>{
  params = trans(params);
  return axios.get(`${base}/backstage/tm/groupsAllWork.jhtml?param=${params}`).then(res=>res.data);
}
//图片上传
export const uploadImgs = params=>{
  params = trans(params);
  return axios.get(`${base}/moblieInterface/uploadImgs.jhtml?param=${params}`).then(res=>res.data);
} 
//班级作业详情
export const GroupsWorkDetailTask  = params=>{
  params = trans(params);
  console.log(params);
  return axios.post(`${base}/moblieInterface/gw/GroupsWorkDetailTask.jhtml?param=${params}`).then(res=>res.data);
}
//获取作品信息
export const getWorkInfo = params=>{
  params = trans(params);
  return axios.get(`${base}/moblieInterface/hbj/getWorkInfo.jhtml?param=${params}`).then(res=>res.data);
}
//小组任务详情
export const getTaskByGroupId = params=>{
  params = trans(params);
  return axios.post(`${base}/moblieInterface/gw/getTaskByGroupId.jhtml?param=${params}`).then(res=>res.data);
}
//班级群资料
export const classGroupData = params=>{
  params = trans(params);
  return axios.post(`${base}/moblieInterface/cg/classGroupData.jhtml?param=${params}`).then(res=>res.data);
}
//学生情况
export const guideStudents = params=>{
  params = trans(params);
  return axios.post(`${base}/moblieInterface/gw/guideStudents.jhtml?param=${params}`).then(res=>res.data);
  
}
//获取知识点
export const getKnowledgePoint = params=>{
  params = trans(params);
  return axios.post(`${base}/moblieInterface/gw/getKnowledgePoint.jhtml?param=${params}`).then(res=>res.data);
}
//关联知识点
export const associationKnowledge = params=>{
  params = trans(params);
  return axios.post(`${base}/moblieInterface/gw/associationKnowledge.jhtml?param=${params}`).then(res=>res.data);
}
//消掉知识点
export const outKnowledge = params=>{
  params = trans(params);
  return axios.post(`${base}/moblieInterface/gw/outKnowledge.jhtml?param=${params}`).then(res=>res.data);
}

//争议评改列表
export const getDisputeTask = params=>{
  params = trans(params);
  return axios.post(`${base}/moblieInterface/gw/getDisputeTask.jhtml?param=${params}`).then(res=>res.data);
}






