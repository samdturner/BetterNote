BetterNote.Views.NotesTag = function (options) {
  Backbone.NotesSortView.call(this, options);

  this.tagItem = options.tagItem;
  this.tagItem.fetch({
    success: function (tagItem) {
      var id = this.$el.find('li.selected').data('id');
      this.fetchNotes(id, true);
      this.attachHeader();
    }.bind(this) });
};

_.extend(BetterNote.Views.NotesTag.prototype,
  Backbone.NotesSortView.prototype, {
    template: [ JST['items_container'],
                JST['notes/header'],
                JST['item_name_header'] ],

    fetchNotes: function (id, isReset) {
      this.notes.fetch({ data: $.param({ asc_desc: this.ascDesc(id),
                                         sort_col: this.sortCol(id),
                                         start_row: this.noteCount,
                                         tag_id: this.tagItem.get('id')
                                        }),
                         reset: isReset,
                         success: function () {
                           this.noteCount += 10;
                         }.bind(this) });
    },

    attachHeader: function () {
      var tagName = this.tagItem.get('name');
      var itemNameHeader = this.template[2]({ name: tagName });
      this.$el.find('div.items-container').prepend(itemNameHeader);
    },

    render: function () {
      var itemsContainer = this.template[0]();
      this.$el.html(itemsContainer);

      var notesHeader = this.template[1]();
      this.$el.find('section.items').prepend(notesHeader);

      this.checkSortOpt();

      return this;
    }
});
