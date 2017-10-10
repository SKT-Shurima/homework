
import VueRouter from 'vue-router'
import Vue from 'vue'
import entry from '../components/entry'
import Home from '../components/Home'
import homeMain from '../components/homePage/homeMain'
import teacherList from '../components/homePage/teacherList'
import homeworkInfo from '../components/homePage/homeworkInfo'
import teacherInfo from '../components/homePage/teacherInfo'
import correctInfo from '../components/homePage/correctInfo'
import Staff from '../components/staff/main'
import studentInfo from '../components/staff/studentInfo'
import assignment from '../components/assignment/main'
import assignmentOneStep from '../components/assignment/assignmentOneStep'
import improveAssignment from '../components/assignment/improveAssignment'
import correctAssignment from '../components/assignment/correctAssignment'
import allClass from '../components/allClass/main'
import allClassInfo from '../components/allClass/allClassInfo'
import taskDetails from '../components/allClass/taskDetails'
import submitRatio from '../components/allClass/submitRatio'
import evaluateRatio from '../components/allClass/evaluateRatio'
import argueCorrect from '../components/allClass/argueCorrect'
import groupDetails from '../components/allClass/groupDetails'
import personHomework from '../components/allClass/personHomework'
import classMessage from '../components/classMessage/main'
import classInfo from '../components/classMessage/classInfo'
import classManagement from '../components/classManagement/main'
import homeManagement from '../components/classManagement/homeManagement'
import studentMessage from '../components/studentMessage/main'
import homeStudentMessage from '../components/studentMessage/homeStudentMessage'

Vue.use(VueRouter)

export default  new VueRouter({
  routes :[
    {
      path: "/",
      component: entry
    },
    {
      path: "/entry",
      component: entry,
    },
    {
      path: "/home",
      component:Home,
      meta:{
                // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,  
      },   
      children: [
        {
          path: '/school',
          component: homeMain,
          children:[
            {
              path: '/',
              component: teacherList
            },
            {
              path: '/teacherList',
              component: teacherList
            },
            {
              path: '/teacherInfo',
              component: teacherInfo
            },
            {
              path: '/homeworkInfo',
              component: homeworkInfo
            },{
              path:'/correctInfo',
              component:correctInfo
            }
          ]
        },
        { 
          path: '/staff',
          component: Staff,
          children:[
            {
              path: '/',
              component: studentInfo
            },
           ]
        },
        {
          path:'/assignment',
          component: assignment,
          children:[
            {
              path:'/',
              component:assignmentOneStep 
            },
            {
              path:'/assignmentOneStep',
              component:assignmentOneStep
            },
            {
              path:'/improveAssignment',
              component:improveAssignment
            },
            {
              path:'/correctAssignment',
              component:correctAssignment
            },
            {
              path:'/personHomework',
              component:personHomework
            }
          ]
        },
        {
          path:'/allClass',
          component: allClass,
          children:[
            {
              path:'/',
              component:allClassInfo
            },
            {
              path:'/allClassInfo',
              component:allClassInfo
            },
            {
              path:'/taskDetails',
              component:taskDetails
            },
            {
              path:'/submitRatio',
              component:submitRatio

            },
            {
              path:'/evaluateRatio',
              component:evaluateRatio
            },
            {
              path:'/argueCorrect',
              component:argueCorrect
            },{
              path:'/groupDetails',
              component:groupDetails
            }
          ]
        },
        {
          path:'/classMessage',
          component:classMessage,
          children:[
            {
              path:'/',
              component:classInfo

            }
          ]
        },
        {
          path:'/classManagement',
          component:classManagement,
          children:[
            {
              path:'/',
              component:homeManagement
            },

          ]
        },
        {
          path:'/studentMessage',
          component:studentMessage,
          children:[
            {
              path:'/',
              component:homeStudentMessage
            },

          ]
        }
        
      ]
    }
  ]
})