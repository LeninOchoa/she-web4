<template>
  <v-treeview
    ref="tree"
    :active.sync="active"
    :items="items"
    :load-children="fetchUsers"
    :open.sync="open"
    activatable
    dense
    item-key="id"
    open-on-click
    transition
  >
    <template slot="label" slot-scope="{ item }">
      <div @click="onClick(item)">
        <v-icon class="mr-2"> {{ files[item.ico] }} </v-icon>{{ item.name }}
        <v-menu bottom left transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group color="primary">
              <v-list-item v-for="(it, i) in menus" :key="i">
                <v-list-item-icon>
                  <v-icon>mdi-arrow-expand-all</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title @click="onClickMenu(item)">{{
                    it.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import { mapMutations } from 'vuex'
import { searchRootNodes, loadChildren } from '@/modules/viewer/ViewerService'
export default {
  data: () => ({
    files: {
      pat: 'mdi mdi-account',
      auf: 'mdi-seat-flat',
      allg: 'mdi-account-star',
      bel: 'mdi-file-multiple',
      rest: 'mdi-folder',
    },
    expand: false,
    active: [],
    open: [],
    items: [],
    menus: [{ title: 'Ein/Aus -klappen' }],
  }),
  computed: {
    searchParamter() {
      return this.$store.state.viewer.searchParameter
    },
  },
  watch: {
    searchParamter(newValue, oldValue) {
      this.rootNodes(newValue)
    },
  },
  methods: {
    ...mapMutations({
      loadInViewer: 'viewer/loadInViewer',
    }),
    async fetchUsers(item) {
      const param = {
        treeId: this.$store.state.viewer.searchParameter.treeId,
        ParentNode: {
          EbeneID: item.data.EbeneID,
          PKID: item.data.PKID,
          sPKID: item.data.sPKID,
          BelegTypID: item.data.BelegTypID,
        },
        Sfs: JSON.parse(
          JSON.stringify(this.$store.state.viewer.searchParameter.data)
        ),
      }
      const token = this.$store.state.auth.token
      await loadChildren(param, token).then((res) => {
        if (res.nodes.length !== 0) {
          item.children = res.nodes

          if (this.expand) {
            for (const index in res.nodes) {
              const node = res.nodes[index]
              this.fetchUsers(node)
              if (this.open.includes(item.id) === false) {
                this.open = [...this.open, item.id]
              }
            }
          }
        } else {
          item.children = []
        }

        if (res.files.length > 0) {
          if (item.files.length === 0) {
            item.files = res.files
            item.imageUrls = res.images
            if (this.expand === false) {
              this.loadInViewer(item.imageUrls)
            }
          }
        }
      })
    },
    async rootNodes(param) {
      const token = this.$store.state.auth.token
      await searchRootNodes(param, token).then((res) => {
        if (res.length > 0) this.activeTab = 1
        this.items = []
        setTimeout(() => {
          this.items = res
        }, 500)
      })
    },
    onClick(item) {
      this.expand = false
      if (item.imageUrls.length > 0) this.loadInViewer(item.imageUrls)
    },
    onClickMenu(item) {
      if (this.open.includes(item.id) === false) {
        this.open = [...this.open, item.id]
        this.expand = true
      } else {
        this.open = this.open.filter((nodeId) => nodeId !== item.id)
        this.expand = false
      }
    },
  },
}
</script>

<style scoped></style>
