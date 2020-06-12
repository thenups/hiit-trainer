<template>
    <form id="createWorkout" @submit.prevent="saveWorkoutData" @reset.prevent="resetWorkoutData">
        <workout-form ref="workoutForm"></workout-form>
        <div class="form-row formBtn">
          <button id="submitForm"
            type="submit"
            class="btn btn-success btn-lg">{{ buttonCTA }}</button>
        </div>
        <div class="form-row formBtn">
          <button id="resetForm"
            type="reset"
            class="btn btn-outline-light btn-lg">Reset</button>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
import WorkoutForm from '@/components/children/WorkoutForm.vue';


export default {
  components: {
    'workout-form': WorkoutForm,
  },
  computed: {
    buttonCTA() {
      if (this.$store.state.saveOnly) {
        return 'Save Workout';
      }
      return 'Start Workout';
    },
  },
  methods: {
    saveWorkoutData() {
      // Save child data to veux
      this.$refs.workoutForm.saveWorkout();

      // If this is to save a workout
      if (this.$store.state.saveOnly) {
        // update the database with the workout in store
        // use settimeout so vars have second to store
        setTimeout(this.updateDB, 1000, this.$store.state.workout);
      } else {
        // Switch to the timer page
        this.$router.push({ name: 'TimerPage' });
      }
    },
    resetWorkoutData() {
      this.$refs.workoutForm.resetWorkout();
    },
    // Save workout to DB
    updateDB(payload) {
      // Path to API
      const path = 'http://localhost:5000/api/1.0/workouts';

      // Post Data
      axios.post(path, payload)
        .then(() => {
          // navigate to workouts page after
          this.$router.push({ name: 'WorkoutsPage' });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
  .formBtn button{
    width: 60%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }

  /* .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  } */

</style>
