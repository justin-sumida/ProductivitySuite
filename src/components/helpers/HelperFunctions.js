export const currencyInput = (value) => {
    var x = value.replace(/\D/g, '').replace(/^0*/g, '');

    if(x.length > 0) {
        while (x.length < 3){  // pad with left 0's if necessary
            x = '0' + x;
        }
    }
    var wholeNum = x.substring(0, x.length - 2);
    var decimalNum = x.substring(x.length - 2);
    x = wholeNum + '.' + decimalNum;
    x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas
    x = '$ ' + x; // add currency symbol
    return x;
}

export const convertDate = unixTime => {
    if (unixTime === 0){
        return '';
    }
    var s= new Date(unixTime).toLocaleDateString("en-us");
    return s === "Invalid Date" ? '' : s;
}