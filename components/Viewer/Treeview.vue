<template>
  <v-treeview
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
      <div @click="onClick(item)">{{ item.name }}</div>
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
    active: [],
    open: [],
    items: [],
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
        } else {
          item.children = []
        }

        if (res.files.length > 0) {
          if (item.files.length === 0) {
            item.files = res.files
            item.imageUrls = res.images
            this.loadInViewer(item.imageUrls)
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
      console.log('openDialog', item)
    },
  },
}
</script>

<style scoped></style>
