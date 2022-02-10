fetch('https://stephen-marshall.github.io/config-data.json')
.then((data) => data.JSON())
.then((data) => {
  iframeWindow.getConfig(data);
});
