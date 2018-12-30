
app.service("CategoryService", function ($http, $q, API) {
	
	this.getAllCategories = function () {
        var deferred = $q.defer();
        
        $http.get(API.ROOT + "/categories", { cache: true })
            .then(function (response) {
                angular.forEach(response.data, function (category, categoryIndex) {
                    if (!category.costPerUnit) {
                        category.costPerUnit = 1;
                        category.costOverride = true;
                    }
                });
                deferred.resolve(response.data);
            });
        
        return deferred.promise;
	};
    
    this.organizeInMap = function (categories) {
        var categoryMap = {};
        angular.forEach(categories, function (category, categoryIndex) {
            categoryMap[category.uuid] = category;
        });
        return categoryMap;
    };
    
    this.calculateCost = function (category) {
        category.cost = category.quantity * (category.costOverride || category.reference.costPerUnit);
    };
	
});
