
export const state = {
  isSuccess : false,
  isError : false,
  userToken : localStorage.getItem('token') || null,
  userNow : localStorage.getItem('username') || null,
  isLogin: false,
  modalClass: {
    'modal': true,
    'is-active': false
  }
}

export const getters = {
  getSuccess(state) {
    return state.isSuccess
  },
  getError(state) {
    return state.isError
  },
  getLoginStatus(state) {
    return state.isLogin
  },
  getUserNow(state) {
    return state.userNow
  },
  getModalClass(state) {
    return state.modalClass
  }
}

export const mutations = {
  SET_ISSUCCESS(state, value) {
    state.isSuccess = value
  },
  SET_ISERROR(state, value) {
    state.isError = value
  },
  IF_LOGIN(state) {
    if(state.userToken) {
      state.isLogin = true
    } else {
      state.isLogin = false
    }
  },
  SET_MODALACTIVE(state, value) {
    state.modalClass['is-active'] = value
  }
}

export const actions = {
  setSuccess({commit}, value) {
    commit('SET_ISSUCCESS', value)
  },
  setError({commit}, value) {
    commit('SET_ISERROR', value)
  },
  ifLogin({commit}) {
    commit('IF_LOGIN')
  },
  changeModalStatus({commit}, value) {
    commit('SET_MODALACTIVE', value)
  }
}