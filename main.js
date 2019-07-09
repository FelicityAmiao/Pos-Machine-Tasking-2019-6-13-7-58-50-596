function isBarcodesValid(barcodes, databaseItems) {
    let validResult = {
        isValid: true,
        errorMsg: ''
    };
    if(!barcodes || barcodes.length === 0) {
        validResult.isValid = false;
        validResult.errorMsg = '[ERROR]: Barcodes is empty!';
        return validResult;
    }
    let databaseIDs = databaseItems.map(function(item) {
        return item['id'];
    });
    barcodes.forEach(function(barcode) {
        if(databaseIDs.indexOf(barcode) === -1) {
            validResult.isValid = false;
            validResult.errorMsg = `[ERROR]: ${barcode} barcode is not exists in database`;
        }
    });
    return validResult;
}

function countBoughtItems(isValid, barcodes, databaseItems) {
    let boughtItemsConditions = [];
    if(!isValid) return null;
    databaseItems.forEach(function(item) {
        barcodes.forEach(function(barcode) {
            if(item.id === barcode) {
                let boughtItemCondition = {};
                boughtItemCondition.name = item.name;
                boughtItemCondition.price = item.price;
                boughtItemCondition.count? boughtItemCondition.count++: boughtItemCondition.count = 1;
                boughtItemsConditions.push(boughtItemCondition);
            }
        });
    });
    return boughtItemsConditions;
}

module.exports = {isBarcodesValid, countBoughtItems};