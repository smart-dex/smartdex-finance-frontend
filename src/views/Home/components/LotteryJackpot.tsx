import React from 'react'
import { darkColors, lightColors } from 'style/Color'
import styled from 'styled-components'
import { Text } from 'uikit-sotatek'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import { usePriceCakeBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardBusdValue from './CardBusdValue'

const TextCake = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-direction: column;
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
      <CardBusdValue value={lotteryPrizeAmountBusd} lineHeight="2.6" />
    </Block>
  )
}

export default LotteryJackpot
