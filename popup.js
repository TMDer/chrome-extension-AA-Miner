var loginUrl = "http://localhost:1337/auth/signin/chromeExtension";
var logoutUrl = "http://localhost:1337/auth/logout";
var $loginButton = null;
var $logoutButton = null;
var $usernameText = null;
var $passwordText = null;
var $rememberMeCheckBox = null;
var $warningMsg = null;
var $view = null;

function getCurrentTabUrl(callback) {
  initialLoginButton();
  initialLogoutButton();
  callback();
}

function initialLoginButton() {
  $loginButton.click(function() {
    var username = $usernameText.val();
    var password = $passwordText.val();
    var rememberMe = $rememberMeCheckBox.val();

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
      if(msg.status === "success") {
        chrome.runtime.sendMessage("loginSuccess", function(resMsg) {});
        loginViewChange();
        closePopupView();
        return;
      }
      $warningMsg.text('User is not existed or password is not correct.');
      $warningMsg.show();
    })
    .fail(function() {
      $warningMsg.text('Login Fail');
      $warningMsg.show();
    });
  });
}

function reloadContentView() {
  var execReload = 'location.reload()';
  chrome.tabs.executeScript({
    code: execReload
  });
}

function closePopupView() {
  window.close();
}

function initialLogoutButton() {
  $logoutButton.click(function() {
    $.ajax( {
      method: "POST",
      url: logoutUrl
    })
    .done(function() {
      chrome.runtime.sendMessage("logout", function(resMsg) {});
      logoutViewChange();
      reloadContentView();
      closePopupView();
    })
    .fail(function() {
      $warningMsg.text('Logout Fail');
      $warningMsg.show();
    });
  });
}

chrome.runtime.sendMessage(
  "isLoginStatus", function(rememberMeStatus) {
    if(rememberMeStatus) {
      loginViewChange();
      return ;
    }
    logoutViewChange();
  }
)

function loginViewChange() {
  $view.addClass("is-login");
  $warningMsg.hide();
}

function logoutViewChange() {
  $view.removeClass("is-login");
  $warningMsg.hide();
}

function bindEnterKey() {
  $(document).keypress(function (e) {
    if (e.which == 13) {
      $loginButton.click();
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  $loginButton = $("#login");
  $logoutButton = $("#logout");
  $usernameText = $("input[name='username']");
  $passwordText = $("input[name='password']");
  $rememberMeCheckBox = $("input[name='remember_me']");
  $warningMsg = $(".warning");
  $view = $("#view");
  bindEnterKey();
  getCurrentTabUrl(function() {

  });
});
