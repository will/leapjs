var Hand = exports.Hand = function(data) {
  this.id = data.id
  this.data = data;
  this.palmPosition = data.palmPosition
  this.palmDirection = data.palmDirection
  this.palmVelocity = data.palmVelocity
  this.palmNormal = data.palmNormal
  this.sphereCenter = data.sphereCenter
  this.sphereRadius = data.sphereRadius
  this.valid = true
  this.pointables = []
  this.fingers = []
  this.tools = []
  this._translation = data.translation;
  this.rotation = data.rotation;
  this.xBasis = this.rotation[0];
  this.yBasis = this.rotation[1];
  this.zBasis = this.rotation[2];
  this._scaleFactor = data.scaleFactor;
  Leap.extend(Frame.prototype, Motion)
}

Hand.prototype.finger = function(id) {
  return (id < 0 || id >= this.fingers.length) ? Leap.Pointable.Invalid : this.fingers[id]
}

Hand.prototype.toString = function() {
  return "Hand [ id: "+ this.id + " data:"+JSON.stringify(this.data)+"] ";
}

Hand.Invalid = { valid: false }
