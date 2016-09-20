function removeClass(element, className) {
  element.className = element.className.replace(new RegExp("\\b" + className + "\\b"), "");
}

function addClass(element, className) {
  element.className += className;
}

function removeMask(element) {
  removeClass(element, "loading-mask");
}

function addMask(element) {
  addClass(element, "loading-mask");
}

