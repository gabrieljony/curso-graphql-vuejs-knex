<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>GraphQL</span>
        <span class="font-weight-light">Client</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: mapActions(['setUsuario']),
  created() {
    this.setUsuario(null)
  }
}
</script>
