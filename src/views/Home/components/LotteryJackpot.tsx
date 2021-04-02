import React from 'react'
import { darkColors, lightColors } from 'style/Color'
import styled from 'styled-components'
import { Text } from 'uikit-sotatek'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import { usePriceSdcBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardBusdValue from './CardBusdValue'

const TextSdc = styled(Text)`
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
  const lotteryPrizeAmountSdc = balance.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
  const lotteryPrizeAmountBusd = new BigNumber(balance).multipliedBy(usePriceSdcBusd()).toNumber()

  return (
    <Block>
      <TextSdc bold>
        {lotteryPrizeAmountSdc} {TranslateString(999, 'SDC')}
      </TextSdc>
      <CardBusdValue value={lotteryPrizeAmountBusd} lineHeight="2.6" />
    </Block>
  )
}

export default LotteryJackpot
