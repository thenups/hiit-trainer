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
          type: 1,
          // think about syncing the following two with "type"
          inputLineDefault: 'alert-primary',
          nameDisabled: false,
          timeDisabled: false,
        },
      ],
      workoutFromState: this.$store.state.workout,
    };
  },
  mounted() {
    const storeList = this.$store.state.workout.exercises;

    // if there is already a workout in store:
    if (storeList !== undefined) {
      // Clear exercise list
      this.exerciseList = [];

      // make add additional fields
      storeList.forEach((element) => {
        const el = element;
        el.nameDisabled = false;
        el.timeDisabled = false;
        if (el.name === 'REST') {
          el.type = 0;
          el.inputLineDefault = 'alert-warning';
        } else {
          el.type = 0;
          el.inputLineDefault = 'alert-primary';
        }
        // push the element into the fresh exercise list
        this.exerciseList.push(el);
      });
      // this.exerciseList = l;
    }
  },
  computed: {
    radioValue() {
      return this.$store.state.workoutTiming;
    },
    exercises() {
      const exList = this.exerciseList;

      // If all of them are supposed to be different
      if (this.radioValue === 'allDiff') {
        return this.disableAllTimes(exList, false, '');
      // If the exercise and rest times are different
      }
      if (this.radioValue === 'diff') {
        // Figure out what the unique first value for an exercise or rest
        const firstExerciseTime = this.firstTime(1);
        const firstRestTime = this.firstTime(0);

        // if there are both exercises and rests
        if (firstExerciseTime !== false && firstRestTime !== false) {
          exList.forEach(((element, index) => {
            const el = element;
            const i = index;

            // make sure the first exercise or rest inputs are not disabled
            if (i === firstExerciseTime.index || i === firstRestTime.index) {
              el.timeDisabled = false;
            }

            // if it's not the first exercise or rest, update time
            if (!(i === firstExerciseTime.index || i === firstRestTime.index)) {
              // disable time field
              el.timeDisabled = true;
              // add appropriate time based on type
              if (el.type === 1) {
                el.time = firstExerciseTime.time;
              } else {
                el.time = firstRestTime.time;
              }
            }
          }));

          return exList;
        }
        // else make everything same as the first element
        return this.disableAllTimes(exList, true, this.firstItemTime.time);
      }
      // Else, if it is all the same:
      return this.disableAllTimes(exList, true, this.firstItemTime.time);
    },
    // return the first exercise time
    firstItemTime() {
      return {
        time: this.exerciseList[0].time,
        index: 0,
      };
    },
  },
  methods: {
    addExercise() {
      this.exercises.push({
        name: '',
        time: '',
        type: 1,
        inputLineDefault: 'alert-primary',
        nameDisabled: false,
        timeDisabled: false,
      });
    },
    addRest() {
      this.exercises.push({
        name: 'REST',
        time: '',
        type: 0,
        inputLineDefault: 'alert-warning',
        nameDisabled: true,
        timeDisabled: false,
      });
    },
    removeExercise(index) {
      this.exercises.splice(index, 1);
    },
    resetExercises() {
      this.exerciseList = [
        {
          name: '',
          time: '',
          type: 1,
          // think about syncing the following two with "type"
          inputLineDefault: 'alert-primary',
          nameDisabled: false,
          timeDisabled: false,
        },
      ];
    },
    disableAllTimes(exList, disabled, time) {
      exList.forEach((element, index) => {
        const el = element;
        // If it's not the first exercise, disable input for time
        if (index !== 0) {
          el.timeDisabled = disabled;

          if (disabled) { // if times are disabled, replace time
            el.time = time;
          }
        }
      });

      return exList;
    },
    // return first time depending on type
    firstTime(choice) {
      let n = 0;

      for (let i = 0; i < this.exerciseList.length; i += 1) {
        if (this.exerciseList[i].type === choice) {
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
