import React from 'react'
import { Button, Card, CardBody, Flex, Heading, Text } from 'smartdex-uikit'
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
            {TranslateString(1050, 'Set Up Now')}&nbsp;&nbsp;
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.891 0.109956L0.897922 6.10683C-0.601141 6.80652 -0.101453 9.00527 1.49761 9.00527H6.9948V14.5025C6.9948 16.1015 9.19355 16.6015 9.89323 15.1021L15.8901 2.10902C16.3898 0.909331 15.0904 -0.390044 13.891 0.109956Z"/>
            </svg>
          </StyledButton>
        </Flex>
      </CardBody>
    </PageHeader>
  )
}
const PageHeader = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? darkColors.bgCardCollectibles : lightColors.bgCardCollectibles)};
  box-shadow: 25px 14px 50px ${({ theme }) => (theme.isDark ? darkColors.shadowCardCollectibles : lightColors.shadowCardCollectibles)};
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
  svg {
    width: 10px;
    height: 10px;
    margin-bottom: 0px;
    path {
      fill: ${lightColors.background};
    }
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-top: 0px;
    width: 150px;
    height: 56px;
    font-size: 16px;
    margin-top: 0px;
    svg {
      width: 16px;
      height: 16px;
      margin-bottom: 4px;
      path {
        fill: ${lightColors.background};
      }
    }
  }
`

export default NoProfileCard
