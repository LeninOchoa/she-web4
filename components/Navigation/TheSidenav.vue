<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>SHE</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="(modul, index) in modules"
        :key="index"
        link
        nuxt
        :to="modul.link"
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ modul.Name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link nuxt>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title @click="onLogout">Abmelden</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      show: 'she/showDrawer',
      modules: 'auth/modules',
    }),
    drawer: {
      get() {
        return this.show
      },
      set(newValue) {
        if (newValue === false) this.showDrwawer(false)
      },
    },
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
    ...mapMutations({ showDrwawer: 'she/showDrawer' }),
    onLogout() {
      this.showDrwawer(false)
      this.logout()
      this.$router.push('/signin')
    },
  },
}
</script>
