<template>
  <v-toolbar app class="teal accent-2">
    <v-spacer />
    <router-link to="/">
      <img src="../assets/logo.png" height="38px" width="38px">
    </router-link>
    <strong class="headline">Hacktiv Overflow!</strong>
    <v-spacer />
    <v-spacer />
    <v-text-field flat label="Search"></v-text-field>
    <v-btn flat icon><v-icon>search</v-icon></v-btn>
    <v-spacer />
    <v-spacer />
    <div v-if="!token">
      <v-btn flat>Login</v-btn>
    </div>
    <div v-else>
      <v-btn flat>My Questions</v-btn>
      <v-btn flat>Ask New Question</v-btn>
      <v-btn flat>Logout</v-btn>
    </div>
    <v-spacer />
    {{ tes }}
    <v-spacer/>
    {{token}}
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'token',
      'tes'
    ])
  },
  methods: {
    ...mapActions([
      'addToken',
    ])
  },
  mounted (){
    this.addToken ()
  }
}
</script>
