<template>
    <div>
        <div id="exerciseName" class="fullspan">{{ timerInfo.exerciseName }}</div>
        <div id="exerciseTimer" class="fullspan timerNumbers">{{ timerInfo.exerciseTime }}</div>
        <div class="wrapper fullspan bottomRow">
            <div id="repNo"
              class="totalsBoxes">
                Rep:<br />{{ allReps.current }} / {{ allReps.total }}
            </div>
            <div id="totalTimer" class="timerNumbers totalsBoxes">{{ timerInfo.totalTime }}</div>
            <div id="playPause" class="playButton alterTimerBtns" v-if="!paused">||</div>
            <div id="playPause" class="playButton alterTimerBtns" v-if="paused">play</div>
            <div id="cancel" class="alterTimerBtns">X</div>
        </div>
    </div>
</template>

<script>


export default {
  name: 'countdown',
  data() {
    return {
      timerInfo: {
        exerciseTime: '',
        exerciseName: '',
        totalTime: '',
      },
      allReps: {
        current: 1,
        total: 0,
      },
      paused: false,
    };
  },
  methods: {
    startCountdown(workout) {
      // Do 10 second countdown before exercise
      const cd = {
        exercise: {
          time: 5,
          name: 'countdown',
          loc: 'exerciseTime',
          totalTime: this.totalTime(workout),
        },
      };

      // Start countdown
      this.countdown(cd, workout.reps, workout.exercises);
    },
    // Setup Timer with actual workout
    setupTimer(cd, r, e) {
      // first exercise in array
      const n = 0;

      // Create dict for first exercise
      const firstExercise = {
        total: {
          time: cd.exercise.totalTime,
          loc: 'totalTime',
        },
        exercise: {
          time: e[n].time,
          name: e[n].name,
          loc: 'exerciseTime',
        },
      };

      // Start countdown for first exercise
      this.countdown(firstExercise, r, e, n);
    },
    // Countdown given a time
    countdown(etDict, r, e, n) {
      const updatedDict = etDict;

      // Look at dict and countdown 1 second per item
      Object.keys(updatedDict).forEach((key) => {
        this.updateTimer(updatedDict[key].loc, key.time);
        updatedDict[key].time -= 1;
      });
      // for (const [value] of Object.entries(updatedDict)) {
      //   this.updateTimer(value.loc, value.time);
      //   value.time -= 1;
      // }

      // If workout is over
      if (r === 0) {
        this.workoutComplete();

        // What to do with initial countdown to workout
      } else if (!('total' in updatedDict)) {
        if (updatedDict.exercise.time > 0) {
          this.timerInfo.exerciseName = updatedDict.exercise.name;
          window.setTimeout(this.countdown, 1000, updatedDict, r, e);
        } else {
          window.setTimeout(this.setupTimer, 1000, updatedDict, r, e);
        }

        // What to do if the exercise hasn't finished
      } else if (updatedDict.exercise.time > 0) {
        // Write the correct exercise name
        this.timerInfo.exerciseName = updatedDict.exercise.name;
        // continue countdown
        window.setTimeout(this.countdown, 1000, updatedDict, r, e, n);

        // What to do if exercise is over
      } else {
        window.setTimeout(this.nextExercise, 1000, updatedDict, r, e, n);
      }
    },
    // Move to the next exercise for the countdown
    nextExercise(etDict, r, e, n) {
      let updatedDict = etDict;
      let newR = 0;

      // increase exercise number
      let updatedN = n + 1;
      this.allReps.current += 1;

      // if n is in e, then return the next exercise
      if (updatedN < e.length) {
        updatedDict = this.updateTimeDict(updatedDict, updatedN, e);

        // handle end of workout
      } else {
        updatedN = 0;
        updatedDict = this.updateTimeDict(updatedDict, updatedN, e);
        newR = r - 1;
      }

      // Start countdown for next exercise
      this.countdown(updatedDict, newR, e, updatedN);
    },
    // Update time and name for next exercise
    updateTimeDict(etDict, n, e) {
      const updatedDict = etDict;

      updatedDict.exercise.time = e[n].time;
      updatedDict.exercise.name = e[n].name;

      return updatedDict;
    },
    // Finish Workout!
    workoutComplete() {

    },
    // Figure out minutes and seconds to write out clock
    updateTimer(loc, t) {
      let seconds = t;
      const hours = Math.floor(seconds / 3600);
      seconds -= hours * (3600);
      const minutes = Math.floor(seconds / 60);
      seconds -= minutes * (60);

      const timeStr = `${this.leadingZero(hours)}:${this.leadingZero(minutes)}:${this.leadingZero(seconds)}`;

      if (loc === 'exerciseTime') {
        this.timerInfo.exerciseTime = timeStr;
      } else {
        this.timerInfo.totalTime = timeStr;
      }
    },
    // Add leading zero to mm:ss if missing digit
    leadingZero(time) {
      return (time < 10) ? `0${time}` : +time;
    },
    // Go through exercise dict and deterime total time for workout
    totalTime(w) {
      let repTime = 0;

      for (let i = 0; i < w.exercises.length; i += 1) {
        repTime += w.exercises[i].time; // add number to totalTime
      }

      const time = repTime * w.reps;

      // save total number of reps
      this.allReps.total = w.exercises.length * w.reps;

      return time;
    },

  },
  mounted() {
    // console.log('mounted', this.workout, this.$el);
    this.startCountdown(this.workout);
  },
};
</script>

<style scoped>

</style>
