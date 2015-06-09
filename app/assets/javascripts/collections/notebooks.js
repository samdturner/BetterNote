BetterNote.Collections.Notebooks = Backbone.Collection.extend({
  url: 'api/notebooks',

  model: BetterNote.Models.Notebook,

  getOrFetch: function (id) {
    var notebook = this.get(id);

    if (!notebook) {
      notebook = new BetterNote.Models.Notebook({ id: id });
      notebook.fetch({
        success: function () {
          this.add(notebook);
        }.bind(this)
      });
    } else {
      notebook.fetch();
    }

    return notebook;
  }
});
