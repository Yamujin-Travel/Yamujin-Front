import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RecommendProductView from '@/views/services/RecommendProductView.vue';
import CompareProductView from '@/views/services/CompareProductView.vue';
import CurrencyConverterView from '@/views/services/CurrencyConverterView.vue';
import SearchBankMapView from '@/views/services/SearchBankMapView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostUpdateView from '@/views/posts/PostUpdateView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/services',
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        component: RecommendProductView,
      },
      {
        path: 'compare',
        name: 'compare',
        component: CompareProductView,
      },
      {
        path: 'exchange',
        name: 'exchange',
        component: CurrencyConverterView,
      },
      {
        path: 'search',
        name: 'search',
        component: SearchBankMapView,
      },
      {
        path: '/posts',
        children: [
          {
            path: '',
            name: 'PostList',
            component: PostListView,
          },
          {
            path: ':id',
            name: 'PostDetail',
            component: PostDetailView,
            beforeEnter: (to) => {
              const id = to.params.id;
              if (isNaN(Number(id))) {
                // id가 숫자가 아니면 404 페이지로 리다이렉트
                return { name: 'NotFound' };
              }
            },
          },
          {
            path: 'write',
            name: 'PostCreate',
            component: PostCreateView,
            // beforeEnter: (to, from) => {
            //   const userStore = useUserStore();
            //   if (!userStore.isAuthenticated) {
            //     alert('로그인 후 이용 가능합니다.');
            //     return { name: 'SignIn' };
            //   }
            // },
          },
          {
            path: ':id/update',
            name: 'PostUpdate',
            component: PostUpdateView,
            // beforeEnter: (to, from) => {
            //   const userStore = useUserStore();
            //   if (!userStore.isAuthenticated) {
            //     alert('로그인 후 이용 가능합니다.');
            //     return { name: 'SignIn' };
            //   }
            // },
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
