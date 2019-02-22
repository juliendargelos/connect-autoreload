// Long polling client for live reload
// @author: ian
// @author: juliendargelos

;function AutoReload(window) {
  var request

  function load() {
    window.location.reload();
  }

  function error() {
    console.error('Autoreload unrecoverable error:', request.statusText);
    request = null
  }

  this.watch = this.Watch = function(host) {
    (function poll() {
      request = new XMLHttpRequest();
      request.timeout = 1000*60*10;
      request.addEventListener('load', reload);
      request.addEventListener('error', error);
      request.addEventListener('timeout', poll);
      request.open('get', window.location.protocol + '//' + (host || 'localhost:60000') + '/waitForReload');
      request.send();
    })();
  }

  this.stop = this.Stop = function() {
    request && request.abort();
  }
}

window.AutoReload = new AutoReload(window);