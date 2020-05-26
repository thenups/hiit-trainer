<template>
    <div class="exerciseRow">
        <div v-for="(exercise, index) in exercises"
          :key = "index"
          :class="exercise.inputLineDefault"
          class="form-row alert exerciseInput">
          <div class="col-7">
            <input type="text"
              :disabled="exercise.disabled"
              v-model="exercise.name"
              class="form-control"
              placeholder="Exercise"
              required>
          </div>
          <div class="col-4">
            <input type="number"
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
      exercises: [
        {
          name: '',
          time: '',
          inputLineDefault: 'alert-primary',
          disabled: false,
        },
      ],
    };
  },
  methods: {
    addExercise() {
      this.exercises.push({
        name: '',
        time: '',
        inputLineDefault: 'alert-primary',
        disabled: false,
      });
    },
    addRest() {
      this.exercises.push({
        name: 'REST',
        time: '',
        inputLineDefault: 'alert-warning',
        disabled: true,
      });
    },
    removeExercise(index) {
      this.exercises.splice(index, 1);
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
