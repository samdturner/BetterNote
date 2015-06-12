BetterNote.Views.NewNote = Backbone.CompositeView.extend({
  initialize: function () {
    this.note = new BetterNote.Models.Note();
    this.typeCount = 10;

    this.notebooks = new BetterNote.Collections.Notebooks();
    this.notebooks.fetch();

    this.listenTo(this.notebooks, 'add', this.addView);
    this.listenTo(this.notebooks, 'reset', this.resetNotebooks);
  },

  template: [JST['notes/new'], JST['notes/notebook_options_container']],

  events: {
    'click .font-modifier' : 'fontTool',
    'mouseenter .hyperlink-tool' : 'hyperlinkTool',
    'mouseleave .hyperlink-tool' : 'unbindHyperlinkSub',
    'click a[href]' : 'bindAnchorTag',
    'keyup div.text-editor-page' : 'processNoteUpdate',
    'keyup input.note-title' : 'processNoteUpdate',
    'keyup input.notebook-search-field' : 'processKey',
    'click li.notebook-option' : 'reassignNotebook'
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
  addView: function (notebook) {
    var notebookView = new BetterNote.Views.NotebookOption({
      model: notebook,
      parentView: this
    });
    this.addSubview('.notebook-options', notebookView);
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
    this.deselectNotebook();
    this.selectNotebook(e);
  },

  selectNotebook: function (e) {
    var currentTarget = $(e.currentTarget);
    var spanEl = currentTarget.find('span');
    $('<i class="fa fa-check"></i>').insertAfter(spanEl);
    spanEl.addClass('selected');
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

  processNoteUpdate: function () {
    if(this.typeCount === 10) {
      
      var title = this.$el.find('.note-title').val();
      var content = this.$el.find('div.text-editor-page').html();
      this.note.save({ title: title,
                        content: content });
      this.typeCount = 0;
    } else {
      this.typeCount++;
    }
  },

  render: function () {
    var content = this.template[0]({ fontStyleArr: this.fontStyleArr,
                                  fontSizeArr: this.fontSizeArr,
                                  colorArr: this.colorArr });
    this.$el.html(content);

    var notebookOptions = this.template[1]();
    this.$el.find('li.create-notebook-group').append(notebookOptions);


    return this;
  }
})
