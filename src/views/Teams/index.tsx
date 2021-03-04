import React from 'react'
import { AutoRenewIcon, Flex, Heading } from '@pancakeswap-libs/uikit'
import orderBy from 'lodash/orderBy'
import { useTeams } from 'state/hooks'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'
import FlexLayout from 'components/layout/Flex'
import TeamListCard from './components/TeamListCard'
import TeamHeader from './components/TeamHeader'


const Teams = () => {
  const TranslateString = useI18n()
  const { teams, isLoading } = useTeams()
  const teamList = Object.values(teams)
  const topTeams = orderBy(teamList, ['points', 'id', 'name'], ['desc', 'asc', 'asc'])

  return (
    <Page>
      <TeamHeader />
      <Flex alignItems="center" mb="32px">
        <img src='/images/teams/teams-icon.svg' alt='team_icon' style={{ marginRight: '18px' }} />
        <Heading size="lg">{TranslateString(1040, 'Teams')}</Heading>
        {isLoading && <AutoRenewIcon spin />}
      </Flex>
      <FlexLayout style={{    justifyContent: 'space-around'}}>
        {topTeams.map((team, index) => (
          <TeamListCard key={team.id} rank={index + 1} team={team} />
        ))}
      </FlexLayout>

    </Page>
  )
}

export default Teams
