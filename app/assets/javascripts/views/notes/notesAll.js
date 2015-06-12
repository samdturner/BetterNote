BetterNote.Views.NotesAll = function (options) {
  Backbone.NotesSortView.call(this, options);

  this.fetchNotes(this.sortColIdx, true);
};

_.extend(BetterNote.Views.NotesAll.prototype, Backbone.NotesSortView.prototype, {
  template: [ JST['items_container'], JST['notes/header'] ],

  fetchNotes: function (id, isReset) {
    this.notes.fetch({ data: $.param({ asc_desc: this.ascDesc(id),
                                       sort_col: this.sortCol(id),
                                       start_row: this.noteCount }),
                       reset: isReset,
                       success: function () {
                         this.noteCount += 10;
                       }.bind(this) });
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
