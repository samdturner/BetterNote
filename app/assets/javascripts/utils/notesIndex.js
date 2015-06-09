Backbone.NotesIndex = Backbone.CompositeView.extend({
  addAllNotes: function () {
    this.notes.each( function (note) {
      this.addNote(note);
    }.bind(this));
  },

  removeAllNotes: function () {
    var notePanels = this.subviews('.item-panels-container');
    while ( notePanels.length > 0) {
      noteView = this.subviews('.item-panels-container')[0];
      this.removeSubview('.item-panels-container', noteView);
    }

    this.notes
  },

  resetNotes: function () {
    this.removeAllNotes();
    this.addAllNotes();
  },

  removeNote: function (note) {
    this.subviews('.item-panels-container').forEach( function (noteView) {
      if(note.get('id') === noteView.model.get('id')) {
        this.removeSubview('.item-panels-container', noteView);
      }
    }.bind(this));
  }
})
