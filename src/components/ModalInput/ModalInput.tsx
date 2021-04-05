import React from 'react'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import { Text, Button, Input, InputProps, Flex, Link } from 'uikit-sotatek'
import NumberFormat from 'react-number-format';
import useI18n from '../../hooks/useI18n'


interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  background-color: ${({ theme }) => theme.isDark ? darkColors.backgroundInput : lightColors.backgroundInput};
  border-radius: 20px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px;
  width: 100%;
  height: 70px;
`

const StyledInput = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 33%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 51%;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 62%;
  }
  input {
    width: 100%;
    background: none;
    border: 0;
    background-color: ${({ theme }) => theme.isDark ? darkColors.backgroundInput : lightColors.backgroundInput};
    box-shadow: none;
    margin: 0px 2px 0px 8px;
    padding: 0;
    font-size: 14px;
    height: 56px;
    font-weight: 600;
    color:  ${({ theme }) => (theme.isDark ? darkColors.colorInput : lightColors.colorInput)};
    &:focus {
      box-shadow: none !important;
      outline: none;
    }
  }
`
const FlexText = styled(Flex)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`
const ButtonMax = styled(Button)`
  background: #0085FF;
  border-radius: 20px;
  font-weight: bold;
  box-shadow:none;
  font-size: 14px;
  line-height: 38px;
  color: #FFFFFF;
  height: 38px;
  margin-left: 8px !important;
  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    background: #0085FF;
    opacity: 0.7;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 3px;
  }
`
const StyledMaxText = styled.div`
  color:  ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  align-items: center;
  display: flex;
  height: 44px;
  font-weight: 600;
  font-size: 14px;
  line-height: 38px;
`

const StyledTokenSymbol = styled.span`
  color:  ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  font-weight: 700;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const isBalanceZero = max === '0' || !max

  const displayBalance = isBalanceZero ? '0' : parseFloat(max).toFixed(4)

  return (
    <div style={{ position: 'relative' }}>
      <StyledMaxText>
        {displayBalance.toLocaleString()} {symbol} {TranslateString(526, 'Available')}
      </StyledMaxText>
      <StyledTokenInput isWarning={isBalanceZero}>
        <FlexText>
          <StyledInput>
            <NumberFormat
              value={value}
              placeholder="0"
              onChange={onChange}
              thousandSeparator=","
              allowNegative={false}
            />
          </StyledInput>
          <Flex alignItems="center" >
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <ButtonMax size="sm" onClick={onSelectMax}>
              {TranslateString(452, 'MAX')}
            </ButtonMax>
          </Flex>
        </FlexText>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          No tokens to stake:{' '}
          <Link fontSize="14px" bold={false} href={addLiquidityUrl} external color="failure">
            {TranslateString(999, 'get')} {symbol}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput
