import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, CommunityIcon, Flex, Heading, PrizeIcon, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
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
  // background-image: url('/images/teams/rank/rank_1.svg');
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

  // ${({ theme }) => theme.mediaQueries.md} {
  //   align-items: center;
  //   flex-direction: row;
  //   font-size: 40px;
  // }
`

const Info = styled.div`
  flex: 1;
`

const Avatar = styled.img`
  border-radius: 50%;
`

const TeamName = styled(Heading).attrs({ as: 'h3' })`
  font-size: 18px;

  // ${({ theme }) => theme.mediaQueries.md} {
  //   font-size: 18px;
  // }
`

// const MobileAvatar = styled.div`
//   flex: none;
//   margin-right: 8px;

//   ${Avatar} {
//     height: 64px;
//     width: 64px;
//   }

//   ${({ theme }) => theme.mediaQueries.md} {
//     display: none;
//   }
// `

const DesktopAvatar = styled.div`
  display: block;
  height: 87px;
  width: 87px;
  margin: 16px auto;
  // ${({ theme }) => theme.mediaQueries.md} {
  //   display: block;
  //   margin-left: 24px;

  //   ${Avatar} {
  //     height: 87px;
  //     width: 87px;
  //   }
  // }
`

const TeamCard: React.FC<TeamCardProps> = ({ rank, team }) => {
  const TranslateString = useI18n()
  const avatar = <Avatar src={`/images/teams/${team.images.md}`} alt="team avatar" />

  return (
    <StyedCard>
        <TeamRank style={{backgroundImage:`url(${getBackground(rank)})`}}>
          <Text bold fontSize="24px">
            {rank}
          </Text>
        </TeamRank>
        <DesktopAvatar>{avatar}</DesktopAvatar>
      <Body>
        <Info>
          <Flex alignItems="center" mb="16px" justifyContent='center'>
            {/* <MobileAvatar>{avatar}</MobileAvatar> */}
            <TeamName>{team.name}</TeamName>
          </Flex>
          <Text as="p" fontSize='12px' color="textSubtle" mb="16px" textAlign='center'>
            {team.description}
          </Text>
          <Flex justifyContent='space-around' mb='16px'>
            <Flex flexDirection='column' alignItems='center'>
              {/* alignSelf for Safari fix */}
              <PrizeIcon width="24px" style={{ alignSelf: 'center' }} />
              <Text fontSize="16px" bold>
                {team.points.toLocaleString()}
              </Text>
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
              {/* alignSelf for Safari fix */}
              <CommunityIcon width="24px" style={{ alignSelf: 'center' }} />
              <Text fontSize="16px" bold>
                {team.users.toLocaleString()}
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent='center'>
            <Button as={Link} to={`/teams/${team?.id}`} variant="primary" size="md" >
              {TranslateString(1042, 'See More')}
            </Button>
          </Flex>
        </Info>
      </Body>
    </StyedCard>
  )
}

export default TeamCard
