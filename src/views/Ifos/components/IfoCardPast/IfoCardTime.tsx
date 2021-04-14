import React from 'react'
import styled from 'styled-components'
import { Link } from 'uikit-sotatek'
import { IfoStatus } from 'config/constants/types'
import getTimePeriods from 'utils/getTimePeriods'
import useI18n from 'hooks/useI18n'
import { lightColors, darkColors } from 'style/Color'

export interface IfoCardTimeProps {
  isLoading: boolean
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
  block: number
}

const Details = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    margin-right: 25%;
    justify-content: flex-end;
  }
`

const Countdown = styled.div`
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? darkColors.textSubtle : lightColors.textMenuLeft)};
  ${({ theme }) => theme.mediaQueries.nav} {
    font-size: 16px;
    line-height: 20px;
  }
`

const IfoCardTime: React.FC<IfoCardTimeProps> = ({ isLoading, status, secondsUntilStart, secondsUntilEnd, block }) => {
  const TranslateString = useI18n()
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix = status === 'coming_soon' ? 'start' : 'finish'

  if (isLoading) {
    return <Details>{TranslateString(656, 'Loading...')}</Details>
  }

  if (countdownToUse <= 0) {
    return (
      <Details>
        <Countdown>{TranslateString(388, 'Finished!')}</Countdown>
      </Details>
    )
  }

  return (
    <Details>
      <Countdown>{`${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m until ${suffix}`}</Countdown>
      <Link href={`${process.env.REACT_APP_TESTNET_SCAN}/block/countdown/${block}`} target="blank" rel="noopener noreferrer" ml="8px">
        (blocks)
      </Link>
    </Details>
  )
}

export default IfoCardTime
