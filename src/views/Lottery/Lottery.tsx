import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from 'uikit-sotatek'
import { useRouteMatch, Link, Route } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { getLotteryIssueIndex } from 'utils/lotteryUtils'
import useI18n from 'hooks/useI18n'
import { useLottery } from 'hooks/useContract'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'
import { baseColors, lightColors } from '../../style/Color'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 42px;
  display: flex;
  justify-content: center;
`

const ButtonItemStyle = styled(ButtonMenuItem)`
  padding: 14px;
  border-radius: 50px;
  background-color: ${({ isActive }) => (isActive ? baseColors.primary : '')};
  color: ${({ isActive }) => (isActive ? lightColors.invertedContrast : lightColors.textMenuLeft)};
  box-shadow:  ${({ isActive }) => (isActive ? '0px 4px 10px rgba(83, 185, 234, 0.24)' : '')};
  width: 135px;
  font-size: 13px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    width: 135px;
    line-height: 20px;
    font-weight: 400;
    padding: 20px;
  }
`
const ButtonMenuStyle = styled.div`
  margin-top: 24px;
  margin-bottom: 0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 16px
  }
  & > div {
    ${({ theme }) => theme.mediaQueries.nav} {
      width: 270px;
    }
    width: 200px;
    border-radius: 50px;
  }
`

const Lottery: React.FC = () => {
  const lotteryContract = useLottery()
  const { account } = useWallet()
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()
  const [historyData, setHistoryData] = useState([])
  const [historyError, setHistoryError] = useState(false)
  const [currentLotteryNumber, setCurrentLotteryNumber] = useState(0)
  const [mostRecentLotteryNumber, setMostRecentLotteryNumber] = useState(1)

  useEffect(() => {
    fetch(`https://api.pancakeswap.com/api/lotteryHistory`)
      .then((response) => response.json())
      .then((data) => setHistoryData(data))
      .catch(() => {
        setHistoryError(true)
      })
  }, [])

  useEffect(() => {
    const getInitialLotteryIndex = async () => {
      const index = await getLotteryIssueIndex(lotteryContract)
      const previousLotteryNumber = index - 1

      setCurrentLotteryNumber(index)
      setMostRecentLotteryNumber(previousLotteryNumber)
    }

    if (account && lotteryContract) {
      getInitialLotteryIndex()
    }
  }, [account, lotteryContract])

  return (
    <>
    <Hero />
    <Page>
      <Wrapper>
      <ButtonMenuStyle> 
        <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="primary">
            <ButtonItemStyle as={Link} to={`${url}`}>{TranslateString(716, 'Next draw')}</ButtonItemStyle>
            <ButtonItemStyle as={Link} to={`${url}/pastdraws`}>{TranslateString(718, 'Past draws')}</ButtonItemStyle>
          </ButtonMenu>
      </ButtonMenuStyle>
      </Wrapper>
      <PastLotteryDataContext.Provider
        value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }}
      >
          <Route exact path={`${url}`}>
            <NextDrawPage />
          </Route>
          <Route path={`${url}/pastdraws`}>
            <PastDrawsPage />
          </Route>
      </PastLotteryDataContext.Provider>
    </Page>
  </>
  )
}

export default Lottery
