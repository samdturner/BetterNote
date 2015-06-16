Backbone.NoteTextEditor = function (options) {
  this.inheritedEvents = [];

  Backbone.CompositeView.call(this, options);

  this.typeCount = 10;

  this.notebooks = new BetterNote.Collections.Notebooks();

  this.listenTo(this.notebooks, 'add', this.addView);
  this.listenTo(this.notebooks, 'reset', this.resetNotebooks);

  this.listenTo(this.tagItems, 'add', this.addView);
  this.listenTo(this.tagItems, 'remove', this.removeView);
};

_.extend(Backbone.NoteTextEditor.prototype, Backbone.CompositeView.prototype, {
  baseEvents: {
    'click .font-modifier' : 'fontTool',
    'mouseenter .hyperlink-tool' : 'hyperlinkTool',
    'mouseleave .hyperlink-tool' : 'unbindHyperlinkSub',
    'click a[href]' : 'bindAnchorTag',
    'keyup div.text-editor-page' : 'processNoteUpdate',
    'keyup input.note-title' : 'processNoteUpdate',
    'keyup input.notebook-search-field' : 'processKey',
    'click li.notebook-option' : 'reassignNotebook',
    'click span.new-tag-char' : 'addTagInput',
    'keyup input.new-tag' : 'processNewTag',
    'click button.done-btn' : 'saveNote',
    'click .share-btn' : 'redirectToShare'
  },

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

  colorArr: [
    'rgb(153, 51, 0)', 'rgb(153, 51, 0)',
    'rgb(51, 51, 0)', 'rgb(0, 51, 0)',
    'rgb(0, 51, 102)', 'rgb(0, 0, 128)',
    'rgb(51, 51, 153)', 'rgb(51, 51, 51)',
    'rgb(128, 0, 0)', 'rgb(255, 102, 0)',
    'rgb(128, 128, 0)', 'rgb(0, 128, 0)',
    'rgb(0, 128, 128)', 'rgb(0, 0, 255)',
    'rgb(102, 102, 153)', 'rgb(128, 128, 128)',
    'rgb(255, 0, 0)', 'rgb(255, 102, 0)',
    'rgb(153, 204, 0)', 'rgb(51, 153, 102)',
    'rgb(51, 204, 204)', 'rgb(51, 204, 204)',
    'rgb(51, 102, 255)', 'rgb(128, 0, 128)',
    'rgb(153, 153, 153)', 'rgb(255, 0, 255)',
    'rgb(255, 204, 0)', 'rgb(255, 255, 0)',
    'rgb(0, 204, 255)', 'rgb(153, 51, 102)',
    'rgb(192, 192, 192)', 'rgb(255, 153, 204)',
    'rgb(255, 204, 153)', 'rgb(255, 255, 153)',
    'rgb(204, 255, 204)', 'rgb(204, 255, 255)',
    'rgb(153, 204, 255)', 'rgb(204, 153, 255)',
    'rgb(255, 255, 255)', 'rgb(0, 80, 255)'
  ],

  fontStyleArr: ["Gotham", "Georgia", "Helvetica", "Courier New",
                "Times New Roman", "Trebuchet", "Verdana"],

  fontSizeArr: ["8", "10", "14", "20", "24", "36", "48"],


  //manage notebook options
  addView: function (model) {
    if (model instanceof BetterNote.Models.Notebook) {
      this.addNotebookView(model);
    } else if (model instanceof BetterNote.Models.Tag) {
      this.addTagPinView(model);
    }
  },

  addNotebookView: function (notebook) {
    var notebookView = new BetterNote.Views.NotebookOption({
      model: notebook,
      parentView: this
    });
    this.addSubview('.notebook-options', notebookView);
  },

  addTagPinView: function (tag) {
    var tagPinView = new BetterNote.Views.TagPin({
      model: tag,
      parentView: this
    });
    this.addSubview('ul.header-left', tagPinView);
  },

  resetNotebooks: function () {
    this.removeAllViews('.notebook-options');
    this.addAllViews(this.notebooks);
  },

  assignToNotebook: function (view) {
    var notebookId = view.notebook.get('id');
    this.note.save({ notebook_id: notebookId });
  },

  reassignNotebook: function (e) {
    this.swapNotebookTitleThumb(e);
    this.deselectNotebook();
    this.selectNotebook(e);
  },

  selectNotebook: function (e) {
    var currentTarget = $(e.currentTarget);
    var spanEl = currentTarget.find('span');
    $('<i class="fa fa-check"></i>').insertAfter(spanEl);
    spanEl.addClass('selected');
  },

  swapNotebookTitleThumb: function (e) {
    var title = $(e.currentTarget).find('span').text();
    this.setNotebookTitleThumb(title);
  },

  setNotebookTitleThumb: function (title) {
    var titleThumb = this.$el.find('span.notebook-title-thumb');
    titleThumb.text(title);
  },

  deselectNotebook: function () {
    this.$el.find('span.selected').removeClass('selected');
    this.$el.find('i.fa-check').remove();
  },

  //user types in the notebook search box
  processKey: function (e) {
    if(e.which === 13) {
      var substr = this.$el.find('.notebook-search-field').val();
      this.notebooks.fetch({ data: $.param({ substr: substr }),
                             reset: true
                           });
    }
  },

  goto: function (form) {
    var index = form.select.selectedIndex
    if (form.select.options[index].value != "0") {
      location = form.select.options[index].value;
      window.open(location);
    }
  },

  restoreSelection: function (range) {
    if (range) {
      if (window.getSelection) {
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  },

  fontTool: function (e) {
    var command = $(e.currentTarget).attr('command');
    var valueArg = $(e.currentTarget).attr('valuearg');
    document.execCommand(command, true, valueArg);
  },

  hyperlinkTool: function(e) {
    var selRange = this.saveSelection();
    var text = window.getSelection().toString();
    this.$el.find('input.hyperlink-title').val(text);
    var that = this;
    this.$el.find('.hyperlink-submit').click(function () {
      that.restoreSelection(selRange);
      var url = that.$el.find('input.hyperlink').val();
      that.$el.find('input.hyperlink').val('');
      var regex = new RegExp("~^(?:f|ht)tps?://~i");
      if (!regex.test(url)) {
        url = "http://" + url;
      }
      document.execCommand('createLink', true, url);
    });
  },

  bindAnchorTag: function(e) {
    var url = $(e.currentTarget).attr('href');
    var win = window.open(url, '_blank');
    if(win){
      win.focus();
    } else {
      alert('Please allow popups for this site');
    }
  },

  unbindHyperlinkSub: function(e) {
    this.$el.find('.hyperlink-submit').unbind();
  },

  saveSelection: function () {
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }

    return null;
  },

  saveNote: function () {
    var title = this.$el.find('.note-title').val();
    var content = this.$el.find('div.text-editor-page').html();
    this.note.save({ title: title,
                      content: content });
    this.typeCount = 0;
  },

  processNoteUpdate: function () {
    if(this.typeCount === 10) {
      this.saveNote();
    } else {
      this.typeCount++;
    }
  },

  //tags
  addTagInput: function () {
    this.appendNewTagInput();
    this.removeNewTagChar();
  },

  processNewTag: function (e) {
    if(e.which === 13) {
      this.createTag();
      this.removeNewTagInput();
      this.appendNewTagChar();
    }
  },

  createTag: function () {
    var tagName = this.$el.find('input.new-tag').val();
    var newTag = new BetterNote.Models.Tag({ name: tagName });
    newTag.save(null,
      { success: function (tag) {
          if ( this.note.get('id') ) {
            this.createTagAssignment(tag, this.note.get('id'));
          } else {
            this.note.save( null,
              {
                success: function (note) {
                  this.createTagAssignment(tag, this.note.get('id'));
                }.bind(this)
              }
            );
          }
        }.bind(this)
      }
    );
    // var tagList = this.$el.find('ul.header-group.header-left');
    // var tagContent = this.template[2]({ name: tagName });
    // tagList.append(tagContent);
  },

  createTagAssignment: function (tag, noteId) {
    $.ajax({
      type: "POST",
      url: "api/tag_assignments",
      data: { tag_assignment: { tag_id: tag.get('id'), note_id: noteId } },
      success: function () {
        this.tagItems.add(tag);
      }.bind(this)
    });
  },

  appendNewTagInput: function () {
    var newTagInput = this.template[3]();
    this.$el.find('ul.new-tag-group').append(newTagInput);
    this.$el.find('input.new-tag').focus();
  },

  removeNewTagInput: function () {
    this.$el.find('li.new-tag').remove();
  },

  appendNewTagChar: function () {
    var content = this.template[2]();
    this.$el.find('ul.new-tag-group').append(content);
  },

  removeNewTagChar: function () {
    this.$el.find('li.new-tag-char').remove();
  },

  redirectToShare: function () {
    var url = 'notes/share/' + this.note.get('id');
    Backbone.history.navigate( url, { trigger: true });
  }
});
