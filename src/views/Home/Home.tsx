import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
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
  ${({ theme }) => theme.mediaQueries.nav} {
    padding-top: 24px;
  }
`

const Hero = styled.div`
  margin: auto;
  padding-top: 5px;
  padding-bottom: 45px;
  text-align: center;
`

const CardBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Cards = styled.div`
  flex: 100%;
  padding-right: 0px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 24px;
    flex: 40%;
    padding-right: 24px;
  }
`
const CardRight = styled.div`
  flex: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 24px;
    flex: 60%;
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 12;
  }

  ${({ theme }) => theme.mediaQueries.nav} {
    & > div {
      grid-column: span 4;
    }
  }
`

const STATCards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 12;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.nav} {
    & > div {
      grid-column: span 13;
    }
  }
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  padding-top: 12px;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 18px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
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
        <CardRight>
          <CTACards>
            <EarnAPYCard />
            <EarnAssetCard />
            <WinCard />
          </CTACards>
          <STATCards>
            <CakeStats />
            <TotalValueLockedCard />
          </STATCards>
        </CardRight>
      </CardBlock>
    </PageHome>
  )
}

export default Home
