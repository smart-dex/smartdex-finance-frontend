import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import { usePriceCakeBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardBusdValue from './CardBusdValue'
import { darkColors, lightColors } from '../../../style/Color'

const TextCake = styled(Text)`
  font-size: 24px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  padding-bottom: 8px;
  padding-right: 13px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const Block = styled.div`
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const LotteryJackpot = () => {
  const TranslateString = useI18n()
  const lotteryPrizeAmount = useTotalRewards()
  const balance = getBalanceNumber(lotteryPrizeAmount)
  const lotteryPrizeAmoutCake = balance.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
  const lotteryPrizeAmountBusd = new BigNumber(balance).multipliedBy(usePriceCakeBusd()).toNumber()

  return (
    <Block>
      <TextCake bold>
        {lotteryPrizeAmoutCake} {TranslateString(999, 'CAKE')}
      </TextCake>
      <CardBusdValue value={lotteryPrizeAmountBusd} />
    </Block>
  )
}

export default LotteryJackpot
