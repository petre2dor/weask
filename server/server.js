// server side

if (Meteor.isServer) {
  	Meteor.startup(function () {
  		console.log('--startup--');
   		// On server startup, if the database is empty, create some initial data.
  		Meteor.methods({
	  		incCounter: function (name) {
	  			return incrementCounter(name);
	  		}
		});
  	});
}