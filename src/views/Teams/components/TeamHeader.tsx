import React from 'react'
import { Heading, Text } from 'smartdex-uikit'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import HeaderWrapper from 'views/Profile/components/HeaderWrapper'
import NoProfileCard from './NoProfileCard'

const TeamHeader = () => {
  const TranslateString = useI18n()
  const { isInitialized, profile } = useProfile()
  const showProfileCallout = isInitialized && !profile
  return (
    <>
      {showProfileCallout && <NoProfileCard />}
      <HeaderWrapper>
        <StyledHeading as="h1" size="lg" color="secondary">
          {TranslateString(1082, 'Teams & Profiles')}
        </StyledHeading>
        <StyledDescription>
          {TranslateString(
            12206,
            'Show off your stats and collectibles with your unique profile. Team features will be revealed soon!',
          )}
        </StyledDescription>
      </HeaderWrapper>
      <Line />
    </>
  )
}
const Line = styled.div`
  margin-top: 20px;
  border: 1px dashed ${({ theme }) => (theme.isDark ? darkColors.lineDriver : lightColors.lineDriver)};
  margin-bottom: 29px;
`

const StyledHeading = styled(Heading)`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 29px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  text-align: center;
  margin-bottom: 14px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`
const StyledDescription = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 143%;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

export default TeamHeader
