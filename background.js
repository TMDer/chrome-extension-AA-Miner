var currentAddraftsParams = {};

function getDomain(url) {
  var host = "null";
  if(typeof url == "undefined" || null == url)
    url = window.location.href;
  var regex = /.*\:\/\/([^\/]*).*/;
  var match = url.match(regex);
  if(typeof match != "undefined" && null != match)
    host = match[1];
  return host;
};

function checkUrl(tabId, changeInfo, tab) {
  if(getDomain(tab.url).toLowerCase() == "business.facebook.com") {
    chrome.browserAction.enable(tabId);
  }else {
    chrome.browserAction.disable(tabId);
  }
};

function handleResponse(message) {
  if(message) {
    // check for content script has get the current_addrafts params
    console.log("message from the content script: " + message.response);
  }
};

function sendMessageToTab(tabs) {
  var params = currentAddraftsParams;
  if(tabs.length > 0) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {params: params},
      handleResponse
    );
  }
};

// 只要 tab 更新就會在背景觸發比對網址是不是 "business.facebook.com"，決定要不要啟動 AAminer
chrome.tabs.onUpdated.addListener(checkUrl);

chrome.tabs.onUpdated.addListener(function() {
  chrome.tabs.query({currentWindow: true, active: true}, sendMessageToTab);
});

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var params = details.url.split("/");
  var urlParams = params[5].split("&");
  var token = urlParams[0].replace("current_addrafts?access_token=", "");
  var businessId = urlParams[2].replace("__business_id=", "");
  var adAccountId = params[4].replace("act_", "");
  currentAddraftsParams.token = token;
  currentAddraftsParams.businessId = businessId;
  currentAddraftsParams.adAccountId = adAccountId;
}, {urls: ["*://graph.facebook.com/*/current_addrafts*"]}, ["blocking", "requestHeaders"]);
