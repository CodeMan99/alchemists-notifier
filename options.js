var delay = document.getElementById('delay');
var notifyText = document.getElementById('notify-text');
var save = document.getElementById('save');
var status = document.getElementById('status');

save.addEventListener('click', function() {
	chrome.storage.sync.set({
		delayMS: Number(delay.value) || 7000,
		'notify-text': notifyText.value
	}, () => {
		status.textContent = 'Options saved';
		setTimeout(() => status.textContent = '&nbsp;', 750);
	});
}, false);

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get({
		delayMS: 7000,
		'notify-text': 'It is your turn (%id)'
	}, ({delayMS, 'notify-text': text}) => {
		delay.value = delayMS;
		notifyText.value = text;
	});
}, false);
