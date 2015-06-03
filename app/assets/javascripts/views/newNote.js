BetterNote.Views.NewNote = Backbone.View.extend({
  initialize: function () {

  },

  template: JST['new_note'],

  render: function () {
    var colorArr = [
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
                     ]
    var fontStyleArr = ["Gotham", "Georgia", "Helvetica", "Courier New",
                        "Times New Roman", "Trebuchet", "Verdana"]
    var fontSizeArr = ["8", "10", "14", "20", "24", "36", "48"]
    var content = this.template({ fontStyleArr: fontStyleArr,
                                  fontSizeArr: fontSizeArr,
                                  colorArr: colorArr });
    this.$el.html(content);
    $(this.$el).find('.font-modifier').click(function () {
      var command = $(this).attr('command');
      var valueArg = $(this).attr('valuearg');
      document.execCommand(command, true, valueArg);
    });

    $(this.$el).find('.hyperlink-submit').click(function () {
      var valueArg = $(this.$el).find('input.hyperlink').val();
      document.execCommand('createLink', true, valueArg);
    });
    
    return this;
  }
})
