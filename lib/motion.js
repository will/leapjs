var epsilon = Math.pow(1, -16);

var Motion = exports.Motion = {
  matrix: function() {
    if (this.matrix) return this.matrix;
    return this.matrix = $M(this.rotation);
  },
  translation: function(fromFrame) {
    if (fromFrame === undefined) return this.translation;
    if (!this.fromFrame.valid || !fromFrame.valid) return {x:0, y:0, z:0};
    return { x: this._translation.x - fromFrame._translation.x,
             y: this._translation.y - fromFrame._translation.y,
             z: this._translation.z - fromFrame._translation.z };
  },
  rotationAxis: function(fromFrame) {
    if (!this.fromFrame.valid || !fromFrame.valid) return {x:0, y:0, z:0};
    return this.normalize({ x: this.rotation[2][1] - fromFrame.rotation[1][2],
             y: this.rotation[0][2] - fromFrame.rotation[2][0],
             z: this.rotation[1][0] - fromFrame.rotation[0][1] });
  },
  rotationAngle: function(fromFrame) {
    if (!this.fromFrame.valid || !fromFrame.valid) return 0.0;
    var cs = (fromFrame.rotation[0][0] + fromFrame.rotation[1][1] + fromFrame.rotation[2][2] - 1.0)*0.5;
    if (cs < epsilon - 1.0 || cs > epsilon + 1.0) {
      return 0.0;
    } else {
      return Math.acos(cs);
    }
  },
  rotationMatrix: function(fromFrame) {
    if (!this.fromFrame.valid || !fromFrame.valid) $M.I(3);
    return fromFrame.matrix().x(this.matrix().transpose())
  },
  scaleFactor: function(fromFrame) {
    if (!this.fromFrame.valid || !fromFrame.valid) 1.0;
    return Math.exp(this._scaleFactor - fromFrame._scaleFactor);
  }
}
