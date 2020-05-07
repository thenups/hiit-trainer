<template>
    <form id="createWorkout" @submit.prevent="saveWorkoutData">
        <workout-form ref="workoutForm"></workout-form>
        <div class="form-row submitBtn">
          <button id="submitForm"
            type="submit"
            class="btn btn-outline-success btn-lg">Start Workout</button>
        </div>
    </form>
</template>

<script>
// @ is an alias to /src
import WorkoutForm from '@/components/children/WorkoutForm.vue';

export default {
  props: {
    saveOnly: Boolean,
  },
  components: {
    'workout-form': WorkoutForm,
  },
  methods: {
    saveWorkoutData() {
      // Save child data to veux
      this.$refs.workoutForm.saveWorkout();

      // If this is not just to save an exercise
      if (!this.saveOnly) {
        // Switch to the timer page
        this.$router.push({ name: 'TimerPage' });
      } else {
        this.updateDB();
      }
    },
    updateDB() {

    },
  },
};
</script>

<style scoped>
  .submitBtn button{
    width: 60%;
    margin: auto;
    display: block;
  }

  /* .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  } */

</style>
