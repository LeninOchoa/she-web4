<template>
  <v-footer app dark color="#00469B" class="navigation-items">
    <span>&copy; {{ new Date().getFullYear() }}</span>
    <span class="ml-4">Synios Document & Workflow Management GmbH</span>
  </v-footer>
</template>

<style scoped>
.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}
</style>
