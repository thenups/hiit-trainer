<template>
    <div class="fullspan">
        <div class="timerDiv col-md-8">
          <timer-div ref="timerDiv"></timer-div>
        </div>
        <div class="col-md-4">

        </div>
      </div>
</template>

<script>
// imports
import Countdown from '@/components/Countdown.vue';

export default {
  name: 'TimerPage',
  components: {
    'timer-div': Countdown,
  },
  beforeCreate() {
    // If store workout var is empty, redirect to HP
    if (Object.keys(this.$store.state.workout).length <= 0) {
      this.$router.push({ name: 'HomePage' });
    }
  },
  methods: {
  },

};
</script>

<style scoped>

</style>
