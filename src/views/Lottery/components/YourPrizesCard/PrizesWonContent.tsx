import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, Heading, Won, useModal } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import useTickets, { useTotalClaim } from 'hooks/useTickets'
import { baseColors, lightColors, darkColors } from 'style/Color'
import Loading from '../Loading'
import MyTicketsModal from '../TicketCard/UserTicketsModal'

const WinningsWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const IconWrapper = styled.div`
  margin-bottom: 16px;

  svg {
    width: 80px;
    height: 80px;
  }
`

const StyledCardActions = styled.div`
  margin-top: ${(props) => props.theme.spacing[3]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing[1]}px;
  color: ${baseColors.primary};
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`

const handleBgDarkMode = (theme) => (theme.isDark ? darkColors.buttonView : lightColors.buttonView)

const handleColorDarkMode = (theme) => (theme.isDark ? 'rgba(255, 255, 255, 0.6)' : '#8F8FA0')

const ButtonCollect = styled(Button)`
  font-size: 12px;
  padding: 0 12px;
  height: 45px;
  background: ${({ disabled, theme }) => (disabled ? handleBgDarkMode(theme) : baseColors.primary)} !important;
  color: ${({ disabled, theme }) => (disabled ? handleColorDarkMode(theme) : lightColors.invertedContrast)} !important;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    padding: 0 24px;
    height: 56px;
  }
`

const HeadingStyle = styled(Heading)`
  font-size: 18px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`

const PrizesWonContent: React.FC = () => {
  const [requestedClaim, setRequestedClaim] = useState(false)
  const TranslateString = useI18n()
  const { claimLoading, claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()
  const tickets = useTickets()
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onMultiClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onMultiClaim, setRequestedClaim])

  const winnings = getBalanceNumber(claimAmount).toFixed(2)

  return (
    <StyledCardContentInner>
      <IconWrapper>
        <Won />
      </IconWrapper>
      <HeadingStyle color="secondary">{TranslateString(660, 'You won!')}</HeadingStyle>
      {claimLoading && <Loading />}
      {!claimLoading && (
        <>
          <WinningsWrapper>
            <HeadingStyle style={{ marginRight: '6px' }}>{winnings}</HeadingStyle>
            <HeadingStyle>SDC</HeadingStyle>
          </WinningsWrapper>
        </>
      )}
      <StyledCardActions>
        <ButtonCollect disabled={requestedClaim} onClick={handleClaim} style={{ width: '100%' }}>
          {TranslateString(1056, 'Collect')}
        </ButtonCollect>
      </StyledCardActions>
      <StyledButton variant="text" onClick={onPresentMyTickets}>
        {TranslateString(432, 'View Your Tickets')}
      </StyledButton>
    </StyledCardContentInner>
  )
}

export default PrizesWonContent
