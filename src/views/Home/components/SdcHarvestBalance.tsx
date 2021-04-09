import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceSdcBusd } from 'state/hooks'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'
import { lightColors, darkColors } from '../../../style/Color'

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
    padding-top: 8px;
    font-size: 18px;
  }
`

const SdcHarvestBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(usePriceSdcBusd()).toNumber()

  if (!account) {
    return <TextStyle lineHeight="0.8">{TranslateString(298, 'LOCKED')}</TextStyle>
  }

  return (
    <Block>
      <CardValue value={earningsSum} />
      <CardBusdValue value={earningsBusd} lineHeight="2.6"/>
    </Block>
  )
}

export default SdcHarvestBalance
