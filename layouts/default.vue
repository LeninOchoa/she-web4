<template>
  <v-app dark>
    <TheHeader />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheFooter from '@/components/Navigation/TheFooter'
export default {
  middleware: ['check-auth', 'auth'],
  components: { TheFooter, TheHeader },
}
</script>
