import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
//BoardList.vue를 BoardList로 import
import BoardList from '@/views/board/BoardList.vue';
//BoardDetail.vue를 import
import BoardDetail from "@/views/board/BoardDetail.vue";
import BoardWrite from '@/views/board/BoardWrite.vue';
import Login from "@/views/auth/Login";
import Signup from "@/views/auth/Signup";
import Comments from "@/views/comments/Comments";
import LoginWithOAuth from "@/views/auth/LoginWithOAuth";

const routes = [
    {
        path: '/',
        name: 'PageHome',
        component: PageHome
    },
    {
        path: '/login',
        name: 'Login',
        component: Login //로그인 컴포넌트 추가
    },
    {
      path: '/loginWithOAuth',
      name: 'LoginWithOAuth',
      component: LoginWithOAuth // 로그인 OAuth시에는 다른곳으로 받아 store로 토큰저장`
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup // signup 컴포넌트 추가
    },
    {
        path: '/about',
        name: 'PageAbout',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
    },
    {
        // BoardList router경로 ,이름 등록, compoenet로 import해놓은것사용
        path: '/board/list',
        name: 'BoardList',
        component: BoardList
    },
    {
        path: '/board/detail',
        name: 'BoardDetail',
        component: BoardDetail
    },
    {
        path: '/board/write',
        name: 'BoardWrite',
        component: BoardWrite
    },
    {
        path: '/comments',
        name: 'Comments',
        component: Comments
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router