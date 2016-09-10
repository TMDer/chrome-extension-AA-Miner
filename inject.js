var addraftParams = "";
var domain = "http://localhost:1337"; // develop
// var domain = "https://adminer.hiiir.com"; // procdution


function changeButtonReviewChanges() {
  var buttonReviewChanges = document.getElementsByClassName("_2yak");
  buttonReviewChanges[0].style.backgroundColor = "red";
  buttonReviewChanges[0].addEventListener("click", function() {
    setTimeout(function() {
      changeButtonContinue();
    }, 1000);
  });
};

function changeButtonContinue() {
  var originButtonContinue = document.getElementsByClassName("selected")[1];
  var createDom = document.createElement("button");
  var parentDom = originButtonContinue.parentNode;
  createDom.id = "updatefromPE";
  createDom.innerText = "AA Miner Continue"
  createDom.style.display = "inline-block";
  originButtonContinue.style.display = "none";
  parentDom.appendChild(createDom);
  createDom.addEventListener("click", requestAddraftParams);
};

function requestAddraftParams() {
  chrome.runtime.sendMessage("addraftParams", function(data) {
    addraftParams = data.response;
    sendAAMinerAPI(addraftParams);
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
    }
    else if(statusDone === "failed") {
      alert(msgDone.message + " 更新失敗！");
    }
  })
  .fail(function() {
    alert("伺服器出現錯誤，請稍候再試！");
  });
};

setTimeout(function() {
  changeButtonReviewChanges();
}, 15000);
