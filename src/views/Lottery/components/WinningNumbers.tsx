import React from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Card, CardBody } from '@pancakeswap-libs/uikit'
import { useWinningNumbers, useMatchingRewardLength } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { darkColors, lightColors, baseColors } from '../../../style/Color'

const WinningNumbers: React.FC = () => {
  const { account } = useWallet()
  const winNumbers = useWinningNumbers()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const MatchedNumber4 = useMatchingRewardLength(4)
  const MatchedNumber3 = useMatchingRewardLength(3)
  const MatchedNumber2 = useMatchingRewardLength(2)
  const TranslateString = useI18n()

  return (
    <CardWrapper style={{ position: 'relative', marginTop: '4em' }}>
      <CardStyle>
        <CardBody>
          <StyledCardContentInner>
            <StyledCardHeader>
              <Title>
                {account && lotteryHasDrawn
                  ? `🥳${TranslateString(570, 'Winning Numbers This Round')}🥳`
                  : TranslateString(572, 'Latest Winning Numbers')}
              </Title>
              <br />
              <Row>
                {winNumbers.map((number, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TicketNumberBox key={index}>
                    <CenteredText>{number}</CenteredText>
                  </TicketNumberBox>
                ))}
              </Row>

              <Link href="https://api.pancakeswap.com/api/lottery?page=0&pageSize=25" target="_blank">
                {TranslateString(448, 'Export recent winning numbers')}
              </Link>
            </StyledCardHeader>

            <Column>
              <RowNoPadding>
                <CenteredTextWithPadding>{TranslateString(442, 'Tickets matching 4 numbers:')}</CenteredTextWithPadding>
                <CenteredTextWithPadding>
                  <strong>{MatchedNumber4}</strong>
                </CenteredTextWithPadding>
              </RowNoPadding>
              <RowNoPadding>
                <CenteredTextWithPadding>{TranslateString(444, 'Tickets matching 3 numbers:')}</CenteredTextWithPadding>
                <CenteredTextWithPadding>
                  <strong>{MatchedNumber3}</strong>
                </CenteredTextWithPadding>
              </RowNoPadding>
              <RowNoPadding>
                <CenteredTextWithPadding>{TranslateString(446, 'Tickets matching 2 numbers:')}</CenteredTextWithPadding>
                <CenteredTextWithPadding>
                  <strong>{MatchedNumber2}</strong>
                </CenteredTextWithPadding>
              </RowNoPadding>
            </Column>
          </StyledCardContentInner>
        </CardBody>
      </CardStyle>
      <ImgStyle>
        <img src="/images/Saly-15.png" alt="" />
      </ImgStyle>
    </CardWrapper>
  )
}

const CardStyle = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? darkColors.backgroundLastest : lightColors.backgroundLastest)};
`

const ImgStyle = styled.a`
  display: none;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: block;
    position: absolute;
    right: 2px;
    top: -106px;
  }
`
const Link = styled.a`
  margin-top: 1em;
  text-decoration: none;
  color: ${({ theme }) => (theme.isDark ? darkColors.text : baseColors.orange)};
  font-size: 16px;
  font-weight: bold;
`

const Row = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: row;
`

const RowNoPadding = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 8px;
`

const Column = styled.div`
  margin-top: 1.8em;
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: 2.4em;
  }
`

const CenteredText = styled.div`
  text-align: center;
  align-items: center;
`

const CenteredTextWithPadding = styled.div`
  text-align: center;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
`

const TicketNumberBox = styled.div`
  padding: 10px;
  border-radius: 12px;
  background: ${baseColors.orange};
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 7px;
  width: 40px;

  @media (min-width: 768px) {
    font-size: 40px;
    margin-right: 20px;
    width: 60px;
  }

  @media (max-width: 600px) {
    margin: 4px;
  }
`

const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: 24px;
  }
`

const CardWrapper = styled.div``

const Title = styled.div`
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  font-size: 16px;
  font-weight: 600;
`

const StyledCardContentInner = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: row;
  }
`

export default WinningNumbers
