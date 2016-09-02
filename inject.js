function changeReviewButton() {

    var buttonReviewChanges = document.getElementsByClassName("selected")[0];

    console.log("!!! buttonReviewChanges", buttonReviewChanges);

    buttonReviewChanges.innerText = "AA Miner Review Changes";

    // change Continue button
    buttonReviewChanges.onclick = function() {
        setTimeout(function() {
            changeButtonContinue();
            console.log("!!! 000 10sec");
        }, 3000);
    };
};

function changeButtonContinue() {
    var buttonContinue = document.getElementsByClassName("selected")[1];
    var createDom = document.createElement('button');
    var parentDom = buttonContinue.parentNode;
    createDom.id = "updateformPE";
    createDom.innerText = "AA Miner Continue"
    createDom.style.display = "inline-block";
    buttonContinue.style.display = "none";
    parentDom.appendChild(createDom);

    console.log("!!! 001 create new updateFromPE Dom!");
};

// Do something after FB loading end
setTimeout(function() {
  console.log("!!! setTimeout 10000");
  changeReviewButton();
}, 15000);
