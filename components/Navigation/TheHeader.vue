<template>
  <v-app-bar dense absolute app dark color="#00469B">
    <v-toolbar-title style="cursor: pointer" @click="$router.push('/')"
      >SHE</v-toolbar-title
    >

    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isAutheticated" class="hidden-sm-and-down">
      <v-btn
        v-for="(modul, index) in modules"
        :key="index"
        text
        :to="modul.link"
        nuxt
      >
        {{ modul.Name }}
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
