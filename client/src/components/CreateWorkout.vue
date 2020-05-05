<template>
    <form id="createWorkout" ref="createWorkout" @submit.prevent="startTimer" class="" action="" >
        <div class="" id="exercises">
          <exercise-input ref="exerciseInput" @sendExercises="recieveExercises"></exercise-input>
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

        <div class="form-row submitBtn">
          <button id="startTimer"
            type="submit"
            class="btn btn-outline-success btn-lg">Start Timer</button>
        </div>
    </form>
</template>

<script>
// @ is an alias to /src
import ExerciseInput from '@/components/BuildExerciseList.vue';

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
    startTimer() {
      this.$refs.exerciseInput.sendExercises();
    },
    recieveExercises(e) {
      const fullWorkout = {
        reps: this.reps,
        exercises: e,
      };

      this.$emit('create-workout', fullWorkout);
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

  .submitBtn button{
    width: 60%;
    margin: auto;
    display: block;
  }

  .icon {
    width: 15px;
    height: 15px;
  }

  /* .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  } */

</style>
