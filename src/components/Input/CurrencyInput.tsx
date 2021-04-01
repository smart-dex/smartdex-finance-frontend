import React, {useState, useEffect} from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const CurrencyInput = ({ onChange, placeholder, value }) => {
  const [data, setData] = useState(value)
  const formatNumber = (value1) => {
    let result = `${value1}`;
    const x0 = result.split('.');
    let x1 = x0[0];
    const x2 = x0.length > 1 ? `.${x0[1]}` : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1,$2');
    }
    result = x1 + x2;
    console.log('x1:', x1);
    console.log('x2:', x2);
    return result;
  }

  const removeLeadingZeros = (value2) => {
    let result = value2;
    while (true) {
      if (result.length < 2) {
        break;
      }
      if (result.charAt(0) === '0' && result.charAt(1) !== '.') {
        result = result.slice(1);
      } else {
        break;
      }
    }
    return result;
  }

  const onKeyPress = (event) => {
    console.log(event);
    const result = event.target.value
    
    // if (this.isFullWidthChar(event.key)) {
    //   event.preventDefault();
    // }
    // const rawValue = this.standardize(this.internalValue);
    const x0 = result.split('.');
    const x1 = removeLeadingZeros(x0[0])
    // if (x0[1]) {

    // }
    // const formatedValue = formatNumber(event.target.value);
    setData(x1)

    // console.log('formatedValue:', formatedValue);
  }

  const onKeyUp = (event) => {
    const formatedValue = formatNumber(event.target.value);
    console.log('onKeyUp:', formatedValue)
  }
  
  return (
    <MaskedInput
      placeholder={placeholder}
      value={data}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      mask={
        createNumberMask({
          prefix: '',
          suffix: '',
          includeThousandsSeparator: true,
          thousandsSeparatorSymbol: '',
          allowDecimal: true,
          decimalSymbol: '.',
          decimalLimit: 100, // how many digits allowed after the decimal
          integerLimit: 100, // limit length of integer numbers
          allowNegative: false,
          allowLeadingZeroes: true,
        })
      } 
    />
  )
}
export default CurrencyInput
