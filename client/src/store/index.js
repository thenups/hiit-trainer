import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workout: {},
    workoutInProgress: {
      exercise: '',
      nextExercise: '',
    },
  },
  mutations: {
    createWorkout(state, workout) {
      state.workout = workout;
    },
  },
  actions: {
  },
  modules: {
  },
});
