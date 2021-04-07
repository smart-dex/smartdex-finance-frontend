import React, { useMemo } from 'react'
import { Card, CardBody, CommunityIcon, Flex, Heading, Text } from 'uikit-sotatek'
import shuffle from 'lodash/shuffle'
import { useTeams } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors, baseColors, brandColors } from 'style/Color'
import styled from 'styled-components'
import SelectionCard from '../components/SelectionCard'
import NextStepButton from '../components/NextStepButton'
import useProfileCreation from './contexts/hook'


interface Team {
  name: string
  description: string
  isJoinable: boolean
}

const TextStep3 = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-top: 17px;
  margin-bottom: 7px;
`
const HeadingText = styled(Heading)`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.balanceColor)};
  margin-top: 7px;
  margin-bottom: 9px !important;
`
const TextSub3 = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorStep)};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`
const Cardbox3 = styled(CardBody)`
  margin-top: 21px;
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 50px 38px 102px rgba(120, 118, 148, 0.14);
  border-radius: 40px;
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.white)};
`
const HeadingTit = styled(Heading)`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};

`
const CardBody3 = styled(CardBody)`
  padding: 0px;
`
const Texttit3 = styled(Text)`
  font-size: 14px;
  line-height: 25px;
  color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.colorWap)};
  width: 100%;
  font-weight: 400;
  margin-bottom: 20px;
`
const SelectChecked = styled.div`
    box-shadow: none !important;
    position: relative;
    & : checked {
    background-color: ${baseColors.primary}!important;
    }
    & : hover{
    box-shadow: none !important;
    }
    & : active{
    box-shadow: none !important;
    }
    $ : after {
        left: 5px !important;
        top: 5px !important;
    }
`
const TextCheck = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.balanceColor: lightColors.balanceColor)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
  }
`
const NextStep3 = styled(NextStepButton)`
  background-color: ${brandColors.colorbtnNext};
  box-shadow: none;
  margin-top: 30px;
  margin-bottom: 30px;
  &:disabled{
    background-color: ${({ theme }) => (theme.isDark ? darkColors.btnApp : lightColors.colorApprove)} !important;
    color: ${({ theme }) => (theme.isDark ? darkColors.colorWap : lightColors.btnApp)} !important;
  }
`

const Team: React.FC = () => {
  const { teamId: currentTeamId, actions } = useProfileCreation()
  const TranslateString = useI18n()
  const { teams } = useTeams()
  const handleTeamSelection = (value: string) => actions.setTeamId(parseInt(value, 10))
  const teamValues = useMemo(() => shuffle(Object.values(teams)), [teams])

  return (
    <>
      <TextStep3 fontSize="20px" color="textSubtle" bold>
        {TranslateString(999, `Step ${3}`)}
      </TextStep3>
      <HeadingText as="h3" size="xl" mb="24px">
        {TranslateString(826, 'Join a Team')}
      </HeadingText>
      <TextSub3 as="p" mb="24px">
        {TranslateString(828, 'It won’t be possible to undo the choice you make for the foreseeable future!')}
      </TextSub3>
      <Cardbox3 mb="24px">
        <CardBody3>
          <HeadingTit as="h4" size="lg" mb="8px">
            {TranslateString(826, 'Join a Team')}
          </HeadingTit>
          <Texttit3 as="p" color="textSubtle" mb="24px">
            {TranslateString(
              830,
              'There’s currently no big difference between teams, and no benefit of joining one team over another for now. So pick whichever one you like!',
            )}
          </Texttit3>
          {teamValues &&
            teamValues.map((team) => {
              return (
                <SelectChecked>
                    <SelectionCard
                      key={team.name}
                      name="teams-selection"
                      value={team.id}
                      isChecked={currentTeamId === team.id}
                      image={`/images/teams/${team.images.md}`}
                      onChange={handleTeamSelection}
                      disabled={!team.isJoinable}
                    >
                      <TextCheck bold>{team.name}</TextCheck>
                      {/* <Flex>
                        <CommunityIcon mr="8px" />
                        <Text>{team.users.toLocaleString()}</Text>
                      </Flex> */}
                    </SelectionCard>
                </SelectChecked>
              )
            })}
        </CardBody3>
      </Cardbox3>
      <NextStep3 onClick={actions.nextStep} disabled={currentTeamId === null}>
        {TranslateString(798, 'Next Step')}
      </NextStep3>
    </>
  )
}

export default Team
