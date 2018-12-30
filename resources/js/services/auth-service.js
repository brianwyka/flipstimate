
app.service("AuthService", function ($http, $q, API) {
	
	this.login = function () {
        var deferred = $q.defer();
        
        $http.post(API.ROOT + "/auth/login")
            .then(function (response) {
                
                deferred.resolve(response.data.categories);
            });
        
        return deferred.promise;
	};
    
    this.signup = function () {
        
    };
	
});
