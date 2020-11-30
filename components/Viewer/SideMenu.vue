<template>
  <v-navigation-drawer
    ref="drawer"
    v-model="drawer"
    app
    clipped
    :width="navigation.width"
  >
    <v-toolbar color="primary" class="elevation-2" flat>
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
              dark
              @change="SelectTree"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <v-tabs v-model="activeTab" grow>
      <v-tab> Suche </v-tab>
      <v-tab-item :eager="true">
        <Search @search="Search"></Search>
      </v-tab-item>
      <v-tab> Baum </v-tab>
      <v-tab-item :eager="true">
        <Treeview></Treeview>
      </v-tab-item>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Search from '@/components/She/Search'
import Treeview from '@/components/Viewer/Treeview'
export default {
  components: { Search, Treeview },
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    activeTab: 0,
    select: null,
    navigation: {
      width: 365,
      borderSize: 2,
    },
    items: [],
  }),
  mounted() {
    this.setBorderWidth()
    this.setEvents()
    this.GetTrees()
  },
  methods: {
    ...mapActions({
      trees: 'viewer/getTreeData',
      treeFields: 'viewer/getTreeFields',
      search: 'viewer/searchNodes',
    }),
    ...mapMutations({ tree: 'viewer/setTree' }),
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
      if (this.$store.state.viewer.trees.length === 0) {
        await this.trees().then((res) => {
          this.items = res
          if (res.length === 1) {
            this.select = this.items[0]
            this.SelectTree()
          }
        })
      } else {
        this.items = this.$store.state.viewer.trees
        if (this.$store.state.viewer.trees.length === 1) {
          this.select = this.items[0]
          await this.SelectTree()
        }
      }
    },
    async SelectTree() {
      const fields = this.$store.state.viewer.treeFields.find(
        (f) => f.treeId === this.select.BaumId
      )
      if (fields === undefined) {
        await this.treeFields(this.select.BaumId)
      }
    },
    async Search(param) {
      param.treeId = this.select.BaumId
      await this.search(param).then((res) => {
        if (res.length > 0) this.activeTab = 1
        this.tree([])
        setTimeout(() => {
          this.tree(res)
        }, 500)
      })
    },
  },
}
</script>
