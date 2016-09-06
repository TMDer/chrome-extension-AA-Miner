function changeReviewButton() {

  var buttonReviewChanges = document.getElementsByClassName("selected")[0];

  buttonReviewChanges.innerText = "AA Miner Review Changes";
}

// Do something after FB loading end
setTimeout(function() {
  changeReviewButton();
}, 10000);
