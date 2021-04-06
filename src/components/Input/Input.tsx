import React from 'react'
import { lightColors, darkColors } from 'style/Color'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value }) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange}/>
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

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: 0;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorInput : lightColors.colorTextInput)};
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
  
`

export default Input
