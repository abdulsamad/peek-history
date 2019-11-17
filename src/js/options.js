// console.time('hello');
/* Imports */
// import 'materialize-css/dist/js/materialize';
// import 'materialize-css/js/cash';
// import 'materialize-css/js/component';
// import 'materialize-css/js/global';

// import 'materialize-css/js/dropdown';
// import 'materialize-css/js/forms';
// import 'materialize-css/js/select';
// import 'materialize-css/js/modal';
// import 'materialize-css/js/waves';

/* Load */
window.addEventListener(
	'load',
	function() {
		document.querySelector('.options').classList.remove('hide');
	},
	false,
);

/* Theme */
document.querySelector('#theme').addEventListener(
	'change',
	function(ev) {
		const value = this.value;
		chrome.storage.sync.set({ theme: value });
		if (value === 'default') {
			location.reload();
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
				location.reload();
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
		chrome.storage.sync.set({ sort: this.value });
	},
	false,
);

/* Incognito Switch */
document.querySelector('#incognitoCheckbox').addEventListener(
	'click',
	function() {
		const container = document.querySelector('#excludedEntriesContainer');
		if (this.checked === true) {
			// Checked
			container.classList.remove('hide');
			chrome.storage.sync.set({ incognito: true });
		} else {
			// Unchecked
			container.classList.add('hide');
			chrome.storage.sync.set({ incognito: false });
		}
	},
	false,
);

/* Excluded URL's */
document.querySelector('#exclusionForm').addEventListener(
	'submit',
	function(ev) {
		ev.preventDefault();
		const inpVal = document.querySelector('#excludeInput').value;
		const body = document.querySelector('#excluded-entries-body');
		if (inpVal !== '') {
			const url = new URL(inpVal);
			body.innerHTML += `
			<tr>
				<td class="excluded-url-name">${url.host}</td>
				<td class="excluded-url" title="${inpVal}">${inpVal}</td>
				<td><button class="btn-small remove-excluded-url waves-effect waves-light red accent-4">Remove</button></td>
			</tr>`;
		}
	},
	false,
);

// Event Delegation for Exclude URL
document.querySelector('#excluded-entries-body').addEventListener(
	'click',
	function(ev) {
		if (ev.target.className.includes('remove-excluded-url')) {
			ev.target.parentElement.parentElement.remove();
		}
	},
	false,
);

// console.timeEnd('hello');
