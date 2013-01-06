var Hand = exports.Hand = function(data) {
  this.data = data;
  this.id = data.id
  this.valid = true
  this.pointables = []
  this.fingers = []
  this.tools = []
}

Hand.prototype.finger = function(id) {
  return (id < 0 || id >= this.fingers.length) ? Leap.Pointable.Invalid : this.fingers[id]
}

Hand.prototype.toString = function() {
  return "Hand [ id: "+ this.id + " data:"+JSON.stringify(this.data)+"] ";
}

Hand.Invalid = { valid: false }
