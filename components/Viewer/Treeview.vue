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
    <template v-slot:prepend="{ item }">
      <v-icon>
        {{ files[item.ico] }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
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
  }),
  computed: {
    items() {
      return this.$store.state.viewer.tree
    },
    selected() {
      console.log('selected')
      return true
    },
  },
  methods: {
    ...mapActions({
      load: 'viewer/LoadChildren',
      nodeData: 'viewer/GetNodeData',
      getImage: 'viewer/getImageBinary',
    }),
    ...mapMutations({
      loadInViewer: 'viewer/loadInViewer',
      setChildren: 'viewer/addChildren',
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
        parentNode: JSON.parse(JSON.stringify(item)),
      }

      await this.load(param).then((res) => {
        if (res.length === 0) {
          this.setChildren({ parent: item, children: [] })
          return
        }
        this.setChildren({ parent: item, children: res })
      })

      this.loadInViewer(item)
    },
    updateActive() {
      console.log('updateActive')
    },
  },
}
</script>

<style scoped></style>
