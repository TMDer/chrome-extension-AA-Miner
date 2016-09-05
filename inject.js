function changeReviewButton() {

    var buttonReviewChanges = document.getElementsByClassName("selected")[0];

    console.log("!!! buttonReviewChanges", buttonReviewChanges);

    buttonReviewChanges.innerText = "AA Miner Review Changes";

    // change Continue button after review changes
    buttonReviewChanges.onclick = function() {
        setTimeout(function() {
            changeButtonContinue();
            console.log("!!! 000 3sec changeButtonContinue");
        }, 3000);
    };
};

function changeButtonContinue() {

    console.log("!!! 001 create new updateFromPE Dom!");

    var originButtonContinue = document.getElementsByClassName("selected")[1];
    var createDom = document.createElement('button');
    var parentDom = originButtonContinue.parentNode;
    createDom.id = "updateformPE";
    createDom.innerText = "AA Miner Continue"
    createDom.style.display = "inline-block";
    originButtonContinue.style.display = "none";
    parentDom.appendChild(createDom);

    // send AA Miner API
    // sendUpdateFromAAMiner();

    // need to add background.js
    // chrome.runtime.sendMessage('Hello Taiwan');

};

// AA Miner API
function sendUpdateFromAAMiner() {
    chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
        alert(response);
    });

    // send API
};

// Do something after FB loading end
setTimeout(function() {
  console.log("!!! 000 setTimeout 10000");
  changeReviewButton();
}, 15000);
