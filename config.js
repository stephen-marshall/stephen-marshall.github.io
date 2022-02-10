fetch('https://stephen-marshall.github.io/config-data.json')
.then((data) => data.json())
.then((data) => {
  console.log(window);
  iframeWindow.getConfig(data);
});
