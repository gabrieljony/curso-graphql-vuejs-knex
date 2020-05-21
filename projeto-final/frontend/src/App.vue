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
      <Conteudo />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Conteudo from "@/components/Conteudo";

export default {
  name: "App",
  components: { Conteudo },
  methods: mapActions(["setUsuario"]),
  created() {
    this.setUsuario(null);
  },
};
</script>
