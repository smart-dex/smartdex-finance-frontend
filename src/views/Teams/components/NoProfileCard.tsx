import React from 'react'
import { Button, Card, CardBody, Flex, Heading, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'

const NoProfileCard = () => {
  const TranslateString = useI18n()

  return (
    <PageHeader mb="40px" isActive>
      <CardBody>
        <Flex
          alignItems={['start', null, 'center']}
          justifyContent={['start', null, 'space-between']}
          flexDirection={['column', null, 'row']}
        >
          <TextHeader>
            <TextHeading>{TranslateString(1052, "You haven't set up your profile yet!")}</TextHeading>
            <TextDescription>
              {TranslateString(1054, 'You can do this at any time by clicking on your profile picture in the menu')}
            </TextDescription>
          </TextHeader>
          <StyledButton as={Link} to="/profile">
            {TranslateString(1050, 'Set up now')}
          </StyledButton>
        </Flex>
      </CardBody>
    </PageHeader>
  )
}
const PageHeader = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderNoProfileCard : lightColors.borderNoProfileCard)};
  box-shadow: 25px 14px 50px ${lightColors.boxShadowNoProfileCard};
  border-radius: 20px;
`
const TextHeader = styled.div`
  margin-top: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-top: 0px;
  }
`
const TextHeading = styled(Heading)`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textHeaderFarms : lightColors.textHeaderFarms)};
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`
const TextDescription = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 143%;
  letter-spacing: -0.03em;
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const StyledButton = styled(Button)`
  background: #ff6970;
  box-shadow: 0px 4px 10px rgba(255, 105, 112, 0.24);
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  width: 121px;
  height: 45px;
  font-size: 14px;
  width: 150px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${lightColors.background};
  margin-top: 16px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-top: 0px;
    width: 150px;
    height: 56px;
    font-size: 16px;
    margin-top: 0px;
  }
`

export default NoProfileCard
