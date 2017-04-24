<template>
  <div class="main">
    <div class="columns main-comp">
      <div class="column is-8">
        <div class="box">
          <div class="field">
            <label class="label">Find Restaurants within city (Indonesia: Jakarta, Bandung, Bali)</label>
            <p class="control">
              <input class="input" type="text" @keyup.enter="reqZomatoByCity(city)" v-model="city" placeholder="Input a city here">
            </p>
            <p class="control">
              <button class="button is-primary" @click="reqZomatoByCity(city)">Submit</button>
            </p>
          </div>
        </div>
        <div class="columns is-multiline">
          <div v-for="restaurant in getZomatoNearbyList" class="column is-3">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="restaurant.restaurant.featured_image" alt="Featured Image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <a class="title is-5" :href="restaurant.restaurant.url" target="_blank">{{ restaurant.restaurant.name }}</a>
                    <span class="rating subtitle is-6">{{ restaurant.restaurant.user_rating.aggregate_rating }}</span>
                  </div>
                </div>
              </div>
              <div v-if="getLoginStatus" class="content">
                <button class="button is-primary add-fav" @click="addFav(restaurant.restaurant)">Add to fav</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="widget_wrap" style="width:100%;height:790px;display:inline-block;">
          <iframe :src="srcFrame" style="position:relative;width:100%;height:100%;" border="0" frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'main',
  data () {
    return {
      city: '',
      srcFrame: 'https://www.zomato.com/widgets/res_search_widget.php?lat='+this.$store.state.browserLoc.lat+'&lon='+this.$store.state.browserLoc.lon+'&language_id=1&theme=red&hideCitySearch=on&hideResSearch=on&widgetType=small&sort=distance'
    }
  },
  computed: {
    ...mapGetters([
      'getBrowserLoc',
      'getLoginStatus',
      'getZomatoNearbyList'
    ])
  },
  methods: {
    ...mapActions([
      'changeBrowserLoc',
      'reqZomatoNearby',
      'reqZomatoByCity'
    ]),
    addFav(data) {
      axios.post('http://localhost:3000/fav', {
        name: data.name,
        url: data.url,
        location: {
          address: data.address,
          city: data.city,
          city_id: data.city_id,
          country_id: data.country_id
        },
        user_rating: {
          aggregate_rating: data.aggregate_rating,
          rating_text: data.rating_text
        },
        average_cost_for_two: data.average_cost_for_two,
        currency: data.currency,
        featured_image: data.featured_image
      }, {headers: {'token': localStorage.getItem('token')}})
        .then((res)=> {
          alert('added')
        })
        .catch((err)=> {
          alert('Server error')
        })
    }
  },
  mounted() {
    this.changeBrowserLoc()
    this.reqZomatoNearby()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-comp {
  margin: 2em;
}
.rating {
  background-color: #E8A699;
  border-radius: 25%;
  padding: 0.25em;
}
.add-fav {
  margin: 0.25em;
}
</style>
