<template>
  <div>
    <!--The SideMenu Component go here-->
    <SideMenu
      :drawer="drawer"
      :api-key="api_key"
      @selectsource="setResource"
    ></SideMenu>

    <v-toolbar fixed color="primary" class="elevation-2">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">News App</v-toolbar-title>
    </v-toolbar>

    <v-container fluid>
      <!--The MainContent Component go here-->
      <MainContent :articles="articles"></MainContent>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios' // importing the axios a HTTP library to connects the app with the API
import SideMenu from '@/components/Viewer/SideMenu.vue' // import the SideMenu component
import MainContent from '@/components/Viewer/MainContent.vue' // import the MainContent component

export default {
  components: {
    SideMenu,
    MainContent,
  },

  data() {
    return {
      drawer: true, // true to show/hide the side navigation drawer
      api_key: '3630960b6fc6412aba5ab2ddd4d786ec',
      articles: [],
      errors: [],
    }
  },

  created() {
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' +
          this.api_key
      )
      .then((response) => {
        this.articles = response.data.articles
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  },

  methods: {
    setResource(source) {
      axios
        .get(
          'https://newsapi.org/v2/top-headlines?sources=' +
            source +
            '&apiKey=' +
            this.api_key
        )
        .then((response) => {
          // this.articles = response.data.articles
          this.articles = response.data.articles
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
  },
}
</script>
