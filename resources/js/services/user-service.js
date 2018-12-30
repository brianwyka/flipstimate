
app.service("UserService", function ($http, $q, API, $localStorage) {
	
	this.getFlips = function () {
        var deferred = $q.defer();
        
        $localStorage.userId = "3f4b5294-fdb6-4b7b-8a93-0f42bd34385a";
        $http.get(API.ROOT + "/user/" + $localStorage.userId + "/flips")
            .then(function (response) {
                deferred.resolve(response.data);
            });
        
        return deferred.promise;
	};
	
});
