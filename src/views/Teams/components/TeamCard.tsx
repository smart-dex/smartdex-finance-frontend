import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardBody, CommunityIcon, Heading, PrizeIcon, Text, Flex } from '@pancakeswap-libs/uikit'
import { Team } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
// import ComingSoon from 'views/Profile/components/ComingSoon'
import StatBox from 'views/Profile/components/StatBox'

interface TeamCardProps {
  team: Team
}

const Wrapper = styled.div`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 24px;
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  min-height: 64px;
  min-width: 64px;
  border: solid 2px white;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 120px;
    // margin-top: -24px;
    width: 120px;
  }
`

const AvatarWrap = styled.div`
  // margin-bottom: 8px;
  justify-items: center;
  margin: auto 0;
`

const StyledCard = styled(Card)`
  overflow: visible;
`

const StyledCardHeader = styled(CardHeader) <{ bg: string }>`
  background: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 32px 32px 0 0;
  display: flex;
`

const TeamName = styled(Heading).attrs({ as: 'h2' })`
  font-size: 32px;
`

const StatRow = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 32px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 32px;
  }
`
const StyedTextName = styled(Flex)`
  flex-direction:  colum;
`

const ComingSoon = styled.div`
  margin-top: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
`

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <StyledCard>
        <StyledCardHeader bg={`/images/teams/${team.background}`}>
          <AvatarWrap>
            <Avatar src={`/images/teams/${team.images.md}`} alt="team avatar" />
          </AvatarWrap>
          <StyedTextName ml='16px' flexDirection='column' justifyContent='center'>
            <TeamName color={team.textColor}>{team.name}</TeamName>
            <Text fontSize='14px' as="p" color={team.textColor}>
              {team.description}
            </Text>
          </StyedTextName>
        </StyledCardHeader>
        <CardBody>
          <StatRow>
            <StatBox icon={CommunityIcon} title={team.users} subtitle={TranslateString(1048, 'Active Members')} />
            <StatBox
              icon={PrizeIcon}
              title={TranslateString(350, 'Coming Soon')}
              subtitle={TranslateString(1046, 'Team Points')}
              isDisabled
            />
          </StatRow>
          <Heading as="h3">{TranslateString(1044, 'Team Achievements')}</Heading>
          <ComingSoon>
            <span>{TranslateString(350, 'Coming Soon')}</span>
          </ComingSoon>
        </CardBody>
      </StyledCard>
    </Wrapper>
  )
}

export default TeamCard
