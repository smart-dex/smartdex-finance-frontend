import React from 'react'
import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'
import NumberFormat from 'react-number-format';

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
  thousandSeparator: string
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value, thousandSeparator="," }) => {
  const eventKeyPress = (event) => {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 46 && !thousandSeparator) {
      event.preventDefault();
    }
  }
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput>
        <NumberFormat
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          thousandSeparator={thousandSeparator}
          allowNegative={false}
          onKeyPress={eventKeyPress}
          decimalScale={8}
          isAllowed={(values) => {
            const {floatValue} = values;
            if (floatValue >= 10000000000000000 && thousandSeparator) {
              return false;
            }
            return true;
          }}
        />
      </StyledInput>
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
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
    padding: 0 15px 0 10px;
    outline: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    ::placeholder {
      color: ${({ theme }) => (theme.isDark ? darkColors.colorInput : lightColors.colorInput)};
    }
  }
`

export default Input
