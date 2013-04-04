# envoy.js
envoy.js is a library that allows you to delegate computationally expensive tasks to Web Workers with pub/sub (publish/subscribe) capabilities.

## How to use
Page:

	// index.html
	<script src="envoy.min.js"></script>
	<script>
		var worker = envoy("child.js");
		worker.on("hello-back", function(message) {
			console.log(message);
		});
		worker.emit("hello", "Hi there!");
	</script>

Worker:

	// worker.js
	importScripts("envoy.min.js");

	envoy.on("hello", function(message) {
		envoy.emit("hello-back", "Oh, hello!");
	});
