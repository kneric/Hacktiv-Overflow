var name = 'Peter';
model.findOne({name: new RegExp('^'+name+'$', "i")}, function(err, doc) {
  //Do your action here..
});

// name LIKE john and only selecting the "name" and "friends" fields, executing immediately
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })