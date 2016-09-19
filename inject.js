var requestAdDraftParams = "";
var domain = "http://localhost:1337";
var aaMinerContinueButton = null;

function initAAMinerReviewChangesBtn() {
  var buttonReviewChanges = document.getElementsByClassName("_2yak");
  if (buttonReviewChanges.length === 0)
    return setTimeout(function() {initAAMinerReviewChangesBtn();}, 5000);

  var buttonReviewChange = buttonReviewChanges[0];
  buttonReviewChange.style.backgroundColor = "#E74C3C";
  buttonReviewChange.addEventListener("click", function() {
    initAAMinerContinueBtn();
  });
}

function initAAMinerContinueBtn() {
  var eles = document.getElementsByClassName("selected");

  if (eles.length < 3)
    return setTimeout(function() {initAAMinerContinueBtn();}, 700);

  var originButtonContinue = eles[2];
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
    removeMask(aaMinerContinueButton);
    if(statusDone === "success") {
      alert("AA Miner Update Success!");
      buttonClose.click();
      location.reload();
    }
    else if(statusDone === "failed") {
      alert(msgDone.message + " 更新失敗！");
    }
  })
  .fail(function() {
    alert("伺服器出現錯誤，請稍候再試！");
  });
}



(function(){

  chrome.runtime.sendMessage("isLoginStatus", function(isLogin) {

    if (!isLogin)
      return;

    initAAMinerReviewChangesBtn();

  });

}());
