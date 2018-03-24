import Vue from 'vue'
export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, data) {
      state.loading = data
    },
    setError (state, data) {
      state.error = data
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    getToken (context, data) {
      Vue.http.interceptors.push((request, next) => {
        request.headers.set('Authorization', 'Bearer ' + data.access_token)
        next()
      })
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
