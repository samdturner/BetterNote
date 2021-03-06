BetterNote.Views.NotePanel = Backbone.View.extend({
  events: {
    'click' : 'redirectToNote',
    'click i' : 'redirectToDelete'
  },

  template: JST['notes/panel'],

  redirectToDelete: function (e) {
    e.stopImmediatePropagation();
    var id = this.model.get('id');
    Backbone.history.navigate('notes/delete/' + id, { trigger: true });
  },

  redirectToNote: function () {
    var id = this.model.get('id');
    Backbone.history.navigate('notes/edit/' + id, { trigger: true });
  },

  formattedDate: function () {
    var date = this.model.get('updated_at').slice(0, 10);
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(2, 4);
  },

  plainNoteContent: function () {
    return this.model.get('content').replace(/(<([^>]+)>)/ig,"");
  },

  render: function () {
    var content = this.template({ note: this.model,
                                  plainNoteContent: this.plainNoteContent(),
                                  date: this.formattedDate() });
    this.$el.html(content);

    return this;
  }
})
