BetterNote.Views.TagPanel = Backbone.View.extend({
  template: JST['tags/panel'],

  render: function () {
    var content = this.template({ tagItem: this.model });
    this.$el.html(content);

    return this;
  }
})
