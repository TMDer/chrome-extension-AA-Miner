var addraftParams = "";

function changeButtonReviewChanges() {
  var buttonReviewChanges = document.getElementsByClassName("selected")[0];
  buttonReviewChanges.innerText = "AA Miner Review Changes";
  buttonReviewChanges.onclick = function() {
    setTimeout(function() {
      changeButtonContinue();
    }, 3000);
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
  sendResponse({response: "PE has Sent AA Miner API!!!"});
};

// todo: send AA Miner API
function sendAAMinerAPI() {
  var res = JSON.stringify(addraftParams);
  console.log("!!! 905 PE send API" + res);
};

chrome.runtime.onMessage.addListener(handleMessage);

setTimeout(function() {
  changeButtonReviewChanges();
}, 15000);

