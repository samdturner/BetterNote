BetterNote.Views.EditNote = function (options) {
    this.noteId = options.noteId;
    this.note = new BetterNote.Models.Note({ id: this.noteId });

    this.tagItems = new BetterNote.Collections.Tags();
    this.tagItems.fetch({ data: $.param({ note_id: this.noteId }) });

    Backbone.NoteTextEditor.call(this, options);

    $.when(this.note.fetch(), this.notebooks.fetch()).done(this.checkAssignedNotebook.bind(this));

    this.listenTo(this.note, 'change', this.fillNote);
};

_.extend(BetterNote.Views.EditNote.prototype, Backbone.NoteTextEditor.prototype, {
  template: [ JST['notes/new'],
              JST['notes/notebook_options_container'],
              JST['tags/char_new'],
              JST['tags/input_new'] ],

  addNoteTitle: function () {
    var title = this.note.get('title');
    this.$el.find('input.note-title').val(title);
  },

  addNoteContent: function () {
    var content = this.note.get('content');

    var div = document.createElement('div');
    div.innerHTML = content;
    var elements = div.childNodes;

    this.$el.find('div.ql-editor').html(elements);
  },

  fillNote: function () {
    this.addNoteTitle();
    this.addNoteContent();
  },

  checkAssignedNotebook: function () {
    var notebookId = this.note.get('notebook_id');
    _(this.subviews('.notebook-options')).each(function (notebookOption) {
      if (notebookId === notebookOption.model.get('id')) {
        notebookOption.checkNotebook();
        var title = notebookOption.model.get('title');
        this.setNotebookTitleThumb(title);
      }
    }.bind(this))
  },

  render: function () {
    var content = this.template[0]({ fontStyleArr: this.fontStyleArr,
                                  fontSizeArr: this.fontSizeArr,
                                  colorArr: this.colorArr });
    this.$el.html(content);

    var notebookOptions = this.template[1]();
    this.$el.find('li.create-notebook-group').append(notebookOptions);

    setTimeout(this.initializeToolbar, 0);

    return this;
  }
});
