import React from 'react'
import Page from 'components/layout/Page'
import { Link, Redirect, useParams } from 'react-router-dom'
import { Flex, Text } from 'smartdex-uikit'
import PageLoader from 'components/PageLoader'
import teams from 'config/constants/teams'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { useTeam } from 'state/hooks'
import { lightColors } from 'style/Color'
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
          <FlexBack alignItems="center">
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 13L2 7L8 1"  strokeWidth="2"/>
                </svg>
            <StyledTextBack>{TranslateString(1038, 'Teams Overview')}</StyledTextBack>
          </FlexBack>
        </Link>
      </Flex>
      <TeamCard team={team} />
    </Page>
  )
}
const StyledTextBack = styled(Text)`
  font-weight: 600;
  line-height: 20px;
  color: ${lightColors.primary};
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const FlexBack = styled(Flex)`
  & svg {
    stroke: ${lightColors.primary};
    width: 9px;
    margin-right: 15px;
    }
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    & svg {
      width: 12px;
      stroke: ${lightColors.primary};
      }
    }
`
export default Team
