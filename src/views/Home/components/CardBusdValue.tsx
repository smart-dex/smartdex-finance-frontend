import React from 'react'
import CardValue, { CardValueProps } from './CardValue'
import { lightColors } from '../../../style/Color'

const CardBusdValue: React.FC<CardValueProps> = (props) => {
  return <CardValue fontSize="12px" color={lightColors.balanceColor} prefix="~$" bold={false} decimals={2} {...props} />
}

export default CardBusdValue
