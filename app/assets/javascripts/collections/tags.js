BetterNote.Collections.NoteTags = Backbone.Collection.extend({
  url: 'api/tags',

  model: BetterNote.Models.NoteTag,

  getOrFetch: function (id) {
    var tag = this.get(id);

    if (!tag) {
      tag = new BetterNote.Models.Tag({ id: id });
      tag.fetch({
        success: function () {
          this.add(tag);
        }.bind(this)
      });
    } else {
      tag.fetch();
    }

    return tag;
  }
});
