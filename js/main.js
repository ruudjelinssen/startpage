(function () {

	var toggleDarkMode = function() {
		config.set('darkMode', !config.get('darkMode'));
		document.getElementsByTagName('BODY')[0].classList.toggle('dark-mode');
	};

	(function() {
		// Set all click listeners
		document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);
	})();

	// Initialization
	var init = function () {
		// Set right theme
		if (config.get('darkMode')) {
			document.getElementsByTagName('BODY')[0].classList.toggle('dark-mode');
		}

		// Start the clock
		console.log(utils.getDateObject());

	};

	init();
})();