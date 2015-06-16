BetterNote.Views.DeleteNote = Backbone.View.extend({
  initialize: function (options) {
    this.noteId = options.noteId;

    this.note = new BetterNote.Models.Note({ id: this.noteId });
    this.note.fetch();

    this.listenTo(this.note, 'change', this.render);
  },

  events: {
    'click span.cancel' : 'cancel',
    'click span.delete' : 'deleteNote'
  },

  template: JST['notes/delete'],

  deleteNote: function () {
    this.note.destroy({
      success: function () {
        Backbone.history.navigate("notes", { trigger: true });
      }
    });
  },

  cancel: function () {
    Backbone.history.navigate("notes", { trigger: true });
  },

  render: function () {
    var content = this.template({ title: this.note.get('title') });
    this.$el.html(content);

    return this;
  }
})
