var Connection = exports.Connection = function(opts) {
  if (opts && opts.frame) this.handleRawFrame = opts.frame;
};

Connection.prototype.handleOpen = function() {
  if (this.openTimer) {
    clearTimeout(this.openTimer);
    this.openTimer = undefined;
  }
};

Connection.prototype.handleClose = function() {
  var _this = this;
  this.openTimer = setTimeout(function() { console.log("reconnecting..."); _this.connect(); }, 1000)
};

Connection.prototype.createSocket = function() {
  this.socket = new WebSocket("ws://127.0.0.1:6437");
}

Connection.prototype.connect = function() {
  var _this = this
  if (!this.socket) this.createSocket()
  this.socket.onopen = function() {
    _this.handleOpen()
  }
  this.socket.onmessage = function(message) {
    var data = JSON.parse(message.data);
    if (data.version) {
      _this.serverVersion = data.version
      if (_this.startConnection) _this.startConnection(_this.serverVersion)
    } else {
      _this.handleRawFrame(data)
    }
  }
  this.socket.onclose = function(message) {
    _this.handleClose()
  }
}
