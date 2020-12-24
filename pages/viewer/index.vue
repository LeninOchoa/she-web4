<template>
  <div>
    <!--The SideMenu Component go here-->
    <SideMenu :drawer="drawer"></SideMenu>
    <SideMenuRight :drawer="drawer"></SideMenuRight>

    <v-toolbar color="primary" class="elevation-2" flat>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn id="zoom-out" icon dark>
        <v-icon>mdi-magnify-minus-outline</v-icon>
      </v-btn>

      <v-btn id="zoom-in" icon dark>
        <v-icon>mdi-magnify-plus-outline</v-icon>
      </v-btn>

      <v-btn id="home" icon dark>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>

      <v-btn id="full-page" icon dark>
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>

      <v-btn id="rotate-left" icon dark>
        <v-icon>mdi-rotate-left</v-icon>
      </v-btn>

      <v-btn id="rotate-right" icon dark>
        <v-icon>mdi-rotate-right</v-icon>
      </v-btn>
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
          <v-hover
            v-for="card in cards"
            v-slot="{ hover }"
            :key="card.index"
            class="hoverCursor"
            open-delay="50"
          >
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="ma-5"
            >
              <v-img
                :src="card.src"
                max-height="150"
                max-width="150"
                min-height="150"
                min-width="150"
                @click="activateCard(card)"
              >
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon @click="checkMark(card)">
                  <v-icon v-if="card.marked">mdi-checkbox-marked</v-icon>
                  <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-printer</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SideMenu from '@/components/Viewer/SideMenu.vue' // import the SideMenu component
import OpenSeadragon from 'openseadragon'
import SideMenuRight from '~/components/Viewer/SideMenuRight'
window.OpenSeadragon = OpenSeadragon
export default {
  components: {
    SideMenuRight,
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
      cards: [],
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
      // this.clearViewer()
      const imgs = []
      for (let index = 0; index < this.imageUrls.length; ++index) {
        const item = this.imageUrls[index]
        imgs.push({
          index,
          src: item,
          marked: false,
        })
      }
      if (imgs.length > 0) {
        this.activateCard(imgs[0])
      }
      this.cards = imgs
    },
    initViewer() {
      this.viewer = OpenSeadragon({
        id: 'viewer-image',
        animationTime: 0.4,
        prefixUrl: '/assets/images/',
        // showNavigator: true,
        sequenceMode: true,
        // showReferenceStrip: true,
        // referenceStripScroll: 'vertical',
        showRotationControl: true,
        preserveViewport: true,
        zoomInButton: 'zoom-in',
        zoomOutButton: 'zoom-out',
        homeButton: 'home',
        fullPageButton: 'full-page',
        rotateLeftButton: 'rotate-left',
        rotateRightButton: 'rotate-right',
        tileSources: this.files,
        // Enable touch rotation on tactile devices
        gestureSettingsTouch: {
          pinchRotate: true,
        },
      })
    },
    clearViewer() {
      this.cards = []
      this.images = []
      this.viewer.world.resetItems()
      this.viewer.tileSources = []
      this.viewer.open(this.images)
    },
    activateCard(param) {
      this.clearViewer()
      this.images.push({
        type: 'image',
        url: param.src,
      })
      this.viewer.open(this.images)
    },
    checkMark(param) {
      param.marked = !param.marked
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
.hoverCursor:hover {
  cursor: pointer;
}
</style>
