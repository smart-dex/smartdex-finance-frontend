import React from 'react'
import styled from 'styled-components'
import { Text, Progress } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import {
  getLotteryDrawTime,
  getLotteryDrawStep,
  getTicketSaleTime,
  getTicketSaleStep,
} from '../helpers/CountdownHelpers'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
  font-size: 22px;
  font-weight: bold;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
   }
`

const TextStyle = styled(Text)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
   font-size: 16px;
  }
`

const LotteryProgress = () => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = getTicketSaleTime(currentMillis)
  const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis)

  return (
    <ProgressWrapper>
      <Progress primaryStep={getLotteryDrawStep(currentMillis)} secondaryStep={getTicketSaleStep()} showProgressBunny />
      <TopTextWrapper>
        <StyledPrimaryText bold color="#fff">
          {lotteryHasDrawn ? timeUntilTicketSale : timeUntilLotteryDraw}
        </StyledPrimaryText>
        <TextStyle bold>
          {lotteryHasDrawn ? TranslateString(0, 'Until ticket sale') : TranslateString(0, 'Until lottery draw')}
        </TextStyle>
      </TopTextWrapper>
      {lotteryHasDrawn && (
        <BottomTextWrapper>
          <TextStyle>
            {timeUntilLotteryDraw} {TranslateString(0, 'Until lottery draw')}
          </TextStyle>
        </BottomTextWrapper>
      )}
    </ProgressWrapper>
  )
}

export default LotteryProgress
