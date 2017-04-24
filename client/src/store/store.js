
export const state = {
  isSuccess : false,
  isError : false,
  userToken : localStorage.getItem('token') || null,
  userNow : localStorage.getItem('username') || null,
  isLogin: false,
  modalClass: {
    'modal': true,
    'is-active': false
  },
  browserLoc: {
    lat: -6.121435,
    lon: 106.774124
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
  },
  getBrowserLoc(state) {
    return state.browserLoc
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
  },
  SET_BROWSERLOC(state) {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos)=> {
        state.browserLoc = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
      })
    } else {
      alert('Geolocation is not supported in your browser')
    }
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
  },
  changeBrowserLoc({commit}) {
    commit('SET_BROWSERLOC')
  }
}