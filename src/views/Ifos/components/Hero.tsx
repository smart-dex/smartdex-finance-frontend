import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1' })`
  color: #ffffff;
  margin-bottom: 24px;
  font-size: 36px;
  line-height: 44px;
  font-weight: 700;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`

const StyledHero = styled.div`
  background-image: linear-gradient(91.67deg, #0085ff 5.33%, #7e86ff 104.39%);
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
`
const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <Container>
        <Title>{TranslateString(500, 'IFO: Initial Farm Offerings')}</Title>
        <Blurb>{TranslateString(502, 'Buy new tokens with a brand new token sale model.')}</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
