fetch('https://stephen-marshall.github.io/config-data.json')
.then((data) => data.json())
.then((data) => {
  window.parent.postMessage(data);
});
