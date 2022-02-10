fetch('https://stephen-marshall.github.io/config-data.json')
.then((data) => {
  iframeWindow.getConfig(data);
});
