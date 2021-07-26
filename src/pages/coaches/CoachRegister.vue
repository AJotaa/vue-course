<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error has ocurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Register as Coach now!</h2>
        <base-spinner v-if="isLoading"></base-spinner>
        <coach-form @save-data="saveData" v-else></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  components: {
    CoachForm
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/addCoach', data);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
      if (this.error === null) {
        this.$router.replace('/coaches');
      }
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>
