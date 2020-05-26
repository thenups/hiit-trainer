import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workout: {},
  },
  mutations: {
    // create workout dictionary by iterating through list of values
    createWorkout(state, payload) {
      payload.forEach((i) => {
        state.workout[i.type] = i.data;
      });
    },
    //
    updateSaveOnlyVariable(state, payload) {
      state.saveOnly = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
