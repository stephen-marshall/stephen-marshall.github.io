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
  console.log(window.iframeWindow);
console.log(window.iframeWindow.getConfig);
});
