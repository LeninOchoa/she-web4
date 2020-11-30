<template>
  <div
    id="viewer-image"
    ref="image"
    style="width: 100%; height: 800px; position: relative"
  />
</template>

<script>
import OpenSeadragon from 'openseadragon'
window.OpenSeadragon = OpenSeadragon
export default {
  name: 'Viewer',
  data() {
    return {
      viewer: null,
      contentBuffer: [],
      ima: null,
      images: [],
      imageUrls: {},
      data: { color: '#673AB7' },
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
  },
  methods: {
    ShowPictures() {
      this.images = []
      this.viewer.world.resetItems()
      this.viewer.tileSources = []

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
        tileSources: this.files,
      })
    },
  },
}
</script>
