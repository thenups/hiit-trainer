import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workout: {},
    workoutTiming: 'unique',
  },
  mutations: {
    // create workout dictionary by iterating through list of values
    createWorkout(state, payload) {
      payload.forEach((element) => {
        state.workout[element.type] = element.data;
      });
    },
    //
    updateSaveOnlyVariable(state, payload) {
      state.saveOnly = payload;
    },
    workoutTimingUpdate(state, payload) {
      state.workoutTiming = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
