<template>
  <v-container grid-list-xl>
    <v-row wrap>
      <v-col xs="12" sm="6" md="3"
        v-for="movie in movies"
        :key="movie.id"
        mb-2>
        <v-card :to="{name : 'MovieDetail', params : {id : movie.id}}" class="movie-card">
          <v-img
            :src="'https://image.tmdb.org/t/p/w300'+movie.poster_path"
            :alt="movie.title"
            width="300px"
            aspect-ratio="1"
          ></v-img>

          <v-card-title primary-title>
            <div class="movie-card--title">
              <h2>{{ movie.title }}</h2>
              <div class="year">Year: <span>{{ movie.release_date.substring(0, 4) }}</span></div>
              <div class="genre">{{ movieGenre(movie) }}</div>
              <v-rating
                :value="parseFloat(movie.vote_average)"
                length="10"
                background-color="grey lighten-1"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
              ></v-rating>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn 
              block
              color="blue lighten-2"
              >View</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["movies"],
  data() {
    return {
      rating: this.vote_average
    };
  },
  methods: {
    movieGenre(movie) {
      var movieGenres = "";
      this.genres
        .filter(function(genre) {
          return movie.genre_ids.indexOf(genre.id) > -1;
        })
        .forEach(function(genre, index) {
          movieGenres += genre.name;
          if (movie.genre_ids.length > index + 1) movieGenres += ", ";
        });

      return movieGenres;
    }
  },
  computed: {
    ...mapGetters("genre", ["genres"])
  }
};
</script>

<style lang="scss">

.movie-card {
  &--title {
    font-size: 16px;
    height: 10rem;

    h2 {
      font-size: 21px;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .year {
      font-weight: bold;

      span {
        font-weight: normal;
        color: #757575;
      }
    }
    .genre {
      line-height: normal;
      font-size: 14px;
      font-weight: normal;
      color: #757575;
    }
  }
  .v-btn {
    color: #fff;
  }
}
</style>