<template>
  <v-app-bar dense absolute app dark color="#00469B">
    <v-toolbar-title>SHE</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isAutheticated" class="hidden-sm-and-down">
      <v-btn
        v-for="(modul, index) in modules"
        :key="index"
        text
        flat
        class="nav-item"
      >
        <nuxt-link :to="modul.link">{{ modul.Name }}</nuxt-link>
      </v-btn>
    </v-toolbar-items>
    <v-tooltip v-if="isAutheticated" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="onLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Abmelden</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TheHeader',
  computed: {
    ...mapGetters({
      isAutheticated: 'auth/isAutheticated',
      modules: 'auth/modules',
    }),
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
    onLogout() {
      this.logout()
      this.$router.push('/signin')
    },
  },
}
</script>

<style scoped>
.nav-item a {
  text-decoration: none;
  color: white;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}
</style>
