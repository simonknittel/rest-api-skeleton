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
        :sort-desc="true"
        :multi-sort="true"
        :loading="this.$store.state.usersLoading"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <CreateUser />
  </div>
</template>

<script>
import CreateUser from '@/components/CreateUser.vue'

export default {
  components: {
    CreateUser,
  },
  data() {
    return {
      search: '',
      newUserLoading: false,
    }
  },
  computed: {
    headers() {
      if (this.$store.state.users.length === 0) return []

      const keys = Object.keys(this.$store.state.users[0])
      const headers = keys.map(value => { return { text: value, value } })

      headers.push({ text: 'Actions', value: 'action', sortable: false })

      return headers
    },
    usersStringified() {
      return this.$store.state.users.map(user => {
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
      fetch(process.env.VUE_APP_API_HOST + '/users/' + item.id, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(res => {
          if (res.status !== 200) {
            console.error(res) // TODO: Show error message
            return;
          }

          this.$store.dispatch('fetchUsers')
        })
        .catch(err => {
          console.error(err) // TODO: Show error message
        })
    },
  },
  created() {
    this.$store.dispatch('fetchUsers')
  },
}
</script>
