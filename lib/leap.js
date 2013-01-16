var loopController = null

exports.loop = function(callback) {
  if (loopController) {
    loopController.connect.disconnect();
    loopController = null
  }

  loopController = new Leap.Controller()
  loopController.onReady(function() {
    var drawCallback = function() {
      callback(loopController.lastFrame)
      window.requestAnimFrame(drawCallback)
    };
    window.requestAnimFrame(drawCallback)
  })
  loopController.connect()
}
