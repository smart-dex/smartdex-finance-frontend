import React from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Image, Card, CardBody } from '@pancakeswap-libs/uikit'
import { useWinningNumbers, useMatchingRewardLength } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'

const WinningNumbers: React.FC = () => {
  const { account } = useWallet()
  const winNumbers = useWinningNumbers()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const MatchedNumber4 = useMatchingRewardLength(4)
  const MatchedNumber3 = useMatchingRewardLength(3)
  const MatchedNumber2 = useMatchingRewardLength(2)
  const TranslateString = useI18n()

  return (
    <CardWrapper style={{ position: 'relative', marginTop:'4em'}}>
      <Card  style={{ background: '#E9F4FC'}}>
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
       
      </Card>
      <ImgStyle>
              <img src="/images/Saly-15.png" alt="" />
     </ImgStyle>
    </CardWrapper>
  )
}

const ImgStyle = styled.a`
  position: absolute;
  right: 2px;
  top: -106px;
`
const Link = styled.a`
  margin-top: 1em;
  text-decoration: none;
  color: #0085FF;
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
  margin-left: 2.4em;
  display: flex;
  flex-direction: column;
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
  color: #5F5E76;
`

const TicketNumberBox = styled.div`
  padding: 10px;
  border-radius: 12px;
  background: #FFA14E;
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
`

const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled.div``

const Title = styled.div`
  color: #5F5E76;
  font-size: 16px;
  font-weight: 1000;
`

const StyledCardContentInner = styled.div`
  display: flex;
`

export default WinningNumbers
