/*
 * Honour prefers-reduced-motion for post video.
 *
 * Browsers autoplay muted video regardless of the reduced-motion
 * preference, so the preference has to be applied here. The poster frame
 * stays and controls appear, so a reader who asked for less motion still
 * has the choice to play it.
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
		video.removeAttribute('autoplay');
		video.setAttribute('controls', '');
		video.pause();
	});
})();
