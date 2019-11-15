<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="2" sm="6">
      <v-alert v-if="signUpRequest === 'success'" type="success" outlined>
        Please check your mailbox to verify your email address.
      </v-alert>

      <v-alert v-if="signUpRequest === 'error'" type="error" outlined>
        There has been an issue with creating an account. Please try again later.
      </v-alert>

      <v-card>
        <v-card-title>Signup</v-card-title>

        <v-form @submit.prevent="submit" ref="form" class="px-4 pb-4">
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
          <v-btn to="/login" text>Log in into an existing account</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      signUpRequest: null,
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

      fetch(process.env.VUE_APP_API_HOST + '/signup', {
        method: 'POST',
        body,
      })
        .then(res => {
          if (res.status === 200) {
            this.signUpRequest = 'success'
            this.$refs.form.reset()
          } else {
            this.signUpRequest = 'error'
          }
        })
        .catch(() => { // Propably an CORS error
          this.signUpRequest = 'error'
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
