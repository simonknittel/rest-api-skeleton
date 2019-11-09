<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="2" sm="6">
      <v-card>
        <v-card-title>Login</v-card-title>

        <v-form @submit.prevent="submit" class="px-4 pb-4">
          <v-text-field
            v-model="email"
            label="Email address"
            type="email"
            prepend-icon="mdi-email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-icon="mdi-lock"
            :rules="[rules.required]"
          ></v-text-field>

          <div class="d-flex justify-end">
            <v-btn type="submit" :loading="loading" color="deep-purple accent-4" dark>Submit</v-btn>
          </div>
        </v-form>

        <v-divider></v-divider>

        <div class="pa-4 text-center">
          <v-btn to="/signup" text>Create an account</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import router from '@/router'

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid.'
        },
      },
    }
  },
  methods: {
    submit: function() {
      this.loading = true

      // TODO: Trigger validation

      const body = new URLSearchParams()
      body.append('login', this.email.trim())
      body.append('password', this.password)

      fetch('http://localhost:8000/login', {
        method: 'POST',
        credentials: 'include',
        body,
      })
        .then(res => {
          if (res.status === 200) {
            res
              .json()
              .then(json => {
                this.$store.commit('storeAuthentication', json)
                router.push({ name: 'home' })
              })
          } else if (res.status === 401) {
            // TODO: Show error message for wrong email or password
          } else {
            // TODO: Show error message for some other error
          }
        })
        .catch(err => { // Propably an CORS error
          // TODO: Show error message for some other error
          console.error('err', err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
