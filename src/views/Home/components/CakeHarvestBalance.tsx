import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceCakeBusd } from 'state/hooks'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'
import { lightColors, darkColors } from '../../../style/Color'

const Block = styled.div`
  padding-top: 20px;
  display: flex;
}
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  padding-top: 8px;
  @media (max-width: 600px) {
    padding-top: 0px;
  }
`

const CakeHarvestBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(usePriceCakeBusd()).toNumber()

  if (!account) {
    return <TextStyle lineHeight="0.8">{TranslateString(298, 'LOCKED')}</TextStyle>
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="0.5" />
      <CardBusdValue value={earningsBusd} />
    </Block>
  )
}

export default CakeHarvestBalance
