function changeReviewButton() {
  var buttonReviewChanges = document.getElementsByClassName("selected")[0];
  if(buttonReviewChanges !== undefined) {
    buttonReviewChanges.innerText = "AA Miner Review Changes";
  }
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
  createDom.id = "updateformPE";
  createDom.innerText = "AA Miner Continue"
  createDom.style.display = "inline-block";
  originButtonContinue.style.display = "none";
  parentDom.appendChild(createDom);
};

// Do something after FB loading end
setTimeout(function() {
  changeReviewButton();
}, 15000);

