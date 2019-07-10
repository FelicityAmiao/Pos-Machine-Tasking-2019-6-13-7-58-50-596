let isBarcodesValid = (barcodes, databaseItems) => {
    let validResult = {
        isValid: true,
        errorMsg: ''
    };
    if(!barcodes || barcodes.length === 0) {
        validResult.isValid = false;
        validResult.errorMsg = '[ERROR]: Barcodes is empty!';
        return validResult;
    }
    let databaseIDs = databaseItems.map((item) => {
        return item['id'];
    });
    barcodes.forEach((barcode) => {
        if(databaseIDs.indexOf(barcode) === -1) {
            validResult.isValid = false;
            validResult.errorMsg = `[ERROR]: ${barcode} barcode is not exists in database`;
        }
    });
    return validResult;
}

let countBoughtItems = (isValid, barcodes, databaseItems) => {
    let boughtItemsConditions = [];
    if(!isValid) return null;
    databaseItems.forEach((item) => {
        barcodes.forEach((barcode) => {
            if(item.id === barcode) {
                let flag = false;
                let boughtItemCondition = {};
                boughtItemCondition.name = item.name;
                boughtItemCondition.price = item.price;
                boughtItemsConditions.forEach((_boughtItemCondition) => {
                    if(_boughtItemCondition.name === item.name) {
                        _boughtItemCondition.count++;
                        flag = true;
                    }
                });
                if(!boughtItemCondition.count) boughtItemCondition.count = 1;
                if(!flag) boughtItemsConditions.push(boughtItemCondition);
            }
        });
    });
    return boughtItemsConditions;
}

let computeCost = (isValid, boughtItemsConditions) => {
    if(!isValid) return 0;
    let totalCost = 0;
    boughtItemsConditions.forEach((boughtItemCondition) => {
        totalCost += boughtItemCondition.price * boughtItemCondition.count;
    });
    return totalCost;
}

let getReceipt = (validResult, boughtItemsConditions, totalcost) => {
    if(!validResult.isValid) return validResult.errorMsg;
    let printedReceipt = 'Receipts\n-----------------------------\n';
    boughtItemsConditions.forEach((boughtItemCondition) => {
        printedReceipt += `${boughtItemCondition.name}\t${boughtItemCondition.price}\t${boughtItemCondition.count}\n`;
    });
    printedReceipt += `-----------------------------\nPrice: ${totalcost}`;
    return printedReceipt;
}

let printReceipt = (barcodes, databaseItems) => {
    let validResult = isBarcodesValid(barcodes, databaseItems);
    let boughtItemsConditions = countBoughtItems(validResult.isValid, barcodes, databaseItems);
    return getReceipt(validResult, boughtItemsConditions, computeCost(validResult.isValid, boughtItemsConditions));
}

module.exports = {isBarcodesValid, countBoughtItems, computeCost, getReceipt, printReceipt};