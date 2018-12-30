
app.service("SpaceService", function ($http, $q, $localStorage, API) {
	
	this.getAllSpaces = function (type) {
        var deferred = $q.defer();
        
        var query = "/" + (type || "");
        $http.get(API.ROOT + "/spaces" + query, { cache: true })
            .then(function (response) {
                deferred.resolve(response.data);
            });
        
        return deferred.promise;
	};
    
    this.getAddedSpaces = function () {
        var addedSpaces = [];
        
        addedSpaces = $localStorage.addedSpaces;
        if (!addedSpaces) {
            addedSpaces = [];
        }
        
        return addedSpaces;
    };
    
    this.saveAddedSpaces = function (spaces) {
        $localStorage.addedSpaces = spaces;
    };
    
    this.calculteTotalCost = function (spaces) {
        var totalCost = 0;
        angular.forEach(spaces, function (addedSpace, addedSpaceIndex) {
            var spaceTotalCost = 0;
            angular.forEach(addedSpace.categories, function (addedCategory, addedCategoryIndex) {
                spaceTotalCost += (addedCategory.cost || 0);
                totalCost += (addedCategory.cost || 0);
            });
            addedSpace.totalCost = spaceTotalCost;
        });
        return totalCost;
    };
    
    this.organizeInMap = function (spaces, categoryMap) {
        var spaceCategoryMap = {};
        angular.forEach(spaces, function (space, spaceIndex) {
            spaceCategoryMap[space.uuid] = [];
            if (space.categories.length == 0) {
                angular.forEach(categoryMap, function (category, categoryUuid) {
                    spaceCategoryMap[space.uuid].push(category);
                });
            } else {
                angular.forEach(space.categories, function (categoryUuid, categoryIndex) {
                    spaceCategoryMap[space.uuid].push(categoryMap[categoryUuid]);
                });
            }
            space.categories = spaceCategoryMap[space.uuid];
        });
        return spaceCategoryMap;
    };
	
});
