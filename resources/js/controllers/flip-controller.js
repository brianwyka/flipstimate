app.controller("flipController", function ($scope, $filter, $interval, SpaceFactory, SpaceService, CategoryFactory, CategoryService) {
    
    // Private Methods
    
    var updateTotalCost = function () {
        $scope.totalCost = SpaceService.calculteTotalCost($scope.addedSpaces);
    };
    
    var addSpace = function () {
        var addedSpace = SpaceFactory.createSpace();
        CategoryFactory.createCategory(addedSpace);
        $scope.addedSpaces.push(addedSpace);
    };
    
    var calculateCost = function (category) {
        CategoryService.calculateCost(category);
        updateTotalCost();
    };
    
    var saveProgress = function () {
        SpaceService.saveAddedSpaces($scope.addedSpaces);  
    };
    
    var initialize = function () {
        
        $scope.editingFlipName = false;
        $scope.addedSpaces = SpaceService.getAddedSpaces();
    
        updateTotalCost();

        SpaceService.getAllSpaces().then(function (spaces) {
            $scope.spaces = spaces;
            if ($scope.addedSpaces.length == 0) {
                addSpace();
            }
            
            // TODO: Issue with +/- buttons
            
            $interval(saveProgress, 5000);
        });
        CategoryService.getAllCategories().then(function (categories) {
            $scope.categoryMap = CategoryService.organizeInMap(categories);
            $scope.spaceCategoryMap = SpaceService.organizeInMap($scope.spaces, $scope.categoryMap);
        });
        
    };
    
    
    // Public Methods
    
    $scope.editFlipName = function () {
        $("#flip-name-editable-input").focus();
        $scope.editingFlipName = true;
    };
    
    $scope.saveFlipName = function () {
        $scope.editingFlipName = false;
    };
    
    $scope.addSpace = function () {
        addSpace();
    };
    
    $scope.removeSpace = function (index) {
        $scope.addedSpaces.splice(index, 1);
        updateTotalCost();
        if ($scope.addedSpaces.length == 0) {
            addSpace();   
        }
    };
    
    $scope.changeSpace = function (space) {
        space.showCategories = true;
    };
    
    $scope.addCategory = function (space) {
        CategoryFactory.createCategory(space);
    };
    
    $scope.removeCategory = function (space, index) {
        space.categories.splice(index, 1);
        updateTotalCost();
        if (space.categories.length == 0) {
            $scope.addCategory(space);   
        }
    };
    
    $scope.changeCategory = function (category, clearCostOverride) {
        if (!category.reference) {
            return;
        }
        if (clearCostOverride) {
            delete category.costOverride;
            if (category.reference.costOverride) {
                category.costOverride = 1;
            }
        }
        calculateCost(category);
    };
    
    initialize();
    
});
