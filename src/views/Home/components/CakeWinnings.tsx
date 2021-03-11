import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaQueries.nav} {
   
  }
`

const CardValueStyle = styled(CardValue)`
    ont-size: 28px !important;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 32px;
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
