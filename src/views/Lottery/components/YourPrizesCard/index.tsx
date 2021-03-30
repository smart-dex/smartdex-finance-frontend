import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import { darkColors, lightColors } from 'style/Color'
import PrizesWonContent from './PrizesWonContent'
import NoPrizesContent from './NoPrizesContent'

const StyledCard = styled(Card)`
border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
border-radius: 40px !important;
box-shadow: 10px 10px 30px ${ ({ theme}) => theme.isDark ? darkColors.boxShadowLottery : lightColors.boxShadowLottery} ;
  ${(props) =>
    props.isDisabled
      ? `  
        margin-top: 16px;

        ${props.theme.mediaQueries.sm} {
          margin-top: 24px;
        }

        ${props.theme.mediaQueries.lg} {
          margin-top: 50px;
        }
        `
      : ``}
`
const CardBodyStyle = styled(CardBody)`
 background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.background)} !important;
 border: none;
`
const YourPrizesCard: React.FC = () => {
  const { claimAmount } = useTotalClaim()

  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0

  return (
    <StyledCard isDisabled={!isAWin} isActive={isAWin}>
      <CardBodyStyle>{isAWin ? <PrizesWonContent /> : <NoPrizesContent />}</CardBodyStyle>
    </StyledCard>
  )
}

export default YourPrizesCard
