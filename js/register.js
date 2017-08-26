
var register = {
  init: function() {
    this.bindEvent();
  },
  bindEvent: function() {
    $('.dx-text').click(function() {
      alert(1);
    })
  }
}

register.init();
