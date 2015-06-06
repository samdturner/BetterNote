BetterNote.Views.NewNote = Backbone.View.extend({
  initialize: function () {

  },

  template: JST['note_show'],
  //
  // formatDate: function (inputFormat) {
  //   function pad(s) { return (s < 10) ? '0' + s : s; }
  //   var d = new Date(inputFormat);
  //   return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  // },

  formattedDate: function () {
    var date = this.model.get('updated_at').slice(0, 10);
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(2, 4);
  },

  plainNoteContent: function () {
    return this.model.get('content').replace(/(<([^>]+)>)/ig,"");
  },

  render: function () {
    var content = this.template({ note: this.model,
                                  plainNoteContent: this.plainNoteContent(),
                                  date: this.formattedDate() });
    this.$el.html(content);

    return this;
  }
})
