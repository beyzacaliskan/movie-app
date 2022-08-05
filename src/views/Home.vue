<template>
  <v-container>
    <MovieCard :movies="popular" />
  </v-container>
</template>

<script>
import MovieCard from "../components/MovieCard";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: { MovieCard },
  mounted() {
    this.$store.dispatch("movie/getMovies", "popular");
  },
  methods: {},
  computed: {
    ...mapGetters("movie", {
      popular: "popular"
    })
  }
};
</script>
