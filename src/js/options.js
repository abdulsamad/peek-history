console.time('hello');
/* Imports */
// import 'materialize-css/js/cash';
// import 'materialize-css/js/component';
// import 'materialize-css/js/global';

// import 'materialize-css/js/dropdown';
// import 'materialize-css/js/forms';
// import 'materialize-css/js/select';
// import 'materialize-css/js/modal';
// import 'materialize-css/js/waves';

/* Theme */
document.querySelector('#theme').addEventListener(
	'change',
	function(ev) {
		if (this.value !== 'default') {
			const value = this.value;
			chrome.storage.sync.set({ theme: value });
		}
	},
	false,
);

/* Font */
chrome.fontSettings.getFontList(function(list) {
	const sel = document.querySelector('#font');
	list.forEach(function(value) {
		if (sel.value !== value.displayName) {
			const opt = document.createElement('option');
			opt.appendChild(document.createTextNode(value.displayName));
			opt.value = value.displayName;
			sel.appendChild(opt);
		}
	});

	document.querySelector('#font').addEventListener(
		'change',
		function(ev) {
			document.body.style.fontFamily = this.value;
			if (this.value !== 'default') {
				const value = this.value;
				chrome.storage.sync.set({ font: value });
			}
		},
		false,
	);
	M.FormSelect.init(sel, {});
});

/* Accent Color */
document.querySelectorAll('.accent-btn').forEach(function(elem) {
	elem.addEventListener(
		'click',
		function() {
			document.querySelector('.active').classList.remove('active');
			this.classList.add('active');
			document.documentElement.style.setProperty('--accent', this.dataset.color);
			chrome.storage.sync.set({ accent: this.dataset.color });
		},
		false,
	);
});

/* Sorting */
document.querySelector('#sort').addEventListener(
	'change',
	function() {
		console.log(this.value);
	},
	false,
);

/* Incognito Selection */
document.querySelector('#incognitoCheckbox').addEventListener(
	'click',
	function() {
		const container = document.querySelector('#excludedEntriesContainer');
		if (this.checked === true) {
			// Checked
			container.classList.remove('hide');
		} else {
			// Unchecked
			container.classList.add('hide');
		}
	},
	false,
);

/* Excluded URL's */
document.querySelector('#addExclusion').addEventListener(
	'click',
	function(value) {
		const body = document.querySelector('#excluded-entries-body');
		body.innerHTML += `
		<tr>
			<td>Google</td>
			<td>https://google.com</td>
			<td><button class="btn-small waves-effect waves-light red accent-4">Remove</button></td>
		</tr>`;
	},
	false,
);

console.timeEnd('hello');
