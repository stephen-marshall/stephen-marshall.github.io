const iframe = document.createElement('iframe');
iframe.id = 'config-iframe';
document.body.append(iframe);

let iframeWindow = iframe.contentWindow,
    iframeDoc = iframeWindow.document;

iframeWindow.getConfig = (config) => {
  iframeWindow.postMessage('config', config);
}

let script = iframeDoc.createElement('script');
// script.onload = iframeWindow.getConfig;
script.src = 'https://stephen-marshall.github.io/config.js';

iframeDoc.head.appendChild(script);

window.addEventListener('message', message => {
    if (message.source !== iframeWindow) {
        return;
    }
    console.log(message.data);
}, false);
