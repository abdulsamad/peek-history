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
			const value = this.value;
			document.body.style.fontFamily = value;
			chrome.storage.sync.set({ font: value });
			location.reload();
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

/* Hide URL from Popup */
document.querySelector('#hideURL').addEventListener(
	'click',
	function() {
		if (this.checked === true) {
			// Checked
			chrome.storage.sync.set({ hideURL: true });
		} else {
			// Unchecked
			chrome.storage.sync.set({ hideURL: false });
		}
	},
	false,
);

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
		const body = document.querySelector('#excluded-entries-body');
		let inpVal = document.querySelector('#excludeInput').value;

		if (inpVal !== '') {
			const url = new URL(inpVal);
			const filteredUrl = `*://${url.host}${url.pathname}*`;

			chrome.storage.sync.get('excludedObj', obj => {
				if (obj.excludedObj.excludedUrlArr === undefined) {
					chrome.storage.sync.set({ excludedObj: { excludedUrlArr: [inpVal], filteredArr: [filteredUrl] } });
				} else {
					if (obj.excludedObj.excludedUrlArr.includes(inpVal)) {
						// Check Array for duplicacy
						alert('Are Bhaiyya pehle se hai wo to');
					} else {
						// Update Array in Chrome Storage
						(function(arr) {
							arr.excludedUrlArr.push(inpVal);
							arr.filteredArr.push(filteredUrl);
							chrome.storage.sync.set({
								excludedObj: arr,
							});
						})(obj.excludedObj);

						// Reloading the Window
						location.reload();
					}
				}
			});
		} else {
			alert('Enter a Valid Web Address!');
		}
		document.querySelector('#excludeInput').value = '';
	},
	false,
);

// Event Delegation for Exclude URL
// document.querySelector('#excluded-entries-body').addEventListener(
// 	'click',
// 	function(ev) {
// 		if (ev.target.className.includes('remove-excluded-url')) {
// 			ev.target.parentElement.parentElement.remove();
// 		}
// 	},
// 	false,
// );

// Delete All Excluded URL's
document.querySelector('#deleteAllExcluded').addEventListener('click', function() {
	chrome.storage.sync.remove('excludedObj');
	location.reload();
});
