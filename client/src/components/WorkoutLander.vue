<template>
    <form id="createWorkout" @submit.prevent="saveWorkoutData">
        <workout-form ref="workoutForm"></workout-form>
        <div class="form-row submitBtn">
          <button id="submitForm"
            type="submit"
            class="btn btn-outline-success btn-lg">{{ buttonCTA }}</button>
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

      // If this is not just to save an exercise
      if (!this.$store.state.saveOnly) {
        // Switch to the timer page
        this.$router.push({ name: 'TimerPage' });
      } else {
        // update the database with the workout in store
        // use settimeout so vars have second to store
        setTimeout(this.updateDB, 1000, this.$store.state.workout);
      }
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
