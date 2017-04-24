<template>
  <div class="profile">
    <div class="columns">
      <div class="column is-three-quarters">
        <article class="box">
          <div v-if="userData" class="content is-large">
            <h2 class="subtitle is-3">{{ userData.email }}</h2>
            <p>Your favourite places : {{ listLength }}</p>
          </div>
          <div v-if="getSuccess" class="notification is-success has-text-centered">
            <button class="delete"></button>
            Success
          </div>
          <div v-if="getError" class="notification is-danger has-text-centered">
            <button class="delete"></button>
            Failed
          </div>
        </article>
        <article v-if="favList.length > 0" class="box">
          <div class="content is-medium">
            <div v-for="place in favList" class="place-list">
              <p><a :href="place.url" target="_blank">{{ place.name }}</a>
                <a id="delete" class="button is-danger" @click="deleteFavs(place)"><span class="icon is-medium"><i class="fa fa-times"></i></span></a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'profile',
  data() {
    return {
      userData: {},
      favList: [],
      listLength: 0
    }
  },
  computed: {
    ...mapGetters([
      'getError',
      'getSuccess'
    ])
  },
  methods: {
    ...mapActions([
      'setSuccess',
      'setError'
    ]),
    deleteFavs(data) {
      let self = this
      axios.delete('http://localhost:3000/fav/'+data._id, {
        headers: {token : localStorage.getItem('token')}
      })
        .then((res)=> {
          self.favList.splice(self.favList.indexOf(data), 1)
          self.setSuccess(true)
          setTimeout(()=> {
            self.setSuccess(false)
          }, 2500)
        })
        .catch((err)=> {
          self.setError(true)
          setTimeout(()=> {
            self.setError(false)
            window.location.reload()
          }, 3500)
        })
    },
    getUserData() {
      let self = this
      axios.get('http://localhost:3000/user/'+localStorage.getItem('id'))
        .then((res)=> {
          self.userData = res.data
          self.favList = res.data.favouritePlaces
          self.listLength = res.data.favouritePlaces.length
        })
        .catch((err)=> {
          alert('Server Error')
        })
    }
  },
  mounted() {
    this.getUserData()
  }
}
</script>

<style scoped>
.is-three-quarters {
  margin: auto;
}
.place-list {
  margin: 0.25em;
}
</style>