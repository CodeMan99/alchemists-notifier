var TXT_ALC_ACTION_ATTENDRE;
var gameId;
var message;
var prevText;
var path = 'alc-notifier.js';
var alcNotifier = document.createElement('script');
var startInterval = () => {
	chrome.storage.sync.get('delayMS', ({delayMS}) => {
		alcNotifier.dispatchEvent(new CustomEvent('alc-interval', {
			detail: {
				action: 'start',
				delayMS: delayMS || 7000
			}
		}));
	});
}
var stopInterval = () => alcNotifier.dispatchEvent(new CustomEvent('alc-interval', {
	detail: {
		action: 'stop'
	}
}));
var mutation = new MutationObserver(() => {
	var text = message.textContent;

	if (prevText == text) {
		return;
	}

	if (prevText == TXT_ALC_ACTION_ATTENDRE) {
		stopInterval();
		chrome.storage.sync.get('notify-text', ({'notify-text': notifyText}) => {
			chrome.runtime.sendMessage(null, notifyText ? notifyText.replace('%id', gameId) : 'It is your turn (' + gameId + ')');
		});
	} else if (text == TXT_ALC_ACTION_ATTENDRE) {
		startInterval();
	}

	prevText = text;
});
var ready = event => {
	// listen to this event only once
	alcNotifier.removeEventListener('alc-notifier-ready', ready, false);

	TXT_ALC_ACTION_ATTENDRE = event.detail['waiting-text'];
	gameId = event.detail['game-id'];
	message = document.getElementById('message');
	if (message == null) return;
	prevText = message.textContent;

	mutation.observe(message, {
		attributes: false,
		characterData: true,
		childList: true
	});

	if (prevText == TXT_ALC_ACTION_ATTENDRE) {
		startInterval();
	}
};

alcNotifier.addEventListener('alc-notifier-ready', ready, false);

alcNotifier.async = true;
alcNotifier.id = path.replace(/\.js$/, '');
alcNotifier.src = chrome.extension.getURL(path);
alcNotifier.type = 'text/javascript';

document.body.appendChild(alcNotifier);
