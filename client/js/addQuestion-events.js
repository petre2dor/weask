
Template.addQuestion.events({
  'click button': function () {
    var id;
    //get counter
    Meteor.call('incCounter', 'questions', function(error, result) {
      if(typeof error == 'undefined'){
        //add question
        Meteor.call('addQuestion', {text: $('#inputQuestionWrapper #questionText').val(), orderNumber: result}, function(err, res) {
          if(typeof err !== 'undefined'){
            console.log(err);    
          }
        });
      }else{
        console.log(error);
      }
    });
  }
});