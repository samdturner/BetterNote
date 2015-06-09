BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#page-content');
  },

  routes: {
    'notes/new' : 'createNote',
    'notes' : 'notesSort',
    'search' : 'notesSearch',
    'notebooks' : 'notebooks'
  },

  createNote: function () {
    var newNote = new BetterNote.Models.Note();
    var newNoteView = new BetterNote.Views.NewNote({ model: newNote });
    this._swapViews(newNoteView);
  },

  notesSort: function () {
    var notesView = new BetterNote.Views.NotesSort();
    this._swapViews(notesView);
  },

  notesSearch: function () {
    var notesSearchView = new BetterNote.Views.NotesSearch();
    this._swapViews(notesSearchView);
  },

  notebooks: function () {
    var notesView = new BetterNote.Views.Notebooks();
    this._swapViews(notesView);
  },

  _swapViews: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
