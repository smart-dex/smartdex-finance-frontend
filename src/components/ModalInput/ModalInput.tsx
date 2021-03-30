import React from 'react'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import { Text, Button, Input, InputProps, Flex, Link } from '@pancakeswap-libs/uikit'
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
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 20px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
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
  line-height: 17px;

  color: #FFFFFF;
`
const StyledMaxText = styled.div`
  color:  ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  align-items: center;
  display: flex;
  height: 44px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`

const StyledTokenSymbol = styled.span`
  color:  ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  font-weight: 700;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
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
        <Flex alignItems="center" justifyContent="space-around">
          <StyledInput onChange={onChange} placeholder="0" value={value} />
          <Flex alignItems="center" >
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <ButtonMax size="sm" onClick={onSelectMax} marginLeft="15px">
              {TranslateString(452, 'MAX')}
            </ButtonMax>
          </Flex>
        </Flex>
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
