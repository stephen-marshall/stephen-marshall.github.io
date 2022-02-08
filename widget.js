  var initFreshChat = 
(function () {
  'use strict';
  let data;
  let w = window.freshchatSettings;
  let onDemandUntil = w.onDemandUntil || 3000;
  // onload event used - so not advisible to put inside other functions  
  window.addEventListener?window.addEventListener("load",setupFreshchat,!1):window.attachEvent("load",setupFreshchat,!1);

  function setupFreshchat() {
    if (!data) {
      setTimeout(setupFreshchat);
      return;
    }
    if (!data['hideMessenger']) {
      function initiateCall(){initialize(document,w.product+"-js-sdk")}

      initiateCall();

      function initWebWidget() {
          setTimeout(() => {
            initFreshChat();
          },onDemandUntil);
          document.querySelector('.__freshdesk_messaging').style.display = "block";
          window.fcWidget.on("frame:statechange", (data) => {
              if (data && data.data.frameState === "initialized") {
                // setTimeout(() => {
                  document.querySelector('.__freshdesk_messaging #static-bubble').style.display = "none";
                // },1000);
                if (markedOpen) {
                  window.fcWidget.open();
                }
              }
          });
          window.fcWidget.on("widget:opened", (data) => {
              document.querySelector('.__freshdesk_messaging #loading').style.visibility = 'hidden';
          });
      }

      function initialize(i,t) {
        var e;
        i.getElementById(t)?
        initFreshChat():
        (
          (e=i.createElement("script")).id=t,
          e.async=!0,
          e.src=w.host+'/js/widget.js',
          e.onload=initWebWidget,
          i.head.appendChild(e)
        )
      }
    }
  }
  let corsProxy = 'https://cors-anywhere.herokuapp.com';
  let populateUrl = `${corsProxy}/${window.freshchatSettings.host}/app/services/app/webchat/${window.freshchatSettings.token}/config?domain=${btoa(window.location.origin)}`;
  // let populateUrl = `${corsProxy}/https://www.wchat.freshchat.com/app/services/app/webchat/${window.freshchatSettings.token}/config?domain=${btoa('https://wchat.freshchat.com')}`;
  // fetch(`${populateUrl}`, {headers: {'origin': `www.freshworks.com`, 'x-requested-with': `www.freshworks.com`}})
  fetch(`${populateUrl}`, {headers: {'origin': `${window.location.origin}`, 'x-requested-with': `${window.location.origin}`}})
  .then((resp) => resp.json())
  .then((config) => {
  data = config;
  let h = {};
  h['hideChatButton'] = window?.freshchatSettings?.config?.headerProperty?.hideChatButton || false;
  h['hideMessenger'] = data['hideMessenger'];
  h['backgroundColor'] = window.freshchatSettings?.config?.headerProperty?.backgroundColor || data?.headerProperty?.backgroundColor;
  h['foregroundColor'] = window.freshchatSettings?.config?.headerProperty?.foregroundColor || data?.headerProperty?.foregroundColor;

  let content = `
    <div class="__freshdesk_messaging">
        <div id="loading"><div class="flexbox">
            <div class="dot-loader"></div>
            <div class="dot-loader"></div>
            <div class="dot-loader"></div>
        </div>
        </div>
            <div id="static-bubble" class="d-hotline" onclick="initFreshChat(true)">
            <div id="chat-icon">
            </div>
        </div>
    </div>`;
   if(!h?.foregroundColor) h['foregroundColor'] = 'white';  
  let style = `
    .__freshdesk_messaging .d-hotline {
        display: none;
        border-radius: 34px 8px 34px 34px;
        position: fixed !important;
        bottom: 21px;
        box-shadow: 0 5px 4px 0 rgba(0, 0, 0, 0.26) !important;
        color: #fff;
        cursor: pointer;
        display: table;
        position: absolute;
        right: 20px;
        z-index: 3147483602 !important;
        height: 60px;
        width: 60px;
        background-color: HEX !important;
        color: #ffffff !important;
        border-color: transparent HEX transparent transparent;
    }
    .__freshdesk_messaging #chat-icon {
        width: 23px;
        height: 17px;
        border-radius: 6px 6px 6px 2px;
        position: relative;
        background: FGC !important;
        top: 22px;
        left: 19px;
    }
    .__freshdesk_messaging #chat-icon:before {
        border-radius: 2px 2px 2px 2px;
        height: 2px;
        content: "";
        border-top: 10px;
        content: "";
        border-top: 5px;
        background: HEX !important;
        width: 15px;
        position: absolute;
        top: 5px;
        left: 4px;
    }
    .__freshdesk_messaging #chat-icon:after {
        border-radius: 2px 2px 2px 2px;
        height: 2px;
        content: "";
        border-top: 10px;
        content: "";
        border-top: 5px;
        background: HEX !important;
        width: 10px;
        position: absolute;
        top: 10px;
        left: 4px;
    }
    .__freshdesk_messaging #loading {
        visibility: hidden;
        position: absolute;
        bottom: 76px;
        right: 76px;
        min-width: 55px !important;
    }
    .__freshdesk_messaging .flexbox {
        position: fixed;
        opacity: 0.7;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .__freshdesk_messaging .dot-loader {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: HEX !important;
        position: relative;
        -webkit-animation: 1.2s scaleDown ease-in-out infinite;
        animation: 1.2s scaleDown ease-in-out infinite;
    }
    .__freshdesk_messaging .dot-loader:nth-child(2) {
        margin: 0 10px;
        -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
        animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
    }
    .__freshdesk_messaging .dot-loader:nth-child(3) {
        -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.3s;
        animation: 1.2s scaleDown ease-in-out infinite 0.3s;
    }
    @-webkit-keyframes scaleDown {
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    @keyframes scaleDown {
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
`.replace(/HEX/g, h.backgroundColor).replace(/FGC/g, h.foregroundColor);
  if (!h['hideChatButton'] && !h['hideMessenger']) {
    var sheet = document.createElement('style')
    sheet.innerHTML = style;
    document.body.appendChild(sheet);
    document.body.insertAdjacentHTML( 'beforeend', content );
  }
}); 
var init = false;
var markedOpen = false;
return function initFreshChat(alsoOpen = false) {
    if (alsoOpen) {
      document.querySelector('.__freshdesk_messaging #loading').style.visibility = 'visible';
      markedOpen = true;
    }
    if (!init && window.fcWidget && !window.fcWidget.isInitialized()) {
      window.fcWidget.init(window.freshchatSettings);
      init = true;
    }
  }
})();
