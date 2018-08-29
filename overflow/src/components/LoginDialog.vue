<template>
  <v-dialog v-model="loginDialog" persistent max-width="500px">
    <v-btn slot="activator" flat light>Login</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Email" type="email" v-model="email" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="loginDialog = false">Close</v-btn>
        <v-btn class="white--text" color="blue darken-1" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data (){
    return {
      loginDialog: false,
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'checkToken',
      'login',
    ]),
    login (){
      let payload = {
        email: this.email,
        password: this.password
      }
      this.loginDialog = false
      this.$store.dispatch('login', payload)
    }
  },
}
</script>

