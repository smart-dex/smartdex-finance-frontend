import React from 'react'
import styled from 'styled-components'
import { Card } from 'uikit-sotatek'
import { DataResponse } from 'utils/getLotteryRoundData'
import { darkColors, lightColors } from 'style/Color'
import PastRoundCardError from './PastRoundCardError'
import PastRoundCardDetails from './PastRoundCardDetails'

interface PastRoundCardProps {
  error: {
    message: string
  }
  data: DataResponse
}

const  CardStyle = styled(Card)`
  border: 1px solid ${({ theme }) => (theme.isDark ? darkColors.borderColor : lightColors.borderColor)};
  box-shadow: 10px 10px 30px rgba(120, 118, 148, 0.07);
  border-radius: 30px !important;
  ${({ theme }) => theme.mediaQueries.nav} {
    border-radius: 40px !important;
  }

`
const PastRoundCard: React.FC<PastRoundCardProps> = ({ error, data }) => {
  return <CardStyle>{error.message ? <PastRoundCardError error={error} /> : <PastRoundCardDetails data={data} />}</CardStyle>
}

export default PastRoundCard