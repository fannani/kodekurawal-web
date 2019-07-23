var consoleData;  //TODO: Multiple check for log data
(function($) {
  var old = console.log;
  var logger = '';
  console.log = function() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == 'object') {
        logger +=
          (JSON && JSON.stringify
            ? JSON.stringify(arguments[i], undefined, 2)
            : arguments[i]) + '<br />';
      } else {
        logger += arguments[i] + '<br />';
      }
    }
    consoleData = arguments;
    parent.postMessage({ action: 'console', data: logger }, '*');
  };

  $.fn.isAfter = function(sel) {
    return this.prevAll().filter(sel).length !== 0;
  };

  $.fn.isBefore = function(sel) {
    return this.nextAll().filter(sel).length !== 0;
  };
  parent.postMessage({ action: 'console', data: '' }, '*');
})(jQuery);
