<template>
    <div class="exerciseRow">
        <div v-for="(exercise, index) in exercises"
          :key = "exercise.id"
          :class="exercise.inputLineDefault"
          class="form-row alert exerciseInput">
          <div class="col-7">
            <input type="text"
              :disabled="exercise.nameDisabled"
              v-model="exercise.name"
              class="form-control"
              placeholder="Exercise"
              required>
          </div>
          <div class="col-4">
            <input type="number"
              :disabled="exercise.timeDisabled"
              v-model="exercise.time"
              class="form-control"
              placeholder="Time (secs)"
              required>
          </div>
          <div class="col-1">
            <div class="center"
              @click="removeExercise(index)">
              <img class="icon" src="../../assets/icons/remove_icon.png"/>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      exerciseList: [
        {
          name: '',
          time: '',
          inputLineDefault: 'alert-primary',
          nameDisabled: false,
          timeDisabled: false,
        },
      ],
      exerciseTiming: {
        restTime: false,
        noExercises: 1,
        noRests: 0,
      },
    };
  },
  computed: {
    radioValue() {
      return this.$store.state.workoutTiming;
    },
    exercises() {
      const exList = this.exerciseList;
      // const firstExercise = this.firstExerciseTime;
      // const firstRest = this.firstRest;

      // If all of them are supposed to be different
      if (this.radioValue === 'allDiff') {
        return this.disableAllTimes(exList, false);
      // If the exercise and rest times are different
      }
      if (this.radioValue === 'diff') {
        // Figure out what the unique first value for an exercise or rest
        const exerciseInfo = this.firstExerciseTime;
        const restInfo = this.firstRestTime;

        // Create new dictionary without indexes above
        const newArr = exList;
        // remove exercise
        newArr.splice(exerciseInfo.index, 1);
        // remove rest if needed
        if (restInfo) {
          newArr.splice(restInfo.index - 1, 1);
        }
        newArr.forEach((element) => {
          const el = element;
          // for each el, if it's a rest, replace with first rest time
          if (el.name === 'REST') {
            el.time = restInfo.time;
          } else {
            el.time = exerciseInfo.time;
          }

          el.timeDisabled = true;
        });

        // first exercise and rest back in

        return exList;
      }
      // Else, if it is all the same:
      return this.disableAllTimes(exList, true);
    },
    // return the first exercise time
    firstExerciseTime() {
      return {
        time: this.exerciseList[0].time,
        index: 0,
      };
    },
    // return first rest time
    firstRestTime() {
      let n = 0;

      for (let i = 0; i < this.exerciseList.length; i += 1) {
        if (this.exerciseList[i].name === 'REST') {
          n = i;
          break;
        } else {
          n = false;
        }
      }

      if (n === false) {
        return false;
      }
      return {
        time: this.exerciseList[n].time,
        index: n,
      };
    },
  },
  methods: {
    addExercise() {
      this.exercises.push({
        name: '',
        time: '',
        inputLineDefault: 'alert-primary',
        nameDisabled: false,
        timeDisabled: false,
      });

      this.noExercises += 1;
    },
    addRest() {
      this.exercises.push({
        name: 'REST',
        time: '',
        inputLineDefault: 'alert-warning',
        nameDisabled: true,
        timeDisabled: false,
      });

      this.noRests += 1;
    },
    removeExercise(index) {
      this.exercises.splice(index, 1);
    },
    disableAllTimes(exList, disabled) {
      exList.forEach((element, index) => {
        const el = element;
        // If it's not the first exercise, disable input for time
        // and replace time with the first exercises time
        if (index !== 0) {
          el.timeDisabled = disabled;
          el.time = this.firstExerciseTime.time;
        }
      });

      return exList;
    },
    // Save exercises in store
    sendExercises() {
      const cleanedExercises = [];

      // clean out unecessary data from exercises
      for (let i = 0; i < this.exercises.length; i += 1) {
        cleanedExercises.push({
          name: this.exercises[i].name,
          time: Number(this.exercises[i].time),
        });
      }
      const payload = [
        {
          type: 'exercises',
          data: cleanedExercises,
        },
      ];

      this.$store.commit('createWorkout', payload);
    },
  },
};
</script>

<style scoped>
  .exerciseInput {
    margin-bottom: 0;
  }

  .icon {
    width: 15px;
    height: 15px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
