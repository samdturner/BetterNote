BetterNote.Views.NotesNotebook = function (options) {
  Backbone.NotesSortView.call(this, options);

  this.notebook = options.notebook;
  this.notebook.fetch({
    success: function (notebook) {
      var id = this.$el.find('li.selected').data('id');
      this.fetchNotes(id, true);
      this.attachHeader();
    }.bind(this) });
};

_.extend(BetterNote.Views.NotesNotebook.prototype,
        Backbone.NotesSortView.prototype, {
  template: [ JST['items_container'],
              JST['notes/header'],
              JST['item_name_header'] ],

  fetchNotes: function (id, isReset) {
    this.notes.fetch({ data: $.param({ asc_desc: this.ascDesc(id),
                                       sort_col: this.sortCol(id),
                                       start_row: this.noteCount,
                                       notebook_id: this.notebook.get('id') }),
                       reset: isReset,
                       success: function () {
                         this.noteCount += 10;
                       }.bind(this) });
  },

  attachHeader: function () {
    var title = this.notebook.get('title');
    var itemNameHeader = this.template[2]({ name: title });
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
