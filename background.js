var currentAddraftsParams = {};
var isLogin = false;
var options = {
  domain : 'localhost';
};
chrome.tabs.onUpdated.addListener(checkUrl);
chrome.cookies.getAll(options, function(data) {
  var rememberMeCookie = data.filter(
    function (info) {
      return info.name === "remember_me";
    });
  if(rememberMeCookie.length > 0) {
    isLogin = true;
    return;
  }
  isLogin = false;
});

function checkUrl(tabId, changeInfo, tab) {
  if(getDomain(tab.url).toLowerCase() === "business.facebook.com") {
    chrome.browserAction.enable(tabId);
    return;
  }
  chrome.browserAction.disable(tabId);
};

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

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var params = details.url.split("/");
  var urlParams = params[5].split("&");
  var token = urlParams[0].replace("current_addrafts?access_token=", "");
  var businessId = urlParams[2].replace("__business_id=", "");
  var adAccountId = params[4].replace("act_", "");
  currentAddraftsParams.peAccessToken = token;
  currentAddraftsParams.businessId = businessId;
  currentAddraftsParams.adAccountId = adAccountId;
}, {urls: ["*://graph.facebook.com/*/current_addrafts*"]}, ["blocking", "requestHeaders"]);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message){
    case "requestAdDraftParams":
      sendResponse({response: currentAddraftsParams});
      break;
    case "checkRememberMe":
      sendResponse(isLogin);
      break;
    case "loginSuccess":
      sendResponse(isLogin);
      break;
    case "logout":
      isLogin = false;
      break;
    case "inject":
      sendResponse(isLogin);
      break;
  }
});
