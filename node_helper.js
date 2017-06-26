/* Magic Mirror
 * Node Helper: MMM-sight-words
 *
 * By
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var words = require("./words.json");

var groups = [
 "prek"
];

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "MMM-sight-words-LOAD") {
			if (groups.indexOf(payload) === -1) {
				this.sendSocketNotification("MMM-sight-words-DATA", {
					error: true,
					message: "Unknown group provided in config"
				});
			} else {
				this.sendSocketNotification("MMM-sight-words-DATA", {
					error: false,
					data: this.shuffle(words[payload])
				});
			}
		}
	},

	// Fisher-Yates Shuffle
	shuffle: function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while(0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
});
