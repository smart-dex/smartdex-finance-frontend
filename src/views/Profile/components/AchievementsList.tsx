import React from 'react'
import styled from 'styled-components'
import { Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors } from 'style/Color'
import { useAchievements } from 'state/hooks'
import AchievementCard from './AchievementCard'

const Grid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.nav} {
    grid-template-columns: repeat(1, 1fr);
  }
`

const AchievementsList = () => {
  const TranslateString = useI18n()
  const achievements = useAchievements()

  return (
    <>
      <Grid>
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </Grid>
      {achievements.length === 0 && (
        <Flex alignItems="center" justifyContent="center" style={{ height: '64px' }}>
          <StyledText>{TranslateString(999, 'No achievments yet!')}</StyledText>
        </Flex>
      )}
    </>
  )
}
const StyledText = styled(Heading)`
  font-weight: bold;
  font-size: 12px;
  line-height: 22px;
  align-item: left;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorAchievment)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`

export default AchievementsList
