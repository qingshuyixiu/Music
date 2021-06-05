import Vue from 'vue'
import VueRouter from 'vue-router'
import Recomment from '../views/Recomment.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/Recomment'
    },
    {
        path: '/Recomment',
        name: 'Recomment',
        component: Recomment,
        meta: {
            hideNav: false
        },
    },
    {
        path: '/Hot',
        name: 'Hot',

        component: () =>
            import ('../views/Hot.vue'),
        meta: {
            hideNav: false
        },
    },
    {
        path: '/Search',
        name: 'Search',
        component: () =>
            import ('../views/Search.vue'),
        meta: {
            hideNav: true
        },
    },
    {
        path: '/SongList',
        name: 'SongList',
        component: () =>
            import ('../views/SongList.vue'),
        meta: {
            hideNav: false
        },
    },
    {
        path: '/songitem/:id',
        name: 'songitem',
        props: true,
        component: () =>
            import ('../views/Songitem.vue'),
        meta: {
            hideNav: true
        },
    },
    {
        path: '/AlbumReviews/:id',
        name: 'AlbumReviews',
        props: true,
        component: () =>
            import ('../views/AlbumReviews.vue'),
        meta: {
            hideNav: true
        },
    },
    {
        path: '/Mv',
        name: 'Mv',
        //props: true,
        component: () =>
            import ('../views/Mv.vue'),
        meta: {
            hideNav: false
        },
    },
    {
        path: '/MvPlay/:id',
        name: 'MvPlay',
        props: true,
        component: () =>
            import ('../views/MvPlay.vue'),
        meta: {
            hideNav: true,
            playshow: true
        },
    },

]

const router = new VueRouter({
    routes
})

export default router