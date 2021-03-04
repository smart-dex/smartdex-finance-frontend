import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal } from '@pancakeswap-libs/uikit'
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

const StyledLotteryCard = styled(Card)`
  min-height: 169px;
  border: 1px solid #e2e2e8;
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  margin-bottom: 32px;
`

const BlockCakeWinnings = styled.div`
  display: flex;
  grid-area: a;
  @media (max-width: 600px) {
    padding-top: 39px;
    padding-bottom: 25px;
    justify-content: space-between;
  }
`
const BlockLotteryJackpot = styled.div`
  display: flex;
  grid-area: b;
  @media (max-width: 600px) {
    padding-bottom: 35px;
    justify-content: space-between;
  }
`

const Block = styled.div`
  display: grid;

  grid-template-areas:
    'c c c '
    'a b b ';
  @media (max-width: 600px) {
    grid-template-areas:
      'a'
      'b'
      'c';
  }
`

const CardImage = styled.img`
  margin-bottom: 16px;
  margin-left: 20px;
  position: absolute;
  top: 23px;
`

const Label = styled.div`
  color: #17c267;
  font-size: 14px;
  line-height: 2.3;
  padding-right: 50px;
`

const Actions = styled.div`
  display: flex;
  margin-bottom: 20px;
  grid-area: c;
  justify-self: end;
  @media (max-width: 600px) {
    justify-self: center;
    margin-bottom: 0;
  }
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
        <Button fullWidth disabled={requestedApproval} onClick={handleApprove} style={{ width: '50%' }}>
          {TranslateString(494, 'Approve CAKE')}
        </Button>
      )
    }
    return (
      <Button
        id="dashboard-buy-tickets"
        variant="secondary"
        onClick={onPresentBuy}
        disabled={lotteryHasDrawn}
        style={{ width: '50%' }}
      >
        {TranslateString(558, 'Buy Tickets')}
      </Button>
    )
  }

  const [onPresentBuy] = useModal(<BuyModal max={cakeBalance} tokenName="CAKE" />)

  return (
    <StyledLotteryCard>
      <CardBody style={{ padding: '32px' }}>
        <Heading size="xl" style={{ fontSize: '24px' }} color="#5F5E76">
          {TranslateString(550, 'Your Lottery Winnings')}
          <CardImage src="/images/pan-cake.png" alt="cake logo" width={40} />
        </Heading>
        <Block>
          <Actions>
            <Button
              id="dashboard-collect-winnings"
              disabled={getBalanceNumber(claimAmount) === 0 || requesteClaim}
              onClick={handleClaim}
              style={{ marginRight: '8px', width: '50%' }}
            >
              {TranslateString(556, 'Collect Winnings')}
            </Button>
            {renderLotteryTicketButtonBuyOrApprove()}
          </Actions>

          <BlockCakeWinnings>
            <Label>{TranslateString(552, 'CAKE to Collect')}:</Label>
            <CakeWinnings />
          </BlockCakeWinnings>
          <BlockLotteryJackpot>
            <Label>{TranslateString(554, 'Total jackpot this round')}:</Label>
            <LotteryJackpot />
          </BlockLotteryJackpot>
        </Block>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
