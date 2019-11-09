<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="2" sm="6">
      <v-card>
        <v-card-title>Signup</v-card-title>

        <v-form>
          <div class="px-4 pb-4">
            <v-text-field label="Email address" type="email" prepend-icon="mdi-email"></v-text-field>
            <v-text-field label="Password" type="password" prepend-icon="mdi-lock"></v-text-field>

            <div class="d-flex justify-end">
              <v-btn type="submit" color="deep-purple accent-4" dark>Submit</v-btn>
            </div>
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
