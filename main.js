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

module.exports = {isBarcodesValid};