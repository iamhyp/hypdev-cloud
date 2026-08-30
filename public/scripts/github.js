/*
 * Fills the live figures under the tech stack from /api/github.
 *
 * The strip ships hidden and is only revealed once real numbers arrive.
 * A visitor with JavaScript off, a failed request, a rate-limited API or
 * a malformed response all land in the same place: the strip simply is
 * not there. Nothing renders a spinner, a dash, or a zero, because a
 * page claiming live data and then showing "0 repositories" is worse
 * than a page that never made the claim.
 */
(function () {
	var root = document.querySelector('[data-live]');
	if (!root || typeof fetch !== 'function') return;

	function setValue(selector, value) {
		var node = root.querySelector(selector);
		if (node) node.textContent = value;
	}

	function relativeDays(iso) {
		if (!iso) return null;
		var then = Date.parse(iso);
		if (isNaN(then)) return null;
		var days = Math.floor((Date.now() - then) / 86400000);
		if (days <= 0) return 'today';
		if (days === 1) return 'yesterday';
		if (days < 30) return days + ' days ago';
		var months = Math.round(days / 30);
		if (months === 1) return 'last month';
		if (months < 12) return months + ' months ago';
		var years = Math.round(months / 12);
		return years === 1 ? 'last year' : years + ' years ago';
	}

	fetch('/api/github', { headers: { Accept: 'application/json' } })
		.then(function (response) {
			if (!response.ok) throw new Error('status ' + response.status);
			return response.json();
		})
		.then(function (data) {
			if (typeof data.repos !== 'number' || typeof data.stars !== 'number') {
				throw new Error('unexpected shape');
			}

			var pushed = relativeDays(data.lastPush);
			if (!pushed) throw new Error('no push date');

			setValue('[data-live-repos]', String(data.repos));
			setValue('[data-live-stars]', String(data.stars));
			setValue('[data-live-pushed]', pushed);
			root.hidden = false;
		})
		.catch(function () {
			/* Strip stays hidden. No error is shown to the visitor. */
		});
})();
