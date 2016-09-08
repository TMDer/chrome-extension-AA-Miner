var loginUrl = "http://localhost:1337/auth/signin/chromeExtension"
var logoutUrl = "http://localhost:1337/auth/logout";

// var loginUrl = "https://http://adminer.hiiir.com/auth/signin/chromeExtension"
// var logoutUrl = "https://http://adminer.hiiir.com/auth/logout";

function getCurrentTabUrl(callback) {
  initialLoginButton();
  initialLogoutButton();
  callback();

};

function initialLoginButton(){
  $("#login").click(function(){
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    var remember_me = $("input[name='remember_me']").val();

    $.ajax({
      method: "POST",
      url: loginUrl,
      data: {
        username: username,
        password : password ,
        remember_me : remember_me
      }
    })
      .success(function( msg ) {
        if(msg.status === "success"){
          loginViewChange();
        } else {
          $(".warning").show();
        }
      })
      .fail(function(error){
        $("#status").text('fail');
      });
  });
}

function initialLogoutButton(){
  $("#logout").click(function(){
    $.ajax({
      method: "POST",
      url: logoutUrl
    })
      .success(function( msg ) {
        logoutViewChange();
      })
      .fail(function(error){
        $("#status").text('fail');
      });
  });
}

chrome.runtime.sendMessage(
  "check rememberMe", function(rememberMe) {
    if(rememberMe){
      loginViewChange();
    } else {
      logoutViewChange();
    }
  }
);

function loginViewChange(){
  $("input[name='username']").hide();
  $("input[name='password']").hide();
  $("input[name='remember_me']").hide();
  $(".warning").hide();
  $("#login").hide();
  $("#logout").show();
}

function logoutViewChange(){
  $("input[name='username']").show();
  $("input[name='password']").show();
  $("input[name='remember_me']").show();
  $("#login").show();
  $("#logout").hide();
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function() {

  });
});