function initFreshChat() {
  window.fcWidget.init({
    token: "ed4d253d-1d61-4b09-8900-f1f3960c3b81",
    host: "https://wchat.freshchat.com"
  });
}

function initImposter() {
  window.freshchat.initAfter(10000)(initFreshChat.bind());
}

function onDemand() {
  if (!window.freshchat.isWidgetBeingLoaded) {
    document.querySelector('.__freshdesk_messaging #loading').style.visibility = 'visible';
    if (window.freshchat.timer) {
      clearTimeout(window.freshchat.timer)
    }
    window.freshchat.alsoOpen = true;
    window.freshchat.isWidgetBeingLoaded = true;
    window.freshchat.initFreshchat();
  }
}

function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,
e.src="./imposter.js?token=ed4d253d-1d61-4b09-8900-f1f3960c3b81;host=https://wchat.freshchat.com",e.onload=initImposter,i.head.appendChild(e))}

function initiateCall(){initialize(document,"Freshdesk Messaging-js-sdk")}

window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);
