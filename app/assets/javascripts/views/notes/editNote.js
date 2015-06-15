BetterNote.Views.EditNote = function (options) {
    this.noteId = options.noteId;
    this.note = new BetterNote.Models.Note({ id: this.noteId });
    this.note.fetch();

    this.tagItems = new BetterNote.Collections.Tags();

    Backbone.NoteTextEditor.call(this, options);

    this.listenTo(this.note, 'change', this.fillNote);
};

_.extend(BetterNote.Views.EditNote.prototype, Backbone.NoteTextEditor.prototype, {
  template: [ JST['notes/new'],
              JST['notes/notebook_options_container'],
              JST['tags/char_new'],
              JST['tags/input_new'] ],

  addNoteTitle: function () {
    var title = this.note.get('title');
    var escapedTitle = encodeURI(title);
    this.$el.find('input.note-title').val(escapedTitle);
  },

  addNoteContent: function () {
    var content = this.note.get('content');
    var escapedContent = encodeURI(content);
    this.$el.find('div.text-editor-page').text(escapedContent);
  },

  fillNote: function () {
    this.addNoteTitle();
    this.addNoteContent();
  },

  render: function () {
    var content = this.template[0]({ fontStyleArr: this.fontStyleArr,
                                  fontSizeArr: this.fontSizeArr,
                                  colorArr: this.colorArr });
    this.$el.html(content);

    var notebookOptions = this.template[1]();
    this.$el.find('li.create-notebook-group').append(notebookOptions);

    return this;
  }
});
