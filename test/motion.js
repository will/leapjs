describe('Motion', function(){
  describe('#matrix()', function(){
    it('should return a rotation matrix', function(){
      var data1 = fakeFrame({rotation: [[0,1,2], [2,3,4], [2,3,4]]})
      var frame1 = new window.Leap.Frame(data1);
      assert.deepEqual({"elements":[[0,1,2],[2,3,4],[2,3,4]]}, frame1.matrix())
    })
  })

  describe('#translation()', function(){
    it('should return the translation', function(){
      var data1 = fakeFrame({translation: {x: 1,y: 2, z:3}})
      var frame1 = new window.Leap.Frame(data1);
      var data2 = fakeFrame({translation: {x: 3,y: 1, z:5}})
      var frame2 = new window.Leap.Frame(data2);
      assert.deepEqual({x:-2, y:1, z:-2}, frame1.translation(frame2))
    })
  })

  describe('#rotationAxis()', function(){
    it('should return the rotationAxis', function(){
      var data1 = fakeFrame({rotation: [[0,1,2], [2,3,4], [2,3,4]]})
      var frame1 = new window.Leap.Frame(data1);
      var data2 = fakeFrame({rotation: [[0,4,5], [1,3,7], [5,4,2]]})
      var frame2 = new window.Leap.Frame(data1);
      var result = frame1.rotationAxis(frame2);
      assert.closeTo(-Math.sqrt(2)/2, result.x, 0.0001)
      assert.closeTo(0, result.y, 0.0001)
      assert.closeTo(Math.sqrt(2)/2, result.z, 0.0001)
    })
  })

  describe('#rotationAngle()', function(){
    it('should return the rotationAngle', function(){
      var data1 = fakeFrame({rotation: [[1.0,0.0,0.0], [0.0,1.0,0.0], [0.0,0.0,1.0]]})
      var frame1 = new window.Leap.Frame(data1);
      var data2 = fakeFrame({rotation: [[1.0,0.0,0.0], [0.0,1.0,0.0], [0.5,0.0,0.5]]})
      var frame2 = new window.Leap.Frame(data2);
      var result = frame1.rotationAngle(frame2);
      assert.closeTo(0.72273, result, 0.0001)
    })
  })
})
