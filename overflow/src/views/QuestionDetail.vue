<template>
  <v-card dark color="teal">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{question.title}}</h3>
        ALLQ {{question}}
      </div>
    </v-card-title>
    <v-card-actions>
      {{question.answers.length}} Answer(s) &nbsp;
      <v-icon>thumb_up</v-icon> &nbsp;
      {{question.upVoters.length}} &nbsp; &nbsp;
      <v-icon>thumb_down</v-icon> &nbsp;
      {{question.downVoters.length}} &nbsp; &nbsp;
      <v-spacer />

      <v-spacer />
      <router-link :to="{ name: 'questiondetail', params: { id: Q._id } }"><v-btn class="teal--text" color="white" @click="goTo">More..</v-btn></router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'questiondetail',
  props: [
    'id'
  ],
  computed: {
    ...mapState([
      'allQs'
    ])
  },
  data (){
    return {
      question: {}
    }
  },
  mounted (){
    let theQ = this.allQs.filter((Q) => {
      return Q._id == this.id;
    })
    this.question = theQ
  }
}
</script>
