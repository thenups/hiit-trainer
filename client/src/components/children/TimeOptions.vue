<template>
    <div class="radioOptions">
        <div>Please select a time option:</div>
        <div v-for="(value, name) in radioOptions"
            v-bind:key="name"
            class="form-check form-check-inline">
            <input class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                :value="name"
                v-on:change="updateExerciseTimeType($event.target.value)"
                :checked="name == selected">
            <label class="form-check-label">{{ value }}</label>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      radioOptions: {
        same: 'Same Exercise and Rest',
        diff: 'Different Exercise and Rest',
        allDiff: 'All Different',
      },
    };
  },
  computed: {
    selected() {
      return this.$store.state.workoutTiming;
    },
  },
  methods: {
    updateExerciseTimeType(value) {
      this.$store.commit('workoutTimingUpdate', value);
    },
  },
};
</script>

<style scoped>
.radioOptions {
    color: white;
}
</style>
