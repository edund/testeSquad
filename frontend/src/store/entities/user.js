import Vue from 'vue'
export default {
  state: {
    user: [],
    esqueci_senha: [],
    loading: false
  },
  mutations: {
    setLoading (state, data) {
      state.loading = data
    },
    updateUser (state, data) {
      state.user = data
    },
    updateEsqueciSenha (state, data) {
      state.esqueci_senha = data
    }
  },
  actions: {
    getUsuarioUser (context) {
      context.commit('setLoading', false)
      Vue.http.get('api/v1/user').then(response => {
        context.commit('updateUser', response.data)
        context.commit('setLoading', false)
      })
    },
    atualizarUser (context, data) {
      context.commit('setLoading', false)
      Vue.http.put('api/v1/user/' + data.id, data).then(response => {
        context.commit('updateUser', response.data)
        context.commit('setLoading', false)
      })
    },
    esqueciSenha (context, data) {
      context.commit('setLoading', true)
      Vue.http.put('api/v1/user/esqueci_senha/' + data.id, data).then(response => {
        context.commit('updateEsqueciSenha', response.data)
        context.commit('setLoading', false)
      })
    },
    atualizarSenha (context, data) {
      Vue.http.put('api/v1/user/atualizar_senha/' + data.id, data)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
