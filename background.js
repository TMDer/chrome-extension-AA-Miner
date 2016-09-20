var currentAddraftsParams = {};
var isLogin = false;
var options = {
  domain: 'localhost'
};
chrome.tabs.onUpdated.addListener(checkUrl);

chrome.cookies.onChanged.addListener(function(data) {
  if(data.cookie.name === "remember_me") {
    if(data.removed === false) {
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }
});

chrome.cookies.getAll(options, function(data) {
  var rememberMeCookie = getRememberMeCookie(data);
  if(rememberMeCookie.length > 0) {
    setIsLogin(true);
    return;
  }
  setIsLogin(false);
});

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
  switch(message) {
    case "requestAdDraftParams":
      sendResponse({response: currentAddraftsParams});
      break;
    case "isLoginStatus":
      sendResponse(isLogin);
      break;
    case "loginSuccess":
      setIsLogin(true);
      sendResponse(isLogin);
      break;
    case "logout":
      setIsLogin(false);
      break;
  }
});

function checkUrl(tabId, changeInfo, tab) {
  if(getDomain(tab.url).toLowerCase() === "business.facebook.com") {
    chrome.browserAction.enable(tabId);
    return;
  }
  chrome.browserAction.disable(tabId);
}

function getDomain(url) {
  var host = "null";
  if(typeof url == "undefined" || null == url)
    url = window.location.href;
  var regex = /.*\:\/\/([^\/]*).*/;
  var match = url.match(regex);
  if(typeof match != "undefined" && null != match)
    host = match[1];
  return host;
}

function getRememberMeCookie(data) {
  return data.filter(function (info) {
    return info.name === "remember_me";
  });
}

function setIsLogin(boolean) {
  isLogin = boolean;
}