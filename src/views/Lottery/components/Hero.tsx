import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading)`
  color: #fff;
  margin-bottom: 24px;
  font-size: 18px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 36px;
  }
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const StyledHero = styled.div`
  background-image: linear-gradient(91.99deg, #0085ff 0%, #7e86ff 100%);
  padding: 24px 41px 30px 24px;
  ${({ theme }) => theme.mediaQueries.nav} {
    padding: 40px 94px 58px 118px;
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: row;
  }
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    text-align: left;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledContainer>
        <LeftWrapper>
          <Title>{TranslateString(708, 'The CAKE Lottery')}</Title>
          <Blurb>{TranslateString(710, 'Buy tickets with CAKE')}</Blurb>
          <Blurb>{TranslateString(712, 'Win if 2, 3, or 4 of your ticket numbers match!')}</Blurb>
        </LeftWrapper>
        <RightWrapper>
          <LotteryProgress />
        </RightWrapper>
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
