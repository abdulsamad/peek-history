/* Global Function */
function blockUrl(details) {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const currentTab = tabs[0].id;
		if (currentTab) {
			chrome.tabs.remove(currentTab);
		}
	});
	chrome.windows.create({ url: details.url, incognito: true });
	return { cancel: true };
}

/* Fetching Excluded URL's on Init */
chrome.storage.sync.get('excludedObj', function(obj) {
	if (obj.excludedObj.filteredArr && obj.excludedObj.filteredArr[0]) {
		chrome.webRequest.onBeforeRequest.addListener(blockUrl, { urls: obj.excludedObj.filteredArr }, ['blocking']);
	}
});

/* Fetching Excluded URL's on Obj Change */
chrome.storage.onChanged.addListener(function() {
	if (chrome.webRequest.onBeforeRequest.hasListener(blockUrl)) {
		chrome.webRequest.onBeforeRequest.removeListener(blockUrl);
	}

	chrome.storage.sync.get('excludedObj', function(obj) {
		if (obj.excludedObj.filteredArr && obj.excludedObj.filteredArr[0]) {
			chrome.webRequest.onBeforeRequest.addListener(blockUrl, { urls: obj.excludedObj.filteredArr }, ['blocking']);
		}
	});
});
