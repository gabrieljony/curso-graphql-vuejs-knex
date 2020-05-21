<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-btn color="primary" class="ml-0 mb-4" @click="obterUsuarios">
          Obter Usuários
        </v-btn>
      </v-flex>
      <v-flex>
        <div v-if="erros" class="mb-4">
          <Erros :erros="erros" />
        </div>
      </v-flex>
      <v-flex>
        <table v-if="table">
          <caption>Lista de Usuários</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Perfis</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in usuarios" :key="index">
              <td data-label="Account">{{usuario.id}}</td>
              <td data-label="Due Date">{{usuario.nome}}</td>
              <td data-label="Amount">{{usuario.email}}</td>
              <td data-label="Period">{{usuario.perfis.map((p) => p.rotulo).join(", ")}}</td>
            </tr> 
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Erros from "../comum/Erros";
import gql from "graphql-tag";

export default {
  components: { Erros },
  data() {
    return {
      erros: null,
      usuarios: [],
      table: false
    };
  },
  methods: {
    obterUsuarios() {
      this.$apollo
        .query({
          query: gql`
            query {
              usuarios {
                id
                nome
                email
                perfis {
                  nome
                  rotulo
                }
              }
            }
          `,
          fetchPolicy: "network-only",
        })
        .then((resultado) => {
          this.usuarios = resultado.data.usuarios;
          this.table = true
          this.erros = null;
        })
        .catch((e) => {
          this.usuarios = [];
          this.table = false
          this.erros = e;
        });
    },
  }
};
</script>

<style scoped>
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.25;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
</style>
