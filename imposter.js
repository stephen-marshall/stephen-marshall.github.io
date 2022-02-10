const iframe = document.createElement('iframe');
iframe.id = 'config-load-iframe';
document.body.append(iframe);

let iframeWindow = iframe.contentWindow,
    iframeDoc = iframeWindow.document;

let script = iframeDoc.createElement('script');
script.src = 'https://stephen-marshall.github.io/config.js';
iframeDoc.head.appendChild(script);

window.addEventListener('message', message => {
    if (message.source !== iframeWindow) {
        return;
    }
    console.log(message.data);
});
