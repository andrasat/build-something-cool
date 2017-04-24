<template>
  <div class="login">
    <div class="box login-container">
      <div class="field">
        <p class="subtitle is-4 has-text-centered">{{ msg }}</p>
        <label class="label">Email</label>
        <p class="control">
          <input :class="inputClass" @keyup="validateEmail()" type="text" v-model="email" placeholder="Email input" required>
        </p>
        <p v-if="invalidMail" class="help is-danger">This email is invalid</p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <p class="control">
          <input class="input" type="password" v-model="password" placeholder="Input Password" required>
        </p>
      </div>
      <div class="field is-grouped">
        <p class="control button is-primary" @click="login()">Submit</p>
        <router-link to="/register" class="control button outlined">or Register</router-link>
      </div>
    </div>
    <div class="box login-container">
      <div v-if="getSuccess" class="notification is-success has-text-centered">
        <button class="delete"></button>
        Success
      </div>
      <div v-if="getError" class="notification is-danger has-text-centered">
        <button class="delete"></button>
        Failed
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Login Here',
      email: '',
      password: '',
      invalidMail : false
    }
  },
  computed: {
    ...mapGetters([
      'getSuccess',
      'getError'
    ]),
    inputClass() {
      return {
        'input': true,
        'is-danger': false
      }
    }
  },
  methods: {
    ...mapActions([
      'setSuccess',
      'setError'
    ]),
    login() {
      let self = this
      axios.post('http://localhost:3000/user/login', {
        email: self.email,
        password: self.password
      })
        .then((res)=> {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id', res.data.id)
          self.setSuccess(true)
          setTimeout(()=> {
            self.setSuccess(false)
            this.$router.push('/')
            window.location.reload()
          }, 2500)
        })
        .catch((err)=> {
          console.log(err)
          self.setError(true)
          setTimeout(()=> {
            self.setError(false)
            window.location.reload()
          }, 3500)
        })
    },
    validateEmail() {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(regex.test(this.email) || this.email == '') {
        console.log('right')
        this.inputClass['is-danger'] = false
        this.invalidMail = false
      } else {
        console.log('wrong')
        this.inputClass['is-danger'] = true
        this.invalidMail = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  width: 50%;
  margin: auto;
}
.notification {
  width: 50%;
  margin: auto;
}
</style>
