<template>
  <v-container align-center grid-list-md>
    <v-layout wrap>
      <v-flex xs10>
        <v-text-field box label="What do you want to ask?" v-model="qTitle" required></v-text-field>
      </v-flex>
      <v-flex xs10>
        <wysiwyg placeholder="You can describe it more here" v-model="qDesc" />
      </v-flex>
      <v-flex xs12>
      </v-flex>
      <v-flex >
        <v-btn class="white--text" color="blue" @click="ask">Ask!</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ask',
  data () {
    return {
      qTitle: '',
      qDesc: '',
    }
  },
  methods: {
    ask () {
      this.$axios({
        method: 'post',
        url: '/question/ask',
        data: {
          questioner: this.name,
          title: this.qTitle,
          desc: this.qDesc
        },
        headers: {
          token: this.token
        }
      })
        .then(({data}) => {
          this.$swal(
            'Question created!',
            '',
            'success'
          )
          this.$router.replace('/')
        })
        .catch(err => {
          let messages = []
            for (let i in err.response.data.errors) {
              messages.push((err.response.data.errors[i].message))
            }
          this.$swal(
            messages.join('\n'),
            '',
            'error'
          )
        })
    }
  },
  computed: {
    ...mapState([
      'token',
      'name'
    ])
  },
}
</script>


<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css"
</style>
