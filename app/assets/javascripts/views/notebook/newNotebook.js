BetterNote.Views.NewNotebook = Backbone.View.extend({
  template: JST['notebooks/new'],

  events: {
    'click span.cancel-notebook' : 'cancel',
    'click span.create-notebook' : 'create'
  },

  cancel: function () {
    Backbone.history.navigate("notebooks", { trigger: true });
  },

  create: function () {
    var newNotebook = new BetterNote.Models.Notebook();
    var title = this.$el.find('input.notebook-name').val();
    newNotebook.save({ title: title });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
