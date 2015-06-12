BetterNote.Views.Tags = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.tagItems = new BetterNote.Collections.Tags();
    this.tagItems.fetch();

    this.listenTo(this.tagItems, 'add', this.addTag);
  },

  template: [ JST['items_container'], JST['tags/header'] ],

  //updating the view models on the page
  addTag: function (tag) {
    var tag = new BetterNote.Views.TagPanel({
      model: tag,
      parentView: this
    });
    this.addSubview('.item-panels-container', tag);
  },

  render: function () {
    var itemsContainer = this.template[0]();
    this.$el.html(itemsContainer);

    var tagsHeader = this.template[1]();
    this.$el.find('section.items').prepend(tagsHeader);

    return this;
  }
})
