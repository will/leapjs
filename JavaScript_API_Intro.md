# Leap JavaScript Client Library

Leap JS is a JavaScript client library that lets you use Leap motion tracking data in a web application.

In a nutshell, the Leap motion tracking device detects and tracks hands and fingers placed within its field of view. The Leap captures this data one *frame* at a time. Web applications can use the Leap application WebSocket server and the JavaScript API to access this data. The Leap sends tracking data through the socket connection as a JSON formated message. The JavaScript API takes the JSON and evaluates it into proper objects.

For more information about the Leap and the Leap SDK, visit us on the Leap Developer Portal: https://developer.leapmotion.com


## Installation:

Copy leap.js to your desired location. We also provide a minimized version, named leap.min.js.


## Running a Leap-enabled web page

To run a Leap-enabled web page or application:

1. Plug the Leap device into a USB port and place it in front of you.
2. If you haven’t already, install the Leap software.
3. Start the Leap application. If you haven’t already, enter your registered email address and password when prompted. The Leap icon appears in the notification area of the task bar (on Windows) or finder bar (on Mac) and turns green when ready.
4. Open the page in a browser that supports WebSockets.

Note: Port 6437 on the loopback address (i.e. localhost) must be reachable (and not used by another application).


## Basic Usage:

Since the Leap provides data continuously, you need to set up an event loop to handle individual frames of data. You can set up a loop to handle the data as the Leap produces each frame, or you can set up a loop to handle the data when your application is ready to do something with it. The Leap JavaScript client library supports both options. 


### Using the browser animation loop

The Leap API provides the `loop()` function, which invokes a callback you provide whenever the browser is ready to draw.

    Leap.loop( function( frame ) {
        // ... your code here
    })

When you call `Leap.loop()`, it creates a Leap.Controller object and opens a connection to the Leap application WebSocket server. The function uses the browser `requestAnimationFrame()` method to invoke your callback function when the browser is ready to draw.


### Using Leap frame events

The Leap frame rate can range from about 40 fps to over 200 fps, depending on the Leap operating mode and the capabilities of the client computer. To process each frame as it becomes available, you can create your own Leap Controller object:

    var controller = new Leap.Controller();
    controller.onFrame(function() {
        var frame = controller.frame();
		//process frame data...
    })
    controller.connect()


----

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
