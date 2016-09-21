var loginUrl = "http://localhost:1337/auth/signin/chromeExtension";
var logoutUrl = "http://localhost:1337/auth/logout";
var $loginButton = null;
var $logoutButton = null;
var $usernameText = null;
var $passwordText = null;
var $rememberMeCheckBox = null;
var $warningLoginMsg = null;
var $warningLogoutMsg = null;
var $user = null;
var $view = null;
var body = document.body;

function getCurrentTabUrl(callback) {
  initialLoginButton();
  initialLogoutButton();
  callback();
}

function initialLoginButton() {
  $loginButton.click(function() {
    
    addMask(body);
    
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
        $user.text("Hi, " + msg.user);
        triggerEnableAAChangesBtn();
        loginViewChange();
        closePopupView();
        return;
      }
      $warningLoginMsg.text("User is not existed or password is not correct.");
      $warningLoginMsg.addClass("active");
      removeMask(body);
    })
    .fail(function() {
      $warningLoginMsg.text("Login Failed");
      $warningLoginMsg.addClass("active");
      removeMask(body);
    });
  });
}

function closePopupView() {
  window.close();
}

function initialLogoutButton() {
  $logoutButton.click(function() {
    
    addMask(body);
    
    $.ajax( {
      method: "POST",
      url: logoutUrl
    })
    .done(function() {
      chrome.runtime.sendMessage("logout", function(resMsg) {});
      logoutViewChange();
      triggerDisableAAChangesBtn();
      closePopupView();
    })
    .fail(function() {
      $warningLogoutMsg.text("Logout Failed");
      $warningLogoutMsg.addClass("active");
      removeMask(body);
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
);

function loginViewChange() {
  $view.addClass("is-login");
  $warningLoginMsg.removeClass("active");
}

function logoutViewChange() {
  $view.removeClass("is-login");
  $warningLogoutMsg.removeClass("active");
}

function bindEnterKey() {
  $(document).keypress(function (e) {
    if (e.which == 13) {
      $loginButton.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  $loginButton = $("#login");
  $logoutButton = $("#logout");
  $usernameText = $("input[name='username']");
  $passwordText = $("input[name='password']");
  $rememberMeCheckBox = $("input[name='remember_me']");
  $warningLoginMsg = $(".warning-login");
  $warningLogoutMsg = $(".warning-logout");
  $user = $(".user");
  $view = $("#view");
  bindEnterKey();
  getCurrentTabUrl(function() {

  });
});