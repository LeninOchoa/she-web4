<template>
  <v-app dark>
    <TheHeader />
    <v-main>
      <v-container class="container">
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

<style scoped>
.container {
  background-image: url('~assets/Titel-100_700x350.png');
  height: 100%;
  width: 100%;
  position: relative;
  padding: 30px;
  background-position: center;
  background-size: auto;
}
</style>
