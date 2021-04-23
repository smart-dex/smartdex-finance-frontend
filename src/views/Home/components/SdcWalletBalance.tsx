import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getSdcAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceSdcBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import { lightColors, darkColors } from 'style/Color'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'


const TextStyle = styled(Text)` 
  padding-top: 0px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`

const Block = styled.div`
  padding-top: 4px;
  display: flex;
  flex-direction: column;
`

const SdcWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getSdcAddress())
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(usePriceSdcBusd()).toNumber()
  const { account } = useWallet()

  if (!account) {
    return <TextStyle lineHeight="1.2">{TranslateString(298, 'LOCKED')}</TextStyle>
  }

  return (
    <Block>
      <CardValue value={getBalanceNumber(cakeBalance)} decimals={4} />
      <CardBusdValue value={busdBalance} lineHeight="2.6"/>
    </Block>
  )
}

export default SdcWalletBalance
