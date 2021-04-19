import React from 'react'
import styled from 'styled-components'
import { Button } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors, baseColors } from 'style/Color'
import Input, { InputProps } from './Input'

interface Props extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
}

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
`

const StyledMaxText = styled.div`
  color:  ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  align-items: center;
  display: flex;
  height: 44px;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`

const StyledTokenSymbol = styled.span`
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.textMenuLeft)};
  font-weight: 600;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 105px;
  }
`
const ButtonMAX = styled(Button)`
  background: ${baseColors.primary} !important;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: none;
  font-size: 14px;
  line-height: 38px;
  height: 38px;
  min-width: auto;
  white-space: nowrap;
`

const StyledModal = styled.div`
  ${({ theme }) => theme.mediaQueries.nav} {
    width 551px;
  }
`

const BalanceInput: React.FC<Props> = ({ max, symbol, onChange, onSelectMax, value, thousandSeparator }) => {
  const TranslateString = useI18n()

  return (
    <StyledModal>
      <StyledMaxText>{TranslateString(454, `${max.toLocaleString()} ${symbol} Available`)}</StyledMaxText>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <ButtonMAX size="sm" onClick={onSelectMax}>
                {TranslateString(452, 'MAX')}
              </ButtonMAX>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
        thousandSeparator={thousandSeparator}
      />
    </StyledModal>
  )
}

export default BalanceInput
