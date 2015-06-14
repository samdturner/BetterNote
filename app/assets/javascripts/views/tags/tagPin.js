BetterNote.Views.TagPin = Backbone.View.extend({
  template: JST['tags/pin'],

  tagName: 'li',

  className: 'tag',

  render: function () {
    var content = this.template({ name: this.model.get('name') });
    this.$el.html(content);

    return this;
  }
})
