var requestAdDraftParams = "";
var domain = "http://localhost:1337";
var aaMinerContinueButton = null;
var peButtonOriginColor = null;


function getPEReviewChangesButton() {
  return document.getElementsByClassName("_2yak")[0];
}

function disableAAChangesBtn() {
  var peReviewChangesButton = getPEReviewChangesButton();

  if (!isAAMode(peReviewChangesButton))
    return;

  peReviewChangesButton.removeEventListener("click", initAAContinueBtn);
  peReviewChangesButton.style.backgroundColor = peButtonOriginColor;
}

function enableAAChangesBtn() {
  var peReviewChangesButton = getPEReviewChangesButton();

  if (!peReviewChangesButton)
    return setTimeout(enableAAChangesBtn, 3000);

  if(isAAMode(peReviewChangesButton))
      return;

  peButtonOriginColor = peReviewChangesButton.style.backgroundColor;
  peReviewChangesButton.style.backgroundColor = aaMinerColor;
  peReviewChangesButton.addEventListener("click", initAAContinueBtn);
}

function initAAContinueBtn() {
  var elements = document.getElementsByClassName("selected");

  if (elements.length < 3)
    return setTimeout(initAAContinueBtn, 700);

  var originButtonContinue = elements[2];
  var createDom = document.createElement("button");
  var parentDom = originButtonContinue.parentNode;
  createDom.id = "updatefromPE";
  createDom.innerText = "AA Miner Continue";
  createDom.style.display = "inline-block";
  originButtonContinue.style.display = "none";
  parentDom.appendChild(createDom);
  createDom.addEventListener("click", requestAddraftParams);
  aaMinerContinueButton = createDom;
}

function requestAddraftParams() {
  chrome.runtime.sendMessage("requestAdDraftParams", function(data) {
    requestAdDraftParams = data.response;
    sendAAMinerAPI(requestAdDraftParams);
  });
}

function sendAAMinerAPI(data) {
  addMask(aaMinerContinueButton);
  $.ajax({
    method: "POST",
    url: domain + "/chromeExtension/updateFromPE",
    data: data
  })
  .done(function(msgDone) {
    var statusDone = msgDone.status;
    var buttonClose = document.getElementsByClassName("layerCancel")[0];
    if(statusDone === "success") {
      alert("AA Miner Update Success!");
      buttonClose.click();
      location.reload();
    }
    else if(statusDone === "failed") {
      alert(msgDone.message + " 更新失敗！");
      removeMask(aaMinerContinueButton);
    }
  })
  .fail(function() {
    alert("伺服器出現錯誤，請稍候再試！");
    removeMask(aaMinerContinueButton);
  });
}



(function(){

  chrome.runtime.sendMessage("isLoginStatus", function(isLogin) {

    if (!isLogin)
      return;

    enableAAChangesBtn();

  });

}());
