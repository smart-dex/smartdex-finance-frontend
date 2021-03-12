import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import HistoryChart from './HistoryChart'
import Legend from './Legend'
import { darkColors, lightColors } from '../../../../style/Color'

const HeadingStyle = styled(Heading)`
  color: ${({ theme }) => (theme.isDark ? darkColors.text : lightColors.textMenuLeft)};
  font-size: 18px;
`
const CardStyle = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 10px 10px 30px rgba(120, 118, 148, 0.07);
`
const PastDrawsHistoryCard: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <CardStyle>
      <CardBody>
        <HeadingStyle >{TranslateString(746, 'History')}</HeadingStyle>
        <Legend />
        <HistoryChart />
      </CardBody>
    </CardStyle>
  )
}

export default PastDrawsHistoryCard
