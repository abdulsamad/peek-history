/* Global Function */
function blockUrl(details) {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const currentTab = tabs[0].id;
		if (currentTab) chrome.tabs.remove(currentTab);
	});
	chrome.windows.create({ url: details.url, incognito: true });
	return { cancel: true };
}

// Init Blocking
if (chrome.webRequest) {
	chrome.storage.sync.get(['incognito', 'excludedObj'], function ({ excludedObj, incognito }) {
		const { filteredArr } = excludedObj;

		if (excludedObj && filteredArr && filteredArr[0] && incognito === true)
			chrome.webRequest.onBeforeRequest.addListener(blockUrl, { urls: filteredArr }, ['blocking']);
	});
}

// Fetching Excluded URL's on Obj Change
chrome.storage.onChanged.addListener(() => {
	if (chrome.webRequest) {
		if (chrome.webRequest.onBeforeRequest.hasListener(blockUrl))
			chrome.webRequest.onBeforeRequest.removeListener(blockUrl);

		chrome.storage.sync.get(['incognito', 'excludedObj'], function ({ excludedObj, incognito }) {
			const { filteredArr } = excludedObj;

			if (excludedObj && filteredArr && filteredArr[0] && incognito === true)
				chrome.webRequest.onBeforeRequest.addListener(blockUrl, { urls: filteredArr }, [
					'blocking',
				]);
		});
	}
});
