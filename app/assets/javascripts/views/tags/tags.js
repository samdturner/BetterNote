BetterNote.Views.NoteTags = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.noteTags = new BetterNote.Collections.NoteTags();
    this.noteTags.fetch();

    this.listenTo(this.noteTags, 'add', this.addNoteTag);
  },

  template: [ JST['items_container'], JST['note_tags/header'] ],

  //updating the view models on the page
  addNoteTag: function (noteTag) {
    var noteTag = new BetterNote.Views.NoteTagPanel({
      model: noteTag,
      parentView: this
    });
    this.addSubview('.item-panels-container', noteTag);
  },

  addAllNoteTags: function () {
    this.noteTags.each( function (noteTag) {
      this.addNoteTag(noteTag);
    }.bind(this));
  },

  render: function () {
    var itemsContainer = this.template[0]();
    this.$el.html(itemsContainer);

    var noteTagsHeader = this.template[1]();
    this.$el.find('section.items').prepend(noteTagsHeader);

    return this;
  }
})
