/*! envoy.js | Copyright (c) 2013 Alexandru Marasteanu <hello at alexei dot ro> | 3 clause BSD license */

(function(that, envoy) {
	envoy = function(script, o) {
		o = this;
		if (o === that) {
			return new envoy(script);
		}
		o.w = (o === envoy ? that : new Worker(script));
		o.w.addEventListener("message", function(event) {
			o.e[event.data.t].forEach(function(v) { v.call(null, event.data.d); });
		}, false);
		o.e = {};
		return o;
	};
	envoy.prototype = {
		on: function(type, callback) {
			!this.e[type] && (this.e[type] = []);
			this.e[type][this.e[type].length] = callback;
		},
		off: function(type, callback) {
			this.e[type].filter(function(v) { return v !== callback; });
		},
		trigger: function(type, data) {
			this.w.postMessage({t: type, d: data});
		}
	};
	Object.keys(envoy.prototype).forEach(function(k) {
		envoy[k] = function() { envoy.prototype[k].apply(envoy, arguments); };
	});
	that.envoy = envoy.call(envoy);
})(this);
