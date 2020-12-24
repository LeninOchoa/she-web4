<template>
  <div>
    <v-app-bar dense app clipped-left clipped-right dark color="#00469B" fixed>
      <v-app-bar-nav-icon
        v-if="isAutheticated"
        class="navigation-drawer"
        @click="onToggle"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer">
        <v-btn text to="/" nuxt> SHE </v-btn></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="isAutheticated" class="navigation-items">
        <v-btn
          v-for="(modul, index) in modules"
          :key="index"
          text
          :to="modul.link"
          nuxt
        >
          {{ modul.Name }}
        </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="onLogout">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Abmelden</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'TheHeader',
  computed: {
    ...mapGetters({
      isAutheticated: 'auth/isAutheticated',
      modules: 'auth/modules',
      show: 'she/showDrawer',
    }),
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
    ...mapMutations({ showDrwawer: 'she/showDrawer' }),
    onLogout() {
      this.logout()
      this.$router.push('/signin')
    },
    onToggle() {
      this.showDrwawer(!this.show)
    },
  },
}
</script>

<style scoped>
.navigation-drawer {
  display: block;
}

@media (min-width: 768px) {
  .navigation-drawer {
    display: none;
  }
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}
</style>
