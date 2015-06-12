BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#page-content');
  },

  routes: {
    '' : 'createNote',
    'notes' : 'notesSort',
    'notes/notebook/:id' : 'notesNotebook',
    'search' : 'notesSearch',
    'notebooks' : 'notebooks',
    'notebooks/new' : 'createNotebook',
    'tags' : 'tags'
  },

  createNote: function () {
    var newNoteView = new BetterNote.Views.NewNote();
    this._swapViews(newNoteView);
  },

  notesSort: function () {
    var notesView = new BetterNote.Views.NotesAll();
    this._swapViews(notesView);
  },

  notesNotebook: function (id) {
    var notebook = new BetterNote.Models.Notebook({ id: id });
    var notesView = new BetterNote.Views.NotesNotebook({ notebook: notebook });
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

  tags: function () {
    var noteTagsView = new BetterNote.Views.NoteTags();
    this._swapViews(noteTagsView);
  },

  _swapViews: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
