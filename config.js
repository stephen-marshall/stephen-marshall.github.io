fetch('https://configdemochecks.s3.us-east-2.amazonaws.com/config-data.json')
.then((data) => data.json())
.then((data) => {
  window.parent.postMessage(data);
});
