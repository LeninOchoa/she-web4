<template>
  <v-treeview
    :active.sync="active"
    :items="items"
    :load-children="fetchUsers"
    :open.sync="open"
    activatable
    transition
    dense
    item-key="id"
    open-on-click
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
  },
  methods: {
    ...mapActions({
      load: 'viewer/LoadChildren',
      nodeData: 'viewer/GetNodeData',
      getImage: 'viewer/getImageBinary',
    }),
    ...mapMutations({
      loadInViewer: 'viewer/loadInViewer',
    }),
    async fetchUsers(item) {
      console.log('fetchUsers-0', item)
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
        parentNode: item,
      }
      console.log('fetchUsers-1')
      await this.load(param).then((res) => {
        if (res.length === 0) {
          item.children = []
          console.log('fetchUsers-2')
          return
        }
        for (const node in res) {
          console.log('fetchUsers-3')
          item.children.push(JSON.parse(JSON.stringify(res[node])))
          console.log('fetchUsers-4')
        }
      })
      console.log('fetchUsers-5')
      this.loadInViewer(item)
      console.log('fetchUsers-6')
    },
  },
}
</script>

<style scoped></style>
