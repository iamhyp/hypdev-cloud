(function () {
	var navToggle = document.getElementById('nav-toggle');
	var navMenu = document.getElementById('nav-menu');

	function closeMenu() {
		navMenu.hidden = true;
		navToggle.setAttribute('aria-expanded', 'false');
	}

	function openMenu() {
		navMenu.hidden = false;
		navToggle.setAttribute('aria-expanded', 'true');
	}

	navToggle.addEventListener('click', function () {
		var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
		if (isOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
			closeMenu();
			navToggle.focus();
		}
	});

	document.addEventListener('click', function (event) {
		var target = event.target;
		// navToggle.contains, not target !== navToggle. The button holds
		// three span bars, so a tap or a mouse click reports one of those
		// as the target and the identity test failed: this handler closed
		// the menu in the same event that opened it, and the menu could
		// only be opened from the keyboard, where the click event targets
		// the button itself.
		if (!navMenu.hidden && !navMenu.contains(target) && !navToggle.contains(target)) {
			closeMenu();
		}
	});

	var desktopQuery = window.matchMedia('(min-width: 860px)');
	desktopQuery.addEventListener('change', function (event) {
		if (event.matches) closeMenu();
	});
})();

(function () {
	var themeToggle = document.getElementById('theme-toggle');

	function labelFor(theme) {
		return theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
	}

	function syncLabel() {
		var current = document.documentElement.getAttribute('data-theme');
		themeToggle.setAttribute('aria-label', labelFor(current));
	}

	syncLabel();

	themeToggle.addEventListener('click', function () {
		var current = document.documentElement.getAttribute('data-theme');
		var next = current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', next);
		try {
			localStorage.setItem('theme', next);
		} catch (e) {}
		syncLabel();
	});
})();
