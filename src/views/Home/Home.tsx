import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import { lightColors, darkColors } from '../../style/Color'

const PageHome = styled(Page)`
  padding-top: 0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    padding-top: 30px;
  }
`
const Hero = styled.div`
  margin: auto;
  padding-bottom: 35px;
  text-align: center;
`
const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
    line-height: 29px;
  }
`
const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  margin-top: 14px;
  font-size: 12px;
  font-weight: 500;

  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
    margin-top: 12px;
  }
`
const CardBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(12,1fr);
    grid-gap: 20px;
    align-items: start;
  }
`
const Cards = styled.div`
  flex: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex: 38%;
  }
`
const CardsMid = styled.div`
  flex: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex: 20%;
  }
`
const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <PageHome>
      <Hero>
        <HeadingStyle>{TranslateString(576, 'PancakeSwap')}</HeadingStyle>
        <TextStyle>{TranslateString(578, 'The #1 AMM and yield farm on Binance Smart Chain.')}</TextStyle>
      </Hero>
      <CardBlock>
        <Cards>
          <FarmStakingCard />
          <LotteryCard />
        </Cards>
        <CardsMid>
          <EarnAPYCard />
          <EarnAssetCard />
          <WinCard />
        </CardsMid>
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </CardBlock>
    </PageHome>
  )
}

export default Home
