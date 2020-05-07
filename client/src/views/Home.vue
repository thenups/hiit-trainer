<template>
  <div class="row justify-content-md-center">
    <div class="header col-12">
        <h3>Create Your Workout</h3>
    </div>
    <div class="">
      <workout-form></workout-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateWorkout from '@/components/CreateWorkout.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    'workout-form': CreateWorkout,
  },
};
</script>

<style scoped>
  h3 {
    font-size: 30px;
    color: rgba(255,255,255,.75);
  }

</style>
