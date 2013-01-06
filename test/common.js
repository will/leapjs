var fingerId = 0
  , handId = 0
  , frameId =0;

fakeFrame = function(opts) {
  if (opts === undefined) opts = {};
  return {
    id: ++frameId,
    timestamp: frameId,
    fingers: _(opts.fingers || 0).times(function() { return fakeFinger() }),
    hands: _(opts.hands || 0).times(function() { return fakeHand() })
  }
}

fakeHand = function() {
  return {
    id: ++handId,
    valid: true,
    palm: []
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
