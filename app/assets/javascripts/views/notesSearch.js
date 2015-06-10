BetterNote.Views.NotesSearch = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.notes = new BetterNote.Collections.Notes();

    this.listenTo(this.notes, 'add', this.addView);
    this.listenTo(this.notes, 'reset', this.resetViews);
  },

  template: [
              JST['notes_search/bar'],
              JST['items_container'],
              JST['notes_search/header']
                                      ],

  events: {
    'keyup .search-bar' : 'processKey'
  },

  //updating the view models on the page
  addView: function (note) {
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

  resetViews: function () {
    this.removeAllViews('.item-panels-container');
    this.addAllViews(this.notes);
  },

  render: function () {
    var searchBar = this.template[0]();
    this.$el.html(searchBar);

    var itemsContainer = this.template[1]();
    this.$el.append(itemsContainer);

    var searchHeader = this.template[2]();
    this.$el.find('section.items').prepend(searchHeader);
    return this;
  }
})
