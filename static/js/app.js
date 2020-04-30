var HiitTimer = {
  props:{},
  template: '#timer-template'
}

var  TimerReady = {
  components: {
    'timer-div': HiitTimer
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
          time: this.exercises[i].time
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
    workout: {}
  },
  components: {
    'workout-input': WorkoutInput,
    'timer-ready': TimerReady
  },
  methods: {
    getWorkout: function(w) {
      this.workout = w;
    }
  }
})
