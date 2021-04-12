import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Button, Text } from 'uikit-sotatek'
import { lightColors, darkColors } from 'style/Color'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  label?: string
  buttonLabel: string
  disabled?: boolean
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.borderColor};
  padding-left: 16px;
  color: #5F5E76 !important;
  button{
    padding: 7px 25px;
    border-radius: 10px;
    background: ${lightColors.primary};
    &:disabled{
      background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
      color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
    }
   
  }
`
const Textlbl = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.textIfolight)} !important;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 7px;
`
const TextInput = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.textIfolight)} !important;
  font-weight: 500;
  font-size: 16px;
  font-weight: 600;

`
const ButtonActive = styled(Button)`
    
`

const LabelButton: React.FC<Props> = ({ value, label, buttonLabel, onClick, disabled = false }) => {
  return (
    <div>
      {label && (
        <Textlbl fontSize="14px" color="textSubtle">
          {label}
        </Textlbl>
      )}
      <ButtonWrapper>
        <TextInput bold fontSize="20px">
          {value}
        </TextInput>
        <ButtonActive onClick={onClick} disabled={disabled}>
          {buttonLabel}
        </ButtonActive>
      </ButtonWrapper>
    </div>
  )
}

export default LabelButton
