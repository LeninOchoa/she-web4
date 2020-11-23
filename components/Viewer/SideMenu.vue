<template>
  <v-navigation-drawer
    id="style-1"
    ref="drawer"
    v-model="drawer"
    app
    clipped
    class="drawer-style"
    :width="navigation.width"
  >
    <v-toolbar color="primary">
      <v-container fluid>
        <v-row align="center">
          <v-col align-self="center" class="mt-5">
            <v-select
              v-model="select"
              :items="items"
              label="Baum"
              item-text="Bezeichnung"
              item-value="BaumId"
              persistent-hint
              return-object
              single-line
              @change="SelectTree"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <v-list dense class="pt-3 white--text">
      <v-list-item
        v-for="source in sources"
        :key="source.id"
        @click="selectSource(source.id)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ source.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  props: {
    apiKey: {
      type: String,
      default: '',
    },
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    sources: [],
    errors: [],
    select: null,
    selectedFields: {},
    navigation: {
      width: 365,
      borderSize: 3,
    },
    items: [],
  }),
  mounted() {
    axios
      .get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.apiKey)
      .then((response) => {
        // this.articles = response.data.articles
        this.sources = response.data.sources
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
    this.setBorderWidth()
    this.setEvents()
    this.GetTrees()
  },

  methods: {
    ...mapActions({
      trees: 'viewer/getTreeData',
      treeFields: 'viewer/getTreeFields',
    }),
    selectSource(source) {
      this.$emit('selectsource', source)
    },
    setBorderWidth() {
      const i = this.$refs.drawer.$el.querySelector(
        '.v-navigation-drawer__border'
      )
      i.style.width = this.navigation.borderSize + 'px'
      i.style.cursor = 'ew-resize'
      i.style.backgroundColor = 'blue'
    },
    setEvents() {
      const minSize = this.navigation.borderSize
      const el = this.$refs.drawer.$el
      const drawerBorder = el.querySelector('.v-navigation-drawer__border')
      const direction = el.classList.contains('v-navigation-drawer--right')
        ? 'right'
        : 'left'

      function resize(e) {
        document.body.style.cursor = 'ew-resize'
        const f =
          direction === 'right'
            ? document.body.scrollWidth - e.clientX
            : e.clientX
        el.style.width = f + 'px'
      }

      drawerBorder.addEventListener(
        'mousedown',
        (e) => {
          if (e.offsetX < minSize) {
            el.style.transition = 'initial'
            document.addEventListener('mousemove', resize, false)
          }
        },
        false
      )

      document.addEventListener(
        'mouseup',
        () => {
          el.style.transition = ''
          this.navigation.width = el.style.width
          document.body.style.cursor = ''
          document.removeEventListener('mousemove', resize, false)
        },
        false
      )
    },
    async GetTrees() {
      if (this.$store.state.viewer.treeData.length === 0) {
        await this.trees().then((res) => {
          this.items = res
          if (res.length === 1) {
            this.select = this.items[0]
            this.SelectTree()
          }
        })
      } else {
        this.items = this.$store.state.viewer.treeData
        if (this.$store.state.viewer.treeData.length === 1) {
          this.select = this.items[0]
          this.SelectTree()
        }
      }
    },
    SelectTree() {
      const fields = this.$store.state.viewer.treeFields.find(
        (f) => f.treeId === this.select.BaumId
      )
      if (fields === undefined) {
        this.treeFields(this.select.BaumId).then((result) => {
          this.selectedFields = result.data
        })
      } else {
        this.selectedFields = fields
      }
    },
  },
}
</script>

<style scoped>
.drawer-style {
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
}
</style>
