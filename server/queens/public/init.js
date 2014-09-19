
var getNewWorker = function(){
  $.ajax({
    url:'/api/getjob',
    method:'post',
    success: function(resp){
      console.log('calling queens');
      console.log(resp);
       // partialQueen = function(ld, cols, rd, startn, depth,actualN){


      partialQueen(resp.params);
    }
  });
}
getNewWorker();
var publishResults = function(){
}
