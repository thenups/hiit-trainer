var HiitTimer = {
  props:['workout'],
  data: function() {
    return {
      timerInfo: {
        exerciseTime: '',
        exerciseName: '',
        totalTime: ''
      },
      allReps: {
        current: 1,
        total: 0
      }
    }
  },
  methods: {
    startCountdown: function(workout) {

      // Do 10 second countdown before exercise
      let cd = {
        total: {
          time: 10,
          loc: 'exerciseTime',
          totalTime: this.totalTime(workout)
        }
      }

      // Start countdown
      this.countdown(cd, workout.reps, workout.exercises);
    },
    // Setup Timer with actual workout
    setupTimer: function(cd, r, e) {
      // first exercise in array
      let n = 0;

      // Create dict for first exercise
      let firstExercise = {
        total: {
          time: cd.total.totalTime,
          loc: 'totalTime'
        },
        exercise: {
          time: e[n].time,
          name: e[n].name,
          loc: 'exerciseTime'
        }
      }

      // Start countdown for first exercise
      this.countdown(firstExercise, r, e, n);
    },
    // Countdown given a time
    countdown: function(etDict, r, e, n) {

      // Look at dict and countdown 1 second per item
      for (let [key, value] of Object.entries(etDict)) {
        this.updateTimer(value.loc, value.time);
        value.time--;
      }

      // If workout is over
      if (r==0) {
        this.workoutComplete();

      // What to do with initial countdown to workout
      } else if (!('exercise' in etDict)) {
        if (etDict.total.time > 0) {
            window.setTimeout(this.countdown, 1000, etDict, r, e);
        } else {
          window.setTimeout(this.setupTimer, 1000, etDict, r, e);
        }

      // What to do if the exercise hasn't finished
      } else if (etDict.exercise.time > 0) {
        // Write the correct exercise name
        this.timerInfo.exerciseName = etDict.exercise.name;
        // continue countdown
        window.setTimeout(this.countdown, 1000, etDict, r, e, n);

      // What to do if exercise is over
      } else {
        console.log('r = ' + r);
        window.setTimeout(this.nextExercise, 1000, etDict, r, e, n);
      }
    },
    // Move to the next exercise for the countdown
    nextExercise: function(etDict, r, e, n) {
      // increase exercise number
      n++;
      this.allReps.current ++;

      // if n is in e, then return the next exercise
      if (n < e.length) {
        etDict = this.updateTimeDict(etDict, n, e);

      // handle end of workout
      }else {
        n = 0;
        etDict = this.updateTimeDict(etDict, n, e);
        r--;
      }

      // Start countdown for next exercise
      this.countdown(etDict, r, e, n);
    },
    // Update time and name for next exercise
    updateTimeDict: function(etDict, n, e) {
      etDict.exercise.time = e[n].time;
      etDict.exercise.name = e[n].name;

      return etDict;
    },
    // Finish Workout!
    workoutComplete: function() {
      console.log('workout DONE');
    },
    // Figure out minutes and seconds to write out clock
    updateTimer: function(loc, t) {
      var seconds = t;
      var hours = Math.floor(seconds / 3600);
      seconds -= hours * (3600);
      var minutes = Math.floor(seconds / 60);
      seconds -= minutes * (60);

      var timeStr = this.leadingZero(hours) + ":" + this.leadingZero(minutes) + ":" + this.leadingZero(seconds);

      if (loc==='exerciseTime') {
        this.timerInfo.exerciseTime = timeStr;
      } else {
        this.timerInfo.totalTime = timeStr;
      }
    },
    // Add leading zero to mm:ss if missing digit
    leadingZero: function(time) {
      return (time < 10) ? "0" + time : + time;
    },
    // Go through exercise dict and deterime total time for workout
    totalTime: function(w) {

      var repTime = 0;

      for (let i = 0; i < w.exercises.length; i++) {
        repTime += w.exercises[i].time; // add number to totalTime
      }

      var time = repTime * w.reps;

      // save total number of reps
      this.allReps.total = w.exercises.length * w.reps

      return time;
    }

  },
  mounted () {
    console.log('mounted', this.workout, this.$el);
    this.startCountdown(this.workout);
  },
  template: '#timer-template'
}

var  TimerReady = {
  props:['workout'],
  components: {
    'timer-div': HiitTimer
  },
  methods: {
    startTimer: function(w) {
      this.$refs.timerDiv.startCountdown(w);
    }
  },
  template: '#timer-ready-template'
}

var ExerciseInput = {
  data: function() {
    return {
      exercises: [
        {
          name: '',
          time: '',
          inputLineDefault: 'alert-primary',
          disabled: false
        }
      ]
    }
  },
  methods: {
    addExercise: function() {
      this.exercises.push({
        name:'',
        time:'',
        inputLineDefault: 'alert-primary',
        disabled: false
      })
    },
    addRest: function(){
      this.exercises.push({
        name:'REST',
        time:'',
        inputLineDefault: 'alert-warning',
        disabled: true
      });
    },
    removeExercise: function(index) {
      this.exercises.splice(index,1)
    },
    sendExercises: function() {
      var cleanedExercises = [];

      // clean out unecessary data from exercises
      for (var i = 0; i < this.exercises.length; i++) {
        cleanedExercises.push({
          name: this.exercises[i].name,
          time: Number(this.exercises[i].time)
        })
      }

      // send out the cleaned exercises
      this.$emit('sendExercises', cleanedExercises)
    }
  },
  template: '#exercise-input-template'
}

var WorkoutInput = {
  data: function(){
    return{
      title:'Create Your Workout',
      exercises:[],
      reps: ''
    }
  },
  components: {
    'exercise-input': ExerciseInput
  },
  methods: {
    newExercise: function(exercise) {
        if (exercise) {
          this.$refs.exerciseInput.addExercise();
        } else {
          this.$refs.exerciseInput.addRest();
        }
      },
    startTimer: function(event) {
      this.$refs.exerciseInput.sendExercises();
    },
    recieveExercises: function(e) {
      let fullWorkout = {
        reps: this.reps,
        exercises: e
      }

      this.$emit('create-workout', fullWorkout);
    }
  },
  template: '#workout-input-template'
}

var app = new Vue({
  el: '.container',
  data: {
    workout: {fake: 'news'},
    show: true
  },
  components: {
    'workout-input': WorkoutInput,
    'timer-ready': TimerReady
  },
  methods: {
    getWorkout: function(w) {
      this.workout = w;
      this.show = false;
      console.log(this.workout);
    },
  }
})
