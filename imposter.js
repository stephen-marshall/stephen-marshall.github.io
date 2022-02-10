const iframe = document.createElement('iframe');
iframe.id = 'config-iframe';
document.body.append(iframe);

let iframeWindow = iframe.contentWindow,
    iframeDoc = iframeWindow.document;

iframeWindow.getConfig = (config) => {
  iframeWindow.parent.postMessage(config);
}

let script = iframeDoc.createElement('script');
script.src = 'https://stephen-marshall.github.io/config.js';

iframeDoc.head.appendChild(script);

window.iframeWindow = iframeWindow;

window.addEventListener('message', message => {
    if (message.source !== iframeWindow.parent) {
        return;
    }
    console.log(message);
}, false);
