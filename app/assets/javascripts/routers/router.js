BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#page-content');
    this.notes = new BetterNote.Collections.Notes();
  },

  routes: {
    'notes/new' : 'createNote',
    'notes' : 'notesIndex'
  },

  notesIndex: function () {
    this.notes.fetch();
    var notesView = new BetterNote.Views.NotesIndex({ notes: this.notes });
    this._swapViews(notesView);
  },

  createNote: function () {
    var newNote = new BetterNote.Models.Note();
    var newNoteView = new BetterNote.Views.NewNote({ model: newNote });
    this._swapViews(newNoteView);
  },

  _swapViews: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
