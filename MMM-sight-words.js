/* global Module */

/* Magic Mirror
 * Module: MMM-sight-words
 *
 * By
 * MIT Licensed.
 */

Module.register("MMM-sight-words", {
	defaults: {
		group: "prek"
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror,
	_wordIndex: 0,
	_words: [],

	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},

	getStyles: function() {
		return ["MMM-sight-words.css"];
	},

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;

		self.sendSocketNotification("MMM-sight-words-LOAD", this.config.group);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("p");

		if (!this.loaded) {
			wrapper.innerHTML = "Getting your word...";
			wrapper.className = "loading";
		} else {
			wrapper.innerHTML = this._words[this._wordIndex];
			wrapper.className = "";
		}

		return wrapper;
	},

	processData: function(res) {
		var self = this;
		if (res.error === true) {
			Log.error(self.name, res.message);
			return;
		}

		this._words = res.data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;
		this.updateDom();

		setInterval(function() {
			if (moment().format('HH:mm:ss') === '00:00:00') {
				if (++self._wordIndex >= self._words.length) {
					self._wordIndex = 0;
				}

				self.updateDom();
			}
		}, 1000);
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function(notification, payload) {
		if (notification === "MMM-sight-words-DATA") {
			this.processData(payload);
		}
	}
});
