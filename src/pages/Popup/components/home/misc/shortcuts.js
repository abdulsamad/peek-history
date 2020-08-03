const hotkeys = {
	search: 's',
	home: 'ArrowLeft',
	tabs: 'ArrowRight',
	options: 'o',
	deleteAll: 'd',
	listUp: 'ArrowUp',
	listDown: 'ArrowDown',
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

function shortcutFunc({ ev, activeTabNum, linkFocusNum, tabFocusNum }) {
	if (ev.ctrlKey) {
		ev.preventDefault();
	}

	const accordions = document.querySelectorAll('.accordion');
	const tablinks = document.querySelectorAll('.link');
	const links = document.querySelectorAll('.link');

	switch (ev.key) {
		case ev.ctrlKey && hotkeys.search:
			document.querySelector('.search').focus();
			break;

		case ev.ctrlKey && hotkeys.home:
			document.querySelector('.home').click();
			break;

		case ev.ctrlKey && hotkeys.tabs:
			document.querySelector('.tabs').click();
			break;

		case ev.ctrlKey && hotkeys.options:
			document.querySelector('.options').click();
			break;

		case ev.ctrlKey && hotkeys.deleteAll:
			document.querySelector('.deleteAll').click();
			break;

		case hotkeys.listUp:
			if (activeTabNum === 0) {
				const prevFocusNum = linkFocusNum.prev().value;

				if (links[prevFocusNum]) links[prevFocusNum].focus();
			} else {
				const prevFocusNum = tabFocusNum.prev().value;

				if (prevFocusNum === 0) {
					accordions.forEach((accordion) => {
						accordion.click();
					});

					tabFocusNum.reset();
				}

				if (tablinks[prevFocusNum]) tablinks[prevFocusNum].focus();
			}
			break;

		case hotkeys.listDown:
			if (activeTabNum === 0) {
				const nextFocusNum = linkFocusNum.next().value;

				if (!links[nextFocusNum]) linkFocusNum.prev();

				if (links[nextFocusNum]) links[nextFocusNum].focus();
			} else {
				const nextFocusNum = tabFocusNum.next().value;

				if (nextFocusNum === 0) {
					accordions.forEach((accordion) => {
						accordion.click();
					});
				}

				if (!tablinks[nextFocusNum]) tabFocusNum.prev();

				if (tablinks[nextFocusNum]) tablinks[nextFocusNum].focus();
			}
			break;

		case ev.ctrlKey && hotkeys.one:
			if (activeTabNum === 0) {
				links[0].click();
			} else {
				tablinks[0].click();
			}
			break;

		case ev.ctrlKey && hotkeys.two:
			if (activeTabNum === 0) {
				links[1].click();
			} else {
				tablinks[1].click();
			}
			break;

		case ev.ctrlKey && hotkeys.three:
			if (activeTabNum === 0) {
				links[2].click();
			} else {
				tablinks[2].click();
			}
			break;

		case ev.ctrlKey && hotkeys.four:
			if (activeTabNum === 0) {
				links[3].click();
			} else {
				tablinks[3].click();
			}
			break;

		case ev.ctrlKey && hotkeys.five:
			if (activeTabNum === 0) {
				links[4].click();
			} else {
				tablinks[4].click();
			}
			break;

		case ev.ctrlKey && hotkeys.six:
			if (activeTabNum === 0) {
				links[5].click();
			} else {
				tablinks[5].click();
			}
			break;

		case ev.ctrlKey && hotkeys.seven:
			if (activeTabNum === 0) {
				links[6].click();
			} else {
				tablinks[6].click();
			}
			break;

		case ev.ctrlKey && hotkeys.eight:
			if (activeTabNum === 0) {
				links[7].click();
			} else {
				tablinks[7].click();
			}
			break;

		case ev.ctrlKey && hotkeys.nine:
			if (activeTabNum === 0) {
				links[8].click();
			} else {
				tablinks[8].click();
			}
			break;

		default:
			return false;
	}
}

export default shortcutFunc;
