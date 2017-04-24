<template>
  <div id="app">
    <nav class="nav main-nav">
      <div class="nav-left">
        <router-link to="/" class="title is-3 nav-item">Get Zomatoed !</router-link>
      </div>
      <div class="nav-right">
        <router-link v-if="getLoginStatus == false" to="/register" class="nav-item">Register Here</router-link>
        <span v-if="getLoginStatus == false" class="nav-item">or</span>
        <router-link v-if="getLoginStatus == false" to="/login" class="nav-item">Login</router-link>
        <router-link v-if="getLoginStatus" to="/profile" class="nav-item">Profile</router-link>
        <a v-if="getLoginStatus" @click="logout()" class="nav-item">Logout</a>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'getLoginStatus'
    ])
  },
  methods: {
    ...mapActions([
      'ifLogin'
    ]),
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      this.$router.push('/')
      window.location.reload()
    }
  },
  mounted() {
    this.ifLogin()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main-nav {
  padding: 2em;
}
</style>
