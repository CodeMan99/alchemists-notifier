$(document).ready(() => {
	if (typeof window.reloadBaj === 'undefined') {
		console.error('Alchemists Notifier: reloadBaj is undefined, unable to continue');
		return;
	}

	var gameId = '0';
	var interval;
	var reload = window.reloadBaj;
	var self = document.getElementById('alc-notifier');

	for (var part of window.location.search.slice(1).split('&')) {
		if (part.startsWith('id=')) {
			gameId = part.slice(3);
			break;
		}
	}

	self.addEventListener('alc-interval', event => {
		clearInterval(interval);

		if (event.detail.action == 'start') {
			interval = setInterval(reload, event.detail.delayMS);
		}
	});

	self.dispatchEvent(new CustomEvent('alc-notifier-ready', {
		detail: {
			'game-id': gameId,
			'waiting-text': window.TXT_ALC_ACTION_ATTENDRE
		}
	}));
});
