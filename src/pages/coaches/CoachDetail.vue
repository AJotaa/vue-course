<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <base-badge
            v-for="area in areas"
            :key="area"
            :type="area"
            :title="area"
          ></base-badge>
          <p>{{ description }}</p>
        </header>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      let splitLink = this.$route.path.split('/').reverse();
      if (splitLink[0] === 'contact') {
        return this.$route.path;
      } else {
        return this.$route.path + '/contact';
      }
    }
  },
  created() {
    return (this.selectedCoach = this.$store.getters[
      'coaches/coachesList'
    ].find(coach => coach.id === this.id));
  }
};
</script>
