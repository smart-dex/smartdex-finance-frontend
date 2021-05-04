import React from 'react'
import { AutoRenewIcon, Flex, Heading } from 'smartdex-uikit'
import orderBy from 'lodash/orderBy'
import { useTeams } from 'state/hooks'
import styled from 'styled-components'
import { darkColors, lightColors } from 'style/Color'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'
import FlexLayout from 'components/layout/Flex'
import TeamListCard from './components/TeamListCard'
import TeamHeader from './components/TeamHeader'

const Teams = () => {
  const TranslateString = useI18n()
  const { teams, isLoading } = useTeams()
  const teamList = teams && Object.values(teams)
  const topTeams = orderBy(teamList, ['points', 'id', 'name'], ['desc', 'asc', 'asc'])

  return (
    <Page>
      <TeamHeader />
      <StyledTextTeam mb="33px">
        <IconTeam src="/images/teams/teams-icon.svg" alt="team_icon" style={{ marginRight: '18px' }} />
        <StyledTeamHeading>{TranslateString(1040, 'Teams')}</StyledTeamHeading>
        {isLoading && <AutoRenewIcon spin />}
      </StyledTextTeam>
      <FlexLayout style={{ justifyContent: 'space-around' }}>
        {topTeams.map((team, index) => (
          <TeamListCard key={team.id} rank={index + 1} team={team} />
        ))}
      </FlexLayout>
    </Page>
  )
}
const StyledTextTeam = styled(Flex)`
  justify-content: center;
`
const StyledTeamHeading = styled(Heading)`
  font-weight: bold;
  font-size: 18px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor : lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`
const IconTeam = styled.img`
  content: ${({ theme }) =>
    theme.isDark ? "url('/images/teams/icon/teams-icon-dark.svg')" : "url('/images/teams/icon/teams-icon-light.svg')"};
`
export default Teams
