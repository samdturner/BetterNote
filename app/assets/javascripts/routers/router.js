BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#page-content');
    $('li.single-action').click(this.processLink);
  },

  processLink: function (e) {
    var links = { 1 : '',
                  2 : 'search',
                  3 : 'notes',
                  4 : 'notebooks',
                  5 : 'tags' };
    var dataId = $(e.currentTarget).data('id');
    var link = links[dataId];
    Backbone.history.navigate(link, { trigger: true });
  },

  routes: {
    '' : 'createNote',
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
