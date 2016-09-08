var addraftParams = "";
var domain = "http://localhost:1337"; // develop
// var domain = "https://adminer.hiiir.com"; // prodution


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
  createDom.addEventListener("click", sendAAMinerAPI);
};

function handleMessage(request, sender, sendResponse) {
  addraftParams = request.params;
  sendResponse({response: "PE has get current addrafts params!"});
};

function sendAAMinerAPI() {
  $.ajax({
    method: "POST",
    url: domain + "/chromeExtension/updateFromPE",
    data: addraftParams
  })
    .done(function(msgDone) {
      var statusDone = msgDone.status;
      var buttonClose = document.getElementsByClassName("layerCancel")[0];
      if(statusDone = "success") {
        alert("AA Miner Update Success!");
        buttonClose.click();
      }
    })
    .fail(function(msgFail) {
      var statusFail = msgFail.status;
      if(statusFail === "failed") {
        alert("更新失敗！");
      }
      else {
        alert("伺服器出現錯誤，請稍候再試！");
      }
    });
};

chrome.runtime.onMessage.addListener(handleMessage);

setTimeout(function() {
  changeButtonReviewChanges();
}, 15000);

