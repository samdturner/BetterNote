BetterNote.Views.NewNote = Backbone.View.extend({
  initialize: function () {

  },

  template: JST['new_note'],

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

  bindFontTool: function (view) {
    view.subEl(view, '.font-modifier').click(function (e) {
      var command = $(e.currentTarget).attr('command');
      var valueArg = $(e.currentTarget).attr('valuearg');
      document.execCommand(command, true, valueArg);
    });
  },

  bindHyperlinkTool: function (view) {
    view.subEl(view, '.hyperlink-tool').mouseenter(function(e) {
      var selRange = view.saveSelection();
      var text = window.getSelection().toString();
      view.subEl(view, 'input.hyperlink-title').val(text);
      view.bindHyperlinkSub(view, selRange);
    });
  },

  bindHyperlinkSub: function (view, selRange) {
    view.subEl(view, '.hyperlink-submit').click(function () {
      view.restoreSelection(selRange);
      var url = view.subEl(view, 'input.hyperlink').val();
      view.subEl(view, 'input.hyperlink').val('');
      var regex = new RegExp("~^(?:f|ht)tps?://~i");
      if (!regex.test(url)) {
        url = "http://" + url;
      }
      document.execCommand('createLink', true, url);
    });
  },

  bindAnchorTag: function (view) {
    view.subEl(view, ".text-editor-page").on('click', "a[href]", function(e) {
      var url = $(e.currentTarget).attr('href');
      var win = window.open(url, '_blank');
      if(win){
          win.focus();
      } else {
          alert('Please allow popups for this site');
      }
    });
  },

  unbindHyperlinkSub: function(view) {
    view.subEl(view, '.hyperlink-tool').mouseleave(function(e) {
      view.subEl(view, '.hyperlink-submit').unbind();
    });
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

  render: function () {
    var content = this.template({ fontStyleArr: this.fontStyleArr,
                                  fontSizeArr: this.fontSizeArr,
                                  colorArr: this.colorArr });
    this.$el.html(content);

    this.bindFontTool(this);
    this.bindHyperlinkTool(this);
    this.unbindHyperlinkSub(this);
    this.bindAnchorTag(this);

    return this;
  },

  subEl: function (view, selector) {
    return $(view.$el).find(selector);
  }
})
