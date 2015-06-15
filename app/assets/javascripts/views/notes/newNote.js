BetterNote.Views.NewNote = function (options) {
    this.note = new BetterNote.Models.Note();
    this.tagItems = new BetterNote.Collections.Tags();

    Backbone.NoteTextEditor.call(this, options);
};

_.extend(BetterNote.Views.NewNote.prototype, Backbone.NoteTextEditor.prototype, {
  template: [ JST['notes/new'],
              JST['notes/notebook_options_container'],
              JST['tags/char_new'],
              JST['tags/input_new'] ],

  render: function () {
    var content = this.template[0]({ fontStyleArr: this.fontStyleArr,
                                  fontSizeArr: this.fontSizeArr,
                                  colorArr: this.colorArr });
    this.$el.html(content);

    var notebookOptions = this.template[1]();
    this.$el.find('li.create-notebook-group').append(notebookOptions);

    // this.appendNewTagChar();


    return this;
  }
});
