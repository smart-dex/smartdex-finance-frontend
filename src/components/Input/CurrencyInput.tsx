import React, {useEffect, useState} from 'react'
import MaskedInput from 'react-text-mask'

const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const CurrencyInput = ({onChange, placeholder, value}) => {
  const [data, setData] = useState(value)
  const eventKeyPress = (event) => {
    console.log('event:', event);
    // let stringValue = '' + this.value;
    // let charCode = (event.which) ? event.which : event.keyCode;
    // if ((stringValue.length >= 18) || (charCode === 46) ||
    //   ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46)) {
    //   event.preventDefault();
    // } else {
    //   return true;
    // }
  }
  
  return (
    <MaskedInput
      placeholder={placeholder}
      value={data}
      onChange={onChange}
      // mask={defaultMaskOptions}
      onKeyPress={eventKeyPress}
    />
  )
}

export default CurrencyInput
