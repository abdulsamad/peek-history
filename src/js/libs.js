import 'materialize-css/dist/js/materialize';

// Init Materialize
document.addEventListener('DOMContentLoaded', function() {
	M.AutoInit();
});

/* Get All Keys */
chrome.storage.sync.get(null, function(items) {
	// var allKeys = Object.keys(items);
	// console.log(allKeys);
	console.log(items);
});

// Change Theme
function changeTheme(theme) {
	// prettier-ignore
	if (theme === 'dark') {
		document.documentElement.style.setProperty('--color', '#f2f2f2');
		document.documentElement.style.setProperty('--opposite-color', '#fff');
		document.documentElement.style.setProperty('--background-color', '#000');
		document.documentElement.style.setProperty('--options-background-color', '#1f1f1f');
		document.documentElement.style.setProperty('--select-hover-color', '#2f2f2f');
		document.documentElement.style.setProperty('--card-shadow', '0 2px 2px 0 rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12),0 1px 5px 0 rgba(255, 255, 255, 0.2)');
	} else if (theme === 'light') {
		document.documentElement.style.setProperty('--color', '#2f2f2f');
		document.documentElement.style.setProperty('--opposite-color', '#000');
		document.documentElement.style.setProperty('--background-color', '#f5f5f5');
		document.documentElement.style.setProperty('--options-background-color', '#f5f5f5');
		document.documentElement.style.setProperty('--select-hover-color', '#f2f2f2');
		document.documentElement.style.setProperty('--card-shadow', '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)');
	}
}

// Fetch Settings
function fetchSettings() {
	chrome.storage.sync.get(['theme', 'font', 'accent', 'sort', 'incognito'], function(result) {
		// Theme
		if (result.theme !== undefined) {
			const theme = document.querySelector('#theme');
			if (theme) {
				theme.value = result.theme;
				M.FormSelect.init(theme, {});
			}
			changeTheme(result.theme);
		}

		// Font
		if (result.font !== undefined) {
			const sel = document.querySelector('#font');
			if (sel) {
				sel.innerHTML = `<option value="${result.font}">${result.font}</option>`;
				sel.value = result.font;
				M.FormSelect.init(sel, {});
			}
			document.body.style.fontFamily = result.font;
		}

		// Accent
		if (result.accent !== undefined) {
			const accentCollection = document.querySelector('.accent-collection');
			if (accentCollection) {
				document.querySelector('.active').classList.remove('active');
				document.querySelectorAll(`[data-color="${result.accent}"]`)[0].classList.add('active');
			}
			document.documentElement.style.setProperty('--accent', result.accent);
		}

		// Sort
		if (result.sort !== undefined) {
			const sort = document.querySelector('#sort');
			if (sort) {
				sort.value = result.sort;
				M.FormSelect.init(sort, {});
			}
		}

		// Exclude URL's
		if (result.incognito) {
			const container = document.querySelector('#excludedEntriesContainer');
			document.querySelector('#incognitoCheckbox').checked = true;
			container.classList.remove('hide');
		}
	});
}
document.addEventListener('DOMContentLoaded', fetchSettings(), false);
chrome.storage.onChanged.addListener(fetchSettings);
