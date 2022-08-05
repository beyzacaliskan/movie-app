<template>
  <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link
        to='/'
        tag='span'
        style='cursor: pointer'>
        Movie App
        </router-link>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-col xs="12" sm="6" md="3">
        <div class="relative mt-3 md:mt-0">
          <v-icon>mdi-magnify</v-icon>
          <input
            class="text-sm rounded-full w-64 px-4 pl-8 py-1"
            placeholder="Search"
            v-model="keyword"
            @input="search"
            @keydown="isLoading = true"
          />

          <div
            class="z-50 border absolute bg-white text-sm rounded w-64 mt-4 search-list overflow-y-scroll"
            v-if="showSearchBox && sugestions.length"
          >
            <ul class="px-3">
              <li v-for="(sugestion, i) in sugestions" :key="i" class="border-b border-gray-400">
                <router-link
                  :to="{ name: sugestion.media_type == 'movie' ? 'MovieDetail' : 'NotFound', params: { id: sugestion.id }}"
                >
                  <span
                    class="block px-3 py-3 flex items-center text-gray-700"
                    @click="showSearchBox=false, keyword = ''"
                  >
                    <img
                      v-if="sugestion.poster_path"
                      :src="`https://image.tmdb.org/t/p/w92/${sugestion.poster_path}`"
                      alt="poster"
                      class="w-8"
                    />
                    <img v-else src="https://via.placeholder.com/50x75" alt="poster" class="w-8" />
                    <span
                      class="ml-4"
                    >{{ sugestion.name ? sugestion.name : sugestion.original_title }}</span>
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </v-col>
  </v-app-bar>
</template>

<script>
import _ from "lodash";
import axios from "axios";
export default {
  data() {
    return {
      isOpen: false,
      sugestions: "",
      keyword: "",
      showSearchBox: false,
      isLoading: false
    };
  },
  mounted() {
    document.body.addEventListener("keyup", e => {
      if (e.keyCode === 27) {
        this.showSearchBox = false;
      }
    });
  },
  methods: {
    search: _.debounce(function(e) {
      if (!e.target.value.length) {
        this.showSearchBox = false;
      } else {
        console.log('zzz', e.target.value);
        axios
          .get(
            "https://api.themoviedb.org/3/search/multi?query=" + e.target.value
          )
          .then(res => {
            this.showSearchBox = true;
            this.sugestions = res.data.results;
            this.isLoading = false
          });
      }
    }, 500)
  }
};
</script>

<style>
/* scrollbar of search suggestion */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.search-list {
  height: 28rem;
}
.hollow-dots-spinner,
.hollow-dots-spinner * {
  box-sizing: border-box;
}

.hollow-dots-spinner {
  height: 15px;
  width: calc(30px * 3);
}

.hollow-dots-spinner .dot {
  width: 5px;
  height: 5px;
  margin: 0 calc(5px / 2);
  border: calc(5px / 5) solid gainsboro;
  border-radius: 50%;
  float: left;
  transform: scale(0);
  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
}

.hollow-dots-spinner .dot:nth-child(1) {
  animation-delay: calc(300ms * 1);
}

.hollow-dots-spinner .dot:nth-child(2) {
  animation-delay: calc(300ms * 2);
}

.hollow-dots-spinner .dot:nth-child(3) {
  animation-delay: calc(300ms * 3);
}

@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
  a.router-link-exact-active{
    color: white;
  }
</style>