BetterNote.Views.NotesSearch = Backbone.NotesIndex.extend({
  initialize: function (options) {
    this.notes = new BetterNote.Collections.Notes();

    this.listenTo(this.notes, 'add', this.addNote);
    this.listenTo(this.notes, 'reset', this.resetNotes);
  },

  template: JST['notes_search'],

  events: {
    'keyup .search-bar' : 'processKey'
  },

  //updating the view models on the page
  addNote: function (note) {
    var noteView = new BetterNote.Views.NotePanel({
      model: note,
      parentView: this
    });
    this.addSubview('.item-panels-container', noteView);
  },

  //user types in the search box
  processKey: function (e) {
    if(e.which === 13) {
      var substr = this.$el.find('.search-bar').val();
      this.notes.fetch({ data: $.param({ substr: substr }),
                         reset: true
                         });
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
