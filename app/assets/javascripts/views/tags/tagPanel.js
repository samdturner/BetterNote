BetterNote.Views.NoteTagPanel = Backbone.View.extend({
  template: JST['note_tags/panel'],

  render: function () {
    var content = this.template({ tag: this.model });
    this.$el.html(content);

    return this;
  }
})
