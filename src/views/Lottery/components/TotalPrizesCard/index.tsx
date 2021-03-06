import React, { useContext } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading, Card, CardBody, CardFooter, Text, Flex, Skeleton } from 'smartdex-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { useTotalRewards } from 'hooks/useTickets'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { darkColors, lightColors } from 'style/Color'
import PrizeGrid from '../PrizeGrid'

const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-left: 8px;
  padding-top: 8px;
`

const Left = styled.div`
  display: flex;
`
const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`
const PrizeCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ExpandingWrapper = styled.div`
  height: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100%;
  }
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: 400;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-weight: bold;
  font-size: 18px;
  padding-top: 4px;
`

const CardStyle = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  border-radius: 40px;
  box-shadow: 10px 10px 30px
    ${({ theme }) => (theme.isDark ? darkColors.boxShadowLottery : lightColors.boxShadowLottery)};
`
const TicketImg = styled.img`
  width: 57px;
  height: 57px;
`

const CardBodyStyle = styled(CardBody)`
  padding: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    padding: 24px;
  }
`

const CardFooterStyle = styled(CardFooter)`
  padding: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    padding: 24px;
  }
`

const TotalPrizesCard = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const lotteryPrizeAmount = +getBalanceNumber(useTotalRewards()).toFixed(0)
  const lotteryPrizeWithCommaSeparators = lotteryPrizeAmount.toLocaleString()
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)
  return (
    <CardStyle>
      <CardBodyStyle>
        {account && (
          <Flex mb="16px" alignItems="center" justifyContent="space-between" style={{ height: '20px' }}>
            {currentLotteryNumber === 0 && <Skeleton height={20} width={56} />}
            {currentLotteryNumber > 0 && (
              <>
                <TextStyle fontSize="12px" style={{ fontWeight: 600 }}>
                  {TranslateString(720, `Round #${currentLotteryNumber}`, { num: currentLotteryNumber })}
                </TextStyle>
              </>
            )}
          </Flex>
        )}
        <CardHeading>
          <Left>
            <IconWrapper>
              <TicketImg src="/images/pan-cake.png" />
            </IconWrapper>
            <PrizeCountWrapper>
              <TextStyle>{TranslateString(722, 'Total Pot')}</TextStyle>
              <HeadingStyle>{lotteryPrizeWithCommaSeparators} SDC</HeadingStyle>
            </PrizeCountWrapper>
          </Left>
        </CardHeading>
      </CardBodyStyle>
      <ExpandingWrapper>
        <CardFooterStyle>
          <PrizeGrid lotteryPrizeAmount={lotteryPrizeAmount} />
        </CardFooterStyle>
      </ExpandingWrapper>
    </CardStyle>
  )
}
export default TotalPrizesCard
