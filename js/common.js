(function(root, factory) {
	if(typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = factory(root.Common);
	} else if(typeof define === "function" && define.amd) {
		define(["Common"], function(Common) {
			return(root.Common = factory(Common));
		});
	} else {
		root.Common = factory(root.Common);
	}
}(this, function(Common) {
	Common = {
		version: "1.0.2",
		domain: "http://www.hltm.tv",
		api: "https://hltm-api.tomoya.cn",
		open: function(id, url, extras) {
			mui.openWindow({
				id: id,
				url: url,
				waiting: {
					autoShow: false
				},
				extras: extras || {}
			});
		},
		showWaiting: function(msg) {
			return plus.nativeUI.showWaiting(msg ? msg : "主淫，不要急嘛~", {
				loading: {
					icon: "/images/waiting.png"
				},
				padlock: true
			});
		},
		closeWaiting: function(w) {
			w.close();
		}
	};
	return Common;
}));