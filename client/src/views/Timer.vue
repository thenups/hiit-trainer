<template>
    <div class="fullspan">
        <div class="timerDiv col-md-8">
          <timer-div :workout="workout" ref="timerDiv"></timer-div>
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
  props: ['workout'],
  components: {
    'timer-div': Countdown,
  },
  methods: {
    startTimer(w) {
      this.$refs.timerDiv.startCountdown(w);
    },
  },

};
</script>

<style scoped>

</style>
