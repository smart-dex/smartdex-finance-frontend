import React from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import AchievementsList from './components/AchievementsList'
import ClaimPointsCallout from './components/ClaimPointsCallout '
import Menu from './components/Menu'



const TaskCenter = () => {
  const TranslateString = useI18n()

  return (
    <>
      <Menu />
      <ClaimPointsCallout />
      <StyledListCard justifyContent='center'>
        <StyledCard>
          <StyledHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <div>
                <StyledTextHeader>
                  {TranslateString(1092, 'Achievements')}
                </StyledTextHeader>
                <StyledDescriptionHeader as="p">{TranslateString(1084, 'Earn more points for completing larger quests!')}</StyledDescriptionHeader>
              </div>
            </Flex>
          </StyledHeader>
          <StyledBodyCard>
            <AchievementsList />
          </StyledBodyCard>
        </StyledCard>
        <StyledCard>
          <StyledHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <div>
                <StyledTextHeader>
                  {TranslateString(1090, 'Task Center')}
                </StyledTextHeader>
                <StyledDescriptionHeader as="li">{TranslateString(1088, 'Earn points by completing regular tasks!')}</StyledDescriptionHeader>
                <StyledDescriptionHeader as="li">
                  {TranslateString(1086, 'Collecting points for these tasks makes them available again.')}
                </StyledDescriptionHeader>
              </div>
            </Flex>
          </StyledHeader>
          <StyledBodyCard>
            <Flex alignItems="center" justifyContent="center" style={{ height: '64px' }}>
              <StyledComingSoon>{TranslateString(999, 'Coming Soon')}</StyledComingSoon>
            </Flex>
          </StyledBodyCard>
        </StyledCard>
      </StyledListCard>
    </>
  )
}
const StyledListCard = styled(Flex)`
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    flex-direction: row;
    align-items: stretch;
  }
`
const StyledCard = styled(Card)`
  box-shadow: 50px 38px 102px  ${({ theme }) => (theme.isDark ? darkColors.shadowCardCollectibles : lightColors.shadowCardCollectibles)};
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  border-radius:40px;
  max-width 335px;
  margin-bottom: 30px;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-bottom: 0px;
    margin-right:50px;
    max-width none;
    width 467px;
  }
`
const StyledHeader = styled(CardHeader)`
  padding:40px;
  ${({ theme }) => theme.mediaQueries.nav} {
     min-height:180px;
  }
  background: linear-gradient(91.67deg, #0085FF 5.33%, #7E86FF 104.39%);
  border-radius: 40px 40px 0px 0px;
`
const StyledTextHeader = styled(Heading)`
  font-weight: bold;
  font-size: 18px;
  line-height: 29px;
  color: #FFFFFF;
  margin-bottom:13px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`

const StyledDescriptionHeader = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  color: #FFFFFF;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const StyledComingSoon = styled(Text)`
  font-weight: bold;
  font-size: 10px;
  line-height: 22px;
  color:  ${({ theme }) => (theme.isDark ? darkColors.textComingSoon : lightColors.textComingSoon)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`
const StyledBodyCard = styled(CardBody)` 
`

export default TaskCenter
