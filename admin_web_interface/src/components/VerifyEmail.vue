<template>
  <div v-if="this.$store.state.verifyEmail !== null">
    <v-alert v-if="this.$store.state.verifyEmail === 'success'" type="success" outlined>
      Email successfully verified.
    </v-alert>

    <v-alert v-if="this.$store.state.verifyEmail === 'error'" type="error" outlined>
      There has been an issue with verifying the email address. Please try again later.
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'VerifyEmail',
  created() {
    setTimeout(() => {
      this.$store.commit('hideVerifyEmail')
    }, 5000)
  }
}
</script>
