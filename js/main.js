(function () {

	// Selected item
	var selectedSection = -1;
	var selectedShortcut = -1;

	// Currently visible sections and shortcuts
	var currentShortcutSections = null;

	// Define all elements used
	var elBody = document.getElementsByTagName('BODY')[0];
	var elToggleDarkMode = document.getElementById('toggle-dark-mode');
	var elClock = document.getElementById('clock');
	var elDate = document.getElementById('date');
	var elSearch = document.getElementById('search');
	var elShortcutSections = document.getElementById('shortcut-sections');

	// Toggle between the dark mode and light mode.
	var toggleDarkMode = function() {
		config.set('darkMode', !config.get('darkMode'));
		elBody.classList.toggle('dark-mode');
	};

	// Updates the clock inner text
	var updateClock = function () {
		var dobj = utils.getDateObject();
		var text = dobj.hours + ':' + ('0' + dobj.minutes).slice(-2);
		if (config.get('showSeconds', false)) {
			text += ':' + ('0' + dobj.seconds).slice(-2);
		}
		elClock.innerText = text;
	};

	// Updates the date inner text
	var updateDate = function () {
		var dobj = utils.getDateObject();
		elDate.innerText = dobj.dayName + ', ' + dobj.monthName + ' ' + dobj.date;
	};

	// The sections of shortcuts
	var shortcuts = (function () {

		// Views the HTML for a given list of sections.
		// Each section can contain multiple shortcuts
		var render = function () {

			var html = "";
			// loop over shortcut sections
			for (var i in currentShortcutSections) {
				var section = currentShortcutSections[i];
				html += '<div class="shortcut-section-wrapper">';
				html += '<div class="shortcut-section shortcut-section--' + section.color + '">';
				html += '<div class="shortcut-section__header">';
				html += '<h3 class="shortcut-section__name">' + section.name + '</h3>';
				html += '</div>';
				html += '<ul class="shortcut-section__list">';

				// Loop over shortcuts
				for (var j in section.shortcuts) {
					var shortcut = section.shortcuts[j];
					var selectedclass = (selectedSection == i && selectedShortcut == j) ? ' shortcut-section__shortcut--selected' : '';
					html += '<li class="shortcut-section__shortcut' + selectedclass + '">';
					html += '<a href="' + shortcut.url + '">';
					html += shortcut.name;
					html += '</a>';
					html += '</li>';
				}
				html += '</ul>';
				html += '</div>';
				html += '</div>';
			}
			elShortcutSections.innerHTML = html;
		};

		// Search shortcuts inside sections.
		// The query is used as a regular expression
		var searchShortcuts = function (query) {

			var matches = [];

			var shortcutSections = JSON.parse(JSON.stringify(config.get('shortcutSections', [])));

			for (var i in shortcutSections) {
				var section = shortcutSections[i];
				var sectionMatches = new Array();

				for (var j in section.shortcuts) {
					var shortcut = section.shortcuts[j];

					if (shortcut.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
						sectionMatches.push(shortcut);
					}
				}

				if (sectionMatches.length > 0) {
					var s = section;
					s.shortcuts = sectionMatches;
					matches.push(s);
				}
			}

			currentShortcutSections = matches;
		};


		return {
			render: render,
			searchShortcuts: searchShortcuts
		};

	})();

	// Reset everything
	var reset = function () {
		selectedSection = -1;
		selectedShortcut = -1;		
		currentShortcutSections = JSON.parse(JSON.stringify(config.get('shortcutSections', [])));
		shortcuts.render();	
	};

	// Search either in shortcuts or use third party queries.
	var performSearch = function () {
		var query = elSearch.value;
		if (query.length > 0) {
			shortcuts.searchShortcuts(query);
			if (currentShortcutSections.length > 0) {
				selectedSection = 0;
				selectedShortcut = 0;
			} else {
				selectedSection = -1;
				selectedShortcut = -1;	
			}
			shortcuts.render();	
		} else {
			reset();
		}
	};

	// Navigation of selected value
	var move = function (amount) {
		if (currentShortcutSections.length === 0) return;
		if (selectedSection === -1) selectedSection = 0;
		selectedShortcut += amount;
		console.log(selectedShortcut);
		if (selectedShortcut > currentShortcutSections[selectedSection].shortcuts.length - 1) {
			selectedShortcut = 0;
			selectedSection = (selectedSection + 1) % currentShortcutSections.length;
		}
		if (selectedShortcut < 0) {
			selectedSection = (selectedSection === 0) ? currentShortcutSections.length - 1 : selectedSection - 1;
			selectedShortcut = currentShortcutSections[selectedSection].shortcuts.length - 1;
		}
		shortcuts.render();
	};

	// Go to current targeted url
	var go = function () {
		if (selectedSection > -1 && selectedShortcut > -1) {
			window.location.href = currentShortcutSections[selectedSection].shortcuts[selectedShortcut].url;
		}
	};

	// Fired when key down is performed on the search input field.
	var searchOnKeyUpListener = function (e) {
		switch (e.key) {
			case 'Enter':
				return;
			case 'ArrowUp': // up
				return;
			case 'ArrowDown': // down
				return;
		}
		performSearch();
	};

	var documentOnKeyDownListener = function (e) {
		switch (e.key) {
			case 'Enter':
				go();
				break;
			case 'ArrowUp': // up
				move(-1);
				break;
			case 'ArrowDown': // down
				move(1);
				break;
		}
		return;
	};

	// Set all click and key listeners		
	var setupListeners = function() {
		elToggleDarkMode.addEventListener('click', toggleDarkMode);
		elSearch.addEventListener('keyup', searchOnKeyUpListener);
		document.addEventListener('keydown', documentOnKeyDownListener);
	};

	// Initialization
	var init = function () {
		// Set right theme
		if (config.get('darkMode')) {
			elBody.classList.toggle('dark-mode');
		}

		// Start the clock and do a fast update first.
		updateClock();
		setInterval(updateClock, 1000);

		// Start the date and do a fast update first.
		updateDate(); 
		setInterval(updateDate, 1000);

		// View shortcut sections
		currentShortcutSections = JSON.parse(JSON.stringify(config.get('shortcutSections', [])));
		shortcuts.render();

		// Focus on search input
		elSearch.focus();

		// Add on event listeners of elements
		setupListeners();
	};

	init();
})();