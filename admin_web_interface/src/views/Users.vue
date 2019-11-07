<template>
  <div>
    <h1 class="mb-4">Users</h1>

    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          clearable
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'email', value: 'email' },
          { text: 'rank', value: 'rank' },
          { text: 'emailVerified', value: 'emailVerified' },
          { text: 'createdAt', value: 'createdAt' },
        ],
        users: [
          {
            email: 'foo@bar',
            rank: 1,
            emailVerified: 'true',
            createdAt: Date.now()
          },
          {
            email: 'foo2@bar',
            rank: 2,
            emailVerified: 'true',
            createdAt: Date.now()
          },
          {
            email: 'foo3@bar',
            rank: 1,
            emailVerified: 'false',
            createdAt: Date.now()
          },
          {
            email: 'foo4@bar',
            rank: 2,
            emailVerified: 'true',
            createdAt: Date.now()
          },
        ],
      }
    },
  }
</script>
