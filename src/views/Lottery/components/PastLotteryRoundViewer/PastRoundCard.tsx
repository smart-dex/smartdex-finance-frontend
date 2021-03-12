import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap-libs/uikit'
import { DataResponse } from 'utils/getLotteryRoundData'
import PastRoundCardError from './PastRoundCardError'
import PastRoundCardDetails from './PastRoundCardDetails'
import { darkColors, lightColors } from '../../../../style/Color'

interface PastRoundCardProps {
  error: {
    message: string
  }
  data: DataResponse
}

const  CardStyle = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 10px 10px 30px rgba(120, 118, 148, 0.07);
`
const PastRoundCard: React.FC<PastRoundCardProps> = ({ error, data }) => {
  return <CardStyle>{error.message ? <PastRoundCardError error={error} /> : <PastRoundCardDetails data={data} />}</CardStyle>
}

export default PastRoundCard
