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
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
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
  margin-bottom: 32px;
  flex: 40%;
  padding-right: 24px;
  @media (max-width: 600px) {
    flex: 100%;
    padding-right: 0px;
  }
`
const CardRight = styled.div`
  margin-bottom: 32px;
  flex: 60%;
  @media (max-width: 600px) {
    flex: 100%;
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
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
    grid-column: span 13;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 13;
    }
  }
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  padding-top: 12px;
`

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <PageHome>
      <Hero>
        <HeadingStyle as="h1" size="lg">
          {TranslateString(576, 'PancakeSwap')}
        </HeadingStyle>
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
