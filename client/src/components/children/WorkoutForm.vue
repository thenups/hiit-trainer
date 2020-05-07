<template>
    <div class="formInputs">
         <div class="" id="exercises">
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
            <input name="reps"
              v-model="reps"
              type="number"
              class="form-control manipulateExBtns"
              placeholder="# of Reps" required>
          </div>
        </div>
    </div>
</template>

<script>
import ExerciseInput from '@/components/children/BuildExerciseList.vue';

export default {
  data() {
    return {
      exercises: [],
      reps: '',
    };
  },
  components: {
    'exercise-input': ExerciseInput,
  },
  methods: {
    newExercise(exercise) {
      if (exercise) {
        this.$refs.exerciseInput.addExercise();
      } else {
        this.$refs.exerciseInput.addRest();
      }
    },
    saveWorkout() {
      // Let child component save exercises
      this.$refs.exerciseInput.sendExercises();

      const payload = [
        {
          type: 'reps',
          data: Number(this.reps),
        },
      ];

      // Save reps to veux/state
      this.$store.commit('createWorkout', payload);
    },
  },
};
</script>


<style scoped>

#workoutAdds {
    width: 100%;
    margin: 15px 6px;
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
