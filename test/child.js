importScripts("../src/envoy.min.js");

var grandchild, grandchildren = [];

envoy.on("ping", function(message) {
	envoy.trigger("pong", "[child]: "+ message);
	grandchildren.forEach(function(grandchild) {
		grandchild.trigger("ping", message);
	});
});

envoy.on("pong", function(message) {
	envoy.trigger("pong", message);
});

envoy.on("delegate", function(name) {
	envoy.trigger("pong", "Creating "+ name +"...");

	grandchild = envoy("grandchild.js");
	grandchild.on("pong", function(message) {
		envoy.trigger("pong", message);
	});
	grandchildren[grandchildren.length] = grandchild;
	grandchild.trigger("name", name);
});
