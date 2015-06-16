BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#page-content');
  },

  routes: {
    '' : 'createNote',
    'notes/edit/:id' : 'editNote',
    'notes/delete/:id' : 'deleteNote',
    'notes/share/:id' : 'shareNote',
    'notes' : 'notesSort',
    'notes/notebook/:id' : 'notesNotebook',
    'search' : 'notesSearch',
    'notebooks' : 'notebooks',
    'notebooks/new' : 'createNotebook',
    'tags' : 'tags',
    'notes/tag/:id' : 'notesTag'
  },

  createNote: function () {
    var newNoteView = new BetterNote.Views.NewNote();
    this._swapViews(newNoteView);
  },

  editNote: function (id) {
    var editNoteView = new BetterNote.Views.EditNote({ noteId: id });
    this._swapViews(editNoteView);
  },

  deleteNote: function (id) {
    var deleteNoteView = new BetterNote.Views.DeleteNote({ noteId: id });
    this._swapViews(deleteNoteView);
  },

  shareNote: function (id) {
    var shareNoteView = new BetterNote.Views.ShareNote({ noteId: id });
    this._swapViews(shareNoteView);
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
    var tagsView = new BetterNote.Views.Tags();
    this._swapViews(tagsView);
  },

  notesTag: function (id) {
    var tagItem = new BetterNote.Models.Tag({ id: id });
    var notesTagView = new BetterNote.Views.NotesTag({ tagItem: tagItem });
    this._swapViews(notesTagView);
  },

  _swapViews: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
