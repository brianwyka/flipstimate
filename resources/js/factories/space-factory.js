
app.factory("SpaceFactory", function () {
	return {
	   createSpace: function () {
            var space = {
                totalCost: 0,
                showCategories: false,
                categories: []
            };
            return space;
       }
	};
});
