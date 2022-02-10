// fetch('https://stephen-marshall.github.io/config-data.json')
// .then((data) => data.json())
// .then((data) => {
//   window.iframeWindow.getConfig(data);
// });

async function fetchConfig() {
  const response = await fetch('https://stephen-marshall.github.io/config-data.json');
  const config = await response.json();
  return config;
}
fetchConfig().then(config => {
  window.parent.iframeWindow.getConfig(config);
});
