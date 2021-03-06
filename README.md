# BetterNote

[Website link][weburl]

[weburl]: https://www.better-note.com/

## Concept
BetterNote is a clone of Evernote that uses a javascript library (quill.js) to allow users to create notes which are saved in the cloud.  These notes can be organized into notebooks and tagged based on subject matter.  This project was built in a two week time period.

Credit: The design of the share url page and the decision to use quill.js was based on QuiqNote: https://github.com/th11/QuiqNote.  Also note that the seed data prior to July 23rd was taken from QuiqNote.  The data has since been updated.

## Key Features
- Notes are automatically saved on every 10 keystrokes for enhanced user experience
- Create notes and notebooks
- Assign one or many tags to notes
- Search for notes based on any string in the title or content
- Share notes via public URL
- Sortable notes (date or title)
- Infinite scrolling for long lists

## Technical Highlights
- Used prototypal inheritance to extend the methods of two backbone view objects across multiple classes to keep code DRY (details below)
- Implemented the KMP substring search algorithm to increase efficiency of searching for notes
- Customized rails serialize JSON method for particular models to append attributes and reduce number of server requests
- Implemented a composite key constraint on tag assignments to ensure no two entries have identical user_id and tag_id
- Stored a custom cookie which saves the user's sort preference for notes
- Addressed a potential concurrency issue as a function needed to be called only after both the note model and notebooks collection were guaranteed to have been fetched

## Technologies Used
- Backbone js
- Rails
- Custom CSS
- Font Awesome (icons)
- App Academy's compositeView (modified)
- Heroku

## Prototypal Inhertiance Across Mutliple Custom Backbone Views
Several views are versions of the same view: a notes list with a sort option.  These views share common methods which need to be inherited from a common parent in order to keep the code DRY.  The inheritance chain should look like: 

View < CompositeView < NotesSortView < ChildView  

Backbone's extend() method allows us to extend methods to child classes:

```
Backbone.NotesSortView = Backbone.CompositeView.extend({
  #functions specific to NotesSortView
});
```

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

# add an event that is specific to an instance of NotesSortView
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

This approach allows NotesSortView to inherit the methods of CompositeView.  We can use this same approach to extend our classes indefinitely.
