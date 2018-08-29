<template>
  <v-dialog v-model="regisDialog" persistent max-width="500px">
    <v-btn slot="activator" flat light>Register</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Create New Account</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Name" v-model="name" required></v-text-field>
            </v-flex>
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
        <v-btn color="blue darken-1" flat @click.native="regisDialog = false">Close</v-btn>
        <v-btn class="white--text" color="blue darken-1" @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data (){
    return {
      regisDialog: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'checkUser',
      'register',
    ]),
    register (){
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.regisDialog = false
      this.$store.dispatch('register', payload)
    }
  },
}
</script>

