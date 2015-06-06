BetterNote.Views.NotesIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.notes = options.notes;

    this.notes.each(function (note) {
      this.addSubview(note);
    }.bind(this));

    this.listenTo(this.notes, 'add', this.addNote);
  },

  template: JST['notes_index'],

  events: {
    'click li[data-id]' : 'updateSortType'
  },

  addNote: function (note) {
    var noteView = new BetterNote.Views.NewNote({
      model: note,
      parentView: this
    });
    this.addSubview('.note-panels-container', noteView);
  },

  writeCookie: function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
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

  updateSortTitle: function (id) {
    var type;
    type = id > 4 ?  "title" : "date";
    this.$el.find('b.sort-type').html(type);
  },

  updateSortType: function (e) {
    var id = $(e.currentTarget).data('id')
    this.$el.find('li.selected').removeClass('selected');
    this.$el.find('[data-id=' + id + ']').addClass('selected');
    this.updateSortTitle(id);
    this.writeCookie('sortType', 127, 30);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
