BetterNote.Views.NotebookOption = Backbone.View.extend({
  template: JST['notes/notebook_option'],

  tagName: 'li',

  events: {

  },

  render: function () {
    var content = this.template({ notebook: this.model });
    this.$el.html(content);

    return this;
  }
})
