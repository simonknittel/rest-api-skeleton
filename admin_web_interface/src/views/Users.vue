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
        :items="usersStringified"
        :search="search"
        sort-by="id"
        sort-desc="true"
        :loading="tableLoading"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>Create new user</v-card-title>

      <v-form class="px-4 pb-4">
        <div class="d-flex justify-end">
          <v-btn type="submit" :loading="newUserLoading" color="deep-purple accent-4" dark>Submit</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      users: [],
      tableLoading: true,
      newUserLoading: false,
    }
  },
  computed: {
    headers() {
      if (this.users.length === 0) return []

      const keys = Object.keys(this.users[0])
      const headers = keys.map(value => { return { text: value, value } })

      headers.push({ text: 'Actions', value: 'action', sortable: false })

      return headers
    },
    usersStringified() {
      return this.users.map(user => {
        // TODO: Add toggle to show dates in human readable format
        return {
          ...user,
          emailVerified: user.emailVerified.toString(),
        }
      })
    },
  },
  methods: {
    deleteItem(item) {
      fetch('http://localhost:8000/users/' + item.id, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(res => {
          if (res.status !== 200) {
            // TODO: Show error message
            console.error(res)
            return;
          }

          this.users = this.users.filter(user => user.id !== item.id)
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
  created() {
    fetch('http://localhost:8000/users')
      .then(res => {
        if (res.status !== 200) {
          console.error(res)
          return
        }

        return res.json()
      })
      .then(json => {
        this.users = json
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        this.tableLoading = false
      })
  }
}
</script>
