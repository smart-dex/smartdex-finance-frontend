import React, {useState, useEffect} from 'react'
import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'
import NumberFormat from 'react-number-format';

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value }) => {
  const [data, setData] = useState(value)
  useEffect(() => {
    console.log(Number(value.replaceAll(',','')));
    setData(`${Number(value.replaceAll(',',''))}`)
  }, [value])
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      {/* <StyledInput placeholder={placeholder} value={value} onChange={onChange} /> */}
      <StyledInput>
        <NumberFormat
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          thousandSeparator=","
          allowNegative={false}
          // decimalScale={8}
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
    padding: 0;
    outline: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`

export default Input
