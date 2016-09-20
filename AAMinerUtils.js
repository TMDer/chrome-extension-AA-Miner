function removeClass(element, className) {
  element.className = element.className.replace(new RegExp("\\b" + className + "\\b"), "");
}

function addClass(element, className) {
  element.className += className;
  element.disabled = true;
}

function removeMask(element) {
  removeClass(element, "loading-mask");
  element.removeAttribute("disabled");
}

function addMask(element) {
  addClass(element, "loading-mask");
}

