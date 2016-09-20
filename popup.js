var loginUrl = "http://localhost:1337/auth/signin/chromeExtension";
var logoutUrl = "http://localhost:1337/auth/logout";
var loginButton = null;
var logoutButton = null;
var usernameText = null;
var passwordText = null;
var rememberMeCheckBox = null;
var rememberMeLabel = null;
var warningMsg = null;

function getCurrentTabUrl(callback) {
  initialLoginButton();
  initialLogoutButton();
  callback();
}

function initialLoginButton() {

  var body = document.body;

  loginButton.click(function() {

    addMask(body);

    var username = usernameText.val();
    var password = passwordText.val();
    var rememberMe = rememberMeCheckBox.val();

    $.ajax( {
      method: "POST",
      url: loginUrl,
      data: {
        username: username,
        password: password,
        remember_me: rememberMe
      }
    })
    .done(function(msg) {
      removeMask(body);

      if(msg.status === "success") {
        chrome.runtime.sendMessage("loginSuccess", function(resMsg) {});
        initAAMinerReviewChangesBtn();
        loginViewChange();
        closePopupView();
        return;
      }
      warningMsg.show();
      warningMsg.text("User is not existed or password is not correct.");
    })
    .fail(function() {
      removeMask(body);
      warningMsg.show();
      warningMsg.text("Login failed");
    });
  });
};

function reloadPEReviewChangesBtn() {
  chrome.tabs.executeScript({
    code: "reloadPEReviewChangesBtn()"
  });
}

function initAAMinerReviewChangesBtn() {
  chrome.tabs.executeScript({
    code: "initAAMinerReviewChangesBtn()"
  });
}

function closePopupView() {
  window.close();
}

function initialLogoutButton() {

  var body = document.body;

  logoutButton.click(function() {

    addMask(body);

    $.ajax( {
      method: "POST",
      url: logoutUrl
    })
    .done(function() {
      chrome.runtime.sendMessage("logout", function(resMsg) {});
      logoutViewChange();
      reloadPEReviewChangesBtn();
      closePopupView();
      removeMask(body);
    })
    .fail(function() {
      removeMask(body);
      warningMsg.show();
      warningMsg.text("Logout failed");
    });
  });
};

chrome.runtime.sendMessage(
  "isLoginStatus", function(rememberMeStatus) {
    if(rememberMeStatus) {
      loginViewChange();
      return ;
    }

    logoutViewChange();
  }
);

function loginViewChange() {
  usernameText.hide();
  passwordText.hide();
  rememberMeCheckBox.hide();
  rememberMeLabel.hide();
  warningMsg.hide();
  loginButton.hide();
  logoutButton.show();
};

function logoutViewChange() {
  usernameText.show();
  passwordText.show();
  rememberMeCheckBox.show();
  rememberMeLabel.show();
  warningMsg.hide();
  loginButton.show();
  logoutButton.hide();
};

function bindEnterKey() {
  $(document).keypress(function (e) {
    if (e.which == 13) {
      loginButton.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  loginButton = $("#login");
  logoutButton = $("#logout");
  usernameText = $("input[name='username']");
  passwordText = $("input[name='password']");
  rememberMeCheckBox = $("input[name='remember_me']");
  rememberMeLabel = $("Label[for='rememberMe']");
  warningMsg = $(".warning");

  bindEnterKey();

  getCurrentTabUrl(function() {

  });
});
