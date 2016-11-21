/**
 * AAMinerConfig
 *
 * @author Allen Tien
 * @version 1.0
 */
var AAMinerConfig = (function() {
  var LOCAL_HOST = "localhost";

  var LOGIN_OF_API_PATH = "/auth/signin/chromeExtension";
  var LOGOUT_OF_API_PATH = "/auth/logout";
  var UPDATE_AD_OF_API_PATH = "/chromeExtension/updateFromPE";

  var _protocol = null;
  var _aaMinerHost = null;
  var _port = ":1337";
  var _regExpOfUrl = new RegExp(/(.*:\/\/)(.*)\/.*/);
  var _domain = null;
  var _loginUrl = null;
  var _logoutUrl = null;
  var _updateAdUrl = null;

  var _self = {};

  /** ====================================================================
   **                 private method
   ** ====================================================================
   */

  function isAAMinerHost(url) {
    return url.indexOf("facebook") === -1;
  }

  function getHostFromManifest(cb) {
    chrome.permissions.getAll(function(permissions) {
      origins = permissions.origins;

      for(var i = 0; i< origins.length; i++){
        var url = origins[i];
        if (!isAAMinerHost(url)) return true;

        cb(url);
        return false;
      }

    });
  }

  function getGroupByRegexp(url, regexp, groupStr) {
    return url.replace(regexp, groupStr);
  }

  function getProtocol(url) {
    return getGroupByRegexp(url, _regExpOfUrl, "$1");
  }

  function getHost(url) {
    return getGroupByRegexp(url, _regExpOfUrl, "$2");
  }

  function getDomain() {
    _domain = _protocol.concat(_aaMinerHost);

    if(LOCAL_HOST === _aaMinerHost)
      _domain = _domain.concat(_port);
    return _domain;
  }

  function getAAMinerUrl(apiPath) {
    return _domain.concat(apiPath);
  }

  /** ====================================================================
   **                 public method
   ** ====================================================================
   */

  _self.getAAMinerHost = function() {
    return _aaMinerHost;
  }

  _self.getLoginUrl = function() {
    return _loginUrl;
  }

  _self.getLogoutUrl = function() {
    return _logoutUrl;
  }

  _self.getUpdateAdUrl = function() {
    return _updateAdUrl;
  }

  _self.init = function() {
    getHostFromManifest(function(aaMinerUrl) {
      _protocol = getProtocol(aaMinerUrl);
      _aaMinerHost = getHost(aaMinerUrl);
      _domain = getDomain();

      _loginUrl = getAAMinerUrl(LOGIN_OF_API_PATH);
      _logoutUrl = getAAMinerUrl(LOGOUT_OF_API_PATH);
      _updateAdUrl = getAAMinerUrl(UPDATE_AD_OF_API_PATH);
    });
  }


  return _self;

}());


