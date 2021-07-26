export default {
  async addCoach(context, data) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const newCoach = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const response = await fetch(
      `https://vue-course-69612.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach)
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('addCoach', {
      ...newCoach,
      id: userId
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shoundUpdate) {
      return;
    }

    const response = await fetch(
      'https://vue-course-69612.firebaseio.com/coaches.json'
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTime')
  }
};
