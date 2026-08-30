/*
 * The shell on the home page.
 *
 * Design notes, since the obvious version of this is worse than it looks:
 *
 * - The command registry is built from the DOM, not declared here. Every
 *   command's output is rendered into the page by the Astro component and
 *   cloned on demand, so `help`, tab completion and the clickable command
 *   list all derive from the same source and cannot drift apart. This file
 *   contains no copy of the site's content.
 *
 * - There is no artificial latency. No spinner, no staged "processing"
 *   delay. Anyone who has used a real shell notices instantly, and the
 *   people most likely to try this are exactly the people who would.
 *
 * - Tab completion and Up/Down history are the whole point. They are what
 *   separates a terminal from a picture of one.
 *
 * - The input starts disabled in the markup and is enabled here, so a
 *   visitor without JavaScript gets an honestly inert prompt above real,
 *   server-rendered output rather than a box that silently eats input.
 *
 * - Output is a live region and the input is a real labelled <input>, not
 *   a contenteditable div, so this is usable with a screen reader. Most
 *   portfolio terminals are not.
 */
(function () {
	var root = document.getElementById('cli');
	if (!root) return;

	var output = document.getElementById('cli-output');
	var form = document.getElementById('cli-form');
	var input = document.getElementById('cli-input');
	if (!output || !form || !input) return;

	var PROMPT = 'lawal@hypdev:~$';

	// Prototype rows rendered by the component. Cloning these rather than
	// building elements from scratch is what keeps printed lines inside
	// Astro's scoped-CSS attribute; elements from document.createElement
	// carry no scope attribute and come out unstyled.
	var protos = {};
	Array.prototype.forEach.call(document.querySelectorAll('[data-proto]'), function (el) {
		protos[el.getAttribute('data-proto')] = el;
	});

	if (!protos.echo || !protos.line || !protos.keyed) return;

	function build(kind) {
		var node = protos[kind].cloneNode(true);
		node.removeAttribute('data-proto');
		return node;
	}

	// ---- registry, read from the page ----------------------------------

	var registry = {};
	var names = [];

	Array.prototype.forEach.call(document.querySelectorAll('[data-cli-command]'), function (el) {
		var name = el.getAttribute('data-cli-command');
		registry[name] = {
			summary: el.getAttribute('data-cli-summary') || '',
			source: el,
		};
		names.push(name);
	});

	if (!names.length) return;

	var builtins = ['help', 'clear'];
	var completions = names.concat(builtins).sort();

	// ---- output --------------------------------------------------------

	function line(text, className) {
		var p = build('line');
		if (className) p.classList.add(className);
		p.querySelector('.cli-text').textContent = text;
		output.appendChild(p);
		return p;
	}

	function keyedLine(key, text, className) {
		var p = build('keyed');
		if (className) p.classList.add(className);
		p.querySelector('.cli-key').textContent = key;
		p.querySelector('.cli-text').textContent = text;
		output.appendChild(p);
		return p;
	}

	function echo(command) {
		var p = build('echo');
		p.querySelector('.cli-prompt').textContent = PROMPT;
		p.querySelector('.cli-echo-cmd').textContent = command;
		output.appendChild(p);
	}

	function blank() {
		line(' ');
	}

	function scrollToEnd() {
		output.scrollTop = output.scrollHeight;
	}

	// ---- commands ------------------------------------------------------

	function printHelp() {
		line('Available commands:', 'cli-line-muted');
		completions.forEach(function (name) {
			var summary =
				name === 'help'
					? 'this list'
					: name === 'clear'
						? 'clear the screen'
						: registry[name].summary;
			keyedLine(name, summary);
		});
	}

	function run(raw) {
		var command = raw.trim();
		if (!command) {
			echo('');
			return;
		}

		echo(command);

		if (command === 'clear') {
			output.textContent = '';
			return;
		}

		if (command === 'help') {
			printHelp();
			blank();
			return;
		}

		if (Object.prototype.hasOwnProperty.call(registry, command)) {
			var clone = registry[command].source.cloneNode(true);
			while (clone.firstChild) output.appendChild(clone.firstChild);
			blank();
			return;
		}

		line('command not found: ' + command, 'cli-line-error');
		line("Type 'help' for the list.", 'cli-line-muted');
		blank();
	}

	// ---- history and completion ----------------------------------------

	var history = [];
	var cursor = 0;
	var draft = '';

	function complete() {
		var value = input.value.trim();
		if (!value) {
			printHelp();
			blank();
			scrollToEnd();
			return;
		}

		var matches = completions.filter(function (name) {
			return name.indexOf(value) === 0;
		});

		if (!matches.length) return;

		if (matches.length === 1) {
			input.value = matches[0];
			return;
		}

		// Complete as far as every match agrees, then show the options —
		// the same thing a real shell does.
		var prefix = matches[0];
		matches.forEach(function (m) {
			var i = 0;
			while (i < prefix.length && i < m.length && prefix[i] === m[i]) i++;
			prefix = prefix.slice(0, i);
		});

		if (prefix.length > value.length) {
			input.value = prefix;
			return;
		}

		echo(value);
		line(matches.join('   '), 'cli-line-muted');
		blank();
		scrollToEnd();
	}

	// ---- wiring --------------------------------------------------------

	input.disabled = false;
	root.classList.add('cli-ready');

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		var value = input.value;
		if (value.trim()) {
			history.push(value.trim());
			cursor = history.length;
		}
		run(value);
		input.value = '';
		draft = '';
		scrollToEnd();
	});

	input.addEventListener('keydown', function (event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			complete();
			return;
		}

		if (event.key === 'ArrowUp') {
			if (!history.length) return;
			event.preventDefault();
			if (cursor === history.length) draft = input.value;
			cursor = Math.max(0, cursor - 1);
			input.value = history[cursor];
			return;
		}

		if (event.key === 'ArrowDown') {
			if (!history.length) return;
			event.preventDefault();
			cursor = Math.min(history.length, cursor + 1);
			input.value = cursor === history.length ? draft : history[cursor];
			return;
		}

		// Ctrl+L clears, as it does everywhere else.
		if (event.key === 'l' && (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			output.textContent = '';
		}
	});

	Array.prototype.forEach.call(document.querySelectorAll('[data-cli-run]'), function (button) {
		button.addEventListener('click', function () {
			var name = button.getAttribute('data-cli-run');
			history.push(name);
			cursor = history.length;
			run(name);
			scrollToEnd();
			input.focus();
		});
	});

	// Clicking the terminal focuses the prompt, unless the visitor is
	// selecting text or following one of the links in the output.
	root.addEventListener('click', function (event) {
		if (event.target.closest('a, button')) return;
		var selection = window.getSelection();
		if (selection && String(selection).length) return;
		input.focus();
	});
})();
