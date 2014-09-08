var App = Ember.Application.create();

App.Router.map(function() {
  this.route('sign-up');
  this.route('login');
  this.resource('languages', function() {
    
  });
});