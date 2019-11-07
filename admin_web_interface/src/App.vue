<template>
  <v-app>
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

    <v-app-bar app dense flat color="transparent">
      <v-spacer></v-spacer>

      <span class="mr-4">Logged in as <span class="font-weight-bold">foo@bar</span></span>

      <v-btn text color="deep-purple accent-4">
        <v-icon left>mdi-logout</v-icon> Log out
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-home', route: { name: 'home' } },
          { title: 'Users', icon: 'mdi-account-group', route: { name: 'users' } },
        ],
        right: null,
      }
    },
  }
</script>

<style lang="scss"></style>
