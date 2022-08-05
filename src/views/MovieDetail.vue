<template>
  <v-container>
    <v-row class="py-5">
      <v-col xs="12" md="6">
        <div>
          <v-img
            :src="'https://image.tmdb.org/t/p/w400'+movie.poster_path"
            width="600"
            alt="poster"
            aspect-ratio="1"
            contain
          ></v-img>
        </div>
      </v-col>

      <v-col xs="12" md="6" class="movie-info">
        <h2 class="text-4xl mt-4 font-semibold">{{ movie.title }}</h2>
        <div>
          <span class="ml-1">
            <v-icon color="yellow accent-4">
              mdi-star
            </v-icon>
            {{ movie.vote_average }}
          </span>
          <span class="mx-2">|</span>
          <span>{{ movie.release_date }}</span>
          <span class="mx-2">|</span>
          <span
            v-if="movie.genres"
          >{{ Array.prototype.map.call(movie.genres, function(item) { return item.name; }).join(", ") }}
          </span>
          <div class="movie-info--overview">{{ movie.overview }}</div>
          
            <div>
              <h4 class="font-semibold">Featured Crew</h4>
              <div class="flex mt-4" v-if="movie.credits">
              <div class="mr-8" v-for="crew in movie.credits.crew.slice(0,4)" :key="crew.credit_id">
                <div>{{ crew.name }}</div>
                <div class="text-sm text-gray-600">{{ crew.job }}</div>
              </div>
            </div>
            <v-btn class="my-5" outlined color="primary" @click="back">back</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-divider inset></v-divider>

    <v-row>
      <div class="movie-info--cast">
        <h2 class="text-3xl font-semibold pt-3">Cast</h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:grid-cols-5 gap-4"
          v-if="movie.credits"
        >
          <div class="mt-8" v-for="cast in movie.credits.cast.slice(0,5)" :key="cast.credit_id">
              <v-img
                :src="'https://image.tmdb.org/t/p/w200' + cast.profile_path"
                :alt="cast.name"
              />
            <div class="mt-2">
              <div class="text-lg mt-2">
                {{ cast.name }}
              </div>
              <div class="text-sm text-gray-600">{{ cast.character }}</div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MovieDetail",
  data() {
    return {
      isOpen: false,
      modalImage: "",
      showTrailer: false
    };
  },
  mounted() {
    this.$store.dispatch("movie/getMovieDetail", this.$route.params.id);

    document.body.addEventListener("keyup", e => {
      if (e.keyCode === 27) {
        this.isOpen = false;
        this.modalImage = "";
        this.showTrailer = false;
      }
    });
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters("movie", ["movie"]),
    ...mapGetters("genre", ["genres"])
  }
};
</script>

<style lang="scss">
.movie-info {
  flex-direction: column;

  &--overview {
    margin: 2rem 0;
  }
}
</style>