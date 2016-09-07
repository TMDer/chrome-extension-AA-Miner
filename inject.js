var addraftParams = "";
var domain = "http://localhost:1337"; // develop
// var domain = "http://adminer.hiiir.com"; // prodution


function changeButtonReviewChanges() {
  var buttonReviewChanges = document.getElementsByClassName("selected")[0];
  buttonReviewChanges.innerText = "AA Miner Review Changes";
  buttonReviewChanges.onclick = function() {
    setTimeout(function() {
      changeButtonContinue();
    }, 1000);
  };
};

function changeButtonContinue() {
  var originButtonContinue = document.getElementsByClassName("selected")[1];
  var createDom = document.createElement('button');
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
  sendResponse({response: "PE has get current addrafts params!!!"});
};

function sendAAMinerAPI() {
  var par = {
    peAccessToken: "EAABsbCS1iHgBABTVzhvTHxeid9Hsa2NIMNclcoPQ8jEW10QpST0RqJZAvyzNYYB9XjeWaqy4AsEYOoo3fOCXjKb1JKiv2z8AHUILAZAgTYO7aNbNMZCS5xZAlRRiHS10p7QoOPEtT9PZCvpWU4U0xmwt6xVt4ukEZD",
    businessId: "658875397530836",
    adAccountId: "1380410268871704"
  };
  $.ajax({
    method: "POST",
    url: "http://localhost:1337/chromeExtension/updateFromPE"
    // data: addraftParams
    // data: par
  })
    .success(function(msg) {
      alert("!!! Data Saved :: " + msg);
    })
    .fail(function(msg) {
      var rrr = JSON.stringify(msg, null, 2);
      alert("AA Miner 出現小小小問題囉！ 請稍候再試:: " + rrr);
    });
};

chrome.runtime.onMessage.addListener(handleMessage);

setTimeout(function() {
  changeButtonReviewChanges();
}, 15000);

