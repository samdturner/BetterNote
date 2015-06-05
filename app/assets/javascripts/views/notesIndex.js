BetterNote.Views.NotesIndex = Backbone.View.extend({
  initialize: function () {

  },

  template: JST['notes_index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
