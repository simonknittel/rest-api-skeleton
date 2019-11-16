<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="mt-4">
        <v-card-title>Create new user</v-card-title>

        <v-form ref="form" @submit.prevent="submit" class="px-4 pb-4">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="email"
                label="email (required)"
                type="email"
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="password"
                label="password"
                type="password"
                prepend-icon="mdi-lock"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="permissionRole"
                :items="permissionRoles"
                label="permissionRole"
                prepend-icon="mdi-lock"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="whitelistedPermissions"
                label="whitelistedPermissions"
                type="text"
                prepend-icon="mdi-lock"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="blacklistedPermissions"
                label="blacklistedPermissions"
                type="text"
                prepend-icon="mdi-lock"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12">
              <v-checkbox
                v-model="emailVerified"
                label="emailVerified"
              ></v-checkbox>
            </v-col>
          </v-row>

          <div class="d-flex justify-end">
            <v-btn type="submit" :loading="loading" color="deep-purple accent-4" dark>Submit</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CreateUser',
  data() {
    return {
      email: '',
      password: '',
      permissionRoles: [0, 1, 2],
      permissionRole: 2,
      whitelistedPermissions: '',
      blacklistedPermissions: '',
      emailVerified: false,
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
      body.append('permissionRole', this.permissionRole)
      body.append('whitelistedPermissions', this.whitelistedPermissions)
      body.append('blacklistedPermissions', this.blacklistedPermissions)
      body.append('emailVerified', this.emailVerified)

      fetch(process.env.VUE_APP_API_HOST + '/users', {
        method: 'POST',
        credentials: 'include',
        body,
      })
        .then(res => {
          if (res.status !== 200) {
            console.error(res) // TODO
            return
          }

          this.$store.dispatch('fetchUsers')
          this.$refs.form.reset()
        })
        .catch(err => { // Propably an CORS error
          console.error(err) // TODO
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
