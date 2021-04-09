import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors, baseColors } from '../../../style/Color'

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`
const StyledHeading = styled(Heading)`
  margin: 16px 0;
  color: ${baseColors.primary};
  font-size: 14px;
  font-weight: 600;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`

const StyledLink = styled(Link)`
  margin-top: 16px;
  color: ${baseColors.primary};
  display: inline;
  padding-left: 12px;
  font-weight: 600;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

const HowItWorks = () => {
  const TranslateString = useI18n()

  return (
    <LayoutWrapper>
      <StyledHeading>
        {TranslateString(632, 'How it works')}
      </StyledHeading>
      <TextStyle>
        <p>
          {TranslateString(
            999,
            'Spend SDC to buy tickets, contributing to the lottery pot. Win prizes if 2, 3, or 4 of your ticket numbers match the winning numbers and their exact order!',
          )}
          <StyledLink href={`${process.env.REACT_APP_DOCS_URL}lottery/lottery`}>Read more</StyledLink>
        </p>
      </TextStyle>
    </LayoutWrapper>
  )
}
export default HowItWorks