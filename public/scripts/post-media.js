/*
 * Honour prefers-reduced-motion for post video.
 *
 * Browsers autoplay muted video regardless of the reduced-motion
 * preference, so the preference has to be applied here. Controls are in
 * the markup for everyone, so a reader who asked for less motion keeps
 * the choice to play it.
 *
 * A static file rather than an Astro component script on purpose. Astro 7
 * renders a component <script> directly into the page, and this site's
 * script-src is 'self' plus one pinned hash with no 'unsafe-inline', so
 * an inline module would be blocked in production while working in
 * development, where no CSP is sent. Served from /scripts it is covered
 * by 'self' and needs no new allowance.
 */
(function () {
	if (!window.matchMedia) return;
	if (!matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	Array.prototype.forEach.call(document.querySelectorAll('.post-media video'), function (video) {
		video.autoplay = false;
		video.removeAttribute('autoplay');
		video.pause();

		/*
		 * This script is deferred, so on a warm cache autoplay can have
		 * begun before it runs, and pausing alone would strand a half
		 * drawn terminal on screen. load() resets the element, which
		 * brings the poster back. The poster is the completed frame, so
		 * a reader who asked for less motion sees the finished state
		 * either way, and play starts from the beginning rather than
		 * from wherever autoplay got to.
		 *
		 * Seeking to the end was the obvious alternative and it is
		 * wrong: the recording fades out over its last half second, so
		 * the final frame is nearly black. The stable completed state
		 * runs from about 13.5s to 15.4s of 15.96s, which is what the
		 * poster was cut from.
		 */
		if (video.readyState > 0) video.load();
	});
})();
