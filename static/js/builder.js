var HiitTimer = {
  template: `

  `
}

var ExerciseInput = {
  data: function() {
    return {
      exercises: [
        {
          name: '',
          time: ''
        }
      ]
    }
  },
  methods: {
    newExercise: function() {
      this.exercises.push({
        name:'',
        time:''
      })
    },
    removeExercise: function(index) {
      this.exercises.splice(index,1)
    }
  },
  template: '#exercise-input-template'
}

var WorkoutInput = {
  components: {
    'exercise-input': ExerciseInput
  },
  methods: {
    addExercise: function() {
        this.$refs.exerciseinput.newExercise();
      },
    startTimer: function(event) {
      console.log('start timer!');
    }
  },
  template: '#workout-input-template'
}



var app = new Vue({
  el: '.container',
  data: {
    title:'Create Your Workout',
  },
  components: {
    'workout-input': WorkoutInput,
    'hiit-timer': HiitTimer
  }
})
