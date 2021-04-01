import React, { useState, useCallback } from 'react'
import { lightColors, darkColors, baseColors } from 'style/Color'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal } from 'uikit-sotatek'
import { getSdcAddress } from 'utils/addressHelpers'
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
import SdcWinnings from './SdcWinnings'
import LotteryJackpot from './LotteryJackpot'

const StyledLotteryCard = styled(Card)`
  min-height: 270px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 14px 14px 20px rgba(120, 118, 148, 0.1);
  border-radius: 40px;
  margin-bottom: 25px;
  ${({ theme }) => theme.mediaQueries.nav} {
    min-height: 393px;
    margin-bottom: 20px;
  }
`
const HeadingBlock = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  flex-direction: row-reverse;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: inherit;
  }
`
const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`
const CardImage = styled.img`
  margin-right: 0px;
  margin-left: 6px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-right: 16px;
    margin-left: 0px;
  }
`
const Actions = styled.div`
  justify-self: center;
  margin-bottom: 0;
  margin-top: 30px;
  display: flex;
  ${({ theme }) => theme.mediaQueries.nav} {
    justify-self: end;
    margin-top: 15px;
  }
`
const BlockSdcWinnings = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 5px;
    flex-direction: column;
    align-items: flex-start;
  }
`
const BlockLotteryJackpot = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 5px;
    flex-direction: column;
    align-items: flex-start;
  }
`
const Label = styled.div`
  color: ${baseColors.success};
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    color: ${baseColors.primary};
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 7px;
  }
`

const ButtonStyle = styled(Button)`
  background: ${({ theme }) => (theme.isDark ? darkColors.buttonView : lightColors.buttonView)};
  color: ${baseColors.primary};
  border-radius: 10px;
  box-shadow: ${({ theme }) => (theme.isDark ? 'none' : '0px 4px 10px rgba(222, 222, 222, 0.24)')};
  height: 45px;
  font-weight: 600;
  font-size: 13px;
  position: relative;
  padding-right: 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    height: 56px;
    padding-right: 36px;
  }
  &:disabled {
    background: ${({ theme }) => (theme.isDark ? darkColors.btnDisabledBg : lightColors.btnDisabledBg)};
    color: ${({ theme }) => (theme.isDark ? darkColors.fillSvg : lightColors.fillSvg)};
    box-shadow: ${({ theme }) => (theme.isDark ? 'none' : '0px 4px 10px rgba(222, 222, 222, 0.24)')};
    border-radius: 10px;
    height: 45px;
    font-weight: 600;
    font-size: 13px;
    ${({ theme }) => theme.mediaQueries.nav} {
      font-size: 16px;
      height: 56px;
    }
  }
`
const IconDirect = styled.img`
  width: 10px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 16px;
  }
`
const BoxIconDirect = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  background: #0085ff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 24px;
  text-align: center;
  line-height: 45px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 36px;
    line-height: 60px;
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
  const sdcBalance = useTokenBalance(getSdcAddress())
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
          endIcon={
            !requestedApproval && (
              <BoxIconDirect>
                <IconDirect src="/images/home/icon-direct.svg" alt="" />
              </BoxIconDirect>
            )
          }
          onClick={handleApprove}
          style={{ width: '50%', marginLeft: '7px' }}
        >
          {TranslateString(494, 'Approve SDC')}&nbsp;&nbsp;
        </ButtonStyle>
      )
    }
    return (
      <ButtonStyle
        id="dashboard-buy-tickets"
        variant="secondary"
        onClick={onPresentBuy}
        disabled={lotteryHasDrawn}
        endIcon={
          !lotteryHasDrawn && (
            <BoxIconDirect>
              <IconDirect src="/images/home/icon-direct.svg" alt="" />
            </BoxIconDirect>
          )
        }
        style={{ width: '50%', marginLeft: '7px' }}
      >
        {TranslateString(558, 'Buy Tickets')}
      </ButtonStyle>
    )
  }

  const [onPresentBuy] = useModal(<BuyModal max={sdcBalance} tokenName="SDC" />)

  return (
    <StyledLotteryCard>
      <CardBody>
        <HeadingBlock>
          <CardImage src="/images/pan-cake.png" alt="SDC logo" width={50} />
          <HeadingStyle>{TranslateString(550, 'Your Lottery Winnings')}</HeadingStyle>
        </HeadingBlock>

        <BlockSdcWinnings>
          <Label>{TranslateString(552, 'SDC to Collect')}:</Label>
          <SdcWinnings />
        </BlockSdcWinnings>
        <BlockLotteryJackpot>
          <Label>{TranslateString(554, 'Total jackpot this round')}:</Label>
          <LotteryJackpot />
        </BlockLotteryJackpot>

        <Actions>
          <ButtonStyle
            id="dashboard-collect-winnings"
            disabled={getBalanceNumber(claimAmount) === 0 || requesteClaim}
            onClick={handleClaim}
            endIcon={
              !(getBalanceNumber(claimAmount) === 0 || requesteClaim) && (
                <BoxIconDirect>
                  <IconDirect src="/images/home/icon-direct.svg" alt="" />
                </BoxIconDirect>
              )
            }
            style={{ marginRight: '7px', width: '50%' }}
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
