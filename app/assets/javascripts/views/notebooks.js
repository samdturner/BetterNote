BetterNote.Views.Notebooks = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.notebooks = new BetterNote.Collections.Notebooks();
    this.notebooks.fetch();

    this.listenTo(this.notebooks, 'add', this.addNotebook);
  },

  events: {
    'click i.fa-plus-square-o' : 'newNote'
  },

  template: [JST['items_container'], JST['notebooks/header']],

  newNote: function () {
    Backbone.history.navigate("notebooks/new", { trigger: true });
  },

  //updating the view models on the page
  addNotebook: function (notebook) {
    var notebookView = new BetterNote.Views.NotebookPanel({
      model: notebook,
      parentView: this
    });
    this.addSubview('.item-panels-container', notebookView);
  },

  addAllNotebooks: function () {
    this.notebooks.each( function (notebook) {
      this.addNotebook(notebook);
    }.bind(this));
  },

  render: function () {
    var itemsContainer = this.template[0]();
    this.$el.html(itemsContainer);

    var notebooksHeader = this.template[1]();
    this.$el.find('section.items').prepend(notebooksHeader);

    return this;
  }
})
