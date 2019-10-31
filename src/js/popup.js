import 'materialize-css/dist/js/materialize';

// Init Materialize
M.AutoInit();

// Fetch Test
chrome.history.search(
	{
		text: '',
	},
	function(historyItems) {
		console.log(historyItems);
	},
);
