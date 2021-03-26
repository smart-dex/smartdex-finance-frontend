import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTickets from 'hooks/useTickets'
import { useCurrentTime } from 'hooks/useTimer'
import { darkColors, lightColors } from 'style/Color'
import TicketActions from './TicketActions'
import { getTicketSaleTime } from '../../helpers/CountdownHelpers'

interface CardProps {
  isSecondCard?: boolean
}

const StyledCard = styled(Card)<CardProps>`
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 10px 10px 30px ${ ({ theme}) => theme.isDark ? darkColors.boxShadowLottery : lightColors.boxShadowLottery} ;
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
  padding: 18px;
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
  padding: 0px 8px 0px 0px;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const TicketImg = styled.div`
  width: 50px;
  height: 50px;
  background-image: url('/images/ticket-lottery-${({ theme }) => (theme.isDark ? 'dark' : 'light')}.svg');
  background-size: contain;
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
          <TicketImg />
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
