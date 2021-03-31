import React from 'react'
import { darkColors, lightColors } from 'style/Color'
import styled from 'styled-components'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
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
  display: flex;
  justify-content: space-between;
  div:nth-child(1) {
    margin-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: column;
    div:nth-child(1) {
      margin-right: 0px;
    }
  }
`
const CakeWinnings = () => {
  const { claimAmount } = useTotalClaim()
  const cakeAmount = getBalanceNumber(claimAmount)
  const claimAmountBusd = new BigNumber(cakeAmount).multipliedBy(usePriceCakeBusd()).toNumber()

  return (
    <Block>
      <CardValueStyle value={cakeAmount} />
      <CardBusdValue value={claimAmountBusd} decimals={2} lineHeight="2.6" />
    </Block>
  )
}

export default CakeWinnings
