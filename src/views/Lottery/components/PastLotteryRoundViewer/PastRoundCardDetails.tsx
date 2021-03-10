import React from 'react'
import styled from 'styled-components'
import { Heading, CardBody, CardFooter, PancakeRoundIcon, TicketRound } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'
import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timestamp from '../Timestamp'
import { darkColors, lightColors } from '../../../../style/Color'

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
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
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
        <CardBody>
          <CardHeading>
            <Timestamp timeValue={lotteryDate} />
            <HeadingStyle size="md" mb="24px">
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
                valueToDisplay={TranslateString(999, `${poolSize.toLocaleString()} CAKE`)}
                Icon={PancakeRoundIcon}
              >
                {TranslateString(999, 'Total prizes')}
              </LotteryCardHeading>
            </TopLotteryBlock>
          </CardHeading>
        </CardBody>
        <CardFooter>
          <PrizeGrid
            lotteryPrizeAmount={poolSize}
            jackpotMatches={jackpotTicket}
            oneTicketMatches={match1Ticket}
            twoTicketMatches={match2Ticket}
            threeTicketMatches={match3Ticket}
            pastDraw
          />
          <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} />
        </CardFooter>
      </>
    )
  )
}

export default PastRoundCardDetails
