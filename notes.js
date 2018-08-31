var name = 'Peter';
model.findOne({name: new RegExp('^'+name+'$', "i")}, function(err, doc) {
  //Do your action here..
});

// name LIKE john and only selecting the "name" and "friends" fields, executing immediately
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })

// swal message validation
let messages = []
          for (let i in err.response.data.errors) {
            messages.push((err.response.data.errors[i].message))
          }
          this.$swal(messages.join('\n'))

// button
{/* <v-btn flat icon><v-icon color="blue">thumb_down</v-icon></v-btn>
<v-btn icon><v-icon color="grey">thumb_up</v-icon></v-btn> */}

//google api
