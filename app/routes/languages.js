App.LanguagesRoute = Ember.Route.extend({
  model: function () {
    return [
      {
        name: 'Arabic',
        texts: ['News Article', 'Random Story']
      },
      {
        name: 'French',
        texts: ['News Article', 'Random Story']
      },
      {
        name: 'Greek',
        texts: ['News Article', 'Random Story']
      },
      {
        name: 'Greek',
        texts: ['News Article', 'Random Story']
      }
    ];
  }
});