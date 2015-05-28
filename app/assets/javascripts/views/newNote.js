BetterNote.Views.NewNote = Backbone.View.extend({
  initialize: function () {

  },

  template: JST['new_note'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
