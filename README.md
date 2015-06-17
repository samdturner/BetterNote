# BetterNote

[Website link][weburl]

[weburl]: https://www.better-note.com/

## Concept

BetterNote is a note-taking app (inspired by Evernote's web app) that allows users to create rich content (notes), organize those notes, and easily find notes via search, tags,  and notebooks.  Users can share notes via a unique URL. The overall design is minimalistic with rich user feedback when navigating the site. Optimized for Chrome web browser.

Designed and built within a 2-week time period.

## Key Features
- Create notes and Notebooks
- Assign one or many tags to notes
- Search for notes
- Share notes via a unique URL
- Sortable notes
- Infinite scrolling for long lists
- Notes are automatically saved on every 10 keystrokes for enhanced user experience

## Technical Highlights
- Used prototypal inheritance to extend the methods of two backbone view objects across multiple classes to keep code DRY
- Implemented the KPM substring search algorithm to search for notes
- Customized rails serialize JSON method for particular models to append attributes and reduce number of server requests
- Implemented a composite key constraint on tag assignments to ensure no two entries have identical user_id and tag_id
- Stored a custom cookie which saves the user's sort preference for notes
- Addressed a potential concurrency issue as a function needed to be called only after both the note model and notebooks collection were guaranteed to have been fetched

## Technologies
- Backbone js
- Rails
- Custom CSS
- Font Awesome (icons)
- App Academy's CompositeView (modified)
- Heroku

```
# app/assets/javascript/utils/notesSort.js

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
  }
  
  ```

