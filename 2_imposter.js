window.freshchat = (() => {

    // make script self-aware
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts['Freshdesk Messaging-js-sdk'];

    var queryString = myScript.src.replace(/^[^\?]+\??/,'');

    var params = parseQuery( queryString );

    function parseQuery ( query ) {
        var Params = new Object ();
        if ( ! query ) return Params; // return empty object
        var Pairs = query.split(/[;&]/);
        for ( var i = 0; i < Pairs.length; i++ ) {
            var KeyVal = Pairs[i].split('=');
            if ( ! KeyVal || KeyVal.length != 2 ) continue;
            var key = unescape( KeyVal[0] );
            var val = unescape( KeyVal[1] );
            val = val.replace(/\+/g, ' ');
            Params[key] = val;
        }
        return Params;
    }

    // Code starts here:

    var timer = null;
    var initFreshChat = null;

    const iframe = document.createElement('iframe');
    iframe.id = 'config-load-iframe';
    iframe.style.display = 'none';
    document.body.append(iframe);
    
    let iframeWindow = iframe.contentWindow,
        iframeDoc = iframeWindow.document;
    
    let script = iframeDoc.createElement('script');
    script.src = 'https://configdemochecks.s3.us-east-2.amazonaws.com/config.js';
    iframeDoc.head.appendChild(script);

    function handleConfig (message) {
        if (message.source !== iframeWindow) {
            return;
        }

        let data = message.data, config = {};
        config['hideChatButton'] = window?.freshchatSettings?.config?.headerProperty?.hideChatButton || false;
        config['hideMessenger'] = data['hideMessenger'];
        config['backgroundColor'] = window.freshchatSettings?.config?.headerProperty?.backgroundColor || data?.headerProperty?.backgroundColor;
        config['foregroundColor'] = window.freshchatSettings?.config?.headerProperty?.foregroundColor || data?.headerProperty?.foregroundColor || 'white';


        if (!config.hideMessenger) {
          // show the imposter widget
          let content = `
            <div class="__freshdesk_messaging">
                <div id="loading"><div class="flexbox">
                    <div class="dot-loader"></div>
                    <div class="dot-loader"></div>
                    <div class="dot-loader"></div>
                </div>
                </div>
                    <div id="static-bubble" class="d-hotline" onclick="onDemand()">
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
          `.replace(/HEX/g, config.backgroundColor).replace(/FGC/g, config.foregroundColor);
            if (!config['hideChatButton'] && !config['hideMessenger']) {
              var sheet = document.createElement('style')
              sheet.innerHTML = style;
              document.body.appendChild(sheet);
              document.body.insertAdjacentHTML( 'beforeend', content );
            }
        } else {
            if (window.freshchat.timer) {
              clearTimeout(window.freshchat.timer);
            }
        }
    }
    
    window.addEventListener('message', handleConfig);

    function setupFreshchat() {
        window.fcWidget.on("frame:statechange", (data) => {
            if (data && data.data.frameState === "initialized") {
                document.querySelector('.__freshdesk_messaging #static-bubble').style.display = "none";
              if (window.freshchat.alsoOpen) {
                window.fcWidget.open();
              }
              delete window.freshchat;
            }
        });
        window.fcWidget.on("widget:opened", () => {
            document.querySelector('.__freshdesk_messaging #loading').style.visibility = 'hidden';
        });
        if (typeof initFreshChat === 'function') {
            initFreshChat();
        }
    }

    function initialize(initFreshchat) {
        var script;
        initFreshChat = initFreshchat;
        script = document.createElement("script")
        script.async=!0,
        script.src=params.host+'/js/widget.js',
        script.onload=setupFreshchat,
        document.head.appendChild(script);
    }

    function initFreshchatCallback(initFreshchat) {
      // Todo: Timer Error checks
      timeout = timer || 3000;
      // adding the timeout to freshchat gloabl, so that it can be called from the handleConfig onDemand call 
      window.freshchat.initFreshchat = initialize.bind({}, initFreshchat);
      window.freshchat.timer = setTimeout(() => {
        // check if config call is called ? if not wait till it succeeds or fails
        // TODO: update product
        initialize(initFreshchat);
      }, timeout);
    }

    return {
      initAfter: function (timeout) {
        timer = timeout;
        return initFreshchatCallback
      },
      isWidgetBeingLoaded: false
    }
  })();
