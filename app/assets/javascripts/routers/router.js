BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#page-content');
  },

  routes: {
    'notes/new' : 'createNote',
    'notes' : 'notesSort',
    'search' : 'notesSearch',
    'notebooks' : 'notebooks',
    'notebooks/new' : 'createNotebook'
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

  createNotebook: function () {
    var newNotebooksView = new BetterNote.Views.NewNotebook();
    this._swapViews(newNotebooksView);
  },

  _swapViews: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
