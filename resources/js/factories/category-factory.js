
app.factory("CategoryFactory", function () {
    return {
        createCategory: function (space) {
            var category = {
                cost: 0,
                quantity: 1
            };
            space.categories.push(category);
            return category;
        }
    };
});
