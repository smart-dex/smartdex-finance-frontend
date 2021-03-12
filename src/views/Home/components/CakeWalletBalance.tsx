import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'
import { lightColors, darkColors } from '../../../style/Color'

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

const Block = styled.div`
  padding-top: 20px;
  display: flex;
`

const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(usePriceCakeBusd()).toNumber()
  const { account } = useWallet()

  if (!account) {
    return <TextStyle lineHeight="0.8">{TranslateString(298, 'LOCKED')}</TextStyle>
  }

  return (
    <Block>
      <CardValue value={getBalanceNumber(cakeBalance)} decimals={4} lineHeight="0.5" />
      <CardBusdValue value={busdBalance} />
    </Block>
  )
}

export default CakeWalletBalance
