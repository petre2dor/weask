Questions = new Meteor.Collection("questions");

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