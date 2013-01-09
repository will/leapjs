var Frame = exports.Frame = function(data) {
  this.valid = true
  this.id = data.id
  this.timestamp = data.timestamp
  this.hands = []
  this.pointables = []
  this.tools = []
  this.fingers = []
  this._translation = data.translation;
  this.rotation = data.rotation;
  this.xBasis = this.rotation[0];
  this.yBasis = this.rotation[1];
  this.zBasis = this.rotation[2];
  this._scaleFactor = data.scaleFactor;
  var handMap = {}
  for (var handIdx = 0, handCount = data.hands.length; handIdx != handCount; handIdx++) {
    var hand = new window.Leap.Hand(data.hands[handIdx]);
    this.hands.push(hand)
    handMap[hand.id] = handIdx
  }
  for (var pointableIdx = 0, pointableCount = data.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
    var pointable = new window.Leap.Pointable(data.pointables[pointableIdx]);
    this.pointables.push(pointable);
    (pointable.tool ? this.tools : this.fingers).push(pointable);
    if (pointable.handId) {
      var hand = this.hands[handMap[pointable.handId]]
      hand.pointables.push(pointable);
      (pointable.tool ? hand.tools : hand.fingers).push(pointable);
    }
  }
}

Frame.epsilon = Math.pow(1, -16);

Frame.prototype.matrix = function() {
  if (this.matrix) return this.matrix;
  return this.matrix = $M(this.rotation);
}

Frame.prototype.translation = function(fromFrame) {
  if (fromFrame === undefined) return this.translation;
  if (!this.fromFrame.valid || !fromFrame.valid) return {x:0, y:0, z:0};
  return { x: this._translation.x - fromFrame._translation.x,
           y: this._translation.y - fromFrame._translation.y,
           z: this._translation.z - fromFrame._translation.z };
}

Frame.prototype.rotationAxis = function(fromFrame) {
  if (!this.fromFrame.valid || !fromFrame.valid) return {x:0, y:0, z:0};
  return this.normalize({ x: this.zBasis[1] - fromFrame.yBasis[2],
           y: this.xBasis[2] - fromFrame.zBasis[0],
           z: this.yBasis[0] - fromFrame.xBasis[1] });
}

Frame.prototype.rotationAngle = function(fromFrame) {
  if (!this.fromFrame.valid || !fromFrame.valid) return 0.0;
  var cs = (fromFrame.xBasis[0] + fromFrame.yBasis[1] + fromFrame.zBasis[2] - 1.0)*0.5;
  if (cs < epsilon - 1.0 || cs > epsilon + 1.0) {
    return 0.0;
  } else {
    return Math.acos(cs);
  }
}

Frame.prototype.rotationMatrix = function(fromFrame) {
  if (!this.fromFrame.valid || !fromFrame.valid) $M.I(3);
  return fromFrame.matrix().x(this.matrix().transpose())
}

Frame.prototype.scaleFactor = function(fromFrame) {
  if (!this.fromFrame.valid || !fromFrame.valid) 1.0;
  return Math.exp(this._scaleFactor - fromFrame._scaleFactor);
}

Frame.prototype.tool = function(id) {
  return (id < 0 || id >= this.tools.length) ? window.Leap.Pointable.Invalid : this.tools[id]
}

Frame.prototype.pointable = function(id) {
  return (id < 0 || id >= this.pointables.length) ? window.Leap.Pointable.Invalid : this.pointables[id]
}

Frame.prototype.finger = function(id) {
  return (id < 0 || id >= this.fingers.length) ? window.Leap.Pointable.Invalid : this.fingers[id]
}

Frame.prototype.hand = function(id) {
  return (id < 0 || id >= this.hands.length) ? window.Leap.Hand.Invalid : this.hands[id]
}

Frame.prototype.toString = function() {
  return "frame id:"+this.id+" timestamp:"+this.timestamp+" hands("+this.hands.length+") pointables("+this.pointables.length+")"
}

Frame.prototype.dump = function() {
  var out = this.toString();
  out += "\nHands:\n"
  for (var handIdx = 0, handCount = this.hands.length; handIdx != handCount; handIdx++) {
    out += "  "+ this.hands[handIdx].toString() + "\n"
  }
  out += "Pointables:\n"
    for (var pointableIdx = 0, pointableCount = this.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
    out += "  "+ this.pointables[pointableIdx].toString() + "\n"
  }
  out += JSON.stringify(this, undefined, 2)
  return out;
}

Frame.Invalid = {
  valid: false,
  fingers: [],
  pointables: [],
  finger: function() { return window.Leap.Pointable.Invalid },
  hand: function() { return window.Leap.Hand.Invalid },
  toString: function() { return "invalid frame" },
  dump: function() { return this.toString() }
}