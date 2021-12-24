var initFreshChat = 
(function () {
  'use strict';
  let w = window.freshchatSettings;
  let content = `
    <div class="__freshdesk_messaging">
        <div id="loading"><div class="flexbox">
            <div class="dot-loader"></div>
            <div class="dot-loader"></div>
            <div class="dot-loader"></div>
        </div>
        </div>
            <div id="static-bubble" class="d-hotline h-btn" onclick="initFreshChat(true)">
            <div id="chat-icon">
            </div>
        </div>
    </div>`;
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
        z-index: 2147483601;
        height: 60px;
        width: 60px;
        color: #ffffff !important;
        border-color: transparent HEX transparent transparent;
    }
    .d-hotline.h-btn {
        background-color: HEX !important;
    }
    .d-hotline.h-btn #chat-icon:before, .d-hotline.h-btn #chat-icon:after {
        background-color: HEX !important;
    }
    .__freshdesk_messaging #chat-icon {
        width: 23px;
        height: 17px;
        border-radius: 6px 6px 6px 2px;
        position: relative;
        background: white;
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
`.replace(/HEX/g, w.background);
  var sheet = document.createElement('style')
  sheet.innerHTML = style;
  document.body.appendChild(sheet);
  document.body.insertAdjacentHTML('beforeend', content);

  function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src=w.host+'/js/widget.js',e.onload=setupFreshchat,i.head.appendChild(e))}function initiateCall(){initialize(document,w.product+"-js-sdk")}window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);

  var markedOpen = false;
  var init = false;
  function setupFreshchat() {
    document.querySelector('.__freshdesk_messaging').style.display = "block";
    setTimeout(() => {
      initFreshChat();
    }, 5000);
    window.fcWidget.on("frame:statechange", (data) => {
        if (data && data.data.frameState === "initialized") {
          document.querySelector('.__freshdesk_messaging #static-bubble').style.display = "none";
          if (markedOpen) {
            window.fcWidget.open();
          }
        }
    });
    window.fcWidget.on("widget:opened", (data) => {
        document.querySelector('.__freshdesk_messaging #loading').style.visibility = 'hidden';
    });
  }
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