app.config(function ($routeProvider) {
    
    $routeProvider
    
        .when('/', {
            templateUrl: '/pages/home.html',
            controller: 'homeController'
        })
    
        .when('/login', {
            templateUrl: '/pages/login.html',
            controller: 'loginController'
        })
    
        .when('/signup', {
            templateUrl: '/pages/signup.html',
            controller: 'signupController'
        })
    
        .when('/flip/:flipId?', {
            templateUrl: '/pages/flip.html',
            controller: 'flipController'
        })
        
        .when('/about', {
            templateUrl: '/pages/about.html',
            controller: 'aboutController'
        })
        
        .when('/contact', {
            templateUrl: '/pages/contact.html',
            controller: 'contactController'
        })
    
        .otherwise({
            redirectTo: '/flip'
        });
    
});