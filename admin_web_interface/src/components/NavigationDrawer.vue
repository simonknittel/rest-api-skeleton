<template>
  <v-navigation-drawer app class="deep-purple accent-4" dark>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          rest-api-skeleten
        </v-list-item-title>
        <v-list-item-subtitle>
          admin web interface
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-home', route: '/' },
        { title: 'Users', icon: 'mdi-account-group', route: '/users' },
        { title: 'Sessions', icon: 'mdi-account-group', route: '/sessions' },
        { title: 'UserTokens', icon: 'mdi-account-group', route: '/user-tokens' },
      ],
      right: null,
    }
  },
}
</script>
