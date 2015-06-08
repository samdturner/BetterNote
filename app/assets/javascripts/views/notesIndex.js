BetterNote.Views.NotesIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.notes = new BetterNote.Collections.Notes();
    this.noteCount = 0;

    this.sortColIdx = this.readCookie('sortColIdx') || 0;
    this.fetchNotes(this.sortColIdx, true);

    _.bindAll(this, 'detectScroll');
    $(window).scroll(this.detectScroll);

    this.addAllNotes();

    this.listenTo(this.notes, 'add', this.addNote);
    this.listenTo(this.notes, 'reset', this.resetNotes);
  },

  template: JST['notes_search'],

  events: {
    'click li[data-id]' : 'updateSortType',
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

  //automatic scrolling
  detectScroll: function () {
    if( $(window).scrollTop() + $(window).innerHeight() >= document.body.scrollHeight ) {
      this.loadAdditionalNotes();
    }
  },

  loadAdditionalNotes: function () {
    var currentId = this.$el.find('li.selected').data('id');
    this.fetchNotes(currentId, false);
  },

  //user changes the sort type
  updateSortTitle: function (id) {
    var type;
    type = id > 3 ?  "title" : "date";
    this.$el.find('b.sort-type').html(type);
  },

  updateSortType: function (e) {
    var id = $(e.currentTarget).data('id')
    this.$el.find('li.selected').removeClass('selected');
    this.$el.find('[data-id=' + id + ']').addClass('selected');
    this.updateSortTitle(id);
    this.writeCookie('sortColIdx', id, 30);

    this.noteCount = 0;
    this.fetchNotes(id, true);
  },

  fetchNotes: function (id, isReset) {
    var sortCols = ['created_at', 'updated_at', 'title'];
    var idx = Math.floor(id / 2);
    var sortCol = sortCols[idx];

    var asc_desc = id % 2 == 0 ? 'ASC' : 'DESC';

    this.notes.fetch({ data: $.param({ asc_desc: asc_desc,
                                       sort_col: sortCol,
                                       start_row: this.noteCount }),
                       reset: isReset,
                       success: function () {
                         this.noteCount += 10;
                       }.bind(this) });
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

  //reading and writing the cookie which stores the sort type
  writeCookie: function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },

  readCookie: function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return '';
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$el.find('[data-id=' + this.sortColIdx + ']').addClass('selected');
    this.updateSortTitle(this.sortColIdx);

    return this;
  }
})
