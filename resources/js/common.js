var app = angular.module("app", ["ngRoute", "ngStorage", "categoryFilters"]);

app.constant("API", {
    ROOT: "http://api.flipstimate.wykapedia.org"
});

app.constant("AUTH_EVENTS", {
    LOGIN_SUCCESS: "auth-login-success",
    LOGIN_FAILED: "auth-login-failed",
    LOGOUT_SUCCESS: "auth-logout-success",
    SESSION_TIMEOUT: "auth-session-timeout",
    NOT_AUTHENTICATED: "auth-not-authenticated",
    NOT_AUTHORIZED: "auth-not-authorized"
});