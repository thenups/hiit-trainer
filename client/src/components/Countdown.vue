<template>
    <div>
        <div id="exerciseName" class="fullspan">{{ timerInfo.exerciseName }}</div>
        <div id="exerciseTimer" class="fullspan timerNumbers">{{ timerInfo.exerciseTime }}</div>
        <div class="wrapper fullspan bottomRow">
            <div id="repNo"
              class="totalsBoxes">
                Rep:<br />{{ allReps.current }} / {{ allReps.total }}
            </div>
            <div id="totalTimer" class="timerNumbers totalsBoxes">
              <div class="separator">{{ timerInfo.totalTime }}</div>
            </div>
            <div id="playPause" class="playButton alterTimerBtns" v-if="!paused">||</div>
            <div id="playPause" class="playButton alterTimerBtns" v-if="paused">play</div>
            <div id="cancel" class="alterTimerBtns">X</div>
        </div>
    </div>
</template>

<script>
// import startExerciseSound from require('./assets/sounds/startExercise.mp3');
// import timesUpSound from require('./assets/sounds/timesUp.mp3');

export default {
  data() {
    return {
      workout: this.$store.state.workout,
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
      sounds: {
        startExercise: 'https://res.cloudinary.com/hgqdmejyd/video/upload/v1590789478/sounds/startExercise_ooyhsn.mp3',
        timesUp: 'https://res.cloudinary.com/hgqdmejyd/video/upload/v1590789478/sounds/timesUp_igoemw.mp3',
      },
      player: new Audio(),
    };
  },
  mounted() {
    // console.log('mounted', this.workout, this.$el);
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      // Do 10 second countdown before exercise
      const cd = {
        exercise: {
          time: 5,
          name: 'countdown',
          loc: 'exerciseTime',
          totalTime: this.totalTime(this.workout),
        },
      };

      // Start countdown
      this.countdown(cd, this.workout.reps, this.workout.exercises);
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
        this.updateTimer(updatedDict[key].loc, updatedDict[key].time);
        updatedDict[key].time -= 1;
      });

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
        // If there are 3 seconds left in the countdown, play sound per second
        if (updatedDict.exercise.time < 3) {
          this.playSound(this.sounds.timesUp);
        }
        // Write the correct exercise name
        this.timerInfo.exerciseName = updatedDict.exercise.name;
        // continue countdown
        window.setTimeout(this.countdown, 1000, updatedDict, r, e, n);

        // What to do if exercise is over
      } else {
        this.playSound(this.sounds.timesUp); // play last times up noise
        window.setTimeout(this.nextExercise, 1000, updatedDict, r, e, n);
      }
    },
    // Move to the next exercise for the countdown
    nextExercise(etDict, r, e, n) {
      let updatedDict = etDict;
      let newR = r;

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
        newR -= 1;
      }

      // Play new exercise sound
      this.playSound(this.sounds.startExercise);

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
      // const hours = Math.floor(seconds / 3600);
      // seconds -= hours * (3600);
      const minutes = Math.floor(seconds / 60);
      seconds -= minutes * (60);

      const timeStr = `${this.leadingZero(minutes)}:${this.leadingZero(seconds)}`;

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
    playSound(option) {
      this.player.src = option;
      this.player.play();
    },
  },
};
</script>

<style lang="scss" scoped>
  .timerDiv {
    padding-left: 0;
  }

  .wrapper {
    display: flex;
  }

  #exerciseName {
    border-bottom: 5px solid rgba(0,0,0,.5);
    background: #FFE400;
    color: rgba(0,0,0,.75);
    font-size: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  #exerciseTimer {
    border-bottom: 5px solid rgba(0,0,0,.5);
    background: #9CF;
    color: #036;
    font-size: 75px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .bottomRow {
    font-size: 20px
  }

  .playButton {
  }

  .alterTimerBtns {
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: bolder;
    font-size: xx-large;
    width: 15%;
    font-family: "Andale Mono", monospace;
  }

  .totalsBoxes {
    background: #474747;
    color: rgba(255,255,255,.75)
  }

  .timerNumbers {
    font-family: 'DejaVu Sans Mono', monospace
  }

  #repNo {
    width: 15%;
    border-right: rgba(0,0,0,.5)
  }

  .separator {
    margin:10px 0;
  }

  #totalTimer {
    width: 55%
  }

  //https://css-tricks.com/making-pure-css-playpause-button/
  #playPause {
    background: #61892F;
    // box-sizing: border-box;
    // height: 74px;
    // border-color: transparent transparent transparent #202020;
    // transition: 100ms all ease;
    // will-change: border-width;
    // cursor: pointer;

    // // play state
    // border-style: solid;
    // border-width: 37px 0 37px 60px;

    // // paused state
    // &.pause {
    //   border-style: double;
    //   border-width: 0px 0 0px 60px;
    // }
  }

  #cancel {
    background: #FF652F;
    color: rgba(0,0,0,.5);
  }
</style>
