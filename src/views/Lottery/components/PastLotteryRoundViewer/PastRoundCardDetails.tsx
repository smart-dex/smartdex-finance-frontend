import React from 'react'
import styled from 'styled-components'
import { Heading, CardBody, CardFooter, PancakeRoundIcon, TicketRound } from 'smartdex-uikit'
import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'
import { darkColors, lightColors } from 'style/Color'
import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timestamp from '../Timestamp'

interface PastRoundCardDetailsProps {
  data: DataResponse
}
const CardHeading = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const TopLotteryBlock = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const TopLotteryCardHeading = styled(LotteryCardHeading)`
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 0px;
   }
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 18px;
`

const CardBodyStyle = styled(CardBody)`
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
`

const CardFooterStyle = styled(CardFooter)`
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
`

const PastRoundCardDetails: React.FC<PastRoundCardDetailsProps> = ({ data }) => {
  const TranslateString = useI18n()

  const {
    contractLink,
    jackpotTicket,
    lotteryDate,
    lotteryNumber,
    lotteryNumbers,
    match1Ticket,
    match2Ticket,
    match3Ticket,
    poolSize,
  } = data

  return (
    !data.error &&
    data && (
      <>
        <CardBodyStyle>
          <CardHeading>
            <Timestamp timeValue={lotteryDate} />
            <HeadingStyle mb="24px">
              Round #{lotteryNumber}
            </HeadingStyle>
            <TopLotteryBlock>
              <TopLotteryCardHeading
                valueToDisplay={`${lotteryNumbers[0]}, ${lotteryNumbers[1]}, ${lotteryNumbers[2]}, ${lotteryNumbers[3]}`}
                Icon={TicketRound}
              >
                {TranslateString(999, 'Winning numbers')}
              </TopLotteryCardHeading>
              <LotteryCardHeading
                valueToDisplay={TranslateString(999, `${poolSize.toLocaleString()} SDC`)}
                Icon={PancakeRoundIcon}
              >
                {TranslateString(999, 'Total prizes')}
              </LotteryCardHeading>
            </TopLotteryBlock>
          </CardHeading>
        </CardBodyStyle>
        <CardFooterStyle>
          <PrizeGrid
            lotteryPrizeAmount={poolSize}
            jackpotMatches={jackpotTicket}
            oneTicketMatches={match1Ticket}
            twoTicketMatches={match2Ticket}
            threeTicketMatches={match3Ticket}
            pastDraw
          />
          <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} />
        </CardFooterStyle>
      </>
    )
  )
}
export default PastRoundCardDetails