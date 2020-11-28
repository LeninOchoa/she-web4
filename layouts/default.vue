<template>
  <v-app dark>
    <TheHeader />
    <TheSidenav />
    <v-main>
      <div>
        <nuxt />
      </div>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheFooter from '@/components/Navigation/TheFooter'
import TheSidenav from '@/components/Navigation/TheSidenav'
export default {
  middleware: ['check-auth', 'auth'],
  components: { TheSidenav, TheFooter, TheHeader },
}
</script>
