var aaMinerColor = "rgb(231, 76, 60)";
var url = "https://business.facebook.com/ads/manage/powereditor/*";

function isUndefined(value) {
  return typeof value === "undefined";
}

function removeClass(element, className) {
  element.className = element.className.replace(new RegExp("\\b" + className + "\\b"), "");
}

function addClass(element, className) {
  element.className += className;
  element.disabled = true;
}

function removeMask(element) {
  removeClass(element, "loading-mask");
  element.removeAttribute("disabled");
}

function addMask(element) {
  addClass(element, "loading-mask");
}

function triggerEnableAAChangesBtn(tabId) {
  if(isUndefined(tabId))
    tabId = null;
  chrome.tabs.executeScript(tabId, {code: "enableAAChangesBtn()"});
}

function triggerDisableAAChangesBtn(tabId) {
  if(isUndefined(tabId))
    tabId = null;
  chrome.tabs.executeScript(tabId, {code: "disableAAChangesBtn()"});
}

function triggerAAModeBatch(execFunction) {
  chrome.tabs.query({url: url}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      execFunction(tabs[i].id);
    }
  });
}

function triggerEnableAAChangesBtnByBackground() {
  triggerAAModeBatch(triggerEnableAAChangesBtn);
}

function triggerDisableAAChangesBtnByBackground() {
  triggerAAModeBatch(triggerDisableAAChangesBtn);
}

function isAAMode(peReviewChangesButton) {
  return peReviewChangesButton.style.backgroundColor === aaMinerColor;
}

