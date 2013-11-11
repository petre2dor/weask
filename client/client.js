Questions = new Meteor.Collection("questions");

Router.map(function() { 
  this.route('home', {path: '/'});
  this.route('schedule');
  this.route('pastInterviews');
  this.route('help');
  this.route('about');

  this.route('interview');
});

Router.configure({
	layout: 'layout'
});

Template.newQuestions.questions = function () {
	console.log(Questions.find({}, {sort: {date: -1}}));
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

