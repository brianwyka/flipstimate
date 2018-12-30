angular.module("categoryFilters", [])

    .filter("formatUnitType", function () {
        return function (category) {
            var formattedUnitType;
            
            if (category.reference && category.reference.unitType) {
                formattedUnitType = category.reference.unitType.replace("_", " ");
            } else {
                formattedUnitType = "...";
            }

            return formattedUnitType;
        };
    })

    .filter("textualQuantity", function ($filter) {
        return function (category) {
            var textualQuantity = "...";
            
            if (!category.reference) {
                return textualQuantity;
            }
            
            var unitType = category.reference.unitType.replace("_", " ");

            if (category.reference.costOverride) {
                textualQuantity = "...";
            } else if (category.reference.costPerUnit) {
                
                var costPerUnit = category.reference.costPerUnit;
                if (category.reference.conversionType 
                        && category.reference.conversionType == "gallons") {
                    costPerUnit = (costPerUnit * 350); // TODO: put this in DB
                }
                
                textualQuantity = $filter("currency")(costPerUnit, "$", 2);

                textualQuantity += " / ";
                if (category.reference.conversionType) {
                    textualQuantity += category.reference.conversionType.replace("gallons", "gallon");
                } else {
                    textualQuantity += unitType.replace("units", "unit").replace("feet", "foot");
                }

            }

            return textualQuantity;
        };
    });