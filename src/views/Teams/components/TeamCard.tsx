import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardBody, CommunityIcon, Heading, PrizeIcon, Text, Flex } from 'uikit-sotatek'
import { Team } from 'config/constants/types'
import { darkColors, lightColors, brandColors } from 'style/Color'
import useI18n from 'hooks/useI18n'
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
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  min-height: 64px;
  min-width: 64px;
  border: solid 2px white;
  ${({ theme }) => theme.mediaQueries.nav} {
    height: 120px;
    width: 120px;
  }
`

const AvatarWrap = styled.div`
  justify-items: center;
  margin: auto 0;
`

const StyledCard = styled(Card)`
  overflow: visible;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderCard : lightColors.borderCard)};
  box-shadow: 50px 38px 102px ${({ theme }) => (theme.isDark ? darkColors.cardShadow : lightColors.cardShadow)};
  border-radius: 40px;
`

const StyledCardHeader = styled(CardHeader)`
  background: linear-gradient(91.67deg, #0085ff 5.33%, #7e86ff 104.39%);
  background-size: cover;
  border-radius: 40px 40px 0px 0px;
  display: flex;
`

const TeamName = styled(Heading).attrs({ as: 'h2' })`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;

  line-height: 39px;
  color: ${brandColors.white};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 32px;
  }
`
const TeamDescription = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 143%;
  letter-spacing: -0.03em;
  color: ${({ theme }) => (theme.isDark ? brandColors.white : 'rgba(255, 255, 255, 0.8)')};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
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
  flex-direction: colum;
`

const ComingSoon = styled.div`
  margin-top: 16px;
  font-size: 10px;
  line-height: 17px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textDescriptionMenu : lightColors.textDescriptionMenu)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 14px;
  }
`
const TextAchievements = styled(Heading)`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textMenuLeft : lightColors.textMenuLeft)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <StyledCard>
        <StyledCardHeader>
          <AvatarWrap>
            <Avatar src={`/images/teams/${team.images.md}`} alt="team avatar" />
          </AvatarWrap>
          <StyedTextName ml="36px" flexDirection="column" justifyContent="center">
            <TeamName color={team.textColor}>{team.name}</TeamName>
            <TeamDescription fontSize="14px" as="p" color={team.textColor}>
              {team.description}
            </TeamDescription>
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
          <TextAchievements as="h3">{TranslateString(1044, 'Team Achievements')}</TextAchievements>11
          <ComingSoon>{TranslateString(350, 'Coming Soon')}</ComingSoon>
        </CardBody>
      </StyledCard>
    </Wrapper>
  )
}

export default TeamCard
