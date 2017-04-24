<template>
  <div class="main">
    <div class="columns main-comp">
      <div class="column is-8">
        <div class="box">
          <div class="field">
            <label class="label">Find Restaurants within city</label>
            <p class="control">
              <input class="input" type="text" v-model="city" placeholder="Input a city here">
            </p>
          </div>
        </div>
        <div class="columns is-multiline">
          <div v-for="restaurant in zomatoCountryList" class="column is-3">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="restaurant.restaurant.featured_image" alt="Featured Image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <a class="title is-5" :href="restaurant.restaurant.url" target="_blank">{{ restaurant.restaurant.name }}<span class="rating subtitle is-6">{{ restaurant.restaurant.user_rating.aggregate_rating }}</span></a>
                  </div>
                </div>
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
      cityId: null,
      zomatoCountryList : [],
      srcFrame: 'https://www.zomato.com/widgets/res_search_widget.php?lat='+this.$store.state.browserLoc.lat+'&lon='+this.$store.state.browserLoc.lon+'&language_id=1&theme=red&hideCitySearch=on&hideResSearch=on&widgetType=small&sort=distance'
    }
  },
  computed: {
    ...mapGetters([
      'getBrowserLoc'
    ])
  },
  methods: {
    ...mapActions([
      'changeBrowserLoc'
    ]),
    getZomatoCity() {
      let self = this
      axios.get('https://developers.zomato.com/api/v2.1/cities?q='+self.city, {
        headers: {'user-key': 'e7b58b263260bca07fc5ceb9ff449c15'}
      }).then((res)=> {
        res.body.location_suggestions[0].id
      }).catch((err)=> {
        alert('Cannot find')
      })
    },
    getZomatoRestaurantList() {
      let self = this
      if(this.cityId == null) {
        axios.get('https://developers.zomato.com/api/v2.1/search?lat='+this.$store.state.browserLoc.lat+'&lon='+this.$store.state.browserLoc.lon, {
          headers: {'user-key': 'e7b58b263260bca07fc5ceb9ff449c15'}
        }).then((res)=> {
          self.zomatoCountryList = res.data.restaurants
        }).catch((err)=> {
          console.log(err)
          alert('Zomato API Error')
        })
      } else {

      }
    }
  },
  mounted() {
    this.changeBrowserLoc()
    this.getZomatoRestaurantList()
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
</style>
