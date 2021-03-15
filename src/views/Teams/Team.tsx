import React from 'react'
import Page from 'components/layout/Page'
import { Link, Redirect, useParams } from 'react-router-dom'
import { Flex, Text } from 'uikit-sotatek'
import PageLoader from 'components/PageLoader'
import teams from 'config/constants/teams'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { useTeam } from 'state/hooks'
import TeamCard from './components/TeamCard'
import TeamHeader from './components/TeamHeader'


const Team = () => {
  const { id: idStr }: { id: string } = useParams()
  const id = Number(idStr)
  const TranslateString = useI18n()
  const isValidTeamId = teams.findIndex((team) => team.id === id) !== -1
  const team = useTeam(id)

  if (!isValidTeamId) {
    return <Redirect to="/404" />
  }

  if (!team) {
    return <PageLoader />
  }

  return (
    <Page>
      <TeamHeader />
      <Flex mb="24px">
        <Link to="/teams">
          <Flex alignItems="center">
            <img src="/images/teams/icon/back-card-team.svg" alt="back-icon"/>
            <StyledTextBack>{TranslateString(1038, 'Teams Overview')}</StyledTextBack>
          </Flex>
        </Link>
      </Flex>
      <TeamCard team={team} />
    </Page>
  )
}
const StyledTextBack = styled(Text)`
font-weight: 600;
line-height: 20px;
color: #50B0FC;
font-size: 12px;
${({ theme }) => theme.mediaQueries.nav} {
  font-size: 16px;
}

`
export default Team
