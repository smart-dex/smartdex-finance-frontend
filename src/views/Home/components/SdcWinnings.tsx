import React from 'react'
import { darkColors, lightColors } from 'style/Color'
import { Text } from 'uikit-sotatek'
import styled from 'styled-components'
import { usePriceSdcBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const CardValueStyle = styled(CardValue)`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`
const Block = styled.div`
  padding-top: 4px;
  display: flex;
  flex-direction: column;
`

const TextStyle = styled(Text)`
  padding-top: 0px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  ${({ theme }) => theme.mediaQueries.nav} {
    padding-top: 4px;
    font-size: 18px;
  }
`

const SdcWinnings = ({sdcCollected}) => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const claimAmountBusd = new BigNumber(sdcCollected).multipliedBy(usePriceSdcBusd()).toNumber()

  if (!account) {
    return <TextStyle lineHeight="1.2">{TranslateString(298, 'LOCKED')}</TextStyle>
  }
  return (
    <Block>
      <CardValueStyle value={sdcCollected} />
      <CardBusdValue value={claimAmountBusd} decimals={2} lineHeight="2.6" />
    </Block>
  )
}

export default SdcWinnings
