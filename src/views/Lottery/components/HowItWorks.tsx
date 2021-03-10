import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link, Image } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors } from '../../../style/Color'

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
  color: #0085ff;
  font-size: 18px;
  font-weight: 600;
`

const StyledLink = styled(Link)`
  margin-top: 16px;
  color: #0085ff;
  display: inline;
  padding-left: 12px;
`
const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`

const HowItWorks = () => {
  const TranslateString = useI18n()

  return (
    <LayoutWrapper>
      <StyledHeading size="lg" as="h3">
        {TranslateString(632, 'How it works')}
      </StyledHeading>
      <TextStyle fontSize="16px">
        <p>
          {TranslateString(
            999,
            'Spend CAKE to buy tickets, contributing to the lottery pot. Win prizes if 2, 3, or 4 of your ticket numbers match the winning numbers and their exact order!',
          )}
          <StyledLink href="https://docs.pancakeswap.finance/lottery-1">Read more</StyledLink>
        </p>
      </TextStyle>
    </LayoutWrapper>
  )
}

export default HowItWorks
