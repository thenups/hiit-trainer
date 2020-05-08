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
  props: {
    saveOnly: Boolean,
  },
  components: {
    'workout-form': WorkoutForm,
  },
  computed: {
    buttonCTA() {
      if (this.saveOnly) {
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
      if (!this.saveOnly) {
        // Switch to the timer page
        this.$router.push({ name: 'TimerPage' });
      } else {
        window.setTimeout(this.updateDB, 1000, this.$store.state.workout);
      }
    },
    updateDB(payload) {
      const path = 'http://localhost:5000/workouts';

      axios.post(path, payload)
        .then(() => {
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
