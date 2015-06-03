BetterNote.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#page-content');
  },

  routes: {
    'notes/new' : 'createNote'
  },

  createNote: function () {
    var newNoteView = new BetterNote.Views.NewNote();
    this._swapViews(newNoteView);
  },

  _swapViews: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
