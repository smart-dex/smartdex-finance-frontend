import React from 'react'
import styled from 'styled-components'
import { Text, Button, useModal } from 'smartdex-uikit'
import useI18n from 'hooks/useI18n'
import useTickets from 'hooks/useTickets'
import { darkColors, lightColors, baseColors } from 'style/Color'
import MyTicketsModal from '../TicketCard/UserTicketsModal'

const Wrapper = styled.div`
  display: flex;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.background)} !important;
  box-shadow: none;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledText = styled(Text)`
  padding-left: 12px;
  color: ${({ theme }) => theme.isDark ? darkColors.colorTicket : lightColors.colorTicket};
`

const Image = styled.img`
  margin-right: 6px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 20px;
  }
`
const StyledButton = styled(Button)`
  height: unset;
  background: none;
  padding-left: 12px;
  padding-top: 9px;
  color: ${ baseColors.primary};
  justify-content: flex-start;
  box-shadow: none;
`

const NoPrizesContent: React.FC = () => {
  const TranslateString = useI18n()
  const tickets = useTickets()
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)

  return (
    <Wrapper>
      <Image src="/images/no-prize.svg" alt="no prizes won" />
      <TextWrapper>
        <StyledText>{TranslateString(726, 'Sorry, no prizes to collect')}</StyledText>
        <StyledButton  onClick={onPresentMyTickets}>
          {TranslateString(432, 'View Your Tickets')}
        </StyledButton>
      </TextWrapper>
    </Wrapper>
  )
}

export default NoPrizesContent
