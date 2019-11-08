<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-card class="mx-auto" max-width="344">
          <v-card-title>Login</v-card-title>

          <v-form>
            <div class="px-4 pb-4">
              <v-text-field label="Email address" type="email" prepend-icon="mdi-email"></v-text-field>
              <v-text-field label="Password" type="password" prepend-icon="mdi-lock"></v-text-field>

              <div class="d-flex justify-end">
                <v-btn color="deep-purple accent-4" dark>Submit</v-btn>
              </div>
            </div>
          </v-form>

          <v-divider></v-divider>

          <div class="pa-4 text-center">
            <v-btn to="/signup" text>Create an account</v-btn>
          </div>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>
