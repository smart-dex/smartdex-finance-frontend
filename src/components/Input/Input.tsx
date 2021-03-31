import React, {useEffect, useState} from 'react'
import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import PropTypes from 'prop-types'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
}

const defaultMaskOptions = {
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 6, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value, maskOptions }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      {/* <StyledInput placeholder={placeholder} value={value} onChange={onChange} /> */}
      <StyledInput>
        <MaskedInput
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      </StyledInput>
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

Input.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
}

Input.propTypes = {
  inputmode: PropTypes.string,
  maskOptions: PropTypes.shape({
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.boolean,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.boolean,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.boolean,
    allowNegative: PropTypes.boolean,
    allowLeadingZeroes: PropTypes.boolean,
    integerLimit: PropTypes.number,
  }),
}

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => (theme.isDark ? darkColors.background : lightColors.activeBackgroundMenuLeft)};
  border-radius: 20px;
  display: flex;
  height: 70px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.div`
  width: 100%;
  input {
    width: 100%;
    background: none;
    border: 0;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorInput : lightColors.colorInput)};
    flex: 1;
    height: 56px;
    margin: 0;
    padding: 0;
    outline: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`

export default Input
