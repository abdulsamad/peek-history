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

/* Popup Height */
document.querySelector('#popup-height').addEventListener(
	'change',
	function(ev) {
		chrome.storage.sync.set({ popupHeight: ev.target.value });
	},
	false,
);

document.querySelector('#set-default-height').addEventListener(
	'click',
	function(ev) {
		chrome.storage.sync.set({ popupHeight: '495' });
	},
	false,
);

/* Popup Width */
document.querySelector('#popup-width').addEventListener(
	'change',
	function(ev) {
		chrome.storage.sync.set({ popupWidth: ev.target.value });
	},
	false,
);

document.querySelector('#set-default-width').addEventListener(
	'click',
	function(ev) {
		chrome.storage.sync.set({ popupWidth: '400' });
	},
	false,
);

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
		chrome.permissions.request(
			{
				permissions: ['tabs', 'webRequestBlocking', 'webRequest'],
				origins: ['http://*/*', 'https://*/*'],
			},
			granted => {
				if (granted) {
					if (this.checked === true) {
						// Checked
						container.classList.remove('hide');
						chrome.storage.sync.set({ incognito: true });
					} else {
						// Unchecked
						container.classList.add('hide');
						chrome.storage.sync.set({ incognito: false });
					}
				} else {
					this.checked = false;
					container.classList.add('hide');
					chrome.storage.sync.set({ incognito: false });
				}
			},
		);
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
					chrome.storage.sync.set({ excludedObj: { excludedUrlArr: [url.href], filteredArr: [filteredUrl] } });
				} else {
					if (obj.excludedObj.excludedUrlArr.includes(url.href)) {
						// Check Array for duplicacy
						M.Toast.dismissAll();
						M.toast({ html: 'URL already added' });
					} else {
						// Update Array in Chrome Storage
						(function(arr) {
							arr.excludedUrlArr.push(url.href);
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
			M.Toast.dismissAll();
			M.toast({ html: 'Please enter a valid address' });
		}
		document.querySelector('#excludeInput').value = '';
	},
	false,
);

// Event Delegation for Exclude URL
document.querySelector('#excluded-entries-body').addEventListener(
	'click',
	function(ev) {
		if (ev.target.className.includes('remove-excluded-url')) {
			// prettier-ignore
			document.querySelector('#modalPara').innerHTML = `URL: <a href="${ev.target.parentElement.parentElement.querySelector('.excluded-url').innerText}">${ev.target.parentElement.parentElement.querySelector('.excluded-url').innerText}</a>`;

			document.querySelector('#confirmedDelete').onclick = () => {
				const url = new URL(ev.target.parentElement.parentElement.querySelector('.excluded-url').innerText);
				const filteredUrl = `*://${url.host}${url.pathname}*`;
				chrome.storage.sync.get('excludedObj', obj => {
					(function(arr) {
						const excludedUrlArr = arr.excludedUrlArr.filter(val => url.href !== val);
						const filteredArr = arr.filteredArr.filter(val => filteredUrl !== val);
						arr.filteredArr.push(filteredUrl);
						chrome.storage.sync.set({
							excludedObj: { excludedUrlArr, filteredArr },
						});
					})(obj.excludedObj);
				});
			};
		}
	},
	false,
);

// Delete All Excluded URL's
document.querySelector('#deleteAllExcluded').addEventListener('click', function() {
	// prettier-ignore
	document.querySelector('#modalPara').innerHTML = `Are you sure you want to delete all excluded websites?`;

	document.querySelector('#confirmedDelete').onclick = () => {
		chrome.storage.sync.remove('excludedObj');
		chrome.storage.sync.set({ excludedObj: {} });
		location.reload();
	};
});
