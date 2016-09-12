chrome.tabs.onUpdated.addListener(checkUrl);

function checkUrl(tabId, changeInfo, tab) {
  if(getDomain(tab.url).toLowerCase() === "business.facebook.com") {
    chrome.browserAction.enable(tabId);
    getAllCookies();
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
}

function getAllCookies() {

  var options = {
    domain : 'localhost'
  };

  chrome.cookies.getAll(options,function(data) {
    var cookies = getCookieForRememberMe(data);
    var rememberMeStatus = isRememberMe(cookies);
    onMessageForCheckRememberMe(rememberMeStatus);
  });
}

function getCookieForRememberMe(data) {
  return data.filter(
    function (info) {
      return info.name === "remember_me"
    });
}

function isRememberMe(cookies) {
  if(cookies.length > 0) {
    return true;
  }
  return false;
}

function onMessageForCheckRememberMe(remeberMeStatus) {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message){
      case "checkRememberMe" :
        sendResponse(remeberMeStatus);
        break;
    }
    return;
  });
}

