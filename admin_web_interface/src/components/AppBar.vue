<template>
  <v-app-bar app dense flat color="transparent">
    <v-spacer></v-spacer>

    <span class="mr-4">Logged in as <span class="font-weight-bold">foo@bar</span></span>

    <v-btn @click="logout" :loading="loading" text color="deep-purple accent-4">
      <v-icon left>mdi-logout</v-icon> Log out
    </v-btn>
  </v-app-bar>
</template>

<script>
import router from '@/router'

export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    logout() {
      this.loading = true

      fetch('http://localhost:8000/logout', {
        credentials: 'include',
      })
        .then(res => {
          if (res.status === 200) {
            this.$store.commit('clearAuthentication')
            router.push({ name: 'login' })
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
    },
  },
}
</script>
