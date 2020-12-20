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

    <v-container id="container" fluid>
      <div id="left_panel">left content!</div>
      <div id="right_panel">
        <div id="drag"></div>
        <div
          id="viewer-image"
          ref="image"
          style="width: 100%; height: 800px; position: relative"
        />
      </div>
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
    this.setBorderWidth()
  },
  methods: {
    setBorderWidth() {
      let isResizing = false
      let lastDownX = 0
      ;(function () {
        const container = document.getElementById('container')
        const left = document.getElementById('left_panel')
        const right = document.getElementById('right_panel')
        const handle = document.getElementById('drag')

        handle.onmousedown = function (e) {
          isResizing = true
          // eslint-disable-next-line no-unused-vars
          lastDownX = e.clientX
        }

        document.onmousemove = function (e) {
          // we don't want to do anything if we aren't resizing.
          if (!isResizing) {
            return
          }

          const offsetRight =
            container.clientWidth - (e.clientX - container.offsetLeft)

          left.style.right = offsetRight + 'px'
          right.style.width = offsetRight + 'px'
        }

        document.onmouseup = function (e) {
          // stop resizing
          isResizing = false
        }
      })()
    },
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
#left_panel {
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  right: 20%;
  background: white;
}

#right_panel {
  position: absolute;
  right: 0;
  top: 70px;
  bottom: 0;
  width: 80%;
  color: #fff;
  background: white;
}

#drag {
  position: absolute;
  left: -4px;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 2px;
  cursor: w-resize;
  background: blue;
}
</style>
