<template>
  <v-container fluid grid-list-md text-xs-center>
    <h3>Select the question on the left</h3>
    <v-layout row v-for="(Q, index) in allQs" :key="index">
      <v-flex xs4 sm4 md4 >
        <v-card dark color="teal">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{Q.title}}</h3>
            </div>
          </v-card-title>
          <v-card-actions>
            {{Q.answers.length}} Answer(s) &nbsp;
            <v-icon>thumb_up</v-icon> &nbsp;
            {{Q.upVoters.length}} &nbsp; &nbsp;
            <v-icon>thumb_down</v-icon> &nbsp;
            {{Q.downVoters.length}} &nbsp; &nbsp;
            <v-spacer />

            <v-spacer />
            <router-link :to="{ name: 'questiondetail', params: { id: Q._id } }"><v-btn class="teal--text" color="white">More..</v-btn></router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs8 sm8 md8>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';

export default {
  name: 'allQ',
  computed: {
    ...mapState([
      'allQs'
    ])
  },
  methods: {
    ...mapActions([
      'getAllQs'
    ]),
  },
  mounted (){
    this.$store.dispatch('getAllQs')
  } 
}
</script>
