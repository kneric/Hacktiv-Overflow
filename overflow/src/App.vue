<template>
  <v-app>
    <v-toolbar> 
    </v-toolbar>
    <v-content>
      <Toolbar :token="token"/>
      <router-view/>
    </v-content>
    <v-footer app class="teal accent-2">
      <v-layout
        justify-center>
        <v-flex text-xs-center xs12>
          &copy;2018 — <strong>Hacktiv Overflow!</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  data () {
    return {
      token: null
    }
  },
  components : {
    Toolbar
  },
  methods: {
    loginCheck (){
      if (localStorage.getItem('token')){
        this.token = localStorage.getItem('token')
      }
    }
  },
  mounted () {
    this.loginCheck()
  }
}
</script>
