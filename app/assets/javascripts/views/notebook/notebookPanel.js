BetterNote.Views.NotebookPanel = Backbone.View.extend({
  template: JST['notebooks/panel'],

  events: {
    'click' : 'redirectToNotes',
    'click i' : 'redirectToDelete'
  },

  redirectToDelete: function () {
    var id = this.model.get('id');
    Backbone.history.navigate('notes/delete/' + id, { trigger: true });
  },

  redirectToNotes: function () {
    var id = this.model.get('id');
    Backbone.history.navigate('notes/notebook/' + id, { trigger: true });
  },

  formattedDate: function () {
    var date = this.model.get('updated_at').slice(0, 10);
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(2, 4);
  },

  render: function () {
    var content = this.template({ note: this.model,
                                  date: this.formattedDate() });
    this.$el.html(content);

    return this;
  }
})
