var express = require('express');
var app = express();
var Queen = require('queens/brain');

app.get('/api/getjob',function(req,res){
  res.json(Queen.getAJob(),200);
});
app.use('/public',express.static(__dirname + '/queens/public'));

var server = app.listen(3000, function() {
  console.log('Starting algorithm');

  Queen.startWorking(8);
  console.log('Listening on port %d', server.address().port);
});
