/* global Module */

/* Magic Mirror
 * Module: MMM-sight-words
 *
 * By
 * MIT Licensed.
 */

Module.register("MMM-sight-words", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		group: "prek"
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;

		// Schedule update timer.
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	/*
	 * getData
	 * get the list of words for the provided group
	 *
	 */
	getData: function() {
		var self = this;

		self.sendSocketNotification("MMM-sight-words-LOAD", this.config.group);
	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = "Getting your word...";
		}

		// If this.dataRequest is not empty
		if (this.dataRequest) {
			wrapper.innerHTML = this.dataRequest.title;
		}

		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	processData: function(res) {
		var self = this;
		if (res.error === true) {
			Log.error(self.name, res.message);
			return;
		}

		this.dataRequest = { title: res.data[0] };
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;
		this.updateDom();
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function(notification, payload) {
		if (notification === "MMM-sight-words-DATA") {
			this.processData(payload);
		}
	}
});
