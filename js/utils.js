var utils = (function() {

	// Get some date information
	var getDateObject = function () {
		var now = new Date();
		return {
			day: now.getDay(),
			date: now.getDate(),
			month: now.getMonth(),
			year: 1900 + now.getYear(),
			hour: now.getHours(),
			minute: now.getMinutes(),
			seconds: now.getSeconds(),
			milliseconds: now.getMilliseconds()
		};
	};

	// Stringify greeter
	var greeterString = function () {

		var options = 
		getDateObject().hour
	}


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