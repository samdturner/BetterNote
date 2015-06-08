BetterNote.Views.NotesSearch = Backbone.CompositeView.extend({
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
    var noteView = new BetterNote.Views.NoteShow({
      model: note,
      parentView: this
    });
    this.addSubview('.note-panels-container', noteView);
  },

  addAllNotes: function () {
    this.notes.each( function (note) {
      this.addNote(note);
    }.bind(this));
  },

  removeAllNotes: function () {
    var notePanels = this.subviews('.note-panels-container');
    while ( notePanels.length > 0) {
      noteView = this.subviews('.note-panels-container')[0];
      this.removeSubview('.note-panels-container', noteView);
    }

    this.notes
  },

  resetNotes: function () {
    this.removeAllNotes();
    this.addAllNotes();
  },

  removeNote: function (note) {
    this.subviews('.note-panels-container').forEach( function (noteView) {
      if(note.get('id') === noteView.model.get('id')) {
        this.removeSubview('.note-panels-container', noteView);
      }
    }.bind(this));
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
