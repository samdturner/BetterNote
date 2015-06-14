BetterNote.Views.TagPanel = Backbone.View.extend({
  template: JST['tags/panel'],

  events: {
    'click' : 'redirectToNotes'
  },

  redirectToNotes: function () {
    var id = this.model.get('id');
    Backbone.history.navigate('notes/tag/' + id, { trigger: true });
  },

  render: function () {
    var content = this.template({ tagItem: this.model });
    this.$el.html(content);

    return this;
  }
})
