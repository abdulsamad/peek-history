console.time('hello');
/* Theme */

/* Font */
chrome.fontSettings.getFontList(function(list) {
	const sel = document.querySelector('#selectFont');
	list.forEach(function(value) {
		const opt = document.createElement('option');
		opt.appendChild(document.createTextNode(value.displayName));
		opt.value = value.displayName;
		sel.appendChild(opt);
	});
});

/* Accent Color */
document.querySelectorAll('.accent-btn').forEach(function(elem) {
	elem.addEventListener(
		'click',
		function() {
			document.querySelector('.active').classList.remove('active');
			this.classList.add('active');
		},
		false,
	);
});

/* Sorting */

/* Incognito Selection */
document.querySelector('#incognitoCheckbox').addEventListener(
	'click',
	function() {
		const container = document.querySelector('#excludedEntriesContainer');
		if (this.checked === true) {
			// Checked
			console.log('Checked');
			container.classList.remove('hide');
		} else {
			// Unchecked
			console.log('Unchecked');
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
		body.innerHTML += `<tr><td>Google</td><td>https://google.com</td><td><button class="btn-small waves-effect waves-light red accent-4">Remove</button></td></tr>`;
	},
	false,
);

console.timeEnd('hello');
