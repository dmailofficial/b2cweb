import BigNumber from "bignumber.js";

const showDecimals = 4

const adjustTheShowDecimals = (decimalBigNumber) => {
    // console.log('decimalBigNumber1', decimalBigNumber)
    const checkCurrentDecimals = (showDecimals) => {
        let exponent=new BigNumber(10).pow(showDecimals);
        let threshold=new BigNumber(1).div(exponent);

        if(decimalBigNumber.comparedTo(threshold) < 0 && showDecimals < 8){
            let _showDecimals=showDecimals + 2;
            return checkCurrentDecimals(_showDecimals);
        }else{
            return showDecimals;
        }
    };

    // console.log('decimalBigNumber2', showDecimals)
    return checkCurrentDecimals(showDecimals);
}

export const setByNumber = (value, decimals) => {
    const primitiveValue = new BigNumber(value);
    let decimalBigNumber = primitiveValue.times(new BigNumber(10).pow(decimals).toFixed());
    let _showDecimals = adjustTheShowDecimals(decimalBigNumber);
    let resultBigNumber = decimalBigNumber.decimalPlaces(_showDecimals, 1);
    // console.log('resultBigNumber.toFixed()', resultBigNumber.toFixed())

    return resultBigNumber.toFixed();
}

export const setNumber = (value, decimals) => {
    let primitiveValue = new BigNumber(value);
    // https://tronscan.org/#/contract/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/code
    let assetScale = new BigNumber(10).pow(decimals).toFixed();
    return primitiveValue.times(assetScale).decimalPlaces(0).toFixed();
}
