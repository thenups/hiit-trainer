<template>
    <div class="">
        <div class="form-row saveParams" id="">
            <div class="tagsRow">
                <input name="tags"
                    v-model="vars.tags"
                    class="form-control"
                    placeholder="Enter Tags"
                    required>
            </div>
        </div>
        <div class="form-row saveParams" id="">
            <div class="deetsItem">
                <input name="order"
                    v-model="vars.order"
                    type="number"
                    class="form-control"
                    placeholder="Order #"
                    required>
            </div>
            <div class="deetsItem">
                <input name="date"
                    v-model="vars.date"
                    type="date"
                    class="form-control"
                    placeholder="Order #"
                    required>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      vars: {
        tags: '',
        order: '',
        date: '',
      },
    };
  },
  methods: {
    sendSaveVars() {
      // Parse tags
      const tagList = this.cleanTags();
      // Convert order to number
      const orderNo = parseInt(this.vars.order, 10);
      // Convert date to datetime
      const dtDate = new Date(this.vars.date);
      // Save values as dict
      const saveValues = {
        tags: tagList,
        order: orderNo,
        date: dtDate,
      };

      const payload = [];

      // Update store with save values with loop
      Object.keys(saveValues).forEach((key) => {
        payload.push(
          {
            type: key,
            data: saveValues[key],
          },
        );
      });

      // Save sets to veux/state
      this.$store.commit('createWorkout', payload);
    },
    cleanTags() {
      // make string into list based on commas
      const tagList = this.vars.tags.split(',');

      // remove white space and make everything lowercase
      tagList.forEach((element) => {
        element.trim().toLowerCase();
      });

      // return all unique values
      return [...new Set(tagList)];
    },
  },

};
</script>

<style scoped>
.saveParams {
    margin-bottom: 15px;
    width: 100%;
}

.tagsRow {
    width: 90%;

}

.deetsItem{
    width: 45%;
    margin: 0px 10px;
}


</style>
