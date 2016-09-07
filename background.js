function getDomain(url){
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
  if(getDomain(tab.url).toLowerCase() == "business.facebook.com"){
    chrome.browserAction.enable(tabId);
  }else {
    chrome.browserAction.disable(tabId);
  }
};

function handleResponse(message) {
  console.log("!!! 901 message from the content script:");
  console.log("!!! 902 " + message.response);
}

function sendMessageToTab(tabs) {
  var params = {
    token: "123",
    business_id: "222",
    ad_id: "333"
  };

  if (tabs.length > 0) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {params: params},
      handleResponse
    );
  }
}

// 只要 tab 更新就會在背景觸發比對網址是不是 "business.facebook.com"，決定要不要啟動 AAminer
chrome.tabs.onUpdated.addListener(checkUrl);

chrome.tabs.onUpdated.addListener(function() {
  chrome.tabs.query({currentWindow: true, active: true},sendMessageToTab);
});
