chrome.runtime.onMessage.addListener((message, sender) => {
	var id = `${sender.tab.id}-${sender.tab.windowId}-${Date.now()}`;

	chrome.notifications.create(id, {
		iconUrl: chrome.extension.getURL('icons/alc-16.png'),
		isClickable: true,
		message: message,
		title: 'Alchemists',
		type: 'basic'
	});
});

chrome.notifications.onClicked.addHandler(id => {
	var [tabId, windowId, _/* creation */] = id.split('-');

	chrome.tabs.update(tabId, {active: true}, () => {
		chrome.windows.update(windowId, {focused: true});
	});
});
