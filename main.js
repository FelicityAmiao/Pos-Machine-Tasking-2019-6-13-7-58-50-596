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

function computeCost(isValid, boughtItemsConditions) {
    if(!isValid) return 0;
    let totalCost = 0;
    boughtItemsConditions.forEach(function(boughtItemCondition) {
        totalCost += boughtItemCondition.price * boughtItemCondition.count;
    });
    return totalCost;
}

function getReceipt(validResult, boughtItemsConditions, totalcost) {
    if(!validResult.isValid) return validResult.errorMsg;
    let printedReceipt = 'Receipts\n-----------------------------\n';
    boughtItemsConditions.forEach(function(boughtItemCondition) {
        printedReceipt += boughtItemCondition.name + "\t" + boughtItemCondition.price + "\t" + boughtItemCondition.count + "\n";
    });
    printedReceipt += "-----------------------------\nPrice: " + totalcost;
    return printedReceipt;
}

module.exports = {isBarcodesValid, countBoughtItems, computeCost, getReceipt};