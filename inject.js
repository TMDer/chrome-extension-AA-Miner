function changeReviewButton() {

  var buttonReviewChanges = document.getElementsByClassName("selected")[0];

  console.log("!!! buttonReviewChanges", buttonReviewChanges);

  if(buttonReviewChanges !== undefined) {
    buttonReviewChanges.innerText = "AA Miner Review Changes";
  }
};

// Do something after FB loading end
setTimeout(function() {
  console.log("!!! setTimeout 10000");
  changeReviewButton();
}, 10000);