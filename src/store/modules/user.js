import user from '../../api/user.js'

const state = {
  userInfo: null,
  loginStatus: false,
}

const getters = {
  userInfo: state => state.userInfo,
  loginStatus: state => state.loginStatus
}

const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload.userInfo
  },
  setLoginStatus(state, payload) {
    state.loginStatus = payload.loginStatus
  }
}

const actions = {
  login({commit}, {username, password}) {
    return user.login({username, password}).then(response => {
      commit('setUserInfo', {userInfo: response.data})
      commit('setLoginStatus', {loginStatus: true})
    })
  },
  async register({commit}, {username, password}) {
    let response = await user.register({username, password})
    commit('setUserInfo', {userInfo: response.data})
    commit('setLoginStatus', {loginStatus: true})
    return response.data
  },
  async logout({commit}) {
    await user.logout()
    commit('setUserInfo', {userInfo: null})
    commit('setLoginStatus', {loginStatus: false})
  },
  async checkLoginStatus({commit, state}) {
    if (state.loginStatus) return true
    let response = await user.getInfo()
    commit('setLoginStatus', {loginStatus: response.isLogin})
    if (!state.loginStatus) return false
    commit('setUserInfo', {userInfo: response.data})
    return true
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}