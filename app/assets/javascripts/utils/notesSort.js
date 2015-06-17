Backbone.NotesSortView = function (options) {
  this.inheritedEvents = [];

  Backbone.CompositeView.call(this, options);

  this.notes = new BetterNote.Collections.Notes();
  this.noteCount = 0;

  this.sortColIdx = this.readCookie('sortColIdx') || 1;

  _.bindAll(this, 'detectScroll');
  $(window).scroll(this.detectScroll);

  this.addAllViews(this.notes);

  this.listenTo(this.notes, 'add', this.addView);
  this.listenTo(this.notes, 'reset', this.resetNotes);
};

_.extend(Backbone.NotesSortView.prototype, Backbone.CompositeView.prototype, {
  baseEvents: { 'click li[data-id]' : 'updateSortType' },

  events: function() {
      var e = _.extend({}, this.baseEvents);

      _.each(this.inheritedEvents, function(events) {
        e = _.extend(e, events);
      });

      return e;
  },

  addEvents: function(eventObj) {
      this.inheritedEvents.push(eventObj);
  },

  //updating the view models on the page
  addView: function (note) {
    var noteView = new BetterNote.Views.NotePanel({
      model: note,
      parentView: this
    });
    this.addSubview('.item-panels-container', noteView);
  },

  resetNotes: function () {
    this.removeAllViews('.item-panels-container');
    this.addAllViews(this.notes);
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

  ascDesc: function (id) {
    return id % 2 == 0 ? 'ASC' : 'DESC';
  },

  sortCol: function (id) {
    var sortCols = ['created_at', 'updated_at', 'title'];
    var idx = Math.floor(id / 2);
    return sortCols[idx];
  },

  checkSortOpt: function () {
    this.$el.find('[data-id=' + this.sortColIdx + ']').addClass('selected');
    this.updateSortTitle(this.sortColIdx);
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
  }
});
