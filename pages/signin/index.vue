<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="8" lass="justify-center align-center">
        <v-card outlined elevation="2">
          <v-card-title class="mt-1">
            <v-avatar size="56">
              <img
                alt="user"
                src="~/assets/SHE-CORE-Alpha.png"
                style="background-color: #4a5f9f"
              />
            </v-avatar>
            <h2 class="font-weight-bold ml-3 mt-5">Anmeldung</h2>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="validate"
            >
              <v-text-field
                v-model="user.login"
                label="Benutzername"
                prepend-icon="mdi-account-circle"
                :rules="[(v) => !!v || 'Benutzername eingeben']"
                required
              />
              <v-text-field
                v-model="user.password"
                :type="showPassword ? 'text' : 'password'"
                label="Passwort"
                :rules="[(v) => !!v || 'Password eingeben']"
                required
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @keydown.enter="validate"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              style="background-color: #4a5f9f"
              class="white--text"
              :disabled="!valid"
              primary
              large
              block
              @click="validate"
              >Anmelden
              <v-icon style="margin-top: -1px" class="ml-3"
                >mdi mdi-keyboard-return</v-icon
              ></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'signin',
  data() {
    return {
      valid: true,
      showPassword: false,
      user: {
        login: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({ authenticateUser: 'auth/authenticateUser' }),
    validate() {
      if (this.$refs.form.validate() === false) {
        return
      }
      this.authenticateUser(this.user).then(() => {
        this.$router.push('/')
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
