window.BetterNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new BetterNote.Routers.Router();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  BetterNote.initialize();
});
