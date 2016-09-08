var options = {
  domain : 'localhost'
};

chrome.cookies.getAll(options,function(data) {
  var cookies = getCookieForRememberMe(data);
  isRememberMe(cookies);
});

function getCookieForRememberMe(data) {
  return data.filter(
    function (info) {
      return info.name == "remember_me"
    });
}

function isRememberMe(cookies) {
  if(cookies.length > 0) {
    onMessageForCheckRememberMe(true);
  } else {
    onMessageForCheckRememberMe(false);
  }
}

function onMessageForCheckRememberMe(status) {
  chrome.runtime.onMessage.addListener(
    function(request, sender, response) {
      response(status);
    }
  );
}

chrome.tabs.onUpdated.addListener(checkUrl);

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

function checkUrl(tabId, changeInfo, tab) {
  if(getDomain(tab.url).toLowerCase() == "business.facebook.com") {
    chrome.browserAction.enable(tabId);
  } else {
    chrome.browserAction.disable(tabId);
  }
};