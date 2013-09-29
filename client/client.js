Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
  Template.newQuestions.questions = function () {
    return Questions.find({}, {sort: {date: -1}});
  }

  Template.topQuestions.questions = function () {
    return Questions.find({}, {sort: {up: -1}});
  }

  Template.bottomQuestions.questions = function () {
    return Questions.find({}, {sort: {down: 1}});
  }

  Template.currentQuestion.questions = function () {
    return Questions.find({addressed: 'in_progress'});
  }

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

  Template.questionDetails.events({
    'click #up': function () {
      Questions.update(this._id, {$inc: {up: 1}});
    },
    'click #down': function () {
      Questions.update(this._id, {$inc: {down: -1}});
    },
    'click #respond': function () {
       Meteor.call('respond', {id: this._id}, function(err, res) {
          if(typeof err !== 'undefined'){
            console.log(err);
          }
        });
    }
  });
}