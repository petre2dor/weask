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
     return false;
  }
});