<template>
  <v-treeview
    :active.sync="active"
    :items="items"
    :load-children="fetchUsers"
    :open.sync="open"
    activatable
    transition
    hoverable
    item-key="PKID[0]"
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
import { mapActions } from 'vuex'
export default {
  data: () => ({
    active: [],
    open: [],
    files: {
      pat: 'mdi mdi-account',
    },
  }),
  computed: {
    items() {
      return JSON.parse(JSON.stringify(this.$store.state.viewer.rootNodes))
    },
  },
  methods: {
    ...mapActions({
      load: 'viewer/LoadChildren',
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
      await this.load(param).then((res) => {
        const nodes = JSON.parse(JSON.stringify(res))
        for (const node in nodes) {
          item.children.push(nodes[node])
        }
      })
      console.log('TEST', item)
    },
  },
}
</script>

<style scoped></style>
