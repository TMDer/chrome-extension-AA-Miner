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
console.log("!!! background");

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {

	if(details.url.match("current_addrafts")){
		var params =  details.url.split("/");
		var token = params[5].split("&")[0].replace("current_addrafts?access_token=","");
		var businessId = params[5].split("&")[2].replace("__business_id=","");
		var adAccountId = params[4].replace("act_","");

		console.log("token  : " , token);
		console.log("businessId  : " , businessId);
		console.log("adAccountId  : " , adAccountId);
	}

}, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);