
export const state = {
  isSuccess : false,
  isError : false,
  userToken : localStorage.getItem('token') || null,
  isLogin: false,
  browserLoc: {
    lat: -6.121435,
    lon: 106.774124
  },
  cityId: 0,
  zomatoNearbyList: []
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
  getModalClass(state) {
    return state.modalClass
  },
  getBrowserLoc(state) {
    return state.browserLoc
  },
  getCityId(state) {
    return state.cityId
  },
  getZomatoNearbyList(state) {
    return state.zomatoNearbyList
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
  },
  REQ_BYCITY(state, val) {
    axios.get('https://developers.zomato.com/api/v2.1/cities?q='+val, {
      headers: {'user-key': 'e7b58b263260bca07fc5ceb9ff449c15'}
    }).then((res)=> {
      state.cityId = res.data.location_suggestions[0].id

      axios.get('https://developers.zomato.com/api/v2.1/search?entity_id='+state.cityId+'&entity_type=city&sort=rating', {
        headers: {'user-key': 'e7b58b263260bca07fc5ceb9ff449c15'}
      }).then((res)=> {
        state.zomatoNearbyList = res.data.restaurants
      }).catch((err)=> {
        console.log(err)
        alert('Zomato API Error')
      })
    }).catch((err)=> {
      alert('Not found')
    })
  },
  REQ_ZOMATONEARBY(state) {
    axios.get('https://developers.zomato.com/api/v2.1/search?lat='+state.browserLoc.lat+'&lon='+state.browserLoc.lon+'&sort=rating', {
      headers: {'user-key': 'e7b58b263260bca07fc5ceb9ff449c15'}
    }).then((res)=> {
      state.zomatoNearbyList = res.data.restaurants
    }).catch((err)=> {
      console.log(err)
      alert('Zomato API Error')
    })
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
  },
  changeCityId({commit}, val) {
    commit('SET_CITYID', val)
  },
  reqZomatoNearby({commit}) {
    commit('REQ_ZOMATONEARBY')
  },
  reqZomatoByCity({commit}, val) {
    commit('REQ_BYCITY', val)
  }
}