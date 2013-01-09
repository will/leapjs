var fingerId = 0
  , handId = 0
  , frameId =0;

fakeFrame = function(opts) {
  if (opts === undefined) opts = {};
  return {
    id: ++frameId,
    timestamp: frameId,
    pointables: _(opts.fingers || 0).times(function() { return fakeFinger() }),
    hands: _(opts.hands || 0).times(function() { return fakeHand() }),
    rotation: [[0,1,2], [2,3,4], [2,3,4]],
    translation: {x: 1, y: 2, z: 3}
  }
}

fakeHand = function() {
  return {
    id: ++handId,
    valid: true,
    palm: [],
    rotation: [[0,1,2], [2,3,4], [2,3,4]],
    translation: {x: 1, y: 2, z: 3}
  }
}

fakeFinger = function() {
  return {
    id: ++fingerId,
    length: 5,
    tool: false,
    width: 5,

    tip: {
      direction: [10, 10, 10],
      position: [10, 10, 10],
      direction: [10, 10, 10]
    }
  }
}
