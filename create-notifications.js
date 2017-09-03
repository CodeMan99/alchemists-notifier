chrome.runtime.onMessage.addListener(message => {
	chrome.notifications.create(null, {
		type: 'basic',
		iconUrl: chrome.extension.getURL('alc-16.png'),
		title: 'Alchemists',
		message: message
	});
});
