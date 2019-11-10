<template>
  <div>
    <h1 class="mb-4">UserTokens</h1>

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
        :items="userTokensStringified"
        :search="search"
        sort-by="id"
        :loading="tableLoading"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      userTokens: [],
      tableLoading: true,
      newUserTokenLoading: false,
    }
  },
  computed: {
    headers() {
      if (this.userTokens.length === 0) return []

      const keys = Object.keys(this.userTokens[0])
      const headers = keys.map(value => { return { text: value, value } })

      headers.push({ text: 'Actions', value: 'action', sortable: false })

      return headers
    },
    userTokensStringified() {
      return this.userTokens.map(userToken => {
        // TODO: Add toggle to show dates in human readable format
        return {
          ...userToken,
        }
      })
    },
  },
  methods: {
    deleteItem(item) {
      fetch('http://localhost:8000/user-tokens/' + item.id, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(res => {
          if (res.status !== 200) {
            // TODO: Show error message
            console.error(res)
            return;
          }

          this.userTokens = this.userTokens.filter(userToken => userToken.id !== item.id)
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
  created() {
    fetch('http://localhost:8000/user-tokens', {
      credentials: 'include',
    })
      .then(res => {
        if (res.status !== 200) {
          console.error(res)
          return
        }

        return res.json()
      })
      .then(json => {
        this.userTokens = json
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
