/*
function blockRequest(details) {
	return { cancel: true };
}

function updateFilters() {
	if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest))
		chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
	chrome.webRequest.onBeforeRequest.addListener(
		blockRequest,
		{ urls: ['*://google.com/*', '*://*.facebook.com/*', '*://twitter.com/*'] },
		['blocking'],
	);
}
*/
/* Open Excluded Links in New Incognito Tab */
(function() {
	// prettier-ignore
	if (chrome.webRequest.onBeforeRequest.hasListener((details) => { cancel: true }))
	chrome.webRequest.onBeforeRequest.removeListener((details) => { cancel: true });
	chrome.webRequest.onBeforeRequest.addListener(
		// prettier-ignore
		(details) => {
			chrome.windows.create({url: details.url, incognito: true});
			return {cancel: true}
		},
		{ urls: ['*://google.com/*', '*://*.facebook.com/*', '*://twitter.com/*'] },
		['blocking'],
	);
})();
