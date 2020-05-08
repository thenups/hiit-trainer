import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/Home.vue';
import TimerPage from '../views/Timer.vue';
import SavePage from '../views/SaveWorkout.vue';
import WorkoutsPage from '../views/Workouts.vue';
// import ExercisesPage from '../views/Exercises.vue';
import Ping from '../components/Ping.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/ping',
    name: 'Ping',
    component: Ping,
  },
  {
    path: '/timer',
    name: 'TimerPage',
    component: TimerPage,
  },
  {
    path: '/save',
    name: 'SavePage',
    component: SavePage,
  },
  {
    path: '/workouts',
    name: 'WorkoutsPage',
    component: WorkoutsPage,
  },
  // {
  //   path: '/exercises',
  //   name: 'ExercisesPage',
  //   component: ExercisesPage,
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
