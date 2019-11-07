<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title>Login</v-card-title>

    <v-form>
      <div class="px-4 pb-4">
        <v-text-field label="Email address" type="email"></v-text-field>
        <v-text-field label="Password" type="password"></v-text-field>

        <div class="d-flex justify-end">
          <v-btn color="deep-purple accent-4" dark>Submit</v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>
