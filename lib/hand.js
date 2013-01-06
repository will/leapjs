var Hand = exports.Hand = function(data) {
  this.data = data;
  this.id = data.id
  this.valid = true
  this.pointables = []
  this.fingers = []
  this.hands = []
  for (var fingerIdx = 0, fingerCount = data.fingers.length; fingerIdx != fingerCount; fingerIdx++) {
    this.fingers.push(new window.Leap.Finger(data.fingers[fingerIdx]))
  }
}

Hand.prototype.finger = function(id) {
  return (id < 0 || id >= this.fingers.length) ? Leap.Finger.Invalid : this.fingers[id]
}

Hand.prototype.toString = function() {
  return "Hand [ id: "+ this.id + " data:"+this.data+"] ";
}

Hand.Invalid = { valid: false }
