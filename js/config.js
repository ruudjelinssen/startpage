var config = (function() {
	// Deals with storage of configurations.
	// Configurations are stored in the local storage of a browser.

	// Key used to store options for web page in local storage
	var STORAGE_KEY = "startpage-rl-config";

	// Contains the options for this web page
	var config = {};
	
	// Default options
	var defaultOptions = {
		darkMode: true,
		clock: true,
		date: true,
		showSeconds: false,
		shortcutSections: [
			{
				name: 'Social',
				color: 'aqua',
				shortcuts: [
					{
						name: 'Twitter',
						url: 'https://twitter.com/'
					},
					{
						name: 'Instagram',
						url: 'https://www.instagram.com/'
					}
				]
			},
			{
				name: 'Development',
				color: 'yellow',
				shortcuts: [
					{
						name: 'Start page',
						url: '/'
					},
					{
						name: 'Github',
						url: 'https://github.com/'
					},
					{
						name: 'GitLab',
						url: 'https://gitlab.com/'
					}
				]
			},
			{
				name: 'News & Blogs',
				color: 'orange',
				shortcuts: [
					{
						name: 'Hacker News',
						url: 'https://news.ycombinator.com/'
					},
					{
						name: 'Medium',
						url: 'https://medium.com/'
					}
				]
			}
		]
	};

	// Retrieve the options from storage if they exist.
	// If they don't, create them.
	var init = function() {
		var items = window.localStorage.getItem(STORAGE_KEY);
		if (items === null) {
			items = {};
		} else {
			try {
				items = JSON.parse(items);
			} catch(e) {
				console.error(e);
				items = {};
			}
		}
		// Merge defaults with user set.
		options = utils.mergeObjects(defaultOptions, items);

		// Update options to match defaults.
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
	};

	// Update a value
	var set = function(key, value) {
		options[key] = value;
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
	};

	// Get a value
	// Returns `_default` if key does not exist. 
	// If `_default` is not given, it will return `null`.
	var get = function(key, _default) {
		// Set default default value
		if (typeof _default === 'undefined') {
			_default = null;
		}

		if (options.hasOwnProperty(key)) {
			return options[key];
		} else {
			return _default;
		}
	};

	// Set initial options values
	init();

	// Export functions
	return {
		get: get,
		set: set
	};

})();