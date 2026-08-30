/*
 * Reveals sections as they enter the viewport.
 *
 * Three guarantees, in order of importance:
 *
 * 1. Without JavaScript nothing here runs, and because the hiding class
 *    is added by this script rather than by the stylesheet, every
 *    section is visible from the start.
 * 2. Anything already on screen at load is revealed on the next frame
 *    from its own rectangle, without waiting on the observer.
 * 3. If the observer produces no callbacks at all within a second, it is
 *    abandoned for a plain scroll listener. This is not theoretical: a
 *    freshly constructed IntersectionObserver was observed returning no
 *    callbacks whatsoever in one embedded browser during development.
 *    An effect that can hide a page's content must not depend on a
 *    single API behaving.
 */
(function () {
	var targets = document.querySelectorAll('[data-reveal]');
	if (!targets.length) return;

	var reduced =
		window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced) return;

	var items = Array.prototype.slice.call(targets);
	var pending = items.slice();

	items.forEach(function (el) {
		el.classList.add('reveal-pending');
	});

	function reveal(el) {
		el.classList.add('is-revealed');
		var i = pending.indexOf(el);
		if (i !== -1) pending.splice(i, 1);
	}

	function revealVisible() {
		var limit = window.innerHeight * 0.92;
		pending.slice().forEach(function (el) {
			if (el.getBoundingClientRect().top < limit) reveal(el);
		});
	}

	function useScrollFallback() {
		revealVisible();
		window.addEventListener('scroll', revealVisible, { passive: true });
		window.addEventListener('resize', revealVisible, { passive: true });
	}

	if (!('IntersectionObserver' in window)) {
		useScrollFallback();
		return;
	}

	var observerFired = false;

	var observer = new IntersectionObserver(
		function (entries) {
			observerFired = true;
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				reveal(entry.target);
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
	);

	items.forEach(function (el) {
		observer.observe(el);
	});

	// Whatever is on screen at load does not wait for the observer.
	requestAnimationFrame(function () {
		pending.slice().forEach(function (el) {
			if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
				reveal(el);
				observer.unobserve(el);
			}
		});
	});

	// If the observer never reported anything, stop trusting it.
	window.setTimeout(function () {
		if (observerFired) return;
		observer.disconnect();
		useScrollFallback();
	}, 1000);
})();
