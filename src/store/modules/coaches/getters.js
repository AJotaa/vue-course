export default {
    coachesList(state) {
        return state.coaches
    },
    /* hasCoaches(state) {
        return state.coaches && state.coaches.length > 0
    }, */
    isCoach(_, getters, _2, rootGetters) {
        const coaches = getters.coachesList
        const userId = rootGetters.userId
        return coaches.some(coach => coach.id === userId)
    },

    shoundUpdate(state) {
        const lastFetch = state.lastFetch
        if(!lastFetch) {
            return true
        }
        const currentTime = new Date().getTime()
        return (currentTime - lastFetch) / 1000 > 60
    }
};
