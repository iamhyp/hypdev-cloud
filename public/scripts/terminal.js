(function () {
	var commands = [
		'terraform init && terraform plan -out=tfplan',
		'cosign verify --key cosign.pub registry/app:prod',
		'trivy image --severity CRITICAL app:v3',
		'opa eval --data policy/ --input request.json data.allow',
		'kubectl auth can-i --list --namespace production',
		'falco --rules custom_rules.yaml --output-format json',
	];

	var typedEl = document.getElementById('terminal-typed');
	var cursorEl = document.getElementById('terminal-cursor');

	if (!typedEl) return;

	if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
		typedEl.textContent = commands[commands.length - 1];
		if (cursorEl) cursorEl.hidden = true;
		return;
	}

	var TYPE_MS = 45;
	var DELETE_MS = 25;
	var HOLD_MS = 1400;
	var index = 0;

	function type(text, onDone) {
		var i = 0;
		(function step() {
			typedEl.textContent = text.slice(0, i);
			i++;
			if (i <= text.length) {
				setTimeout(step, TYPE_MS);
			} else {
				onDone();
			}
		})();
	}

	function erase(text, onDone) {
		var i = text.length;
		(function step() {
			typedEl.textContent = text.slice(0, i);
			i--;
			if (i >= 0) {
				setTimeout(step, DELETE_MS);
			} else {
				onDone();
			}
		})();
	}

	function cycle() {
		var command = commands[index % commands.length];
		type(command, function () {
			setTimeout(function () {
				erase(command, function () {
					index++;
					cycle();
				});
			}, HOLD_MS);
		});
	}

	cycle();
})();
