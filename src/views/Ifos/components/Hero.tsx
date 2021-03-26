import React from 'react'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import { Heading, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1' })`
  color: ${({ theme }) => (theme.isDark ? darkColors.txtTitledark : lightColors.textIfolight)};
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 24px;
  }
`
const Blurb = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.txtBlurbdark : lightColors.textIfolight)};
  font-size: 13px;
  font-weight: 500;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
   }
`
const StyledHero = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? darkColors.blackIfo : lightColors.lighIfo)};
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
`
const Container = styled.div`
  margin-right: auto;
  width: 100%;
  padding-left: 5%;
  padding-right: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 9%;
   }
 
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
