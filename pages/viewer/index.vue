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
      <div
        id="viewer-image"
        ref="image"
        style="width: 100%; height: 800px; position: relative"
      />
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
