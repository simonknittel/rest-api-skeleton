<template>
  <div>
    <h1 class="mb-4">Sessions</h1>

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
        :items="sessionsStringified"
        :search="search"
        sort-by="id"
        :sort-desc="true"
        :multi-sort="true"
        :loading="tableLoading"
      >
        <template v-slot:item.active="{ item }">
          <v-icon small v-if="item.active" color="success">mdi-radiobox-marked</v-icon>
          <v-icon small v-if="!item.active" color="error">mdi-radiobox-blank</v-icon>
        </template>

        <!-- TODO: Add "Copy to clipboard" button -->
        <template v-slot:item.token="{ item }">
          <span :title="item.token" class="token">{{ item.token }}</span>
        </template>

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
      sessions: [],
      tableLoading: true,
      newSessionLoading: false,
    }
  },
  computed: {
    headers() {
      if (this.sessions.length === 0) return []

      const keys = Object.keys(this.sessions[0])
      const headers = keys.map(value => { return { text: value, value } })

      headers.push({ text: 'Actions', value: 'action', sortable: false })

      return headers
    },
    sessionsStringified() {
      return this.sessions.map(session => {
        // TODO: Add toggle to show dates in human readable format
        return {
          ...session,
        }
      })
    },
  },
  methods: {
    deleteItem(item) {
      fetch(process.env.VUE_APP_API_HOST + '/sessions/' + item.id, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(res => {
          if (res.status !== 200) {
            // TODO: Show error message
            console.error(res)
            return;
          }

          this.sessions = this.sessions.filter(session => session.id !== item.id)
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
  created() {
    fetch(process.env.VUE_APP_API_HOST + '/sessions', {
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
        this.sessions = json.map(item => {
          let active = true

          const createdAtTimestamp = new Date(item.createdAt).getTime()
          const expirationTimestamp = createdAtTimestamp + 1000 * 60 * 60 * 24 * 365 // TODO: Move to client config
          if (Date.now() > expirationTimestamp) active = false

          return {
            ...item,
            active,
          }
        })
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

<style lang="scss">
.token {
  overflow: hidden;
  max-width: 400px;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
</style>
