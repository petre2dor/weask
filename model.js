///////////////////////////////////////////////////////////////////////////////
// Questions

/*
  Each question is represented by a document in the Questions collection:
    _id: default id
    user: Object {name: "...", _id: "...."}
    orderNumber: int (auto increment) representing question's number 
	text: String - the actual question
	up, down: Int - votes numbers
	addressed: String yes/no/in_progress
	user_satisfaction: List of objects like {_id: "...", name: , satisafaction: "very_low", "low", "medium", "high", "very_high", reason: "..."}
*/
Questions = new Meteor.Collection("Questions");

Questions.allow({
  insert: function () {
    return false; // no cowboy inserts -- use addQuestion method
  },
  update: function () {
    return true;
  },
  remove: function (userId, party) {
    return false;
  }
});

var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length !== 0;
});

Meteor.methods({
  // options should include: title, description, x, y, public
  addQuestion: function (options) {
    if (options.text.length < 3)
      throw new Meteor.Error(413, "The question is too short");
 	if (options.text.length > 500)
      throw new Meteor.Error(413, "The question is too long"); 

    return Questions.insert({
    				orderNumber: options.orderNumber,
	                text: options.text, 
	                date: new Date(),
	                up: 0,
	                down: 0
	              });
  },
  respond: function (options) {
    Questions.update({addressed: 'in_progress'}, {$set: {addressed: 'yes', end: Date()}}, {multi: true});
    Questions.update( {_id: options.id}, {$set: {addressed: 'in_progress', 'start': Date()}});
  }
});
