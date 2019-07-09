const main = require("../main.js");

//test isBarcodesValid
const isBarcodesValid = main.isBarcodesValid;
const databaseItems = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];
let trueValidResult = {
    isValid : true,
    errorMsg : ''
}
it ('should return trueValidResult given ["0004"], databaseItems when call isBarcodesValid', () => {
    expect(isBarcodesValid(["0004"], databaseItems)).toStrictEqual(trueValidResult);
});

let falseValidResult1 = {
    isValid : false,
    errorMsg : '[ERROR]: 1003 barcode is not exists in database'
}
it ('should return falseValidResult1 given ["0004", "1003"], databaseItems when call isBarcodesValid', () => {
    expect(isBarcodesValid(["0004", "1003"], databaseItems)).toStrictEqual(falseValidResult1);
});

let falseValidResult2 = {
    isValid : false,
    errorMsg : '[ERROR]: Barcodes is empty!'
}
it ('should return falseValidResult2 given [], databaseItems when call isBarcodesValid', () => {
    expect(isBarcodesValid([], databaseItems)).toStrictEqual(falseValidResult2);
});

//test countBoughtItems
const countBoughtItems = main.countBoughtItems;
it ('should return null given false, [], databaseItems when call countBoughtItems', () => {
    expect(countBoughtItems(false, [], databaseItems)).toStrictEqual(null);
});

let boughtItemsConditions = [{
    name: 'Mountain Dew',
    price: 6,
    count: 1
}];
it ('should return boughtItemsConditions given true, ["0004"], databaseItems when call countBoughtItems', () => {
    expect(countBoughtItems(true, ["0004"], databaseItems)).toStrictEqual(boughtItemsConditions);
});

//test computeCost
let boughtItemsConditionsForComputeCostTest = [{
    name: 'Coca Cola',
    price: 3,
    count: 1
}, {
    name: 'Pepsi-Cola',
    price: 5,
    count: 2
}, {
    name: 'Dr Pepper',
    price: 7,
    count: 1
}];
const computeCost = main.computeCost;
it ('should return 20 given true, boughtItemsConditionsForComputeCostTest  when call computeCost', () => {
    expect(computeCost(true, boughtItemsConditionsForComputeCostTest)).toBe(20);
});