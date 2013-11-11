
Template.addQuestion.events({
  'click button': function () {
    console.log('addQuestion');
    //get counter
    Meteor.call('incCounter', 'questions', function(error, result) {
      console.log('call incCounter');
      console.log('error', error);
      console.log('result', result);
      if(typeof error == 'undefined'){
        //add question
        Meteor.call('addQuestion', {text: $('#inputQuestionWrapper #questionText').val(), orderNumber: result}, function(err, res) {
          console.log('call incCounter');
          console.log('err', err);
          console.log('res', res);
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