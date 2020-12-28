<template>
  <div class="center">
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'frau',
  data() {
    return {
      frau: {
        user: '',
        password: '',
        patientId: '',
        fallnummer: '',
        documentId: '',
        baumsf: '',
        module: '',
      },
    }
  },
  mounted() {
    this.frau.password = this.$route.query.password
    this.frau.user = this.$route.query.username
    this.frau.patientId = this.$route.query.PatientId
    this.frau.fallnummer = this.$route.query.Fallnummer
    this.frau.documentId = this.$route.query.DocumentId
    this.frau.baumsf = this.$route.query.baumsf
    this.frau.module =
      this.$route.query.module === undefined
        ? '/viewer'
        : this.$route.query.module
    this.validate()
  },
  methods: {
    ...mapActions({ authenticateUser: 'auth/authenticateUser' }),
    validate() {
      if (this.frau.user === undefined || this.frau.password === undefined) {
        this.$nuxt.error({
          reload: true,
          statusCode: 930,
          message: 'Logindaten sind nicht vorhanden',
        })
      }
      this.authenticateUser({
        login: this.frau.user,
        password: this.frau.password,
      })
        .then(() => {
          this.$router.push('/viewer')
        })
        .catch(() => {
          this.$nuxt.error({
            reload: true,
            statusCode: 408,
            message: '408 Login nicht möglich',
          })
        })
    },
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
