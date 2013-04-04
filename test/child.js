importScripts("../src/envoy.min.js");

var grandchild, grandchildren = [];

envoy.on("ping", function(message) {
	envoy.emit("pong", "[child]: "+ message);
	grandchildren.forEach(function(grandchild) {
		grandchild.emit("ping", message);
	});
});

envoy.on("pong", function(message) {
	envoy.emit("pong", message);
});

envoy.on("delegate", function(name) {
	envoy.emit("pong", "Creating "+ name +"...");

	grandchild = envoy("grandchild.js");
	grandchild.on("pong", function(message) {
		envoy.emit("pong", message);
	});
	grandchildren[grandchildren.length] = grandchild;
	grandchild.emit("name", name);
});
