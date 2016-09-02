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

// 只要 tab 更新就會在背景觸發比對網址是不是 "business.facebook.com"，決定要不要啟動 AAminer
chrome.tabs.onUpdated.addListener(checkUrl);
console.log("!!! background")


chrome.webRequest.onBeforeRequest.addListener(function(details) {

	if(details.url) {
		stringifyDetails = JSON.stringify(details.url);
		console.log("!!! 000webRequestBlocking details" + stringifyDetails);
	}

	if(details.requestBody) {
		requestBodyFormDataQ= JSON.stringify(details.requestBody.formData.q);
		console.log("!!! 111requestBodyFormDataQ" + requestBodyFormDataQ);
	}

}, {urls: ["https://business.facebook.com/ajax/bz"]}, ["requestBody"]);