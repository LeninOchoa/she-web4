<template>
  <v-app dark>
    <TheHeader />
    <TheSidenav />
    <v-main>
      <div class="loadBackground">
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

<style>
.loadBackground {
  background-image: url('~assets/Titel-100_700x350.png');
  height: 100%;
  width: 100%;
  position: relative;
  background-position: center;
  background-size: contain;
}
body {
  margin: 0;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
