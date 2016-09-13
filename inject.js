var requestAdDraftParams = "";
var domain = "http://localhost:1337";
var pluginEnableStatus = false;

function changeButtonReviewChanges() {
  var buttonReviewChanges = document.getElementsByClassName("_2yak");
  buttonReviewChanges[0].style.backgroundColor = "red";
  buttonReviewChanges[0].addEventListener("click", function() {
    setTimeout(function() {
      changeButtonContinue();
    }, 1500);
  });
};

function changeButtonContinue() {
  var originButtonContinue = document.getElementsByClassName("selected")[1];
  var createDom = document.createElement("button");
  var parentDom = originButtonContinue.parentNode;
  createDom.id = "updatefromPE";
  createDom.innerText = "AA Miner Continue";
  createDom.style.display = "inline-block";
  originButtonContinue.style.display = "none";
  parentDom.appendChild(createDom);
  createDom.addEventListener("click", requestAddraftParams);
};

function requestAddraftParams() {
  chrome.runtime.sendMessage("requestAdDraftParams", function(data) {
    requestAdDraftParams = data.response;
    sendAAMinerAPI(requestAdDraftParams);
  });
};

function sendAAMinerAPI(data) {
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
    }
  })
  .fail(function() {
    alert("伺服器出現錯誤，請稍候再試！");
  });
};

setInterval(function() {
  chrome.runtime.sendMessage("inject", function(resMsg) {
    if(pluginEnableStatus === false) {
      if(resMsg) {
        pluginEnableStatus = true;
        changeButtonReviewChanges();
      }
    }
  });
}, 15000);
