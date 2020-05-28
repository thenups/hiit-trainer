<template>
    <div class="radioOptions">
        <div>Please select an option for how your exercise will be timed:</div>
        <div v-for="(value, name) in radioOptions"
            v-bind:key="name"
            class="form-check form-check-inline">
            <input class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                :value="name"
                v-on:change="updateExerciseTimeType($event.target.value)"
                checked>
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
