Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (selectorSubviews, selector) {
      view.$(selector).empty();
      _(selectorSubviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector and I'll initialize/return an array
    // of subviews for the sel.
    this._subviews = this._subviews || {};

    if (selector) {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    } else {
      return this._subviews;
    }
  },

  addAllViews: function (collection) {
    collection.each( function (model) {
      this.addView(model);
    }.bind(this));
  },

  removeAllViews: function (selector) {
    var views = this.subviews(selector);
    while ( views.length > 0) {
      view = this.subviews(selector)[0];
      this.removeSubview(selector, view);
    }

    this.notes
  },

  removeView: function (view) {
    this.subviews(s).forEach( function (view) {
      if(view.get('id') === view.model.get('id')) {
        this.removeSubview(s, view);
      }
    }.bind(this));
  }
});
