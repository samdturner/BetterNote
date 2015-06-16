BetterNote.Views.ShareNote = Backbone.View.extend({
  initialize: function (options) {
    this.noteId = options.noteId;

    this.note = new BetterNote.Models.Note({ id: this.noteId });
    this.note.fetch();

    this.listenTo(this.note, 'change', this.render);
  },

  events: {
    'click span.share-btn' : 'startSharing',
    'click span.stop-sharing-btn' : 'stopSharing'
  },

  template: JST['notes/share'],

  stopSharing: function () {
    this.toggleShare(false);
    this.redirectToEditNote();
  },

  startSharing: function () {
    this.toggleShare(true);
    this.redirectToEditNote();
  },

  toggleShare: function (newStatus) {
    if(this.note.get('shared') !== newStatus) {
      this.note.save({ shared: newStatus });
    }
    this.redirectToEditNote();
  },

  redirectToEditNote: function () {
    var url = 'notes/edit/' + this.noteId;
    Backbone.history.navigate(url, { trigger: true });
  },

  render: function () {
    var content = this.template({ title: this.note.get('title') });
    this.$el.html(content);

    return this;
  }
})
