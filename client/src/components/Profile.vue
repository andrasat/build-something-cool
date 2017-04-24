<template>
  <div class="profile">
    <div class="columns">
      <div class="column is-three-quarters">
        <article class="box">
          <div v-if="userData" class="content is-large">
            <h2 class="subtitle is-3">{{ userData.email }}</h2>
            <p>Your favourite places : {{ userData.favouritePlaces.length }}</p>
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
            <div v-for="place in favList">
              <p><a :href="place.url">{{ place.name }}</a>
                <a id="delete" class="button is-danger" @click="deleteFav(place)"><span class="icon is-medium"><i class="fa fa-times"></i></span></a>
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
      favList: []
    }
  },
  methods: {
    ...mapActions([

    ]),
    deleteFavs() {

    }
  }
}
</script>

<style scoped>

</style>