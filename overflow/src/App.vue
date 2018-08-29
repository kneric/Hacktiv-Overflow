<template>
  <v-app>
    <Toolbar/>
    <v-content>
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
import { mapState } from 'vuex';
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components : {
    Toolbar
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  methods: {
    ...mapActions([
      'checkToken'
    ])
  },
  mounted (){
    this.$store.dispatch('checkToken')
  }
}
</script>
