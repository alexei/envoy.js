importScripts("../src/envoy.min.js");

var name;

envoy.on("name", function(_name) {
	name = _name || "Jane Doe";
	envoy.trigger("pong", "[grandchild "+ name +"]: gooo goo ga ga");
});

envoy.on("ping", function(message) {
	envoy.trigger("pong", "[grandchild "+ name +"]: "+ message);
});
