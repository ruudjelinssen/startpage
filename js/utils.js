var utils = (function() {

	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	// Get some date information
	var getDateObject = function () {
		var now = new Date();
		return {
			day: now.getDay(),
			dayName: dayNames[now.getDay()],
			date: now.getDate(),
			month: now.getMonth(),
			monthName: monthNames[now.getMonth()],
			year: 1900 + now.getYear(),
			hours: now.getHours(),
			minutes: now.getMinutes(),
			seconds: now.getSeconds(),
			milliseconds: now.getMilliseconds()
		};
	};

	// Stringify greeter
	var greeterString = function () {

	};


	// Merge two objects. 
	// If key in object B exists in object A, it will be overwritten.
	var mergeObjects = function(objA, objB) {
		for (var key in objB) {
			objA[key] = objB[key];
		}
		return objA;
	};

	// Export methods here
	return {
		mergeObjects: mergeObjects,
		getDateObject: getDateObject
	};
})();