import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
import formatLotteryDate from '../helpers/formatLotteryDate'
import { darkColors, lightColors } from '../../../style/Color'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const TextStyle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
`
const Timestamp = ({ timeValue }) => {
  const { monthAndDay, hours } = formatLotteryDate(timeValue)

  return (
    <Wrapper>
      <TextStyle fontSize="14px">
        {monthAndDay}, {hours}:00 UTC
      </TextStyle>
    </Wrapper>
  )
}

export default Timestamp
