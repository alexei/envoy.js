# envoy.js
envoy.js is a library that allows you to delegate computationally expensive tasks to Web Workers with pub/sub (publish/subscribe) capabilities.

## How to use
Page:

	// index.html
	<script src="envoy.min.js"></script>
	<script>
		var worker = envoy("worker.js");
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

## API
To create a new worker, simply call the `envoy` method:

	envoy(workerScript)

To add events, call the `on` method:

	on(eventType, callback)

To remove events, call the `off` method:

	off(eventType, callback)

To trigger events, call the `emit` method:

	emit(eventType[, param1[, param2[, ...]]])

Note that inside workers, the `envoy` object refers to the current running worker.

## Support
Any browser that supports Web Workers. Note that only Firefox supports nested workers (as of 2013-04-04).
