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

## Prototypal Inhertiance Across Mutliple Custom Backbone Views
There are several views in BetterNote that are all versions of a list of notes with the option to sort.  These views share many common methods which need to be inherited from a common ancestor in order to keep the code DRY.  The inheritance chain should look like: ChildView => NotesSortView => CompositeView => View

However, Backbone's extend() method has several limitations which make it deficient for this task:

1. Extend places instance variables of ChildView on the prototype of NotesSortView.  Thus, each new instance of ChildView would override the properties of the previous instance.
2. The events hash is also a property of the prototype.  Therefore, we would need to declare a new events hash for the ChildView instance leading to code duplication across children.  However, we should be able to share the parent view's events with the ChildView.

This problem was solved using the following approach:

```
# app/assets/javascript/utils/notesSort.js

# NotesSortView is instantiated using a function which acts as the constructor.  
# The instance variables are assigned within the constructor function which makes them unique to each instance.
Backbone.NotesSortView = function (options) {
  this.inheritedEvents = [];

  Backbone.CompositeView.call(this, options);

# some code removed for simplicity

};

_.extend(Backbone.NotesSortView.prototype, Backbone.CompositeView.prototype, {

# used add an event that is specific to an instance of NotesSortView
  addEvents: function(eventObj) {
      this.inheritedEvents.push(eventObj);
  },

# base events hash allows us to store events that are common across all instances of NotesSortView
  baseEvents: { 'click li[data-id]' : 'updateSortType' },

# events function concatenates inheritedEvents, baseEvents and parent events
  events: function() {
      var e = _.extend({}, this.baseEvents);

      _.each(this.inheritedEvents, function(events) {
        e = _.extend(e, events);
      });

      return e;
  },

  ```

