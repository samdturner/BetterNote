BetterNote.Views.NotebookOption = Backbone.View.extend({
  initialize: function (options) {
    this.parentView = options.parentView;
  },

  template: JST['notes/notebook_option'],

  tagName: 'li',

  attributes: {
    class: "notebook-option"
  },

  events: {
    'click' : 'assignNote'
  },

  assignNote: function () {
    this.parentView.assignToNotebook({ notebook: this.model });
  },

  render: function () {
    var content = this.template({ notebook: this.model });
    this.$el.html(content);

    return this;
  }
})
