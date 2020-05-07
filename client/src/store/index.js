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
    // create workout dictionary by iterating through list of values
    createWorkout(state, payload) {
      payload.forEach((i) => {
        state.workout[i.type] = i.data;
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
