<template>
  <div>
    <!--The SideMenu Component go here-->
    <SideMenu :drawer="drawer"></SideMenu>

    <v-toolbar color="primary" class="elevation-2" flat>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">News App</v-toolbar-title>
    </v-toolbar>

    <v-container fluid>
      <v-row wrap no-gutters>
        <div
          id="viewer-image"
          ref="image"
          style="width: 100%; height: 65vh; position: relative"
        />
      </v-row>
      <v-row>
        <div class="parent">
          <v-card v-for="card in cards" :key="card.title" class="ma-5">
            <v-img
              :src="card.src"
              max-height="150"
              max-width="150"
              min-height="150"
              min-width="150"
            >
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SideMenu from '@/components/Viewer/SideMenu.vue' // import the SideMenu component
import OpenSeadragon from 'openseadragon'
window.OpenSeadragon = OpenSeadragon
export default {
  components: {
    SideMenu,
  },

  data() {
    return {
      drawer: true, // true to show/hide the side navigation drawer
      viewer: null,
      contentBuffer: [],
      ima: null,
      images: [],
      imageUrls: {},
      cards: [
        {
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 4,
        },
        {
          title: 'Favorite road trips',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          flex: 4,
        },
        {
          title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          flex: 4,
        },
        {
          title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          flex: 4,
        },
        {
          title: 'Favorite road trips',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          flex: 4,
        },
        {
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          flex: 4,
        },
        {
          title: 'Favorite road trips',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          flex: 4,
        },
        {
          title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          flex: 4,
        },
        {
          title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          flex: 4,
        },
        {
          title: 'Favorite road trips',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          flex: 4,
        },
      ],
    }
  },
  computed: {
    storeImages() {
      return this.$store.state.viewer.images
    },
  },
  watch: {
    storeImages(newCount, oldCount) {
      this.imageUrls = newCount
      this.ShowPictures()
    },
  },
  mounted() {
    if (this.viewer === null) this.initViewer()
    this.$root.$on('clearViewer', () => {
      this.clearViewer()
    })
  },
  methods: {
    ShowPictures() {
      this.clearViewer()
      for (let index = 0; index < this.imageUrls.length; ++index) {
        const item = this.imageUrls[index]
        this.images.push({
          type: 'image',
          url: item,
        })
      }
      this.viewer.open(this.images)
    },
    initViewer() {
      this.viewer = OpenSeadragon({
        id: 'viewer-image',
        animationTime: 0.4,
        prefixUrl: '/assets/images/',
        showNavigator: true,
        sequenceMode: true,
        showReferenceStrip: true,
        referenceStripScroll: 'vertical',
        preserveViewport: true,
        homeButton: 'home',
        fullPageButton: 'full-page',
        tileSources: this.files,
      })
    },
    clearViewer() {
      this.images = []
      this.viewer.world.resetItems()
      this.viewer.tileSources = []
      this.viewer.open(this.images)
    },
  },
}
</script>

<style scoped>
.parent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-x: auto;
}
</style>
