import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal } from 'uikit-sotatek'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import { useTotalClaim } from 'hooks/useTickets'
import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import { useLotteryAllowance } from 'hooks/useAllowance'
import { useApproval } from 'hooks/useApproval'
import PurchaseWarningModal from 'views/Lottery/components/TicketCard/PurchaseWarningModal'
import CakeWinnings from './CakeWinnings'
import LotteryJackpot from './LotteryJackpot'
import { lightColors, darkColors, baseColors } from '../../../style/Color'

const StyledLotteryCard = styled(Card)`
  min-height: 169px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  margin-bottom: 32px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
`

const BlockCakeWinnings = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: column;
    padding-top: 20px;
  }
`
const BlockLotteryJackpot = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: column;
    padding-top: 8px;
  }
`

const CardImage = styled.img`
  margin-right: 16px;
`

const Label = styled.div`
  font-size: 10px;
  padding-right: 20px;
  color: ${baseColors.primary};
  font-weight: 600px;
  line-height: 2.3;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
    padding-right: 50px;
  }
`

const Actions = styled.div`
  display: flex;
  justify-self: center;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.nav} {
    justify-self: end;
    padding-top: 8px;
  }
`

const HeadingStyle = styled(Heading)`
  font-size: 20px;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: bold;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 26px;
  }
`

const ButtonStyle = styled(Button)`
  font-size: 13px;
  padding: 8px;
  background: ${baseColors.primary};
  border-radius: 10px;
  &:hover {
    background: #5ba7ec !important;
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const HeadingBlock = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const FarmedStakingCard = () => {
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const [requesteClaim, setRequestedClaim] = useState(false)
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const { claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const { handleApprove, requestedApproval } = useApproval(onPresentApprove)

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

  const renderLotteryTicketButtonBuyOrApprove = () => {
    if (!allowance.toNumber()) {
      return (
        <ButtonStyle
          fullWidth
          disabled={requestedApproval}
          onClick={handleApprove}
          style={{ width: '50%', marginLeft: '4px' }}
        >
          {TranslateString(494, 'Approve CAKE')}
        </ButtonStyle>
      )
    }
    return (
      <ButtonStyle
        id="dashboard-buy-tickets"
        variant="secondary"
        onClick={onPresentBuy}
        disabled={lotteryHasDrawn}
        style={{ width: '50%' }}
      >
        {TranslateString(558, 'Buy Tickets')}
      </ButtonStyle>
    )
  }

  const [onPresentBuy] = useModal(<BuyModal max={cakeBalance} tokenName="CAKE" />)

  return (
    <StyledLotteryCard>
      <CardBody style={{ padding: '18px 28px 28px' }}>
        <HeadingBlock>
          <CardImage src="/images/pan-cake.png" alt="cake logo" width={50} />
          <HeadingStyle>{TranslateString(550, 'Your Lottery Winnings')}</HeadingStyle>
        </HeadingBlock>

        <BlockCakeWinnings>
          <Label>{TranslateString(552, 'CAKE to Collect')}:</Label>
          <CakeWinnings />
        </BlockCakeWinnings>
        <BlockLotteryJackpot>
          <Label>{TranslateString(554, 'Total jackpot this round')}:</Label>
          <LotteryJackpot />
        </BlockLotteryJackpot>

        <Actions>
          <ButtonStyle
            id="dashboard-collect-winnings"
            disabled={getBalanceNumber(claimAmount) === 0 || requesteClaim}
            onClick={handleClaim}
            style={{ marginRight: '8px', width: '50%' }}
          >
            {TranslateString(556, 'Collect Winnings')}
          </ButtonStyle>
          {renderLotteryTicketButtonBuyOrApprove()}
        </Actions>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
