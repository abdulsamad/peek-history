/* Shortcut Keys */

const hotkeys = {
	search: 's',
	home: 'ArrowLeft',
	tabs: 'ArrowRight',
	options: 'o',
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

/* Iterator */

function iteratorFunc(start = 0, end = Infinity, resetVal = 0) {
	let index = start;

	return {
		reset: () => (index = resetVal),
		prev: () => (index > 0 ? { value: --index, done: false } : { value: index, done: true }),
		next: () => (index < end ? { value: ++index, done: false } : { value: index, done: true }),
	};
}

const linkNum = iteratorFunc(-1, Infinity, -1);

/* Main */

function shortcutFunc(ev) {
	const accordions = document.querySelectorAll('.accordion');
	const links = document.querySelectorAll('.link');

	if (ev.key !== 'Tab') ev.preventDefault();

	switch (ev.key) {
		case hotkeys.search:
			document.querySelector('.search').focus();
			break;

		case hotkeys.home:
			document.querySelector('.home').click();
			break;

		case hotkeys.tabs:
			document.querySelector('.tabs').click();
			break;

		case hotkeys.options:
			document.querySelector('.options').click();
			break;

		case hotkeys.listUp:
			const prevFocusNum = linkNum.prev().value;

			if (prevFocusNum === 0) {
				accordions.forEach((accordion) => {
					accordion.click();
				});

				linkNum.reset();
			}

			if (links[prevFocusNum]) links[prevFocusNum].focus();
			break;

		case hotkeys.listDown:
			const nextFocusNum = linkNum.next().value;

			if (nextFocusNum === 0) {
				accordions.forEach((accordion) => {
					accordion.click();
				});
			}

			if (!links[nextFocusNum]) linkNum.prev();

			if (links[nextFocusNum]) links[nextFocusNum].focus();
			break;

		case hotkeys.one:
			links[0].click();
			break;

		case hotkeys.two:
			links[1].click();
			break;

		case hotkeys.three:
			links[2].click();
			break;

		case hotkeys.four:
			links[3].click();
			break;

		case hotkeys.five:
			links[4].click();
			break;

		case hotkeys.six:
			links[5].click();
			break;

		case hotkeys.seven:
			links[6].click();
			break;

		case hotkeys.eight:
			links[7].click();
			break;

		case hotkeys.nine:
			links[8].click();
			break;

		default:
			return false;
	}
}

export default shortcutFunc;
