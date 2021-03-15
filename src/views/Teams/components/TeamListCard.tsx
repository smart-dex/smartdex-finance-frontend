import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Flex, Heading, Text } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors } from 'style/Color'
import { Team } from 'config/constants/types'
import StyedCard from './Card'


interface TeamCardProps {
  rank: number
  team: Team
}

const getBackground = (rank) => {
  switch (rank){
    case 1:{
      return '/images/teams/rank/rank_1.svg'
      break;
    }
    case 2:{
      return '/images/teams/rank/rank_2.svg'
      break;
    }
    case 3:{
      return '/images/teams/rank/rank_3.svg'
      break;
    }
    default: return '/images/teams/rank/rank_3.svg'
  }
  
}

const TeamRank = styled.div`
  padding: 16px 0;
  text-align: center;
  min-width: 40px;
  position: absolute;
  left: 2rem;
  top: 0px;
  background-position: top left;
  background-repeat: not-repeat;
`

const Body = styled.div`
  align-items: start;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
`

const Info = styled.div`
  flex: 1;
`

const Avatar = styled.img`
  border-radius: 50%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
`

const TeamName = styled(Heading)`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color:${({theme})=>(theme.isDark? darkColors.textLogoMenuLeft:lightColors.textLogoMenuLeft)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 18px;
  }
`

const TeamDescription =styled(Text)`
  font-weight: normal;
  font-size: 10px;
  line-height: 143%;
  text-align: center;
  letter-spacing: -0.03em;
  color: rgba(95, 94, 118, 0.7);
  margin-bottom:29px;
  color: ${({theme})=>(theme.isDark? darkColors.textDescriptionMenu:lightColors.textDescriptionMenu)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 12px;
  }
`
const StyledTeamRankText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #FFFFFF;
`

const DesktopAvatar = styled.div`
  display: block;
  height: 87px;
  width: 87px;
  margin: 16px auto;
`
const PrizeText = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  line-height: 29px;
  color: ${({theme})=>(theme.isDark? darkColors.balanceColor:lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 24px;
  }
`
const StyledButtonSeeMore =styled(Button)`
  width: 121px;
  height: 45px;
  ${({ theme }) => theme.mediaQueries.nav} {
    width: 150px;
    height: 56px;
  }
  border: 1px solid  #0085FF;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #0085FF;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    background: #0085FF;
    border: 1px solid #0085FF;
    color: #FFFFFF;
  }
  
`


const TeamCard: React.FC<TeamCardProps> = ({ rank, team }) => {
  const TranslateString = useI18n()
  const avatar = <Avatar src={`/images/teams/${team.images.md}`} alt="team avatar" />

  return (
    <StyedCard>
        <TeamRank style={{backgroundImage:`url(${getBackground(rank)})`}}>
          <StyledTeamRankText bold fontSize="24px">
            {rank}
          </StyledTeamRankText>
        </TeamRank>
        <DesktopAvatar>{avatar}</DesktopAvatar>
      <Body>
        <Info>
          <Flex alignItems="center" mb="16px" justifyContent='center'>
            {/* <MobileAvatar>{avatar}</MobileAvatar> */}
            <TeamName>{team.name}</TeamName>
          </Flex>
          <TeamDescription as="p">
            {team.description}
          </TeamDescription>
          <Flex justifyContent='space-around' mb='32px'>
            <Flex flexDirection='column' alignItems='center'>

              <img src="/images/teams/icon/prize-icon.svg" alt="prize-icon"/>
              <PrizeText fontSize="16px" bold>
                {team.points.toLocaleString()}
              </PrizeText>
            </Flex>
            <Flex flexDirection='column' alignItems='center'>

              <img src="/images/teams/icon/community-icon.svg" alt="community-icon"/>
              <PrizeText fontSize="16px" bold>
                {team.users.toLocaleString()}
              </PrizeText>
            </Flex>
          </Flex>
          <Flex justifyContent='center'>
            <StyledButtonSeeMore as={Link} to={`/teams/${team?.id}`}>
              {TranslateString(1042, 'See More')}
            </StyledButtonSeeMore>
          </Flex>
        </Info>
      </Body>
    </StyedCard>
  )
}

export default TeamCard
