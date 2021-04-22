import React from 'react'
import { lightColors, darkColors, baseColors, brandColors } from 'style/Color'
import styled from 'styled-components'
import { Button } from 'uikit-sotatek'
import useI18n from '../../hooks/useI18n'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  availableSymbol: string
  onSelectMax?: () => void
  thousandSeparator: string
}

const TicketInput: React.FC<TokenInputProps> = ({ max, symbol, availableSymbol, onChange, onSelectMax, value, thousandSeparator }) => {
  const TranslateString = useI18n()
  return (
    <StyledTokenInput>
       <StyledMaxText>{TranslateString(454, `${max.toLocaleString()} ${availableSymbol} `)} { TranslateString(526, "Available")}</StyledMaxText>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <StyledButton scale="md" onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </StyledButton>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
        thousandSeparator={thousandSeparator}
      />
     
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div`
`
const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`
const StyledButton = styled(Button)`
  color: ${brandColors.white};
  background-color: ${baseColors.primary};
  height: 38px;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  box-shadow: none;
  padding: 0px 20px;
`
const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`
const StyledMaxText = styled.div`
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  display: flex;
  height: 44px;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
`
const StyledTokenSymbol = styled.span`
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`

export default TicketInput
