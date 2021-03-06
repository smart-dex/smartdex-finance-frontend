import React from 'react'
import styled from 'styled-components'
import { Text, Progress } from 'smartdex-uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import {
  getLotteryDrawTime,
  getLotteryDrawStep,
  getTicketSaleTime,
  getTicketSaleStep,
} from '../helpers/CountdownHelpers'
import { lightColors, darkColors } from '../../../style/Color'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;

  & > div:nth-child(1) {
    background-color: ${({ theme }) => (theme.isDark ? darkColors.progressBg : lightColors.progressBg)};
    & > div:nth-child(2) {
      background: ${({ theme }) => (theme.isDark ? darkColors.progress : lightColors.progress)};
    }
    & > div:nth-child(3) {
      background: ${({ theme }) => (theme.isDark ? darkColors.progressLottery : lightColors.progressLottery)};
    }
  }
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
  color: ${({ theme }) => (theme.isDark ? darkColors.textLottery : lightColors.textLottery)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`

const TextStyle = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textLottery : lightColors.textLottery)};
  font-weight: 500;
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
      {/* <Progress primaryStep={getLotteryDrawStep(currentMillis)} secondaryStep={getTicketSaleStep()} showProgressBunny /> */}
      <Progress primaryStep={getTicketSaleStep()} secondaryStep={getLotteryDrawStep(currentMillis)} showProgressBunny />
      <TopTextWrapper>
        <StyledPrimaryText bold>{lotteryHasDrawn ? timeUntilTicketSale : timeUntilLotteryDraw}</StyledPrimaryText>
        <TextStyle>
          {lotteryHasDrawn ? TranslateString(0, 'Until ticket sale') : TranslateString(0, 'Until lottery draw')}
        </TextStyle>
      </TopTextWrapper>
      {lotteryHasDrawn && (
        <>
          {' '}
          <BottomTextWrapper style={{marginBottom: '4px'}}>
            <TextStyle>
              <TextStyle>The system is dialing</TextStyle>
            </TextStyle>
          </BottomTextWrapper>
          <BottomTextWrapper>
            <TextStyle>
              {timeUntilLotteryDraw} {TranslateString(0, 'Until lottery draw')}
            </TextStyle>
          </BottomTextWrapper>
        </>
      )}
    </ProgressWrapper>
  )
}
export default LotteryProgress
