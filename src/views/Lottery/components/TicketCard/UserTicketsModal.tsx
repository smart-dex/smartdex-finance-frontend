import React, { useCallback } from 'react'
import { Modal } from 'uikit-sotatek'
import styled from 'styled-components'
import { useWinningNumbers } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import { baseColors } from 'style/Color'

interface UserTicketsModalProps {
  myTicketNumbers: Array<any>
  from?: string
  onDismiss?: () => void
}

const UserTicketsModal: React.FC<UserTicketsModalProps> = ({ myTicketNumbers, onDismiss, from }) => {
  const winNumbers = useWinningNumbers()
  const TranslateString = useI18n()
  const rewardMatch = useCallback(
    (number) => {
      let n = 0
      for (let i = winNumbers.length - 1; i >= 0; i--) {
        // eslint-disable-next-line eqeqeq
        if (winNumbers[i] == number[i]) n++
      }
      return n
    },
    [winNumbers],
  )

  const listItems = myTicketNumbers.map((number, index) => {
    if (rewardMatch(number[0]) > 1 && from !== 'buy') {
      const emoji = new Array(rewardMatch(number[0]) + 1).join('🤑')
      return (
        // eslint-disable-next-line react/no-array-index-key
        <RewardP key={index}>
          {emoji}
          {number.toString()}
          {emoji}
        </RewardP>
      )
    }
    // eslint-disable-next-line react/no-array-index-key
    return <p key={index}>{number.toString()}</p>
  })

  return (
    <Modal
      title={TranslateString(490, `My Tickets (Total: ${myTicketNumbers.length})`, { TICKETS: myTicketNumbers.length })}
      onDismiss={onDismiss}
    >
      <TicketsList>
        <h2>{listItems}</h2>
      </TicketsList>
    </Modal>
  )
}

const RewardP = styled.div`
  color: #ff8c28;
`

const TicketsList = styled.div`
  text-align: center;
  color: ${baseColors.primary};
  margin-bottom: 8px;
  h2 {
    p {
      padding: 8px;
    }
  }
`

export default UserTicketsModal
