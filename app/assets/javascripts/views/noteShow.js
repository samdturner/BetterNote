BetterNote.Views.NewNote = Backbone.View.extend({
  initialize: function (options) {
    this.notes = options.notes;

    this.notes.each(function (note) {
      this.add(note);
    }.bind(this));
  },

  template: JST['note_show'],

  formatDate: function (inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  },

  render: function () {
    var plainNoteContent;
    plainNoteContent = this.model.get('content').replace(/(<([^>]+)>)/ig,"");

    var date = this.formatDate(this.model.get('updated_at'));

    var content = this.template({ note: this.model,
                                  plainNoteContent: plainNoteContent});
    this.$el.html(content);

    return this;
  }
})
