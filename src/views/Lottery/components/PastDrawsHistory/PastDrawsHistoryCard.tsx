import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from 'uikit-sotatek'
import useI18n from 'hooks/useI18n'
import { darkColors, lightColors } from 'style/Color'
import HistoryChart from './HistoryChart'
import Legend from './Legend'


const CardStyle = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? darkColors.backIfo : lightColors.backIfo)};
  box-shadow: 10px 10px 30px rgba(120, 118, 148, 0.07);
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  border-radius: 40px;
`
const PastDrawsHistoryCard: React.FC = () => {
  

  return (
    <CardStyle>
      <CardBody>
        <Legend />
        <HistoryChart />
      </CardBody>
    </CardStyle>
  )
}

export default PastDrawsHistoryCard