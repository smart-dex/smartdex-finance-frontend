import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, TicketRound, Text, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTickets from 'hooks/useTickets'
import { useCurrentTime } from 'hooks/useTimer'
import TicketActions from './TicketActions'
import { getTicketSaleTime } from '../../helpers/CountdownHelpers'
import { darkColors, lightColors } from '../../../../style/Color'

interface CardProps {
  isSecondCard?: boolean
}

const StyledCard = styled(Card)<CardProps>`
  ${(props) =>
    props.isSecondCard
      ? `  
        margin-top: 16px;

        ${props.theme.mediaQueries.sm} {
          margin-top: 24px;
        }

        ${props.theme.mediaQueries.lg} {
          margin-top: 32px;
        }
        `
      : ``}
`

const CardHeader = styled.div`
  align-items: center;
  display: flex;
`

const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`

const TicketCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const TicketCard: React.FC<CardProps> = ({ isSecondCard = false }) => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()

  const tickets = useTickets()
  const ticketsLength = tickets.length

  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = lotteryHasDrawn && getTicketSaleTime(currentMillis)

  return (
    <StyledCard isSecondCard={isSecondCard}>
      <CardBody>
        <CardHeader>
          <IconWrapper>
            <TicketRound />
          </IconWrapper>
          {lotteryHasDrawn ? (
            <TicketCountWrapper>
              <TextStyle fontSize="14px">{TranslateString(870, 'Until ticket sale:')}</TextStyle>
              <Heading size="lg">{timeUntilTicketSale}</Heading>
            </TicketCountWrapper>
          ) : (
            <TicketCountWrapper>
              <TextStyle fontSize="14px">{TranslateString(724, 'Your tickets for this round')}</TextStyle>
              <Heading size="lg">{ticketsLength}</Heading>
            </TicketCountWrapper>
          )}
        </CardHeader>
        <TicketActions />
      </CardBody>
    </StyledCard>
  )
}

export default TicketCard
