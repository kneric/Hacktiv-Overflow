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
    <div v-if="!token">
      <RegisterDialog />
      <LoginDialog />
      <fb:login-button scope="public_profile,email" onlogin="checkLoginState()"> </fb:login-button>
    </div>
    <div v-else>
      <v-btn flat>{{name}}<small>&nbsp; 's </small> &nbsp; Question</v-btn>
      <v-btn flat @click="ask">Ask New Question</v-btn>
      <v-btn flat @click="logout">Logout</v-btn>
    </div>
    <v-spacer />
    <v-spacer/>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import RegisterDialog from '@/components/RegisterDialog'
import LoginDialog from '@/components/LoginDialog'

export default {
  components: {
    RegisterDialog,
    LoginDialog
  },
  computed: {
    ...mapState([
      'token',
      'name'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    logout (){
      this.$store.dispatch('logout')
      location.reload()
    },
    ask (){
      this.$router.replace('/ask')
    }
  },
}
</script>
