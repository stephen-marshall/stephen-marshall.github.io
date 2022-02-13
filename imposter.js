const iframe = document.createElement('iframe');
iframe.id = 'config-load-iframe';
iframe.style.display = 'none';
document.body.append(iframe);

let iframeWindow = iframe.contentWindow,
    iframeDoc = iframeWindow.document;

let script = iframeDoc.createElement('script');
script.src = 'https://configdemochecks.s3.us-east-2.amazonaws.com/config.js';
iframeDoc.head.appendChild(script);

window.addEventListener('message', message => {
    if (message.source !== iframeWindow) {
        return;
    }
    console.log(message.data);
});
