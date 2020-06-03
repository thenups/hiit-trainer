<template>
    <div class="formInputs">
        <div class="" id="exercises">
          <time-options></time-options>
          <exercise-input ref="exerciseInput"></exercise-input>
        </div>

        <div class="form-row" id="workoutAdds">
          <div class="updateEx">
            <button @click="newExercise(true)"
              type="button"
              class="btn btn-primary manipulateExBtns"
              data-toggle="button">Exercise</button>
          </div>
          <div class="updateEx">
            <button @click="newExercise(false)"
              type="button"
              class="btn btn-warning manipulateExBtns"
              data-toggle="button">Rest</button>
          </div>
          <div class="updateEx">
            <input name="sets"
              v-model="sets"
              type="number"
              class="form-control manipulateExBtns"
              placeholder="# of Sets" required>
          </div>
        </div>

        <div>
          <save-params v-if="saveOnly" ref="saveVars"></save-params>
        </div>


    </div>
</template>

<script>
import TimeOptions from '@/components/children/TimeOptions.vue';
import ExerciseInput from '@/components/children/BuildExerciseList.vue';
import SaveParams from '@/components/children/SaveWorkoutParams.vue';

export default {
  data() {
    return {
      exercises: [],
      sets: '',
    };
  },
  components: {
    'time-options': TimeOptions,
    'exercise-input': ExerciseInput,
    'save-params': SaveParams,
  },
  computed: {
    saveOnly() {
      return this.$store.state.saveOnly;
    },
  },
  methods: {
    // What to do when user adds exercise or rest
    newExercise(exercise) {
      if (exercise) {
        this.$refs.exerciseInput.addExercise();
      } else {
        this.$refs.exerciseInput.addRest();
      }
    },
    // Save workout to store
    saveWorkout() {
      // Let child components save exercises
      this.$refs.exerciseInput.sendExercises();

      // Save Sets var to state
      const payload = [
        {
          type: 'sets',
          data: Number(this.sets),
        },
      ];
      // Save sets to veux/state
      this.$store.commit('createWorkout', payload);

      // For conditional child
      if (this.$store.state.saveOnly) {
        this.$refs.saveVars.sendSaveVars();
      }
    },
  },
};
</script>


<style scoped>

#workoutAdds {
    width: 100%;
    margin: 15px 5px;
  }

  .updateEx {
    width: 33.333%;
  }

  .manipulateExBtns{
    width: 90%;
  }

  .exerciseRow {
    display:inherit;
  }

  .icon {
    width: 15px;
    height: 15px;
  }

</style>
