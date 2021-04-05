import React from 'react'
import styled from 'styled-components'
import { Button, useModal } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useLotteryAllowance } from 'hooks/useAllowance'
import useTickets from 'hooks/useTickets'
import useTokenBalance from 'hooks/useTokenBalance'
import { getSdcAddress } from 'utils/addressHelpers'
import { baseColors, darkColors, lightColors } from 'style/Color'
import { useApproval } from 'hooks/useApproval'
import BuyTicketModal from './BuyTicketModal'
import MyTicketsModal from './UserTicketsModal'
import PurchaseWarningModal from './PurchaseWarningModal'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  padding: 8px 18px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`

const ButtonStyle = styled(Button)`
  background: ${baseColors.primary};
  height: 35px;
  padding: 18px;
  font-size: 13px;
  margin-left: 8px !important;
  ${({ theme }) => theme.mediaQueries.nav} {
    height: 56px;
    font-size: 16px;
  }
`

const ButtonDisableStyle = styled(Button)`
  height: 35px;
  padding: 18px;
  font-size: 13px;
  margin-right: 8px !important;
  background-color: ${ ({ theme, disabled }) => disabled ? handleBg(theme) : baseColors.primary} !important;
  color: ${ ({ theme, disabled }) => disabled ? handleColor(theme) : "#fff"} !important;
  border-color: transparent;
  ${({ theme }) => theme.mediaQueries.nav} {
    height: 56px;
    font-size: 16px;
  }
`

const handleBg = (theme) => (
  theme.isDark ? darkColors.buttonView : lightColors.buttonView
)

const handleColor = (theme) => (
  theme.isDark ? darkColors.colorWap : ' #8F8FA0'
)

const TicketCard: React.FC = () => {
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const sdcBalance = useTokenBalance(getSdcAddress())
  const tickets = useTickets()
  const ticketsLength = tickets.length
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const [onPresentBuy] = useModal(<BuyTicketModal max={sdcBalance} tokenName="SDC" />)
  const { handleApprove, requestedApproval } = useApproval(onPresentApprove)

  const renderLotteryTicketButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <>
          <ButtonDisableStyle disabled style={{ width: '100%' }}>
            {TranslateString(432, 'View your tickets')}
          </ButtonDisableStyle>
          <ButtonDisableStyle disabled={requestedApproval} onClick={handleApprove} style={{ width: '100%' }}>
            {TranslateString(494, 'Approve SDC')}
          </ButtonDisableStyle>
        </>
      )
    }
    return (
      <>
        <ButtonDisableStyle
          style={{ marginRight: '8px', width: '100%', color: ticketsLength === 0 ? '' : '#fff' }}
          disabled={ticketsLength === 0}
          variant="secondary"
          onClick={onPresentMyTickets}
        >
          {TranslateString(432, 'View Your Tickets')}
        </ButtonDisableStyle>
        <ButtonStyle id="lottery-buy-start" onClick={onPresentBuy} style={{ width: '100%' }}>
          {TranslateString(430, 'Buy Ticket')}
        </ButtonStyle>
      </>
    )
  }

  return (
    <CardActions>
      {lotteryHasDrawn ? (
        <ButtonDisableStyle disabled style={{ width: '100%'}}> {TranslateString(874, 'On sale soon')}</ButtonDisableStyle>
      ) : (
        renderLotteryTicketButtons()
      )}
    </CardActions>
  )
}

export default TicketCard
